"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import HomeClosingSections from "./HomeClosingSections";
import HomeSectionMotion from "./HomeSectionMotion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import StaggerText from "./StaggerText";
import TiltMedia from "./TiltMedia";

const founders = [
  {
    number: "01",
    name: "Holly",
    title: "Co-Founder",
    focus: "Creative direction & campaign execution",
    image: "/images/founders/holly.webp",
    bio: "Holly’s background spans sales, account-based marketing, and brand partnerships, giving her a sharp understanding of what actually drives buying decisions, not just engagement rates. She leads on creative direction and campaign execution at Regen, bringing the kind of creative precision and commercial instinct to content and campaigns that turns work into results. Holly is the reason clients say working with Regen feels like having an in-house team.",
  },
  {
    number: "02",
    name: "Taylor",
    title: "Co-Founder",
    focus: "Strategy & client partnerships",
    image: "/images/founders/taylor-portrait.webp",
    bio: "Taylor’s career spans luxury brand marketing, social media strategy, and business growth, giving her a rare combination of creative instinct and commercial rigour. She leads on strategy and client partnerships at Regen, bringing the kind of analytical depth to content and campaigns that most agencies reserve for their biggest budgets. If there’s a smarter way to position your brand or reach your audience, Taylor will find it.",
  },
];

function FounderPortrait({ founder }) {
  return (
    <TiltMedia
      className="about-founder-profile__portrait"
      stageClassName="about-founder-profile__portrait-stage"
    >
      <Image
        alt={`${founder.name}, Regen co-founder`}
        fill
        priority={founder.number === "01"}
        sizes="(max-width: 700px) 78vw, (max-width: 1000px) 42vw, 30vw"
        src={founder.image}
      />
    </TiltMedia>
  );
}

export default function AboutPage() {
  const stage = useRef(null);
  const revealProgress = useRef(0);

  useLayoutEffect(() => {
    let frame;
    const updateStage = () => {
      frame = undefined;
      if (!stage.current) return;

      /* On phones the brand card is a static panel rather than a scrubbed
         sticky stage, so the statement is simply shown and there is no blue
         backdrop for the header to sit over. */
      if (window.matchMedia("(max-width: 760px)").matches) {
        stage.current.style.setProperty("--about-progress", "0");
        stage.current.style.setProperty("--about-reveal-progress", "1");
        document
          .querySelector(".site-header")
          ?.classList.remove("is-over-about-blue");
        return;
      }

      const bounds = stage.current.getBoundingClientRect();
      const headerElement = document.querySelector(".site-header");
      const headerBottom = headerElement?.getBoundingClientRect().bottom || 0;
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      revealProgress.current = Math.max(revealProgress.current, progress);
      stage.current.style.setProperty("--about-progress", progress.toFixed(4));
      stage.current.style.setProperty(
        "--about-reveal-progress",
        revealProgress.current.toFixed(4)
      );
      headerElement?.classList.toggle(
        "is-over-about-blue",
        progress > 0.42 && bounds.bottom > headerBottom
      );
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStage);
    };

    updateStage();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
      document
        .querySelector(".site-header")
        ?.classList.remove("is-over-about-blue");
    };
  }, []);

  return (
    <main className="about-page">
      <SiteHeader />

      <section className="about-hero">
        <StaggerText as="h1" aria-label="About Regen" lineReveal>
          About Regen
        </StaggerText>
        <p className="about-hero__intro" data-about-reveal>
          A strategy-led B2B marketing agency for SaaS, AI, tech, and
          professional services.
        </p>
      </section>

      <section className="about-founders" aria-labelledby="about-founders-title">
        <h2 className="about-founders__title" id="about-founders-title">
          Meet the founders
        </h2>
        <div className="about-founders__grid">
          {founders.map((founder) => (
            <article className="about-founder-profile" key={founder.name}>
              <FounderPortrait founder={founder} />
              <div className="about-founder-profile__identity">
                <p className="about-founder-profile__number">
                  {founder.number} / {founder.title}
                </p>
                <h3>{founder.name}</h3>
                <p className="about-founder-profile__focus">{founder.focus}</p>
              </div>
              <div className="about-founder-profile__bio">
                <p className="about-eyebrow">About {founder.name}</p>
                <p>{founder.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-card-stage" ref={stage} aria-label="Regen introduction">
        <div className="about-card-stage__sticky">
          <div className="about-brand-card">
            <p className="about-brand-card__statement">
              <span className="about-brand-card__attract">
                <span className="about-brand-card__word-mask">
                  <span className="about-brand-card__word">Attract.</span>
                </span>
                <svg
                  className="about-brand-card__mark"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  viewBox="0 0 320 24"
                >
                  <path pathLength="1" d="M4 17C75 13 171 13 316 5" />
                </svg>
              </span>
              <span className="about-brand-card__convert">
                <span className="about-brand-card__word-mask">
                  <span className="about-brand-card__word">Convert.</span>
                </span>
                <svg
                  className="about-brand-card__mark"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  viewBox="0 0 420 160"
                >
                  <path
                    pathLength="1"
                    d="M211 10C322 9 407 40 409 82C411 127 322 151 203 150C86 149 12 128 11 83C10 39 97 12 211 10Z"
                  />
                </svg>
              </span>
              <span className="about-brand-card__grow">
                <span className="about-brand-card__word-mask">
                  <span className="about-brand-card__word">Grow.</span>
                </span>
                <svg
                  className="about-brand-card__mark"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  viewBox="0 0 240 36"
                >
                  <path pathLength="1" d="M8 4L3 28L234 12" />
                </svg>
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="about-manifesto">
        <p className="about-eyebrow" data-about-reveal>
          What we believe
        </p>
        <StaggerText lineReveal>
          Marketing should feel like <em>one intelligent system,</em> not a
          collection of disconnected tactics.
        </StaggerText>
        <div className="about-manifesto__copy">
          <p data-about-reveal>
            Regen brings strategy, creative, media, and search into one
            commercial plan. That gives ambitious B2B teams a clearer route
            from attention to pipeline.
          </p>
          <p data-about-reveal style={{ "--reveal-delay": "80ms" }}>
            We work closely with founders and commercial leaders, finding the
            message that matters and building the engine that carries it into
            market.
          </p>
        </div>
      </section>

      <HomeClosingSections />
      <HomeSectionMotion />
      <SiteFooter />
    </main>
  );
}
