"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HomeSectionMotion() {
  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll(".home-section"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bridge = document.querySelector(".problem-audience-bridge");
    const audienceSection = bridge?.querySelector(".audience-section");
    const precedingSection = bridge?.previousElementSibling;
    const finalCtaStage = document.querySelector(".final-cta-stage");
    const finalCta = finalCtaStage?.querySelector(".final-cta");
    let bridgeObserver = null;

    if (bridge && audienceSection) {
      bridgeObserver = new IntersectionObserver(
        ([entry]) => {
          bridge.classList.toggle("is-audience-active", entry.isIntersecting);
          precedingSection?.classList.toggle("is-audience-active", entry.isIntersecting);
        },
        {
          rootMargin: "0px",
          threshold: 0.01,
        }
      );
      bridgeObserver.observe(audienceSection);
    }

    if (reducedMotion) {
      return () => {
        bridgeObserver?.disconnect();
        precedingSection?.classList.remove("is-audience-active");
      };
    }

    const headings = sections
      .map((section) => section.querySelector("[data-line-reveal]"))
      .filter(Boolean);
    const riseTargets = sections.flatMap((section) =>
      Array.from(
        section.querySelectorAll(
          ".home-body-large, .problem-section__copy > p, .final-cta__content > p"
        )
      )
    );

    gsap.set(headings, { visibility: "hidden" });
    gsap.set(riseTargets, { autoAlpha: 0, y: 24 });

    let cancelled = false;
    const observers = [];
    const timelines = [];
    const splits = [];
    const finalCtaMatchMedia = gsap.matchMedia();

    finalCtaMatchMedia.add(
      "(min-width: 701px) and (prefers-reduced-motion: no-preference)",
      () => {
        if (!finalCtaStage || !finalCta) return;

        const frameTween = gsap.fromTo(
          finalCta,
          {
            width: "100vw",
            height: "60svh",
            borderRadius: 0,
          },
          {
            width: "calc(100vw - clamp(32px, 5vw, 96px))",
            height: "52svh",
            borderRadius: 28,
            ease: "none",
            scrollTrigger: {
              trigger: finalCtaStage,
              start: "top 82%",
              end: "top 8%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
        );

        timelines.push(frameTween);

        return () => {
          gsap.set(finalCta, { clearProps: "width,height,borderRadius" });
        };
      }
    );

    document.fonts.ready.then(() => {
      if (cancelled) return;

      sections.forEach((section) => {
        const heading = section.querySelector("[data-line-reveal]");
        const bodies = Array.from(
          section.querySelectorAll(
            ".home-body-large, .problem-section__copy > p, .final-cta__content > p"
          )
        );
        const split = heading
          ? new SplitText(heading, {
              type: "lines",
              linesClass: "section-reveal__line",
              mask: "lines",
              aria: "auto",
            })
          : null;

        if (split) {
          splits.push(split);
          gsap.set(split.lines, { yPercent: 110 });
          gsap.set(heading, { visibility: "visible" });
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;

            const timeline = gsap.timeline({
              defaults: { ease: "power4.out" },
            });

            if (split) {
              timeline.to(
                split.lines,
                {
                  yPercent: 0,
                  duration: 1.08,
                  stagger: 0.1,
                },
                0.12
              );
            }

            timelines.push(timeline);
            observer.unobserve(section);
          },
          {
            rootMargin: "0px 0px -18%",
            threshold: 0.01,
          }
        );

        observer.observe(section);
        observers.push(observer);

        bodies.forEach((body, index) => {
          const bodyObserver = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;

              const tween = gsap.to(body, {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                delay: index * 0.1,
                ease: "power3.out",
              });

              timelines.push(tween);
              bodyObserver.unobserve(body);
            },
            {
              rootMargin: "0px 0px -12%",
              threshold: 0.12,
            }
          );

          bodyObserver.observe(body);
          observers.push(bodyObserver);
        });
      });
    });

    return () => {
      cancelled = true;
      bridgeObserver?.disconnect();
      precedingSection?.classList.remove("is-audience-active");
      observers.forEach((observer) => observer.disconnect());
      timelines.forEach((timeline) => timeline.kill());
      splits.forEach((split) => split.revert());
      finalCtaMatchMedia.revert();
      gsap.set([...headings, ...riseTargets], { clearProps: "all" });
    };
  }, []);

  return null;
}
