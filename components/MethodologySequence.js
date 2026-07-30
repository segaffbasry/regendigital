"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Audit",
    copy: "We analyse your current marketing landscape, uncover the gaps, and set your strategy and positioning before a single campaign goes live.",
  },
  {
    number: "02",
    title: "Test",
    copy: "We roll out targeted organic content to validate your positioning, sharpen the message, and gather the signals needed to move forward.",
  },
  {
    number: "03",
    title: "Amplify",
    copy: "We use proven learnings to layer in paid media and broader tactics, scaling the system toward qualified pipeline and revenue.",
  },
];

function MethodologyLink() {
  return (
    <a className="home-link cta-motion" href="/audit">
      <span className="cta-motion__fill" aria-hidden="true" />
      <span className="cta-motion__clip">
        <span className="cta-motion__roll">
          <span>Free Audit</span>
          <span aria-hidden="true">Free Audit</span>
        </span>
      </span>
      <span className="cta-arrow" aria-hidden="true" />
    </a>
  );
}

export default function MethodologySequence() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const visual = visualRef.current;
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: ({ progress }) => {
            section.style.setProperty("--method-progress", progress);
            const nextStep = Math.min(2, Math.floor(progress * 3));
            setActiveStep((current) => (current === nextStep ? current : nextStep));

            stepRefs.current.forEach((step, index) => {
              if (!step) return;
              const stepProgress = Math.max(
                0,
                Math.min(1, progress * steps.length - index)
              );
              step.style.setProperty("--step-progress", stepProgress);
            });

            if (visual) {
              gsap.set(visual, {
                y: (1 - progress) * 14,
                scale: 0.96 + progress * 0.04,
              });
            }
          },
        });

        return () => {
          trigger.kill();
          section.style.removeProperty("--method-progress");
          stepRefs.current.forEach((step) =>
            step?.style.removeProperty("--step-progress")
          );
          gsap.set(visual, { clearProps: "transform" });
        };
      }
    );

    return () => media.revert();
  }, []);

  const jumpToStep = (index) => {
    const section = sectionRef.current;
    if (!section || window.innerWidth < 901) return;

    const start = section.offsetTop;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: start + distance * ((index + 0.08) / 3),
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="methodology-scroll"
      id="methodology"
      style={{ "--method-progress": 0 }}
    >
      <div className="methodology-scroll__sticky">
        <div className="methodology-scroll__copy">
          <header className="methodology-scroll__header">
            <h2>How we work</h2>
            <p>One connected methodology that turns a clear strategy into a marketing system built to learn and scale.</p>
          </header>

          <div className="methodology-scroll__steps">
            {steps.map((step, index) => (
              <button
                type="button"
                key={step.title}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                className={`methodology-scroll__step${activeStep === index ? " is-active" : ""}`}
                style={{ "--step-progress": 0 }}
                onClick={() => jumpToStep(index)}
                aria-current={activeStep === index ? "step" : undefined}
              >
                <span
                  className="methodology-scroll__step-progress"
                  aria-hidden="true"
                />
                <span>{step.number}</span>
                <span className="methodology-scroll__step-copy">
                  <strong>{step.title}</strong>
                  <span>{step.copy}</span>
                </span>
              </button>
            ))}
          </div>

          <MethodologyLink />
        </div>

        <div className={`methodology-visual methodology-visual--${activeStep + 1}`} aria-hidden="true">
          <div ref={visualRef} className="methodology-foundations">
            {[...steps].reverse().map((step, reverseIndex) => {
              const index = steps.length - reverseIndex - 1;
              return (
                <div
                  className={`methodology-foundation methodology-foundation--${index + 1}${index <= activeStep ? " is-built" : ""}`}
                  key={step.title}
                >
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <i />
                </div>
              );
            })}
            <span className="methodology-foundations__caption">
              One connected system, built in sequence.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
