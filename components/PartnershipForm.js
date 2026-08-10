"use client";

import { useState } from "react";

export default function PartnershipForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firm = data.get("firm");
    const subject = encodeURIComponent(`Portfolio partnership call request — ${firm}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name")}`,
      `Work email: ${data.get("email")}`,
      `Fund or firm: ${firm}`,
      `Website: ${data.get("website")}`,
      `Partnership scope: ${data.get("scope")}`,
      "",
      "Portfolio context:",
      data.get("context"),
    ].join("\n"));

    setStatus("Opening your email app…");
    window.location.href = `mailto:info@regendigital.co?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form partnership-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Jane Smith" required />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="jane@fund.com" required />
        </label>
        <label>
          <span>Fund or firm</span>
          <input name="firm" type="text" autoComplete="organization" placeholder="Your firm" required />
        </label>
        <label>
          <span>Website</span>
          <input name="website" type="url" autoComplete="url" placeholder="https://fund.com" required />
        </label>
        <label className="partnership-form__scope">
          <span>What are you exploring?</span>
          <select name="scope" defaultValue="" required>
            <option value="" disabled>Choose one</option>
            <option>Support for one portfolio company</option>
            <option>Support for several portfolio companies</option>
            <option>A portfolio-wide partnership</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="contact-form__message">
          <span>Where does the portfolio need support?</span>
          <textarea
            name="context"
            rows="4"
            placeholder="A little context helps us make the first conversation useful."
            required
          />
        </label>
      </div>

      <div className="contact-form__footer">
        <p>
          By sending this, you agree to our <a href="/privacy-policy">privacy policy</a>.
          Prefer email? Write to <a href="mailto:info@regendigital.co">info@regendigital.co</a>.
        </p>
        <button type="submit">
          <span>Request the call</span>
          <span className="contact-submit-arrow" aria-hidden="true">
            <img src="/download.svg" alt="" />
          </span>
        </button>
      </div>
      <p className="contact-form__status" aria-live="polite">{status}</p>
    </form>
  );
}
