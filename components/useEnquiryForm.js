"use client";

import { useRef, useState } from "react";

export default function useEnquiryForm(type) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    submitting.current = true;
    setPending(true);
    setStatus("Sending your enquiry…");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, fields, page: window.location.pathname }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your enquiry. Please try again.");
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { enquiry_type: type });
        }
      } catch {}
      setStatus("Thanks! Your enquiry has been sent. We’ll be in touch soon.");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We couldn’t send your enquiry. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return { handleSubmit, status, pending };
}
