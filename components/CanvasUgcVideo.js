"use client";

import { useEffect, useRef, useState } from "react";

const SOUND_EVENT = "canvas-ugc:sound";

// Plays muted on loop while on screen, like a social feed. Only one clip has sound at a time.
export default function CanvasUgcVideo({ src, poster, label }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // React does not reliably set the muted property on hydration, and browsers only autoplay muted video.
    video.defaultMuted = true;
    video.muted = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reducedMotion || !video.muted) video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: .5 });
    observer.observe(video);

    const onSound = (event) => {
      if (event.detail === video) return;
      video.muted = true;
      setMuted(true);
    };
    window.addEventListener(SOUND_EVENT, onSound);

    return () => {
      observer.disconnect();
      window.removeEventListener(SOUND_EVENT, onSound);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: video }));
      video.play().catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="canvas-ugc__video-media"
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
      />
      <button
        type="button"
        className="canvas-ugc__sound"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? `Play ${label} with sound` : `Mute ${label}`}
      >
        <span aria-hidden="true">{muted ? "Tap for sound" : "Sound on"}</span>
      </button>
    </>
  );
}
