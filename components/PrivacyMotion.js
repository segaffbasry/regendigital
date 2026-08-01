"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function PrivacyMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".privacy-page");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = root.querySelector(".privacy-hero h1");
    const eyebrow = root.querySelector(".privacy-hero__eyebrow");
    const meta = root.querySelector(".privacy-document__meta");
    if (!title) return;

    let split;
    let cancelled = false;
    const showIntro = () => {
      gsap.set(title, { visibility: "visible" });
      gsap.set([eyebrow, meta].filter(Boolean), { autoAlpha: 1, y: 0 });
    };

    gsap.set(title, { visibility: "hidden" });
    gsap.set([eyebrow, meta].filter(Boolean), { autoAlpha: 0, y: 20 });

    const context = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled) return;

        try {
          context.add(() => {
            split = new SplitText(title, {
              type: "lines",
              linesClass: "section-reveal__line",
              mask: "lines",
              aria: "auto",
            });
            gsap.set(title, { visibility: "visible" });
            gsap.set(split.lines, { yPercent: 112, rotate: 1 });
            gsap.timeline({ defaults: { ease: "power4.out" } })
              .to(split.lines, { yPercent: 0, rotate: 0, duration: 1.08, stagger: .1 }, .08)
              .to(eyebrow, { autoAlpha: 1, y: 0, duration: .68, ease: "power3.out" }, .16)
              .to(meta, { autoAlpha: 1, y: 0, duration: .74, ease: "power3.out" }, .34);
          });
        } catch {
          showIntro();
        }
      }, showIntro);

      gsap.utils.toArray(".privacy-document__content > section, .privacy-contents").forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 28,
          duration: .78,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 90%", once: true },
        });
      });
    }, root);

    return () => {
      cancelled = true;
      split?.revert();
      context.revert();
      gsap.set(title, { clearProps: "visibility" });
      gsap.set([eyebrow, meta].filter(Boolean), {
        clearProps: "opacity,visibility,transform",
      });
    };
  }, []);

  return null;
}
