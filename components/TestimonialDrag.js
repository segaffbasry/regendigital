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
    let autoSpeed = 0.42;

    function wrapOffset() {
      if (!groupWidth) return;
      while (offset <= -groupWidth) offset += groupWidth;
      while (offset > 0) offset -= groupWidth;
    }

    function render() {
      wrapOffset();
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    function tick() {
      if (!dragging) {
        if (Math.abs(velocity) > 0.05) {
          offset += velocity;
          velocity *= 0.9;
        } else if (!reduceMotion) {
          velocity = 0;
          const targetSpeed = hovering ? 0.055 : 0.42;
          const easing = hovering ? 0.075 : 0.055;
          autoSpeed += (targetSpeed - autoSpeed) * easing;
          offset -= autoSpeed;
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

    marquee.addEventListener("pointerdown", handlePointerDown);
    marquee.addEventListener("pointermove", handlePointerMove);
    marquee.addEventListener("pointerup", endDrag);
    marquee.addEventListener("pointercancel", endDrag);
    marquee.addEventListener("pointerenter", handlePointerEnter);
    marquee.addEventListener("pointerleave", handlePointerLeave);
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
      window.removeEventListener("resize", measure);
      marquee.classList.remove("is-dragging");
      track.style.removeProperty("transform");
    };
  }, []);

  return <span ref={controller} hidden />;
}
