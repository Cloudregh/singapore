"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  animate,
  createScope,
  createTimeline,
  splitText,
  stagger,
  utils,
  type Scope,
} from "animejs";

/**
 * Owns every page-level anime.js animation:
 *  - hero entrance timeline (bg zoom, nav, split-word headline, CTA, info bar)
 *  - looping plane + topic ticker
 *  - scroll reveals for [data-reveal] / [data-stagger] / [data-count]
 *  - floating CTA gallery
 * Everything is scoped to the wrapper and reverted on unmount.
 */
export default function Motion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    scope.current = createScope({ root }).add(() => {
      // Counters always resolve to their final value.
      const counters = utils.$("[data-count]");

      if (reduce) {
        counters.forEach((el) => (el.textContent = el.dataset.count ?? ""));
        return;
      }

      /* ── Hero entrance ─────────────────────────────── */
      const { words } = splitText("[data-hero-title]", {
        words: { wrap: "clip" },
      });
      utils.set(words, { y: "110%" });
      utils.set("[data-hero-title]", { opacity: 1 });

      createTimeline({ defaults: { ease: "out(4)", duration: 900 } })
        .add("[data-hero-bg]", { scale: [1.18, 1], duration: 2400, ease: "out(3)" }, 0)
        .add("[data-hero-nav] > *", { y: [-18, 0], opacity: [0, 1], delay: stagger(90) }, 150)
        .add(words, { y: ["110%", "0%"], duration: 1000, delay: stagger(70) }, 350)
        .add("[data-hero-fade]", { y: [24, 0], opacity: [0, 1], delay: stagger(120) }, 900)
        .add("[data-infobar]", { y: [70, 0], opacity: [0, 1], duration: 1100 }, 1050);

      /* ── Ambient loops ─────────────────────────────── */
      animate("[data-plane]", {
        x: ["-12vw", "112vw"],
        y: [{ to: -40, ease: "inOut(2)" }, { to: 20, ease: "inOut(2)" }],
        duration: 16000,
        delay: 1800,
        loop: true,
        ease: "linear",
      });

      animate("[data-float]", {
        y: [0, -10],
        duration: 2600,
        delay: stagger(300),
        ease: "inOut(2)",
        loop: true,
        alternate: true,
      });

      /* ── Scroll reveals ────────────────────────────── */
      const reveal = (el: HTMLElement) => {
        if (el.hasAttribute("data-stagger")) {
          animate(Array.from(el.children), {
            opacity: [0, 1],
            y: [48, 0],
            duration: 900,
            delay: stagger(110),
            ease: "out(4)",
          });
        } else if (el.hasAttribute("data-count")) {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          animate(counter, {
            v: target,
            duration: 1600,
            ease: "out(3)",
            modifier: utils.round(0),
            onUpdate: () => (el.textContent = String(counter.v)),
          });
        } else {
          animate(el, {
            opacity: [0, 1],
            y: [40, 0],
            duration: 950,
            delay: Number(el.dataset.delay ?? 0),
            ease: "out(4)",
          });
        }
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target as HTMLElement);
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
      );
      utils
        .$("[data-reveal], [data-stagger], [data-count]")
        .forEach((el) => io.observe(el));
      observers.push(io);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      scope.current?.revert();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
