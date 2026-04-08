// Cloudflare Pages Function — Proxy lead to Bobex API
// Route: POST /api/submit-lead

interface LeadPayload {
  projectType: string;
  power: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postCode: string;
  city: string;
  remarks: string;
}

export const onRequestPost: PagesFunction = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://primes-panneaux-solaires.be",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body: LeadPayload = await context.request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.address || !body.postCode) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Phone validation (9+ digits)
    if (body.phone.replace(/\D/g, "").length < 9) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Build Bobex API URL
    const params = new URLSearchParams({
      "type.id": "11364",
      aff: "110530",
      language: "fr",
      XML_country: "be",
      companyType: "label.companytype.consumer",
      utm_medium: "aff",
      utm_source: "primes-panneaux-solaires.be",
      XML_remarks: `Projet: ${body.projectType} | Puissance: ${body.power} | ${body.remarks || ""}`,
      XML_firstname: body.firstName,
      XML_lastname: body.lastName,
      address1: body.address,
      XML_postcode: body.postCode,
      companyCity: body.city || "",
      XML_telephone: body.phone,
      XML_email: body.email,
      rem_id: `pps-${Date.now()}`,
      rem_source: "affiliate",
      promoOptin: "true",
    });

    const bobexUrl = `https://www.bobex.be/control/partner_concours_withheld?${params.toString()}`;

    // Forward to Bobex
    const response = await fetch(bobexUrl, {
      method: "GET",
      headers: { "User-Agent": "primes-panneaux-solaires.be/1.0" },
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: "Lead submitted successfully" }), {
        status: 200,
        headers: corsHeaders,
      });
    } else {
      console.error("Bobex API error:", response.status, await response.text());
      return new Response(JSON.stringify({ error: "Lead submission failed" }), {
        status: 502,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    console.error("Submit lead error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://primes-panneaux-solaires.be",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
