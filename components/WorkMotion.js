"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".work-page");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from(".work-hero__projects button", {
        autoAlpha: 0,
        x: -22,
        duration: .8,
        stagger: .07,
        ease: "power3.out",
      });
      gsap.from(".work-hero__panel", {
        autoAlpha: 0,
        y: 26,
        duration: 1,
        delay: .12,
        ease: "power4.out",
      });

      gsap.utils.toArray(".work-case").forEach((card) => {
        const image = card.querySelector("img");
        gsap.from(card, {
          autoAlpha: 0,
          y: 56,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        });
        if (image) {
          gsap.fromTo(image, { scale: 1.1, yPercent: -3 }, {
            scale: 1.02,
            yPercent: 3,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .8 },
          });
        }
      });

      gsap.utils.toArray(".work-index__row").forEach((row, index) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 20,
          duration: .65,
          delay: index * .05,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 93%", once: true },
        });
      });
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return null;
}
