"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { cards } from "@/lib/content";

const filters = [
  { id: "all", label: "All" },
  { id: "conference", label: "Conference Topics" },
  { id: "tour", label: "Singapore Highlights" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function Topics() {
  const [filter, setFilter] = useState<FilterId>("all");
  const track = useRef<HTMLUListElement>(null);
  const first = useRef(true);
  const visible = filter === "all" ? cards : cards.filter((c) => c.kind === filter);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(Array.from(el.children), {
      opacity: [0, 1],
      x: [60, 0],
      duration: 700,
      delay: stagger(80),
      ease: "out(4)",
    });
  }, [filter]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="topics" aria-labelledby="topics-title" className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
      <div data-reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            <Sparkles className="size-4" aria-hidden /> What you&rsquo;ll learn &amp; see
          </p>
          <h2 id="topics-title" className="max-w-2xl text-4xl font-bold md:text-5xl">
            Four topics. One remarkable city.
          </h2>
        </div>
      </div>

      <div data-reveal className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter cards" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={`min-h-11 rounded-full border px-5 text-[0.95rem] font-medium transition-colors duration-200 ${
                  on ? "border-primary bg-primary-soft text-primary" : "border-transparent text-ink hover:border-line"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous cards"
            className="inline-flex size-11 items-center justify-center rounded-full border border-primary text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next cards"
            className="inline-flex size-11 items-center justify-center rounded-full border border-primary text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        data-stagger
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-6 md:-mx-10 md:scroll-px-10 md:px-10"
      >
        {visible.map((c, i) => (
          <li key={c.id} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(25%-18px)]">
            <article className="group">
              <div
                className={`relative overflow-hidden rounded-[var(--radius-card)] bg-primary-tint ${
                  i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/4.4]"
                }`}
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 46vw, 80vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                  {c.tag}
                </span>
              </div>
              <div className="pt-5">
                <p className="mb-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-4" aria-hidden /> Singapore · {c.meta}
                </p>
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{c.blurb}</p>
                {c.kind === "conference" && (
                  <a
                    href="#details"
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:text-primary-strong"
                  >
                    Included in programme
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
