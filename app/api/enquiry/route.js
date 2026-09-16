import { enquiryRecipients } from "../../../lib/enquiry-recipients";
import { prepareEnquiry } from "../../../lib/enquiry";

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Please submit your enquiry from our website." }, { status: 403 });
  }
  let email;
  try {
    const body = await request.text();
    if (body.length > 20000) return Response.json({ error: "Your enquiry is too long." }, { status: 413 });
    email = prepareEnquiry(JSON.parse(body));
  } catch (error) {
    return Response.json({ error: error instanceof SyntaxError ? "Please provide a valid enquiry." : error.message }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return Response.json({ error: "The enquiry form is temporarily unavailable. Please email holly@regendigital.co or taylor@regendigital.co." }, { status: 503 });
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: enquiryRecipients, ...email }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || !result.id) throw new Error("Email delivery rejected");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We couldn’t send your enquiry. Please try again or email holly@regendigital.co or taylor@regendigital.co." }, { status: 502 });
  }
}
