"use client";

import { useLayoutEffect, useRef } from "react";

const aiAssistants = [
  ["ChatGPT", "ChatGPT-Logo.png"],
  ["Gemini", "Google_Gemini_icon_2025.svg.webp"],
  ["Claude", "Claude_AI_symbol.svg.webp"],
  ["Perplexity", "perplexity-e6a4e1t06hd6dhczot580o.webp"],
  ["Grok", "grok-ai-icon.webp"],
];

export default function AiResearchGraphic() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("is-in-view");
        observer.disconnect();
      },
      { rootMargin: "-10% 0px", threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="industry-stat-visual industry-stat-visual--illustration industry-stat-visual--clean industry-stat-visual--mentions" aria-hidden="true">
      <svg viewBox="0 0 520 301.86" role="presentation">
        <text className="stat-clean-number stat-research-number" x="260" y="63.96" textAnchor="middle">94%</text>
        <text className="stat-clean-label stat-research-label" x="260" y="88" textAnchor="middle">of buyers research through AI</text>
        {aiAssistants.map(([name, logo], i) => {
          const x = i < 3 ? 70 + i * 132 : 136 + (i - 3) * 132;
          const y = i < 3 ? 108 : 190;
          return (
            <g className="stat-assistant-card" key={name} style={{ "--assistant-delay": `${i * 90}ms` }}>
              <rect className="stat-clean-assistant" x={x} y={y} width="116" height="68" rx="13" />
              <image href={`/animation/Animated%20AI%20mentions%20interface/uploads/${logo}`}
                x={x + 36} y={y + 8} width="44" height="25" />
              <text className="stat-clean-small" x={x + 58} y={y + 54} textAnchor="middle">{name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
