"use client";

import useEnquiryForm from "./useEnquiryForm";

export default function AuditForm() {
  const { handleSubmit, status, pending } = useEnquiryForm("audit");

  return (
    <form className="audit-review__form" onSubmit={handleSubmit} aria-busy={pending}>
      <div className="audit-review__fields">
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Jane Smith" required />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required />
        </label>
        <label>
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Your company" required />
        </label>
        <label>
          <span>Website</span>
          <input name="website" type="url" autoComplete="url" placeholder="https://company.com" required />
        </label>
        <label>
          <span>Priority channel</span>
          <select name="channel" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            <option>Full marketing system</option>
            <option>Positioning and strategy</option>
            <option>Organic social</option>
            <option>Paid social</option>
            <option>Google Ads</option>
            <option>SEO and GEO</option>
          </select>
        </label>
        <label className="audit-review__goal">
          <span>What should we focus on?</span>
          <textarea name="goal" rows="3" placeholder="Tell us where marketing feels stuck or where pipeline is leaking." required />
        </label>
      </div>
      <div className="audit-review__form-footer">
        <p>By sending this, you agree to our <a href="/privacy-policy">privacy policy</a>. No mailing lists or automated scores.</p>
        <button className="cta-button" type="submit" disabled={pending}>Request my free audit <span className="cta-arrow" aria-hidden="true" /></button>
      </div>
      <p className="audit-review__status" aria-live="polite">{status}</p>
    </form>
  );
}
