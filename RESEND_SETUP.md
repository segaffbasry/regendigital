# Enquiry email setup

Every enquiry form (homepage, service pages, contact, audit and partnership) posts to `/api/enquiry` using `components/useEnquiryForm.js`.

The server sends through Resend to Holly and Taylor using `lib/enquiry-recipients.js`. The visitor’s address is Reply-To, so replies reach the visitor. Form type, page and all required fields are included in the email.

Add these server-only environment variables in Vercel and in `.env.local` for local testing:

```dotenv
RESEND_API_KEY=your_sending_api_key
RESEND_FROM_EMAIL=Regen Website <website@regendigital.co>
```

The From address must use the domain verified in Resend. If a subdomain is verified instead, use an address on that subdomain. No `NEXT_PUBLIC_` prefix: the API key must stay on the server. Redeploy after changing hosting environment variables.

Until these variables are configured, forms show an unavailable message with Holly and Taylor’s email addresses. They preserve entered details on failure and only show success after Resend accepts the email.

Before launch:

1. Verify the sending domain and configure the environment variables.
2. Submit each form and confirm both inboxes receive the correct fields and source page.
3. Reply to a test enquiry to verify Reply-To.
4. Add production spam/rate-limit protection. Server validation and same-origin checking are implemented, but these alone do not prevent bot submissions.
5. Set up successful-enquiry analytics once GA4 is available.

API reference: https://resend.com/docs/api-reference/emails/send-email
