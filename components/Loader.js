"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

let introHasPlayed = false;

function rememberIntro() {
  introHasPlayed = true;
}

export default function Loader() {
  const timeline = useRef(null);
  const skipIntro = useRef(introHasPlayed);

  useEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(".hero-anim", {
        autoAlpha: 0,
        y: 24,
      });
      gsap.set(".hero-title-3d__line", {
        autoAlpha: 1,
        yPercent: 110,
      });
      gsap.set(".nav", { y: -24, autoAlpha: 0 });

      if (reduceMotion) {
        rememberIntro();
        gsap.set(".loader", { display: "none" });
        gsap.set(
          [".hero-anim", ".hero-title-3d__line", ".nav"],
          { clearProps: "all" }
        );
        return;
      }

      if (skipIntro.current) {
        timeline.current = gsap.timeline();
        timeline.current
          .to(".nav", { y: 0, autoAlpha: 1, duration: .62, ease: "expo.out" }, 0)
          .to(
            ".hero-anim",
            { y: 0, autoAlpha: 1, duration: .72, stagger: .08, ease: "power3.out" },
            .08
          )
          .to(
            ".hero-title-3d__line",
            { yPercent: 0, duration: .94, stagger: .09, ease: "power4.out" },
            .12
          )
          .set(".nav", { clearProps: "transform,opacity,visibility" });
        return;
      }

      /* Black mark → blue mark → full-screen blue expansion. */
      const heroRevealAt = 1.82;
      timeline.current = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline.current
        .set(
          ".loader__logo",
          { autoAlpha: 1, scale: 0.76, rotate: 0, backgroundColor: "var(--black)" },
          0
        )
        .to(
          ".loader__logo",
          { backgroundColor: "var(--blue)", duration: 0.22, ease: "power2.inOut" },
          0.12
        )
        .fromTo(
          ".loader__flood",
          { "--flood": "8vmax", rotate: -3 },
          { "--flood": "1400vmax", rotate: 3, duration: 1.18, ease: "power3.inOut", immediateRender: false },
          0.34
        )
        .to(
          ".loader__logo",
          { autoAlpha: 0, duration: 0.07, ease: "power1.out" },
          0.34
        )
        .to(".loader", { autoAlpha: 0, duration: 0.34, ease: "power2.out" }, 1.48)
        .call(rememberIntro, [], heroRevealAt)
        .set(".loader", { display: "none", pointerEvents: "none" })
        .to(".nav", { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out" }, 1.34)
        .to(
          ".hero-anim",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
          },
          heroRevealAt
        )
        .to(
          ".hero-title-3d__line",
          {
            yPercent: 0,
            duration: 1.08,
            stagger: 0.1,
            ease: "power4.out",
          },
          heroRevealAt + 0.08
        )
        .set(".nav", { clearProps: "transform,opacity,visibility" });
    });

    return () => {
      timeline.current?.kill();
      context.revert();
    };
  }, []);

  if (skipIntro.current) return null;

  return (
    <div className="loader" role="status" aria-live="polite" aria-label="Loading Regen">
      <div className="loader__stage" aria-hidden="true">
        <div className="loader__logo" />
        <div className="loader__flood" />
      </div>
    </div>
  );
}
