"use client";

import { useRef } from "react";

/* Pointer-tracked 3D tilt. The stage owns the perspective, the inner frame
   takes the rotation, and the image sits forward on the Z axis so it lifts
   with the card. */
export default function TiltMedia({ children, className = "", stageClassName = "" }) {
  const frame = useRef(null);

  const handlePointerMove = (event) => {
    if (
      !frame.current ||
      window.matchMedia(
        "(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const bounds = frame.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    frame.current.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    frame.current.style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
  };

  const resetTilt = () => {
    frame.current?.style.setProperty("--tilt-x", "0deg");
    frame.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className={`tilt-media${stageClassName ? ` ${stageClassName}` : ""}`}>
      <div
        className={`tilt-media__frame${className ? ` ${className}` : ""}`}
        onPointerLeave={resetTilt}
        onPointerMove={handlePointerMove}
        ref={frame}
      >
        {children}
      </div>
    </div>
  );
}
