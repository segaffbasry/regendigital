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
    );
    const riseTargets = Array.from(
      document.querySelectorAll(
        ".about-hero__intro, .about-eyebrow:not([data-founder-eyebrow]), .about-manifesto__copy > p, .about-build-statement__eyebrow, .about-build-statement__line"
      )
    );

    gsap.set(headings, { visibility: "hidden" });
    gsap.set(riseTargets, { autoAlpha: 0, y: 24 });

    let cancelled = false;
    const observers = [];
    const animations = [];
    const splits = [];
    const founderMatchMedia = gsap.matchMedia();

    founderMatchMedia.add(
      "(min-width: 701px) and (prefers-reduced-motion: no-preference)",
      () => {
        const foundersSection = document.querySelector(".about-founders");
        const profiles = gsap.utils.toArray(".about-founder-profile");
        if (!foundersSection || profiles.length < 2) return;

        const [hollyProfile, taylorProfile] = profiles;
        const profileParts = profiles.map((profile) => ({
          profile,
          identity: profile.querySelector(".about-founder-profile__identity"),
          portrait: profile.querySelector(
            ".about-founder-profile__portrait-stage"
          ),
          bio: profile.querySelector(".about-founder-profile__bio"),
          identityText: [
            profile.querySelector(".about-founder-profile__number"),
            profile.querySelector(".about-founder-profile__identity h3"),
            profile.querySelector(".about-founder-profile__focus"),
          ],
          bioText: [
            profile.querySelector(".about-founder-profile__bio .about-eyebrow"),
            profile.querySelector(".about-founder-profile__bio > p:last-child"),
          ],
          lines: null,
        }));

        const founderSplits = [];

        /* Same line-mask reveal as the homepage hero: split into lines, hold
           them below their mask, then let them rise. */
        document.fonts.ready.then(() => {
          if (cancelled) return;

          profileParts.forEach((part) => {
            const identitySplit = new SplitText(part.identityText, {
              type: "lines",
              linesClass: "section-reveal__line",
              mask: "lines",
              aria: "auto",
            });
            const bioSplit = new SplitText(part.bioText, {
              type: "lines",
              linesClass: "section-reveal__line",
              mask: "lines",
              aria: "auto",
            });

            founderSplits.push(identitySplit, bioSplit);
            part.lines = {
              identity: identitySplit.lines,
              bio: bioSplit.lines,
            };
          });

          ScrollTrigger.refresh();
        });

        const allLines = (part) =>
          part.lines ? [...part.lines.identity, ...part.lines.bio] : [];

        /* Every entrance runs through here — first scroll-in, forward swap and
           backward swap alike — so all three look identical. */
        const revealFounder = (part, delay = 0) => {
          const timeline = gsap.timeline({ delay });

          if (part.lines) {
            gsap.set([...part.lines.identity, ...part.lines.bio], {
              yPercent: 110,
            });
            gsap.set([part.identity, part.bio], { autoAlpha: 1, y: 0 });

            timeline
              .to(
                part.lines.identity,
                {
                  yPercent: 0,
                  duration: 1.08,
                  stagger: 0.09,
                  ease: "power4.out",
                },
                0
              )
              .to(
                part.lines.bio,
                {
                  yPercent: 0,
                  duration: 0.95,
                  stagger: 0.045,
                  ease: "power4.out",
                },
                0.18
              );
          } else {
            gsap.set([part.identity, part.bio], { autoAlpha: 0, y: 26 });
            timeline.to(
              [part.identity, part.bio],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
              },
              0
            );
          }

          // The portrait grows out from its centre rather than unmasking.
          gsap.set(part.portrait, {
            autoAlpha: 0,
            scale: 0.84,
            y: 0,
            transformOrigin: "50% 50%",
          });
          timeline.to(
            part.portrait,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.02,
              ease: "power3.out",
              onComplete: () =>
                gsap.set(part.portrait, { clearProps: "transform" }),
            },
            0.06
          );

          animations.push(timeline);
          return timeline;
        };

        foundersSection.classList.add("is-founder-motion-ready");
        gsap.set(hollyProfile, { visibility: "visible", pointerEvents: "auto" });
        gsap.set(taylorProfile, { visibility: "hidden", pointerEvents: "none" });

        let activeFounder = 0;
        let founderTransition;

        const showFounder = (nextFounder) => {
          if (nextFounder === activeFounder) return;

          founderTransition?.kill();

          const outgoing = profileParts[activeFounder];
          const incoming = profileParts[nextFounder];
          const direction = nextFounder > activeFounder ? 1 : -1;
          const outgoingParts = [
            outgoing.identity,
            outgoing.portrait,
            outgoing.bio,
          ];
          const incomingParts = [
            incoming.identity,
            incoming.portrait,
            incoming.bio,
          ];

          activeFounder = nextFounder;

          gsap.set(outgoing.profile, {
            visibility: "visible",
            pointerEvents: "none",
          });
          gsap.set(incoming.profile, {
            visibility: "visible",
            pointerEvents: "auto",
          });

          // The outgoing founder clears out while the incoming one is already
          // rising, so there is never an empty frame between them.
          founderTransition = gsap
            .timeline({
              onComplete: () => {
                gsap.set(outgoing.profile, { visibility: "hidden" });
                gsap.set(outgoingParts, {
                  clearProps: "opacity,visibility,transform",
                });
                // Park the outgoing lines back at rest. Without this an
                // interrupted swap leaves them frozen part-way up, and the
                // founder returns with nothing left to animate.
                gsap.set(allLines(outgoing), { yPercent: 0 });
              },
            })
            .to(
              outgoingParts,
              {
                autoAlpha: 0,
                y: direction * -26,
                duration: 0.42,
                stagger: 0.05,
                ease: "power2.in",
              },
              0
            )
            .add(revealFounder(incoming), 0.16);

          animations.push(founderTransition);
        };

        const founderTrigger = ScrollTrigger.create({
          trigger: foundersSection,
          start: "top top",
          end: "+=115%",
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            // Dead band around the midpoint so small scroll jitter cannot
            // flip the profiles back and forth.
            if (progress >= 0.56) showFounder(1);
            else if (progress <= 0.44) showFounder(0);
          },
          // A fast flick can take the trigger from a high progress straight to
          // inactive without onUpdate ever reporting a value inside the band,
          // which would strand the wrong founder on screen.
          onLeaveBack: () => showFounder(0),
          onLeave: () => showFounder(1),
        });

        /* The first founder gets the same reveal as the section scrolls in. */
        const firstRevealTrigger = ScrollTrigger.create({
          trigger: foundersSection,
          start: "top 82%",
          once: true,
          onEnter: () => revealFounder(profileParts[0]),
        });

        animations.push(founderTrigger, firstRevealTrigger);

        return () => {
          founderTransition?.kill();
          founderSplits.forEach((split) => split.revert());
          foundersSection.classList.remove("is-founder-motion-ready");
          gsap.set(
            [
              hollyProfile,
              taylorProfile,
              ...profileParts.flatMap(({ identity, portrait, bio }) => [
                identity,
                portrait,
                bio,
              ]),
            ],
            { clearProps: "all" }
          );
        };
      }
    );

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
    });

    return () => {
      cancelled = true;
      observers.forEach((observer) => observer.disconnect());
      animations.forEach((animation) => animation.kill());
      splits.forEach((split) => split.revert());
      founderMatchMedia.revert();
      gsap.set([...headings, ...riseTargets], { clearProps: "all" });
    };
  }, []);

  return null;
}
