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

    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return null;
}
