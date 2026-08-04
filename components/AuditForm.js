"use client";

import { useState } from "react";

export default function AuditForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Free marketing audit request from ${data.get("company")}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name")}`,
      `Work email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Website: ${data.get("website")}`,
      `Priority channel: ${data.get("channel")}`,
      "",
      "What they want reviewed:",
      data.get("goal"),
    ].join("\n"));

    setStatus("Opening your email app…");
    window.location.href = `mailto:info@regendigital.co?subject=${subject}&body=${body}`;
  }

  return (
    <form className="audit-review__form" onSubmit={handleSubmit}>
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
        <button type="submit">Request my free audit <span className="cta-arrow" aria-hidden="true" /></button>
      </div>
      <p className="audit-review__status" aria-live="polite">{status}</p>
    </form>
  );
}
