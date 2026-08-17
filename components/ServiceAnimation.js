"use client";

import { useEffect, useRef, useState } from "react";

const SERVICE_PLAYBACK_RATE = 1.45;
const SERVICE_TIMELINE_SELECTOR = "[data-om-exportable-video-with-duration-secs]";

const animationByService = {
  "marketing-strategy-consultancy": {
    src: "/animation/Marketing%20Strategy%20Assembly/Marketing%20Strategy%20Motif.dc.html?embed=1",
    title: "Marketing strategy pieces assembling into one connected plan",
  },
  "organic-social": {
    src: "/animation/Content%20calendar%20animation/Content%20Calendar%20Motif.dc.html?embed=1",
    title: "A content calendar moving posts from design to scheduled and published",
  },
  "paid-social": {
    src: "/animation/%23%20Paid%20social%20feed%20animation/Paid%20Social%20Feed%20Motif.dc.html?embed=1",
    title: "A paid social feed bringing sponsored creative into focus",
  },
  "google-ads": {
    src: "/animation/Sponsored%20Search%20Animation/Paid%20Search%20Motif.dc.html?embed=1",
    title: "A focused sponsored search result appearing for a high-intent query",
  },
  "account-based-marketing": {
    src: "/animation/ABM%20Buying%20Committee%20Animation/ABM%20Radial%20Motif.dc.html?embed=1",
    title: "A target account connecting with its complete buying committee",
  },
  seo: {
    src: "/animation/Organic%20Result%20Climbs%20Rankings/SEO%20Rank%20Climb.dc.html?embed=1",
    title: "An organic search result climbing through the rankings",
  },
  geo: {
    src: "/animation/Animated%20AI%20mentions%20interface/AI%20Mentions%20Motif.dc.html?embed=1",
    title: "A brand earning citations across leading AI assistants",
  },
  "go-to-market-and-launch": {
    src: "/animation/Go-to-Market%20Launch/GTM%20Launch%20Motif%20v2.dc.html?embed=1",
    title: "A go-to-market launch accelerating from positioning to sustained growth",
  },
  "founder-led-marketing": {
    src: "/animation/%23%20LinkedIn%20Profile%20Animation/LinkedIn%20Inbound%20Leads.dc.html?embed=1",
    title: "A founder LinkedIn profile generating new inbound leads",
    ratio: "14 / 9",
  },
  "creator-partnerships": {
    src: "/animation/Creator%20Partnerships%20Animation/Creator%20Partnerships%20Motif.dc.html?embed=1",
    title: "A brand and creator connecting to produce collaborative content",
  },
};

export default function ServiceAnimation({ serviceKey = "seo" }) {
  const visual = animationByService[serviceKey];
  const frame = useRef(null);
  const iframe = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setShouldLoad(false);
    setFailed(false);
    setReady(false);
  }, [serviceKey]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const element = frame.current;
    if (!element || shouldLoad || reduceMotion || failed || !visual) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: "240px 0px", threshold: 0.01 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [failed, reduceMotion, shouldLoad, visual]);

  useEffect(() => {
    if (!shouldLoad || failed || ready) return;
    const timer = window.setTimeout(() => setFailed(true), 12000);
    return () => window.clearTimeout(timer);
  }, [failed, ready, shouldLoad]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.source !== iframe.current?.contentWindow) return;
      if (event.data?.type === "__dc_animation_ready") setReady(true);
      if (event.data?.type === "__dc_animation_failed") {
        setReady(false);
        setFailed(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [serviceKey]);

  useEffect(() => {
    const frameElement = iframe.current;
    if (!frameElement || !shouldLoad || reduceMotion || failed) return undefined;

    let cancelled = false;
    let animationFrame = 0;
    let frameLoaded = false;
    let inViewport = false;
    let driverStartedAt = 0;
    let elapsedBeforePause = 0;

    const stopDriver = () => {
      if (animationFrame && driverStartedAt) {
        elapsedBeforePause += ((window.performance.now() - driverStartedAt) / 1000) * SERVICE_PLAYBACK_RATE;
      }
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      driverStartedAt = 0;
    };

    const startDriver = () => {
      if (
        cancelled
        || animationFrame
        || !frameLoaded
        || !inViewport
        || document.visibilityState === "hidden"
      ) return;

      driverStartedAt = window.performance.now();

      const driveTimeline = (now) => {
        if (cancelled) return;

        try {
          const frameWindow = frameElement.contentWindow;
          const timeline = frameElement.contentDocument?.querySelector(SERVICE_TIMELINE_SELECTOR);
          const duration = Number(timeline?.getAttribute("data-om-exportable-video-with-duration-secs"));

          if (frameWindow && timeline && Number.isFinite(duration) && duration > 0) {
            const elapsed = elapsedBeforePause
              + ((now - driverStartedAt) / 1000) * SERVICE_PLAYBACK_RATE;
            timeline.dispatchEvent(new frameWindow.CustomEvent("data-om-seek-to-time-frame", {
              detail: { playing: true, time: elapsed % duration },
            }));
          }
        } catch {
          // The next frame retries while the same-origin animation finishes booting.
        }

        animationFrame = window.requestAnimationFrame(driveTimeline);
      };

      animationFrame = window.requestAnimationFrame(driveTimeline);
    };

    const handleLoad = () => {
      frameLoaded = true;
      elapsedBeforePause = 0;
      startDriver();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") stopDriver();
      else startDriver();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport) startDriver();
      else stopDriver();
    }, { rootMargin: "160px 0px", threshold: 0.01 });

    frameElement.addEventListener("load", handleLoad);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    observer.observe(frameElement);

    try {
      frameLoaded = frameElement.contentDocument?.readyState === "complete";
    } catch {
      frameLoaded = false;
    }
    if (frameLoaded) startDriver();

    return () => {
      cancelled = true;
      frameElement.removeEventListener("load", handleLoad);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      stopDriver();
    };
  }, [failed, reduceMotion, serviceKey, shouldLoad]);

  const isReady = ready && shouldLoad && !reduceMotion && !failed;

  return (
    <figure
      aria-busy={shouldLoad && !isReady && !failed}
      aria-label={visual?.title || "Illustrative service animation"}
      className={`service-animation service-animation--${serviceKey}${isReady ? " is-ready" : ""}`}
      data-service-media
      ref={frame}
      role="img"
      style={{ "--service-animation-ratio": visual?.ratio || "3 / 2" }}
    >
      <div aria-hidden="true" className="service-animation__placeholder" />
      {visual && shouldLoad && !reduceMotion && !failed ? (
        <iframe
          aria-hidden="true"
          className="service-animation__frame"
          loading="eager"
          onError={() => {
            setReady(false);
            setFailed(true);
          }}
          ref={iframe}
          referrerPolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts"
          src={visual.src}
          tabIndex={-1}
          title={visual.title}
        />
      ) : null}
      <figcaption className="service-animation__caption">{visual?.title || "Illustrative service animation"}</figcaption>
    </figure>
  );
}
