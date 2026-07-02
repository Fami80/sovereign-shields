export const config = { runtime: "edge" };

const HS_PORTAL_ID = "148818262";
const HS_FORM_GUID = "29d7ab26-fc00-4b66-9b1e-55c2a5eef56c";
const HS_ENDPOINT = `https://forms.hubspot.com/uploads/form/v2/${HS_PORTAL_ID}/${HS_FORM_GUID}`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: {
    email?: string;
    firstname?: string;
    phone?: string;
    message?: string;
    would_you_pay?: string;
  };

  try {
    body = await req.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const params = new URLSearchParams({
    email: body.email ?? "",
    firstname: body.firstname ?? "",
    phone: body.phone ?? "",
    message: body.message ?? "",
  });
  if (body.would_you_pay) params.set("would_you_pay", body.would_you_pay);

  const hsRes = await fetch(HS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return new Response(hsRes.ok ? "OK" : "HubSpot error", {
    status: hsRes.ok ? 200 : 502,
  });
}
