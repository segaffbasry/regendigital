"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
} from "react";

export default function StaggerText({
  as: Tag = "h2",
  children,
  className = "",
  lineReveal = false,
  observe = true,
  ...props
}) {
  const element = useRef(null);
  let wordIndex = 0;

  function splitWords(value) {
    return String(value)
      .split(/(\s+)/)
      .map((part) => {
        if (!part || /^\s+$/.test(part)) return part;

        const index = wordIndex++;
        return (
          <span
            className="stagger-word"
            key={`${part}-${index}`}
            style={{ "--word-delay": `${index * 70}ms` }}
          >
            {part}
          </span>
        );
      });
  }

  function processChildren(value) {
    return Children.map(value, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return splitWords(child);
      }

      if (!isValidElement(child)) return child;

      return cloneElement(child, {
        ...child.props,
        children: processChildren(child.props.children),
      });
    });
  }

  useLayoutEffect(() => {
    if (!observe || lineReveal || !element.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle("is-in-view", entry.isIntersecting);
      },
      {
        rootMargin: "-7% 0px -9%",
        threshold: 0.16,
      }
    );

    observer.observe(element.current);
    return () => observer.disconnect();
  }, [lineReveal, observe]);

  return (
    <Tag
      className={`stagger-text ${className}`.trim()}
      data-line-reveal={lineReveal ? "" : undefined}
      data-stagger-text=""
      ref={element}
      {...props}
    >
      {lineReveal ? children : processChildren(children)}
    </Tag>
  );
}
