"use client";

import { useEffect, useRef } from "react";

const closeDuration = 650;

export default function FaqItem({ question, answer }) {
  const details = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function handleSummaryClick(event) {
    const detailsElement = details.current;
    if (!detailsElement?.open) return;

    event.preventDefault();

    if (detailsElement.classList.contains("is-closing")) {
      window.clearTimeout(closeTimer.current);
      detailsElement.classList.remove("is-closing");
      return;
    }

    detailsElement.classList.add("is-closing");
    closeTimer.current = window.setTimeout(() => {
      detailsElement.open = false;
      detailsElement.classList.remove("is-closing");
    }, closeDuration);
  }

  return (
    <details ref={details}>
      <summary onClick={handleSummaryClick}>
        {question}
        <span aria-hidden="true">+</span>
      </summary>
      <div className="faq-answer">
        <div>
          <p>{answer}</p>
        </div>
      </div>
    </details>
  );
}
