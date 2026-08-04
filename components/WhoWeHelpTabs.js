"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const audiences = [
  {
    label: "Founders",
    icon: "human-resources-businessman",
    title: "Marketing built to match what you have made.",
    copy: "You have built something that works. We clarify your value so the market understands exactly what you do, then build the complete marketing system that drives brand recognition and bottom-line revenue.",
  },
  {
    label: "Commercial Leaders",
    icon: "business-management-team-up",
    title: "A strategy-led team that plugs straight in.",
    copy: "For VPs of Marketing, Heads of Marketing, CMOs, and revenue leads who want a capable extension of their team. We manage the full lifecycle and connect early signals directly to qualified lead generation, pipeline creation, and revenue.",
  },
  {
    label: "Scale-ups",
    icon: "strategy-business-success-peak",
    title: "Keep pace without losing focus.",
    copy: "Growing fast calls for marketing that moves just as quickly. We build the strategy and channels that scale demand while keeping the proposition clear and the team focused.",
  },
  {
    label: "New Markets",
    icon: "worldwide-web-location-pin",
    title: "Enter a new market with intent.",
    copy: "We build the market-entry strategy and go-to-market plan, then run the launch that lands, learns, and creates momentum in the right places.",
  },
  {
    label: "Series A & B",
    icon: "analytics-graph-stock",
    title: "Turn investment into visible growth.",
    copy: "Post-raise and under pressure to show progress, you need marketing that supports the next round. We turn investment into pipeline with a strategy that compounds.",
  },
  {
    label: "Pre-investment",
    icon: "business-cash-idea",
    title: "Build the foundation that proves traction.",
    copy: "For self-funding teams preparing for the next step, we build a credible marketing foundation whether you raise later or grow on your own terms.",
  },
  {
    label: "Investors",
    icon: "business-deal-men-cash-conversation",
    title: "One marketing partner across the portfolio.",
    copy: "Bring a single strategic partner across the whole portfolio, with a flexible system that respects what makes each business distinct.",
  },
];

export default function WhoWeHelpTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audiences[activeIndex];
  const list = useRef(null);
  /* The strip scrolls sideways on narrow screens. These flags drive the edge
     fades so it is obvious there are more audiences either side. */
  const [edges, setEdges] = useState({ start: false, end: false });

  const measureEdges = useCallback(() => {
    const element = list.current;
    if (!element) return;

    const max = element.scrollWidth - element.clientWidth;
    setEdges({
      start: element.scrollLeft > 4,
      end: max > 4 && element.scrollLeft < max - 4,
    });
  }, []);

  useEffect(() => {
    const element = list.current;
    if (!element) return undefined;

    measureEdges();
    element.addEventListener("scroll", measureEdges, { passive: true });
    window.addEventListener("resize", measureEdges);

    return () => {
      element.removeEventListener("scroll", measureEdges);
      window.removeEventListener("resize", measureEdges);
    };
  }, [measureEdges]);

  /* Keep the selected tab in view when it is picked from a clipped strip. */
  useEffect(() => {
    const element = list.current;
    const tab = element?.querySelector(`#who-tab-${activeIndex}`);
    if (!element || !tab) return;

    const offset = tab.offsetLeft - element.clientWidth / 2 + tab.offsetWidth / 2;
    element.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [activeIndex]);

  return (
    <section
      className="home-section audience-section"
      id="who-we-help"
      aria-labelledby="who-we-help-title"
    >
      <div className="who-tabs">
        <div className="who-tabs__hero">
          <span className="who-tabs__atmosphere" aria-hidden="true" />
          <div className="who-tabs__intro">
            <h2 id="who-we-help-title">Who we help</h2>
            <p>
              We work with SaaS, AI, tech, and professional services businesses
              driving growth.
            </p>
          </div>
          <div
            className={`who-tabs__rail${edges.start ? " is-scrolled" : ""}${
              edges.end ? " has-more" : ""
            }`}
          >
            <div
              className="who-tabs__list"
              ref={list}
              role="tablist"
              aria-label="Who Regen helps"
              style={{ "--active-index": activeIndex }}
            >
              <span className="who-tabs__highlight" aria-hidden="true" />
              {audiences.map((audience, index) => (
                <button
                  aria-controls="who-tabs-panel"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? "is-active" : ""}
                  id={`who-tab-${index}`}
                  key={audience.label}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  type="button"
                >
                  {audience.label}
                </button>
              ))}
            </div>
            <span className="who-tabs__more" aria-hidden="true">
              <span className="cta-arrow" />
            </span>
          </div>
        </div>

        <div
          aria-labelledby={`who-tab-${activeIndex}`}
          className="who-tabs__panel"
          id="who-tabs-panel"
          key={active.label}
          role="tabpanel"
        >
          <div className="who-tabs__heading">
            <img
              alt=""
              aria-hidden="true"
              className="who-tabs__icon"
              height="64"
              src={`https://api.iconify.design/streamline-freehand:${active.icon}.svg?color=%230028fa`}
              width="64"
            />
            <h3 aria-label={active.title}>
              <span aria-hidden="true">
                {active.title.split(" ").map((word, index) => (
                  <span
                    className="who-tabs__title-word"
                    key={`${active.label}-${word}-${index}`}
                    style={{ "--word-index": index }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h3>
          </div>
          <div className="who-tabs__detail">
            <p>{active.copy}</p>
            <div className="who-tabs__proof">
              <strong>Stat placeholder</strong>
              <strong>Stat placeholder</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
