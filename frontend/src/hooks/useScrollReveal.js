import { useLayoutEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const REVEAL_SELECTOR = [
  ".premium-card",
  "article",
  "table",
  "[data-scroll-reveal]",
].join(", ");

const REVEAL_PATTERNS = [
  { x: -180, y: 108, scale: 0.82, rotate: -3.5 },
  { x: 168, y: -74, scale: 0.8, rotate: 3.5 },
  { x: -92, y: 148, scale: 0.86, rotate: -2.2 },
  { x: 132, y: 132, scale: 0.78, rotate: 2.4 },
];

const REDUCED_REVEAL_PATTERNS = [
  { x: -28, y: 22, scale: 0.98, rotate: -0.4 },
  { x: 24, y: -18, scale: 0.98, rotate: 0.4 },
  { x: -18, y: 30, scale: 0.985, rotate: -0.25 },
  { x: 22, y: 24, scale: 0.98, rotate: 0.25 },
];

function shouldSkipReveal(element) {
  return Boolean(
    element.closest(".hero-cinematic-root") ||
      element.closest("[data-no-scroll-reveal]") ||
      element.closest("header") ||
      element.closest("footer"),
  );
}

function setRevealPattern(element, index, prefersReducedMotion) {
  const patterns = prefersReducedMotion ? REDUCED_REVEAL_PATTERNS : REVEAL_PATTERNS;
  const pattern = patterns[index % patterns.length];

  element.classList.add("scroll-reveal-target");
  element.style.setProperty("--reveal-x", `${pattern.x}px`);
  element.style.setProperty("--reveal-y", `${pattern.y}px`);
  element.style.setProperty("--reveal-scale", pattern.scale);
  element.style.setProperty("--reveal-rotate", `${pattern.rotate}deg`);
  element.style.setProperty("--reveal-delay", `${(index % 4) * 180}ms`);
}

export function useScrollReveal(containerRef, routeKey) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = containerRef.current;

    if (!root) {
      return undefined;
    }

    const observedElements = new WeakSet();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("scroll-reveal-visible");
          intersectionObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    const registerElements = () => {
      const candidates = Array.from(root.querySelectorAll(REVEAL_SELECTOR)).filter(
        (element) => !shouldSkipReveal(element),
      );

      candidates.forEach((element, index) => {
        if (!element.dataset.revealBound) {
          element.dataset.revealBound = "true";
          setRevealPattern(element, index, prefersReducedMotion);
        }

        if (observedElements.has(element)) {
          return;
        }

        observedElements.add(element);

        intersectionObserver.observe(element);
      });
    };

    registerElements();

    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [containerRef, prefersReducedMotion, routeKey]);
}
