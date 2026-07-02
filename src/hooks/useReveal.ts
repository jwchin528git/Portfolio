import { useEffect, useRef } from "react";

/**
 * Adds the `in` class to the element once it scrolls into view (one-shot).
 * Mirrors the design's reveal-on-scroll behaviour.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; delay?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const apply = () => el.classList.add("in");
            if (options?.delay) setTimeout(apply, options.delay);
            else apply();
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: options?.threshold ?? 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [options?.threshold, options?.delay]);

  return ref;
}
