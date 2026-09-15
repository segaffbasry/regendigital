"use client";

import { useId, useLayoutEffect, useRef } from "react";

const BLUE = "#0C27F0";
const CREAM = "#EEF0E5";
const LINE_START = 420;
const LINE_END = 1633;
const DURATION = 2800;
// Geometry from the supplied completed SVGs, ordered by horizontal position.
const bars = [
  { x: 411, y: 793, height: 150 },
  { x: 652, y: 695, height: 248 },
  { x: 869, y: 609, height: 334 },
  { x: 1086, y: 544, height: 399 },
  { x: 1327, y: 466, height: 477 },
  { x: 1544, y: 355, height: 588 },
];
const smoothstep = (value) => value * value * (3 - 2 * value);

export default function IndustryGrowthPlot({ type }) {
  const root = useRef(null);
  const clipId = useId();

  useLayoutEffect(() => {
    const element = root.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // The server-rendered artwork is already complete, including without JS.
    if (preference.matches || !window.IntersectionObserver) return;

    const reveal = element.querySelector(".industry-growth-plot__reveal");
    const barElements = [...element.querySelectorAll(".industry-growth-plot__bar")];
    let frame;
    const finish = () => {
      cancelAnimationFrame(frame);
      reveal.setAttribute("width", LINE_END - LINE_START);
      barElements.forEach((bar) => bar.setAttribute("fill", BLUE));
      element.dataset.motion = "complete";
    };

    reveal.setAttribute("width", 0);
    barElements.forEach((bar) => bar.setAttribute("fill", CREAM));
    element.dataset.motion = "pending";

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      element.dataset.motion = "running";
      let start;
      const update = (now) => {
        start ??= now;
        const progress = Math.min((now - start) / DURATION, 1);
        const x = LINE_START + (LINE_END - LINE_START) * smoothstep(progress);
        reveal.setAttribute("width", x - LINE_START);
        barElements.forEach((bar, index) => {
          // Each fill follows the same reveal position as the line. Clamp the
          // first/last bar to the line endpoints so the last fill finishes with it.
          const left = Math.max(bars[index].x, LINE_START);
          const right = Math.min(bars[index].x + 131, LINE_END);
          const amount = smoothstep(Math.max(0, Math.min((x - left) / (right - left), 1)));
          const color = [238, 240, 229].map((channel, i) =>
            Math.round(channel + ([12, 39, 240][i] - channel) * amount));
          bar.setAttribute("fill", `rgb(${color.join(", ")})`);
        });
        if (progress < 1) frame = requestAnimationFrame(update);
        else finish();
      };
      frame = requestAnimationFrame(update);
    }, { threshold: 0.5 });
    observer.observe(element);

    const onPreferenceChange = () => {
      if (!preference.matches) return;
      observer.disconnect();
      finish();
    };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", onPreferenceChange);
      finish();
    };
  }, []);

  return (
    <div ref={root} className="industry-stat-visual industry-stat-visual--illustration industry-growth-plot"
      data-motion="complete" aria-hidden="true">
      <svg viewBox="0 0 2000 1161" fill="none" role="presentation">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <rect className="industry-growth-plot__reveal" x={LINE_START} y="0"
              width={LINE_END - LINE_START} height="1161" />
          </clipPath>
        </defs>
        <rect width="2000" height="1161" fill="white" />
        <path d="M300 976H1701" stroke={CREAM} strokeWidth="25" strokeLinecap="round" />
        <path d="M301 976L301 294" stroke={CREAM} strokeWidth="25" strokeLinecap="round" />
        {bars.map((bar) => (
          <rect key={bar.x} className="industry-growth-plot__bar" {...bar} width="131" rx="28" fill={BLUE} />
        ))}
        {/* Original outlined lettering, kept outside the animation. */}
        <image href={`/asset/${type === "tech" ? "tech-spending" : "ai-market"}-labels.svg`}
          width="2000" height="1161" />
        <g className="industry-growth-plot__line" clipPath={`url(#${clipId})`}>
          {/* Original filled arrow, aligned to the completed chart's 20px offset.
              A horizontal clip preserves its contour and reveals it left to right. */}
          <path transform="translate(0 -20)" fill={BLUE}
            d="M1631.8 284.107C1632.69 280.629 1630.59 277.089 1627.11 276.202L1570.42 261.739C1566.94 260.852 1563.41 262.952 1562.52 266.431C1561.63 269.909 1563.73 273.448 1567.21 274.336L1617.59 287.191L1604.74 337.577C1603.85 341.056 1605.95 344.595 1609.43 345.482C1612.91 346.37 1616.45 344.269 1617.34 340.791L1631.8 284.107ZM427 721L428.226 727.383C655.08 683.815 1212.7 535.032 1628.82 288.09L1625.5 282.5L1622.18 276.91C1207.9 522.768 651.92 671.185 425.774 714.617L427 721Z" />
        </g>
      </svg>
    </div>
  );
}
