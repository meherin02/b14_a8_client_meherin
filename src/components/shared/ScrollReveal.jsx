"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className }) {
  const root = useRef(null);

  useEffect(() => {
    const container = root.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.removeAttribute("data-reveal-pending");
          observer.unobserve(target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );
    const seen = new WeakSet();
    function discover() {
      container
        .querySelectorAll("section > div:first-child, article, figure")
        .forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          element.classList.add("scroll-reveal");
          // Keep everything already visible readable, including after refresh.
          if (
            !motion.matches &&
            element.getBoundingClientRect().top > window.innerHeight
          ) {
            element.setAttribute("data-reveal-pending", "");
            observer.observe(element);
          }
        });
    }
    function revealAll() {
      if (!motion.matches) return;
      container.querySelectorAll("[data-reveal-pending]").forEach((element) => {
        element.removeAttribute("data-reveal-pending");
      });
      observer.disconnect();
    }
    discover();
    // Events arrive asynchronously; animate those cards as well.
    const changes = new MutationObserver(discover);
    changes.observe(container, { childList: true, subtree: true });
    motion.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      changes.disconnect();
      motion.removeEventListener("change", revealAll);
      container.querySelectorAll("[data-reveal-pending]").forEach((element) => {
        element.removeAttribute("data-reveal-pending");
      });
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
