"use client";

import { useLayoutEffect, useRef } from "react";

export default function TestimonialDrag() {
  const controller = useRef(null);

  useLayoutEffect(() => {
    const marquee = controller.current?.closest(".testimonial-marquee");
    const track = marquee?.querySelector(".testimonial-marquee__track");
    const group = track?.querySelector(".testimonial-marquee__group");

    if (!marquee || !track || !group) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let groupWidth = group.getBoundingClientRect().width;
    let offset = 0;
    let lastX = 0;
    let velocity = 0;
    let dragging = false;
    let hovering = false;
    let autoSpeed = 0.5;
    let lastTimestamp = 0;

    function wrapOffset() {
      if (!groupWidth) return;
      while (offset <= -groupWidth) offset += groupWidth;
      while (offset > 0) offset -= groupWidth;
    }

    function render() {
      wrapOffset();
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    function tick(timestamp) {
      const frameScale = lastTimestamp
        ? Math.min((timestamp - lastTimestamp) / (1000 / 60), 3)
        : 1;
      lastTimestamp = timestamp;

      if (!dragging) {
        if (Math.abs(velocity) > 0.05) {
          offset += velocity * frameScale;
          velocity *= Math.pow(0.9, frameScale);
        } else if (!reduceMotion) {
          velocity = 0;
          const targetSpeed = hovering ? 0.09 : 0.5;
          const easing = hovering ? 0.075 : 0.055;
          const frameEasing = 1 - Math.pow(1 - easing, frameScale);
          autoSpeed += (targetSpeed - autoSpeed) * frameEasing;
          offset -= autoSpeed * frameScale;
        }
      }

      render();
      frame = window.requestAnimationFrame(tick);
    }

    function handlePointerDown(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      dragging = true;
      velocity = 0;
      lastX = event.clientX;
      marquee.classList.add("is-dragging");
      marquee.setPointerCapture?.(event.pointerId);
    }

    function handlePointerMove(event) {
      hovering = true;
      if (!dragging) return;

      const delta = event.clientX - lastX;
      lastX = event.clientX;
      offset += delta;
      velocity = delta;
      render();
    }

    function endDrag(event) {
      if (!dragging) return;

      dragging = false;
      marquee.classList.remove("is-dragging");

      if (marquee.hasPointerCapture?.(event.pointerId)) {
        marquee.releasePointerCapture(event.pointerId);
      }
    }

    function measure() {
      groupWidth = group.getBoundingClientRect().width;
      render();
    }

    function handlePointerEnter() {
      hovering = true;
    }

    function handlePointerLeave(event) {
      hovering = false;
      endDrag(event);
    }

    function handleWheel(event) {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      event.preventDefault();
      hovering = true;
      velocity = 0;
      offset -= event.deltaX;
      render();
    }

    function handleKeyDown(event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();
      velocity = 0;
      offset += event.key === "ArrowLeft" ? 180 : -180;
      render();
    }

    function handleFocusIn() {
      hovering = true;
    }

    function handleFocusOut() {
      hovering = false;
    }

    marquee.addEventListener("pointerdown", handlePointerDown);
    marquee.addEventListener("pointermove", handlePointerMove);
    marquee.addEventListener("pointerup", endDrag);
    marquee.addEventListener("pointercancel", endDrag);
    marquee.addEventListener("pointerenter", handlePointerEnter);
    marquee.addEventListener("pointerleave", handlePointerLeave);
    marquee.addEventListener("wheel", handleWheel, { passive: false });
    marquee.addEventListener("keydown", handleKeyDown);
    marquee.addEventListener("focusin", handleFocusIn);
    marquee.addEventListener("focusout", handleFocusOut);
    window.addEventListener("resize", measure);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      marquee.removeEventListener("pointerdown", handlePointerDown);
      marquee.removeEventListener("pointermove", handlePointerMove);
      marquee.removeEventListener("pointerup", endDrag);
      marquee.removeEventListener("pointercancel", endDrag);
      marquee.removeEventListener("pointerenter", handlePointerEnter);
      marquee.removeEventListener("pointerleave", handlePointerLeave);
      marquee.removeEventListener("wheel", handleWheel);
      marquee.removeEventListener("keydown", handleKeyDown);
      marquee.removeEventListener("focusin", handleFocusIn);
      marquee.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("resize", measure);
      marquee.classList.remove("is-dragging");
      track.style.removeProperty("transform");
    };
  }, []);

  return <span ref={controller} hidden />;
}
