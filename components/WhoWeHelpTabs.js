"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "../app/who-we-help.css";

const audiences = [
  {
    label: "Founders",
    title: "Marketing built to match what you have made.",
    copy: "You have built something that works. We clarify your value so the market understands exactly what you do, then build the complete marketing system that drives brand recognition and bottom-line revenue.",
    outcomes: ["Sharper positioning", "A complete growth system"],
    stat: {
      line: "35% of startups fail because there was no market need.",
      body: "Founders rarely fail on the product, they fail because the market never understood why to choose them.",
      source: "CB Insights",
    },
  },
  {
    label: "Commercial Leaders",
    title: "A strategy-led team that plugs straight in.",
    copy: "For VPs of Marketing, Heads of Marketing, CMOs, and revenue leads who want a capable extension of their team. We manage the full lifecycle and connect early signals directly to qualified lead generation, pipeline creation, and revenue.",
    outcomes: ["Senior strategy on demand", "Channels that work together"],
    stat: {
      line: "CMO tenure is now 4.3 years, the shortest in the C-suite.",
      body: "Marketing leaders hit their targets and still lose the board’s confidence, the gap is proving value, not performance.",
      source: "Spencer Stuart / Gartner",
    },
  },
  {
    label: "Scale-ups",
    title: "Keep pace without losing focus.",
    copy: "Growing fast calls for marketing that moves just as quickly. We build the strategy and channels that scale demand while keeping the proposition clear and the team focused.",
    outcomes: ["Demand without drift", "A proposition that stays clear"],
    stat: {
      line: "Only 1 in 10 companies recover from a growth stall.",
      body: "Once growth stalls it rarely restarts on its own, which is exactly when strategy-led marketing earns its keep.",
      source: "CEB / HBR",
    },
  },
  {
    label: "New Markets",
    title: "Enter a new market with intent.",
    copy: "We build the market-entry strategy and go-to-market plan, then run the launch that lands, learns, and creates momentum in the right places.",
    outcomes: ["A focused market-entry plan", "A launch built to learn"],
    stat: {
      line: "Over 85% of new product launches fail.",
      body: "Even funded companies miss more launches than they land, and weak positioning is the biggest reason.",
      source: "Nielsen",
    },
  },
  {
    label: "Series A & B",
    title: "Turn investment into visible growth.",
    copy: "Post-raise and under pressure to show progress, you need marketing that supports the next round. We turn investment into pipeline with a strategy that compounds.",
    outcomes: ["Pipeline that compounds", "Progress investors can see"],
    stat: {
      line: "Around 40% of Series A startups never raise a Series B.",
      body: "Raising buys you a deadline, not a future, the ones who raise again turned funding into visible growth.",
      source: "Carta, 2025",
    },
  },
  {
    label: "Pre-investment",
    title: "Build the foundation that proves traction.",
    copy: "For self-funding teams preparing for the next step, we build a credible marketing foundation whether you raise later or grow on your own terms.",
    outcomes: ["Credibility before the raise", "Traction you can build on"],
    stat: {
      line: "73% of small businesses lack confidence in their marketing.",
      body: "Self-funding founders don’t lack ambition, they lack a repeatable way to win customers.",
      source: "Constant Contact, 2024",
    },
  },
  {
    label: "Investors",
    title: "One marketing partner across the portfolio.",
    copy: "Bring a single strategic partner across the whole portfolio, with a flexible system that respects what makes each business distinct.",
    outcomes: ["One strategic partner", "A flexible portfolio system"],
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

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % audiences.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + audiences.length) % audiences.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = audiences.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    window.requestAnimationFrame(() => {
      list.current?.querySelector(`#who-tab-${nextIndex}`)?.focus();
    });
  };

  return (
    <section
      className="home-section audience-section audience-section--home"
      id="who-we-help"
      aria-labelledby="who-we-help-title"
    >
      <div className="who-tabs">
        <div className="who-tabs__hero">
          <span className="who-tabs__atmosphere" aria-hidden="true" />
          <div className="who-tabs__intro">
            <h2 id="who-we-help-title">Who we help</h2>
            <p>
              We work with the SaaS, AI, tech, and professional services businesses driving growth. Whether you&apos;re scaling an AI company, building authority in professional services like legal or construction, or competing in fast-moving tech, we combine a strategic foundation with content, paid, and search into one system that adapts as your industry does and turns pipeline into predictable revenue.
            </p>
          </div>
          <div className="who-tabs__dock">
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
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    role="tab"
                    tabIndex={index === activeIndex ? 0 : -1}
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

            {/* Every audience is rendered and the inactive ones are hidden
                rather than removed, so the box is always as tall as the
                wordiest tab and never resizes as you move between them. */}
            <div className="who-tabs__panels">
              {audiences.map((audience, index) => (
                <div
                  aria-hidden={index === activeIndex ? undefined : "true"}
                  aria-labelledby={`who-tab-${index}`}
                  className={`who-tabs__panel${
                    index === activeIndex ? " is-active" : ""
                  }`}
                  id={index === activeIndex ? "who-tabs-panel" : undefined}
                  key={audience.label}
                  role="tabpanel"
                >
                  <div className="who-tabs__heading">
                    <h3>{audience.title}</h3>
                  </div>
                  <div className="who-tabs__detail">
                    <p>{audience.copy}</p>
                    {audience.stat ? (
                      <figure className="who-tabs__stat">
                        <p className="who-tabs__stat-line">{audience.stat.line}</p>
                        <p className="who-tabs__stat-body">{audience.stat.body}</p>
                        <figcaption className="who-tabs__stat-source">
                          {audience.stat.source}
                        </figcaption>
                      </figure>
                    ) : (
                      <div className="who-tabs__proof" aria-label="What this gives you">
                        {audience.outcomes.map((outcome) => (
                          <strong key={outcome}>{outcome}</strong>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
