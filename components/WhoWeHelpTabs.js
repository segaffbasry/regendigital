"use client";

import { useState } from "react";

const audiences = [
  {
    label: "Founders",
    title: "Marketing built to match what you have made.",
    copy: "You have built something that works. We clarify your value so the market understands exactly what you do, then build the complete marketing system that drives brand recognition and bottom-line revenue.",
  },
  {
    label: "Commercial Leaders",
    title: "A strategy-led team that plugs straight in.",
    copy: "For VPs of Marketing, Heads of Marketing, CMOs, and revenue leads who want a capable extension of their team. We manage the full lifecycle and connect early signals directly to qualified lead generation, pipeline creation, and revenue.",
  },
  {
    label: "Scale-ups",
    title: "Keep pace without losing focus.",
    copy: "Growing fast calls for marketing that moves just as quickly. We build the strategy and channels that scale demand while keeping the proposition clear and the team focused.",
  },
  {
    label: "New Markets",
    title: "Enter a new market with intent.",
    copy: "We build the market-entry strategy and go-to-market plan, then run the launch that lands, learns, and creates momentum in the right places.",
  },
  {
    label: "Series A & B",
    title: "Turn investment into visible growth.",
    copy: "Post-raise and under pressure to show progress, you need marketing that supports the next round. We turn investment into pipeline with a strategy that compounds.",
  },
  {
    label: "Pre-investment",
    title: "Build the foundation that proves traction.",
    copy: "For self-funding teams preparing for the next step, we build a credible marketing foundation whether you raise later or grow on your own terms.",
  },
  {
    label: "Investors",
    title: "One marketing partner across the portfolio.",
    copy: "Bring a single strategic partner across the whole portfolio, with a flexible system that respects what makes each business distinct.",
  },
];

export default function WhoWeHelpTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audiences[activeIndex];

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
            <p className="home-kicker">Built for ambitious B2B teams</p>
            <h2 id="who-we-help-title">Who we help</h2>
            <p>
              We work with SaaS, AI, tech, and professional services businesses
              driving growth.
            </p>
          </div>
          <div
            className="who-tabs__list"
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
        </div>

        <div
          aria-labelledby={`who-tab-${activeIndex}`}
          className="who-tabs__panel"
          id="who-tabs-panel"
          key={active.label}
          role="tabpanel"
        >
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
