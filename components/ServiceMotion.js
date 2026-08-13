"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ServiceMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".service-detail");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = root.querySelector(".service-detail__hero h1");
    const meta = gsap.utils.toArray(root.querySelectorAll(".service-detail__hero-meta > *"));
    if (!title) return;

    const splits = [];
    let cancelled = false;
    gsap.set(title, { visibility: "hidden" });
    gsap.set(meta, { autoAlpha: 0, y: 22 });

    const context = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled) return;

        try {
          context.add(() => {
            const split = new SplitText(title, {
              type: "lines",
              mask: "lines",
              linesClass: "service-reveal-line",
              aria: "auto",
            });
            splits.push(split);
            gsap.set(title, { visibility: "visible" });
            gsap.set(split.lines, { yPercent: 108, rotate: 1 });
            gsap.timeline()
              .to(split.lines, { yPercent: 0, rotate: 0, duration: 1.08, stagger: .09, ease: "power4.out" }, .06)
              .to(meta, { autoAlpha: 1, y: 0, duration: .8, stagger: .08, ease: "power3.out" }, .3);
          });
        } catch {
          gsap.set(title, { visibility: "visible" });
          gsap.set(meta, { autoAlpha: 1, y: 0 });
        }
      }, () => {
        gsap.set(title, { visibility: "visible" });
        gsap.set(meta, { autoAlpha: 1, y: 0 });
      });

      gsap.utils.toArray(root.querySelectorAll("[data-service-media]")).forEach((media) => {
        gsap.from(media, {
          clipPath: "inset(7% 5% 7% 5% round 26px)",
          scale: .96,
          duration: 1.05,
          ease: "power4.out",
          scrollTrigger: { trigger: media, start: "top 84%", once: true },
        });
      });

      gsap.utils.toArray(root.querySelectorAll(".service-deliverable, .editorial-faq details")).forEach((item, index) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 28,
          duration: .75,
          delay: (index % 2) * .06,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 91%", once: true },
        });
      });
    }, root);

    return () => {
      cancelled = true;
      splits.forEach((split) => split.revert());
      context.revert();
      gsap.set(title, { clearProps: "visibility" });
      gsap.set(meta, { clearProps: "opacity,visibility,transform" });
    };
  }, []);

  return null;
}
