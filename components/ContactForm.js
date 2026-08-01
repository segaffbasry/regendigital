"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`New Regen enquiry from ${data.get("name")}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name")}`,
      `Work email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Looking for: ${data.get("service")}`,
      "",
      "What they want to achieve:",
      data.get("message"),
    ].join("\n"));

    setStatus("Opening your email app…");
    window.location.href = `mailto:info@regendigital.co?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
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
          <span>What can we help with?</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            <option>Marketing strategy</option>
            <option>Go-to-market and launch</option>
            <option>Organic social</option>
            <option>Paid social</option>
            <option>SEO and GEO</option>
            <option>Account-based marketing</option>
            <option>Founder-led marketing</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="contact-form__message">
          <span>What are you trying to achieve?</span>
          <textarea name="message" rows="5" placeholder="A little context helps us make the first conversation useful." required />
        </label>
      </div>

      <div className="contact-form__footer">
        <p>
          By sending this, you agree to our <a href="/privacy-policy">privacy policy</a>.
          No mailing lists, no hard sell.
        </p>
        <button type="submit">
          <span>Send enquiry</span>
          <span className="contact-submit-arrow" aria-hidden="true">
            <img src="/download.svg" alt="" />
          </span>
        </button>
      </div>
      <p className="contact-form__status" aria-live="polite">{status}</p>
    </form>
  );
}
