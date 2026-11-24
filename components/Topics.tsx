"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { BookOpen, ChevronLeft, ChevronRight, Clock3, Landmark, Lock, MapPin } from "lucide-react";
import { useAccess } from "./Access";

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
  const { cards } = useAccess();
  const visible = !cards ? [] : filter === "all" ? cards : cards.filter((c) => c.kind === filter);

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
      x: [48, 0],
      duration: 650,
      delay: stagger(70),
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

  const arrow =
    "inline-flex size-11 items-center justify-center rounded-full border border-accent text-accent transition-colors duration-200 hover:bg-accent hover:text-white";

  return (
    <section id="topics" aria-labelledby="topics-title" className="bg-white px-5 pb-24 pt-20 md:px-14 md:pb-28 md:pt-24">
      <h2 id="topics-title" data-reveal className="mb-8 max-w-xl text-[2rem] font-semibold md:text-[2.75rem]">
        What You&rsquo;ll Learn &amp; Where You&rsquo;ll Be
      </h2>

      {!cards ? (
        <div className="flex flex-col items-center rounded-2xl border border-hair bg-white/60 px-6 py-14 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
            <Lock className="size-5" strokeWidth={1.5} aria-hidden />
          </span>
          <h3 className="mt-5 text-xl font-medium">For Registered Delegates</h3>
          <p className="mt-2 max-w-md text-sm text-muted">
            Enter your name in the itinerary search at the top of the page to unlock the conference topics and
            Singapore highlights.
          </p>
          <a
            href="#delegate-name"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-strong"
          >
            Find My Itinerary
          </a>
        </div>
      ) : (
        <>
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
        <div role="group" aria-label="Filter cards" className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto px-1">
          {filters.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-[0.95rem] sm:px-5 transition-colors duration-200 ${
                  on ? "border-accent text-accent" : "border-transparent text-ink hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="hidden gap-3 sm:flex">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous cards" className={arrow}>
            <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next cards" className={arrow}>
            <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto scroll-px-5 px-5 md:-mx-14 md:scroll-px-14 md:px-14"
      >
        {visible.map((c, i) => (
          <li key={c.id} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc(28%-12px)]">
            <article className="group">
              <div
                className={`relative overflow-hidden rounded-2xl bg-accent-soft ${
                  i % 2 === 0 ? "aspect-4/5" : "aspect-square"
                }`}
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width:1024px) 28vw, (min-width:640px) 44vw, 78vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="space-y-2.5 pt-5">
                <p className="flex items-center gap-2 text-sm text-muted">
                  {c.kind === "conference" ? (
                    <BookOpen className="size-4 text-gold" strokeWidth={1.75} aria-hidden />
                  ) : (
                    <Landmark className="size-4 text-gold" strokeWidth={1.75} aria-hidden />
                  )}
                  <span className="text-ink">{c.tag}</span>
                </p>
                <h3 className="text-xl font-medium md:text-[1.35rem]">{c.title}</h3>
                <p className="flex items-center gap-2 text-muted">
                  <MapPin className="size-[1.1rem]" strokeWidth={1.5} aria-hidden /> Singapore
                </p>
                <p className="flex items-center gap-2 text-muted">
                  <Clock3 className="size-[1.1rem]" strokeWidth={1.5} aria-hidden /> {c.meta}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
        </>
      )}
    </section>
  );
}
