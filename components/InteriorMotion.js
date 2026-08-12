"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function InteriorMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".editorial-page");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroTitle = root.querySelector(".editorial-hero h1");
    const heroKicker = root.querySelector(".editorial-hero .editorial-kicker");
    const heroFoot = gsap.utils.toArray(".editorial-hero__foot > *");
    if (!heroTitle) return;

    const splits = [];
    let cancelled = false;

    gsap.set(heroTitle, { visibility: "hidden" });
    if (heroKicker) gsap.set(heroKicker, { autoAlpha: 0, y: 16 });
    gsap.set(heroFoot, { autoAlpha: 0, y: 24 });

    const context = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled || !heroTitle) return;

        try {
          context.add(() => {
            const heroSplit = new SplitText(heroTitle, {
              type: "lines",
              linesClass: "editorial-reveal-line",
              mask: "lines",
              aria: "auto",
            });
            splits.push(heroSplit);

            gsap.set(heroTitle, { visibility: "visible" });
            gsap.set(heroSplit.lines, { yPercent: 115, rotate: 1.5 });

            const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } })
              .to(heroSplit.lines, { yPercent: 0, rotate: 0, duration: 1.18, stagger: 0.11 }, 0.08);

            if (heroKicker) heroTimeline.to(heroKicker, { autoAlpha: 1, y: 0, duration: .7 }, 0.18);
            heroTimeline.to(heroFoot, { autoAlpha: 1, y: 0, duration: .85, stagger: .1 }, 0.4);

            const markedWord = root.querySelector(".editorial-hero__marked-word");
            if (markedWord) {
              heroTimeline.to(markedWord, { "--mark-scale": 1, duration: .8, ease: "power3.out" }, .72);
            }

            const intro = root.querySelector(".editorial-intro__body");
            if (intro) {
              const introSplit = new SplitText(intro, {
                type: "lines",
                linesClass: "editorial-reveal-line",
                mask: "lines",
                aria: "auto",
              });
              splits.push(introSplit);
              gsap.from(introSplit.lines, {
                yPercent: 108,
                duration: 1,
                stagger: .07,
                ease: "power4.out",
                scrollTrigger: { trigger: intro, start: "top 82%", once: true },
              });
            }

            ScrollTrigger.refresh();
          });
        } catch {
          gsap.set(heroTitle, { visibility: "visible" });
          gsap.set([heroKicker, ...heroFoot].filter(Boolean), { autoAlpha: 1, y: 0 });
        }
      }, () => {
        gsap.set(heroTitle, { visibility: "visible" });
        gsap.set([heroKicker, ...heroFoot].filter(Boolean), { autoAlpha: 1, y: 0 });
      });

      gsap.utils.toArray("[data-media-reveal]").forEach((media) => {
        const frame = media.querySelector(".editorial-media__frame");
        const field = media.querySelector(".editorial-media__field");
        if (!frame || !field) return;

        gsap.fromTo(frame,
          { clipPath: "inset(10% 8% 10% 8% round 34px)", scale: .94 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "power3.out", duration: 1.25,
            scrollTrigger: { trigger: media, start: "top 82%", once: true } }
        );

        gsap.fromTo(field, { yPercent: -7, scale: 1.08 }, { yPercent: 7, scale: 1.02, ease: "none",
          scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: .8 } });
      });

      gsap.utils.toArray(".editorial-included li, .editorial-card, .editorial-faq details, .editorial-steps article").forEach((item, index) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 34,
          duration: .78,
          delay: Math.min(index % 4, 3) * .055,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 91%", once: true },
        });
      });

      gsap.utils.toArray(".editorial-insight h2, .editorial-faq h2, .editorial-included h2, .founder-cta h2").forEach((heading) => {
        gsap.from(heading, {
          autoAlpha: 0,
          y: 45,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 86%", once: true },
        });
      });

      gsap.to(".founder-cta", {
        borderRadius: "32px 32px 0 0",
        ease: "none",
        scrollTrigger: { trigger: ".founder-cta", start: "top bottom", end: "top 20%", scrub: .6 },
      });
    }, root);

    return () => {
      cancelled = true;
      splits.forEach((split) => split.revert());
      context.revert();
      gsap.set(heroTitle, { clearProps: "visibility" });
      if (heroKicker) gsap.set(heroKicker, { clearProps: "opacity,visibility,transform" });
      gsap.set(heroFoot, { clearProps: "opacity,visibility,transform" });
    };
  }, []);

  return null;
}
