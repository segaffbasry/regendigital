"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function ContactMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".contact-studio");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = root.querySelector("[data-contact-title]");
    const revealTargets = gsap.utils.toArray("[data-contact-reveal]");
    const form = root.querySelector("[data-contact-form]");
    const labels = gsap.utils.toArray(".contact-form label");
    if (!title) return;

    let split;
    let cancelled = false;
    gsap.set(title, { visibility: "hidden" });
    gsap.set(revealTargets, { y: 18, autoAlpha: 0 });
    gsap.set(form, { y: 30, autoAlpha: 0, scale: .985 });
    gsap.set(labels, { y: 12, autoAlpha: 0 });

    const context = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled || !title) return;

        try {
          context.add(() => {
            split = new SplitText(title, { type: "lines", mask: "lines", aria: "auto" });
            gsap.set(title, { visibility: "visible" });
            gsap.set(split.lines, { yPercent: 110 });

            gsap.timeline({ defaults: { ease: "power4.out" } })
              .to(split.lines, { yPercent: 0, duration: 1.05, stagger: .1 }, .08)
              .to(revealTargets, { y: 0, autoAlpha: 1, duration: .72, stagger: .09 }, .28)
              .to(form, { y: 0, autoAlpha: 1, scale: 1, duration: .95 }, .2)
              .to(labels, { y: 0, autoAlpha: 1, duration: .5, stagger: .045 }, .62);
          });
        } catch {
          gsap.set(title, { visibility: "visible" });
          gsap.set([...revealTargets, form, ...labels].filter(Boolean), {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          });
        }
      }, () => {
        gsap.set(title, { visibility: "visible" });
        gsap.set([...revealTargets, form, ...labels].filter(Boolean), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });
    }, root);

    return () => {
      cancelled = true;
      split?.revert();
      context.revert();
      gsap.set(title, { clearProps: "visibility" });
      gsap.set([...revealTargets, form, ...labels].filter(Boolean), {
        clearProps: "opacity,visibility,transform",
      });
    };
  }, []);

  return null;
}
