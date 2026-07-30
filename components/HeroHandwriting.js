"use client";

import { useEffect, useState } from "react";

export default function HeroHandwriting({ children }) {
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    const hasIntroLoader = Boolean(document.querySelector(".loader"));
    const timer = window.setTimeout(
      () => setIsWriting(true),
      hasIntroLoader ? 3260 : 180
    );

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <p
      className={`home-eyebrow hero-handwriting hero-anim${isWriting ? " is-writing" : ""}`}
      aria-label={children}
    >
      <span aria-hidden="true">
        {Array.from(children).map((character, index) => (
          <span
            className="hero-handwriting__char"
            style={{ "--char-index": index }}
            key={`${character}-${index}`}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </p>
  );
}
