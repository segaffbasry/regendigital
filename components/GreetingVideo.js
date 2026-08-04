"use client";

import { useEffect, useRef, useState } from "react";

const videoSource = "/videos/holly-greeting.mp4";

export default function GreetingVideo() {
  const widget = useRef(null);
  const video = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [isOnLightSurface, setIsOnLightSurface] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIsReady(true), 6000);
    /* The label only animates on this first appearance, not on every collapse. */
    const enterTimer = window.setTimeout(() => setIsEntering(false), 7400);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(enterTimer);
    };
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    function handleEscape(event) {
      if (event.key === "Escape") setIsExpanded(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isExpanded]);

  useEffect(() => {
    if (!video.current || !videoAvailable) return;
    video.current.play().catch(() => {});
  }, [isExpanded, isReady, videoAvailable]);

  useEffect(() => {
    const widgetElement = widget.current;
    if (!widgetElement) return;

    let frame = 0;

    function updateLabelTone() {
      frame = 0;
      const bounds = widgetElement.getBoundingClientRect();
      const probeX = Math.min(window.innerWidth - 1, Math.max(1, bounds.right - 30));
      const probeY = Math.min(window.innerHeight - 1, Math.max(1, bounds.top + 8));
      const elements = document.elementsFromPoint(probeX, probeY);
      let surface = elements.find((element) => !widgetElement.contains(element));
      let lightSurface = false;

      while (surface) {
        const color = window.getComputedStyle(surface).backgroundColor;
        const channels = color.match(/[\d.]+/g)?.map(Number) || [];
        const alpha = channels.length > 3 ? channels[3] : 1;

        if (channels.length >= 3 && alpha > 0.2) {
          const [red, green, blue] = channels;
          const luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          lightSurface = luminance > 0.58;
          break;
        }

        surface = surface.parentElement;
      }

      setIsOnLightSurface(lightSurface);
    }

    function scheduleToneUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateLabelTone);
    }

    updateLabelTone();
    window.addEventListener("scroll", scheduleToneUpdate, { passive: true });
    window.addEventListener("resize", scheduleToneUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleToneUpdate);
      window.removeEventListener("resize", scheduleToneUpdate);
    };
  }, [isExpanded, isReady]);

  if (!isReady || isClosed) return null;

  function toggleExpanded() {
    setIsExpanded((expanded) => !expanded);
  }

  function handleFrameKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleExpanded();
  }

  return (
    <aside
      ref={widget}
      className={`greeting-video${isExpanded ? " is-expanded" : ""}${isOnLightSurface ? " is-on-light" : ""}${isEntering ? " is-entering" : ""}`}
      aria-label="A message from Holly"
    >
      {!isExpanded && (
        <p className="greeting-video__label">A message from Holly</p>
      )}
      <div
        className="greeting-video__frame"
        role="button"
        tabIndex="0"
        aria-label={isExpanded ? "Minimise Holly's greeting video" : "Expand Holly's greeting video"}
        aria-expanded={isExpanded}
        onClick={toggleExpanded}
        onKeyDown={handleFrameKeyDown}
      >
        {videoAvailable ? (
          <video
            ref={video}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/founders/holly-updated.png"
            onError={() => setVideoAvailable(false)}
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        ) : (
          <img src="/images/founders/holly-updated.png" alt="" />
        )}
        <span className="greeting-video__expand" aria-hidden="true" />
        <button
          className="greeting-video__close"
          type="button"
          aria-label="Close Holly's greeting video"
          onClick={(event) => {
            event.stopPropagation();
            setIsClosed(true);
          }}
        >
        </button>
      </div>
    </aside>
  );
}
