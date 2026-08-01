"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const transitioning = useRef(false);
  const navigationTimer = useRef(null);
  const failsafeTimer = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function handleNavigation(event) {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest("a");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      const isSamePage =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (
        destination.origin !== current.origin ||
        destination.protocol === "mailto:" ||
        destination.protocol === "tel:" ||
        isSamePage
      ) {
        return;
      }

      event.preventDefault();
      const href = `${destination.pathname}${destination.search}${destination.hash}`;

      if (reduceMotion) {
        router.push(href);
        return;
      }

      if (transitioning.current) return;
      transitioning.current = true;
      document.documentElement.classList.add("route-is-changing");

      window.clearTimeout(failsafeTimer.current);
      failsafeTimer.current = window.setTimeout(() => {
        document.documentElement.classList.remove("route-is-changing");
        transitioning.current = false;
      }, 1400);

      navigationTimer.current = window.setTimeout(() => {
        router.push(href);
      }, 190);
    }

    document.addEventListener("click", handleNavigation);
    return () => {
      document.removeEventListener("click", handleNavigation);
      window.clearTimeout(navigationTimer.current);
      window.clearTimeout(failsafeTimer.current);
    };
  }, [router]);

  useEffect(() => {
    if (!transitioning.current) return;

    const revealFrame = window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("route-is-changing");
      transitioning.current = false;
      window.clearTimeout(failsafeTimer.current);
    });

    return () => window.cancelAnimationFrame(revealFrame);
  }, [pathname]);

  return null;
}
