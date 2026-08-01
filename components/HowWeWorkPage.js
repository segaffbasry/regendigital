"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaqItem from "./FaqItem";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

gsap.registerPlugin(SplitText, ScrollTrigger);

const steps = [
  {
    number: "01",
    short: "Audit",
    title: "Strategy first, always",
    copy: "We research your market, audit the marketing already in motion, and set the positioning before a single campaign goes live. The work starts with one honest commercial view, not a channel wish list.",
  },
  {
    number: "02",
    short: "Test",
    title: "Embed, build, and learn",
    copy: "We work as an extension of your team, building the connected system across the channels that fit. Early activity validates the positioning, sharpens the message, and gives us useful signals fast.",
  },
  {
    number: "03",
    short: "Amplify",
    title: "Scale what proves itself",
    copy: "We report on pipeline, revenue, and commercial outcomes, then use what the data proves to improve the system. Paid media and broader tactics amplify what works as the business evolves.",
  },
];

const faqs = [
  ["How is Regen structured around a client?", "You get a strategy-led team that embeds like an in-house function, not a single account manager to chase."],
  ["How long until we see results?", "Strategy and positioning move early, while compounding channels like SEO, GEO, and organic social build over a few months."],
  ["What are your contract terms?", "We work on retained partnerships scaled to the work, and we are straight about the right level on the first call."],
  ["What is in and out of scope?", "We lead with strategy and run the connected system. We turn down purely creative or single-channel briefs."],
  ["How do you report?", "On pipeline, revenue, and commercial outcomes, on a regular cadence."],
];

export default function HowWeWorkPage() {
  const page = useRef(null);
  const stage = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.current?.style.setProperty("--how-work-progress", "0");
      stage.current?.style.setProperty("--active-step", "0");
      return;
    }

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

  useLayoutEffect(() => {
    if (!page.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroTitle = page.current.querySelector(".how-work-stage__intro h1");
    const heroKicker = page.current.querySelector(".how-work-stage__intro > p");
    const heroLede = page.current.querySelector(".how-work-stage__intro > span");
    const heroVisuals = [
      page.current.querySelector(".how-work-stage__steps"),
      page.current.querySelector(".how-work-orbit"),
    ].filter(Boolean);
    if (!heroTitle) return;

    let heroSplit;
    let cancelled = false;
    const showHero = () => {
      gsap.set(heroTitle, { visibility: "visible" });
      gsap.set([heroKicker, heroLede, ...heroVisuals].filter(Boolean), {
        autoAlpha: 1,
        y: 0,
      });
    };

    gsap.set(heroTitle, { visibility: "hidden" });
    gsap.set([heroKicker, heroLede].filter(Boolean), { autoAlpha: 0, y: 18 });
    gsap.set(heroVisuals, { autoAlpha: 0 });

    const context = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled) return;

        try {
          context.add(() => {
            heroSplit = new SplitText(heroTitle, {
              type: "lines",
              linesClass: "section-reveal__line",
              mask: "lines",
              aria: "auto",
            });
            gsap.set(heroTitle, { visibility: "visible" });
            gsap.set(heroSplit.lines, { yPercent: 112, rotate: 1 });

            gsap.timeline({ defaults: { ease: "power4.out" } })
              .to(heroSplit.lines, { yPercent: 0, rotate: 0, duration: 1.08, stagger: .1 }, .08)
              .to(heroKicker, { autoAlpha: 1, y: 0, duration: .68, ease: "power3.out" }, .14)
              .to(heroLede, { autoAlpha: 1, y: 0, duration: .78, ease: "power3.out" }, .32)
              .to(heroVisuals, { autoAlpha: 1, duration: .82, stagger: .08, ease: "power2.out" }, .38);
          });
        } catch {
          showHero();
        }
      }, showHero);

      gsap.utils.toArray("[data-how-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 38,
          duration: .9,
          ease: "power4.out",
          scrollTrigger: { trigger: element, start: "top 87%", once: true },
        });
      });

      gsap.utils.toArray(".how-work-principle").forEach((card, index) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 48,
          rotate: index === 1 ? 1.5 : -1.5,
          duration: .9,
          delay: index * .08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });
    }, page);

    return () => {
      cancelled = true;
      heroSplit?.revert();
      context.revert();
      gsap.set(heroTitle, { clearProps: "visibility" });
      gsap.set([heroKicker, heroLede, ...heroVisuals].filter(Boolean), {
        clearProps: "opacity,visibility,transform",
      });
    };
  }, []);

  return (
    <main className="how-work-page" ref={page}>
      <SiteHeader animated />

      <section
        aria-label="How Regen works"
        className="how-work-stage"
        ref={stage}
      >
        <div className="how-work-stage__sticky">
          <div className="how-work-stage__intro">
            <p>How we work</p>
            <h1>What a real partnership looks like.</h1>
            <span>Long-term, strategy-led, and built around the commercial outcome.</span>
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

      <section className="how-work-partnership">
        <header data-how-reveal>
          <p>How the engagement runs</p>
          <h2>An extension of your team.<br /><em>Not another agency to chase.</em></h2>
        </header>
        <div className="how-work-principles">
          <article className="how-work-principle">
            <span>01</span>
            <h3>Strategy-led</h3>
            <p>Every engagement starts with Audit, Test, Amplify. The channels follow the strategy, never the other way around.</p>
          </article>
          <article className="how-work-principle how-work-principle--blue">
            <span>02</span>
            <h3>Properly embedded</h3>
            <p>We come on the journey, advise, build, and keep optimising like an in-house team and an extension of yours.</p>
          </article>
          <article className="how-work-principle">
            <span>03</span>
            <h3>Commercially accountable</h3>
            <p>Reporting stays focused on pipeline, revenue, and the outcomes that move the business—not activity for activity&apos;s sake.</p>
          </article>
        </div>
      </section>

      <section className="how-work-fit">
        <article className="how-work-fit__yes" data-how-reveal>
          <p>Who this is for</p>
          <h2>Founders and commercial leaders serious about growth.</h2>
          <span>B2B teams in technical or high-consideration categories, ready to lead with strategy and build for the long term.</span>
        </article>
        <article className="how-work-fit__no" data-how-reveal>
          <p>Who this is not for</p>
          <h2>A spare pair of hands for one channel.</h2>
          <span>We turn down purely creative and single-channel briefs. Taking them dilutes what makes us worth choosing, and we will tell you that straight.</span>
        </article>
      </section>

      <section className="how-work-investment">
        <div data-how-reveal>
          <p>Investment</p>
          <h2>Retained partnerships, scaled to the work.</h2>
        </div>
        <p data-how-reveal>There is no generic package or inflated proposal. We are direct about the right level for your business on the first call, including when that means we are not the right fit.</p>
      </section>

      <section className="how-work-faq">
        <header data-how-reveal>
          <p>Before we start</p>
          <h2>Questions,<br /><em>answered.</em></h2>
        </header>
        <div className="how-work-faq__items">
          {faqs.map(([question, answer]) => (
            <FaqItem question={question} answer={answer} key={question} />
          ))}
        </div>
      </section>

      <section className="how-work-outro">
        <div>
          <div className="how-work-outro__faces" aria-label="Holly and Taylor, Regen co-founders">
            <img src="/images/founders/holly.webp" alt="Holly, Regen co-founder" />
            <img src="/images/founders/taylor-portrait.webp" alt="Taylor, Regen co-founder" />
          </div>
          <p>Ready to build the right system for your business?</p>
        </div>
        <a href="/contact">
          Book a strategy call
          <span className="cta-arrow" aria-hidden="true" />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
