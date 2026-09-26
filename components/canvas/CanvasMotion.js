"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Match the homepage's masked line reveals and soft, staggered entrances.
export default function CanvasMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".canvas-page");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let context;
    const observers = [];
    const splits = [];

    const reset = () => {
      observers.splice(0).forEach((observer) => observer.disconnect());
      context?.revert();
      splits.splice(0).forEach((split) => split.revert());
    };

    document.fonts.ready.then(() => {
      if (disposed || preference.matches || !root) return;
      context = gsap.context(() => {
        const revealHeading = (heading) => {
          const split = new SplitText(heading, {
            type: "lines", mask: "lines", linesClass: "canvas-reveal-line", aria: "auto",
            autoSplit: true,
            onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.08, stagger: .1, ease: "power4.out" }),
          });
          splits.push(split);
        };

        revealHeading(root.querySelector("h1"));
        gsap.from(".canvas-hero__copy > .canvas-eyebrow, .canvas-hero__lede, .canvas-actions", {
          autoAlpha: 0, y: 24, duration: .85, stagger: .1, delay: .18, ease: "power3.out",
        });
        gsap.from(".canvas-phone", { autoAlpha: 0, y: 50, duration: 1.2, stagger: .12, delay: .2, ease: "power4.out" });
        gsap.from(".canvas-hero__note", { autoAlpha: 0, y: 20, duration: .85, delay: .65, ease: "power3.out" });

        const observe = (element, animate) => {
          const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            context.add(animate);
            observer.disconnect();
          }, { rootMargin: "0px 0px -10%", threshold: .08 });
          observer.observe(element);
          observers.push(observer);
        };

        root.querySelectorAll(".canvas-section h2").forEach((heading) => {
          // Visibility is only managed after JS is ready; no-JS remains readable.
          gsap.set(heading, { visibility: "hidden" });
          observe(heading, () => {
            gsap.set(heading, { visibility: "visible" });
            revealHeading(heading);
          });
        });
        root.querySelectorAll(".canvas-proof > div, .canvas-examples figure, .canvas-steps article, .canvas-founder, .canvas-pricing__fees article, .canvas-calculator, .canvas-section__heading > p, .canvas-work__foot, .canvas-closing > p, .canvas-closing > a").forEach((element) => {
          gsap.set(element, { autoAlpha: 0, y: 24 });
          observe(element, () => gsap.to(element, { autoAlpha: 1, y: 0, duration: .85, ease: "power3.out" }));
        });
      }, root);
    });

    const onPreferenceChange = () => { if (preference.matches) reset(); };
    preference.addEventListener("change", onPreferenceChange);
    return () => { disposed = true; reset(); preference.removeEventListener("change", onPreferenceChange); };
  }, []);

  return null;
}
