"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AboutSectionMotion() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const headings = Array.from(
      document.querySelectorAll(".about-page [data-line-reveal]")
    ).filter((heading) => !heading.closest(".final-cta"));
    const riseTargets = Array.from(
      document.querySelectorAll(
        ".about-page [data-about-reveal]"
      )
    ).filter((target) => !target.closest(".final-cta"));

    gsap.set(headings, { visibility: "hidden" });
    gsap.set(riseTargets, { autoAlpha: 0, y: 24 });

    let cancelled = false;
    const observers = [];
    const animations = [];
    const splits = [];
    const founderGrid = document.querySelector(".about-team__layout");

    if (founderGrid) {
      const founderReveal = gsap.fromTo(
        founderGrid,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: founderGrid,
            start: "top 84%",
            once: true,
          },
        }
      );

      animations.push(founderReveal);
    }

    document.fonts.ready.then(() => {
      if (cancelled) return;

      headings.forEach((heading) => {
        const split = new SplitText(heading, {
          type: "lines",
          linesClass: "section-reveal__line",
          mask: "lines",
          aria: "auto",
        });

        splits.push(split);
        gsap.set(split.lines, { yPercent: 110 });
        gsap.set(heading, { visibility: "visible" });

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;

            const tween = gsap.to(split.lines, {
              yPercent: 0,
              duration: 1.08,
              stagger: 0.1,
              ease: "power4.out",
            });

            animations.push(tween);
            observer.unobserve(heading);
          },
          {
            rootMargin: "0px 0px -15%",
            threshold: 0.01,
          }
        );

        observer.observe(heading);
        observers.push(observer);
      });

      riseTargets.forEach((target, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;

            const tween = gsap.to(target, {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              delay: target.dataset.aboutDelay
                ? Number(target.dataset.aboutDelay) / 1000
                : (index % 3) * 0.08,
              ease: "power3.out",
            });

            animations.push(tween);
            observer.unobserve(target);
          },
          {
            rootMargin: "0px 0px -12%",
            threshold: 0.1,
          }
        );

        observer.observe(target);
        observers.push(observer);
      });
    }).catch(() => {
      if (!cancelled) {
        gsap.set([...headings, ...riseTargets], { clearProps: "all" });
      }
    });

    return () => {
      cancelled = true;
      observers.forEach((observer) => observer.disconnect());
      animations.forEach((animation) => animation.kill());
      splits.forEach((split) => split.revert());
      gsap.set([...headings, ...riseTargets], { clearProps: "all" });
    };
  }, []);

  return null;
}
