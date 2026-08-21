"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".case-study-page");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const heroItems = gsap.utils.toArray("[data-case-hero]");

      gsap.from(heroItems, {
        opacity: 0,
        y: 34,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.utils.toArray("[data-case-reveal]").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 44,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.from(".case-result", {
        opacity: 0,
        y: 54,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".case-results__grid",
          start: "top 82%",
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
