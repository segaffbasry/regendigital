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
    if (skipIntro.current) return;

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

      /* The icon holds in black for two seconds, then turns blue and expands into the hero. */
      const heroRevealAt = 3.15;
      timeline.current = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline.current
        .set(
          ".loader__logo",
          { autoAlpha: 1, scale: 0.76, rotate: 0, backgroundColor: "var(--black)" },
          0.08
        )
        /* One unbroken scale: a fast settle, a slow drift, then the push into
           the flood. The logo never sits still. */
        .to(".loader__logo", { scale: 1, duration: 1, ease: "expo.out" }, 0.08)
        .to(".loader__logo", { scale: 1.08, duration: 1.1, ease: "sine.inOut" }, 1)
        .to(
          ".loader__logo",
          { backgroundColor: "var(--blue)", duration: 0.2, ease: "power2.inOut" },
          2.08
        )
        .to(".loader__logo", { scale: 1.26, duration: 0.32, ease: "power2.in" }, 2.08)
        .fromTo(
          ".loader__logo",
          { rotate: 0 },
          { rotate: -3, duration: 2.2, ease: "sine.inOut" },
          0.08
        )
        .fromTo(
          ".loader__flood",
          { "--flood": "8vmax", rotate: -3 },
          { "--flood": "1400vmax", rotate: 3, duration: 1.15, ease: "power2.inOut", immediateRender: false },
          2.28
        )
        .set(".loader__logo", { autoAlpha: 0 }, 2.34)
        .to(".loader", { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 3.12)
        .call(rememberIntro, [], 3.15)
        .set(".loader", { display: "none", pointerEvents: "none" })
        .to(".nav", { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out" }, 2.85)
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
