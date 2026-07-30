"use client";

import { useLayoutEffect, useRef, useState } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const steps = [
  {
    number: "01",
    short: "Discover",
    title: "Audit the whole picture",
    copy: "We start with the market, your buyers, the commercial goal, and the work already in motion. That gives us one honest view of what is helping growth and what is holding it back.",
  },
  {
    number: "02",
    short: "Align",
    title: "Set the position and plan",
    copy: "We turn the strongest opportunity into a clear position, practical priorities, and one joined-up marketing plan. Every channel gets a role and every decision ladders back to the same goal.",
  },
  {
    number: "03",
    short: "Activate",
    title: "Build and launch together",
    copy: "Strategy moves straight into delivery. Content, paid media, search, social, and sales support are built as one system, with Regen working as a close extension of your team.",
  },
  {
    number: "04",
    short: "Compound",
    title: "Learn, improve, and scale",
    copy: "We track the signals that matter, turn performance into sharper decisions, and keep improving the system. Each cycle should make the next one faster, clearer, and more valuable.",
  },
];

export default function HowWeWorkPage() {
  const stage = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      if (!stage.current) return;

      const bounds = stage.current.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const nextStep = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length)
      );

      stage.current.style.setProperty("--how-work-progress", progress.toFixed(4));
      stage.current.style.setProperty("--active-step", nextStep);
      setActiveStep((current) => (current === nextStep ? current : nextStep));
    }

    function scheduleUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <main className="how-work-page">
      <SiteHeader animated />

      <section
        aria-label="How Regen works"
        className="how-work-stage"
        ref={stage}
      >
        <div className="how-work-stage__sticky">
          <div className="how-work-stage__intro">
            <p>How we work</p>
            <h1>One connected system, built to keep moving.</h1>
          </div>

          <div className="how-work-stage__content">
            <div className="how-work-stage__steps">
              <div className="how-work-stage__step-track">
                {steps.map((step, index) => (
                  <article
                    aria-current={activeStep === index ? "step" : undefined}
                    className={
                      activeStep === index
                        ? "how-work-step is-active"
                        : "how-work-step"
                    }
                    key={step.number}
                  >
                    <span>{step.number}</span>
                    <h2>{step.title}</h2>
                    <p>{step.copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="how-work-orbit" aria-hidden="true">
              <div className="how-work-orbit__ring how-work-orbit__ring--one" />
              <div className="how-work-orbit__ring how-work-orbit__ring--two" />
              <div className="how-work-orbit__ring how-work-orbit__ring--three" />

              {steps.map((step, index) => (
                <span
                  className={`how-work-orbit__node how-work-orbit__node--${index + 1}${
                    activeStep === index ? " is-active" : ""
                  }`}
                  key={step.number}
                >
                  <i>{step.number}</i>
                  {step.short}
                </span>
              ))}

              <div className="how-work-orbit__centre" key={activeStep}>
                <span>{steps[activeStep].number}</span>
                <strong>{steps[activeStep].short}</strong>
              </div>
            </div>
          </div>

          <div className="how-work-stage__progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      <section className="how-work-outro">
        <p>Ready to build the system?</p>
        <a href="/contact">
          Start a project
          <span className="cta-arrow" aria-hidden="true" />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
