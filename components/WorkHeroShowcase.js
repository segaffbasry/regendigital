"use client";

import { useState } from "react";

export default function WorkHeroShowcase({ cases }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = cases[activeIndex];

  return (
    <section className="work-hero" aria-labelledby="work-hero-title">
      <h1 className="work-hero__title" id="work-hero-title">Selected work</h1>

      <div className="work-hero__projects" role="tablist" aria-label="Case studies">
        {cases.map((item, index) => (
          <button
            aria-controls="work-hero-panel"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? "is-active" : ""}
            id={`work-project-${index}`}
            key={item.name}
            onClick={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onPointerEnter={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`work-project-${activeIndex}`}
        className="work-hero__panel"
        id="work-hero-panel"
        role="tabpanel"
      >
        <a className="work-hero__case-link" href={activeCase.href} key={activeCase.name}>
          <div className="work-hero__media" aria-hidden="true">
            {activeCase.media.map((image, index) => (
              <figure className={`work-hero__card work-hero__card--${index + 1}`} key={`${activeCase.name}-${image}`}>
                <img src={image} alt="" />
              </figure>
            ))}
          </div>

          <div className="work-hero__result">
            <p>{activeCase.heroResult}</p>
            <div>
              <span>{activeCase.proof}</span>
              <span>{activeCase.sector}</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
