"use client";

import useEnquiryForm from "./useEnquiryForm";

export default function ServiceCallForm() {
  const { handleSubmit, status, pending } = useEnquiryForm("strategy");
  return (
    <form className="service-detail__closing-form" onSubmit={handleSubmit} aria-busy={pending}>
      <label>
        <span>Name</span>
        <input autoComplete="name" type="text" name="name" placeholder="Your name*" required />
      </label>
      <label>
        <span>Work email address</span>
        <input autoComplete="email" type="email" name="email" placeholder="Your work email address*" required />
      </label>
      <p>By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
      <button className="service-detail__link service-detail__closing-submit cta-button" type="submit" disabled={pending}>Let&apos;s talk <span className="cta-arrow" aria-hidden="true" /></button>
      <p className="contact-form__status" aria-live="polite">{status}</p>
    </form>
  );
}
