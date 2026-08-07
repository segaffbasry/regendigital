"use client";

import { useEffect, useId, useRef } from "react";

const chartPath = "M0,166.51 C1.64,164.74 6.56,157.53 9.84,155.87 C13.12,154.22 16.39,154.65 19.67,156.58 C22.95,158.52 26.23,167.53 29.51,167.48 C32.79,167.43 36.06,157.06 39.34,156.3 C42.62,155.54 45.9,164.51 49.18,162.92 C52.46,161.33 55.74,147.26 59.02,146.78 C62.3,146.3 65.57,158.3 68.85,160.05 C72.13,161.8 75.41,158.45 78.69,157.27 C81.97,156.09 85.24,153.8 88.52,152.98 C91.8,152.16 95.08,153.06 98.36,152.35 C101.64,151.64 104.92,150.69 108.2,148.75 C111.48,146.81 114.75,141.49 118.03,140.72 C121.31,139.95 124.59,144.4 127.87,144.15 C131.15,143.9 134.42,140.83 137.7,139.23 C140.98,137.63 144.26,134.5 147.54,134.52 C150.82,134.54 154.1,138.61 157.38,139.37 C160.66,140.13 163.93,140.59 167.21,139.1 C170.49,137.61 173.77,131.1 177.05,130.42 C180.33,129.74 183.61,133.98 186.89,135 C190.17,136.02 193.44,135.8 196.72,136.54 C200,137.28 203.28,139.1 206.56,139.44 C209.84,139.78 213.11,139.17 216.39,138.6 C219.67,138.03 222.95,136.56 226.23,136 C229.51,135.44 232.79,135.36 236.07,135.26 C239.35,135.16 242.62,135.9 245.9,135.4 C249.18,134.9 252.46,132.95 255.74,132.27 C259.02,131.59 262.29,131.36 265.57,131.31 C268.85,131.26 272.13,131.73 275.41,131.98 C278.69,132.23 281.97,132.59 285.25,132.81 C288.53,133.03 291.8,133.45 295.08,133.32 C298.36,133.19 301.64,132.31 304.92,132.02 C308.2,131.74 311.47,131.5 314.75,131.61 C318.03,131.72 321.31,132.71 324.59,132.67 C327.87,132.63 331.15,131.91 334.43,131.35 C337.71,130.79 340.98,130.34 344.26,129.33 C347.54,128.32 350.82,126.01 354.1,125.29 C357.38,124.57 360.65,125.87 363.93,125.02 C367.21,124.17 370.49,121.58 373.77,120.19 C377.05,118.8 380.33,117.53 383.61,116.7 C386.89,115.87 390.16,116.34 393.44,115.18 C396.72,114.02 400,111.58 403.28,109.74 C406.56,107.9 409.83,104.76 413.11,104.16 C416.39,103.56 419.67,106.85 422.95,106.13 C426.23,105.41 429.51,101.66 432.79,99.85 C436.07,98.04 439.34,96.11 442.62,95.29 C445.9,94.47 449.18,96.57 452.46,94.94 C455.74,93.31 459.02,87.22 462.3,85.5 C465.58,83.78 468.85,84.17 472.13,84.64 C475.41,85.11 478.69,87.97 481.97,88.34 C485.25,88.71 488.52,88.67 491.8,86.86 C495.08,85.05 498.36,80.73 501.64,77.45 C504.92,74.17 508.2,67.84 511.48,67.21 C514.76,66.58 518.03,74.74 521.31,73.69 C524.59,72.64 527.87,63.89 531.15,60.92 C534.43,57.95 537.7,57.54 540.98,55.86 C544.26,54.18 547.54,50.71 550.82,50.85 C554.1,50.99 557.38,58.26 560.66,56.68 C563.94,55.1 567.21,42.88 570.49,41.39 C573.77,39.9 577.05,48.18 580.33,47.76 C583.61,47.34 586.88,41.1 590.16,38.86 C593.44,36.62 598.36,35.09 600,34.34";

function GrowthArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

export default function SeoHeroGraphic() {
  const root = useRef(null);
  const gradientId = `seo-result-fill-${useId().replaceAll(":", "")}`;

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const figures = Array.from(element.querySelectorAll("[data-count]"));
    const format = (figure, value) => `${value.toLocaleString("en-GB")}${figure.dataset.suffix || ""}`;
    let animationFrame;
    let observer;
    let done = false;

    element.classList.add("seo-result-graphic--armed");
    figures.forEach((figure) => { figure.textContent = format(figure, 0); });

    const run = () => {
      if (done) return;
      done = true;
      element.classList.add("is-in");
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - ((1 - progress) ** 3);
        figures.forEach((figure) => {
          figure.textContent = format(figure, Math.round(Number(figure.dataset.count) * eased));
        });
        if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const bounds = element.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
      animationFrame = window.requestAnimationFrame(run);
    } else if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      }, { threshold: 0.35 });
      observer.observe(element);
    } else {
      run();
    }

    return () => {
      observer?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      figures.forEach((figure) => {
        figure.textContent = format(figure, Number(figure.dataset.count));
      });
      element.classList.remove("seo-result-graphic--armed", "is-in");
    };
  }, []);

  return (
    <div className="seo-result-graphic" ref={root} aria-label="Example organic search performance growth">
      <div className="seo-result-graphic__stack">
        <div className="seo-result-graphic__chart-card">
          <div className="seo-result-graphic__chart">
            <svg viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#062efa" stopOpacity=".14" />
                  <stop offset="100%" stopColor="#062efa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="seo-result-graphic__grid">
                {[30, 70, 110, 150, 189].map((y) => <line x1="0" y1={y} x2="600" y2={y} key={y} />)}
              </g>
              <path className="seo-result-graphic__area" fill={`url(#${gradientId})`} d={`${chartPath} L600,190 L0,190 Z`} />
              <path className="seo-result-graphic__line" pathLength="1" d={chartPath} />
            </svg>
          </div>
        </div>

        <div className="seo-result-graphic__metrics">
          <div className="seo-result-graphic__metric seo-result-graphic__metric--leads">
            <span className="seo-result-graphic__metric-inner">
              <span className="seo-result-graphic__big" data-count="68">68</span>
              <span className="seo-result-graphic__label"><span className="seo-result-graphic__dot" />organic inbound leads</span>
              <span className="seo-result-graphic__sub">in 6 months</span>
            </span>
          </div>

          <div className="seo-result-graphic__metric seo-result-graphic__metric--clicks">
            <span className="seo-result-graphic__metric-inner">
              <span className="seo-result-graphic__big"><span data-count="180" data-suffix="%">180%</span><GrowthArrow /></span>
              <span className="seo-result-graphic__label">organic clicks</span>
            </span>
          </div>

          <div className="seo-result-graphic__metric seo-result-graphic__metric--rating">
            <span className="seo-result-graphic__metric-inner">
              <span className="seo-result-graphic__small-label">Domain Rating</span>
              <span className="seo-result-graphic__small-row"><span className="seo-result-graphic__figure" data-count="41">41</span><span className="seo-result-graphic__delta"><GrowthArrow />12</span></span>
            </span>
          </div>

          <div className="seo-result-graphic__metric seo-result-graphic__metric--rankings">
            <span className="seo-result-graphic__metric-inner">
              <span className="seo-result-graphic__small-label">Top 3 Rankings</span>
              <span className="seo-result-graphic__small-row"><span className="seo-result-graphic__figure" data-count="54">54</span><span className="seo-result-graphic__delta"><GrowthArrow />31</span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
