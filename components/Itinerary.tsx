"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import {
  ArrowRight,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Luggage,
  MapPin,
  PlaneTakeoff,
  Presentation,
} from "lucide-react";
import { hotel } from "@/lib/content";

export type Item = { kind: string; text: string; detail?: string };
export type Day = { date: string; title: string; items: Item[] };

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const kinds: Record<string, { label: string; icon: Icon; tone: string; dot: string }> = {
  flight: { label: "Flight", icon: PlaneTakeoff, tone: "bg-accent-soft text-accent", dot: "bg-accent" },
  hotel: { label: "Hotel", icon: BedDouble, tone: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  conference: { label: "Conference", icon: Presentation, tone: "bg-indigo-50 text-indigo-700", dot: "bg-indigo-500" },
  tour: { label: "Tour", icon: MapPin, tone: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  free: { label: "Free time", icon: Luggage, tone: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
};
const fallback = kinds.free;

const parts = (date: string) => {
  const [w, d, m] = date.split(" ");
  return { w, d, m };
};

/** "ET 920 · Accra (ACC) → Addis Ababa (ADD)" → route codes, flight number, city names. */
function parseFlight(text: string) {
  const m = text.match(/^(.*?) · (.*?) \((\w{3})\) → (.*?) \((\w{3})\)/);
  return m ? { no: m[1], from: m[2], fromCode: m[3], to: m[4], toCode: m[5] } : null;
}

/** "Departs 12:05 pm, Terminal 3 · Arrives 8:45 pm · Economy" → two time cells plus small tags. */
function Detail({ text }: { text: string }) {
  const bits = text.split(" · ");
  const times = bits.filter((b) => /^(Departs|Arrives) /.test(b));
  const tags = bits.filter((b) => !/^(Departs|Arrives) /.test(b));
  return (
    <div className="mt-3 grid gap-2">
      {times.length > 0 && (
        <dl className="grid grid-cols-2 gap-2">
          {times.map((t) => {
            const [label, ...rest] = t.split(" ");
            return (
              <div key={t} className="rounded-lg bg-accent-soft px-3 py-2">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="font-medium text-ink">{rest.join(" ")}</dd>
              </div>
            );
          })}
        </dl>
      )}
      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-hair px-2.5 py-1 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Itinerary({ name, days }: { name: string; days: Day[] }) {
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  const panel = useRef<HTMLOListElement>(null);
  const first = useRef(true);
  const day = days[active];

  const flights = days.flatMap((d) => d.items).filter((i) => i.kind === "flight").length;
  const tours = days.filter((d) => d.items.some((i) => i.kind === "tour")).length;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!panel.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(Array.from(panel.current.children), {
      opacity: [0, 1],
      x: [-18, 0],
      duration: 500,
      delay: stagger(80),
      ease: "out(3)",
    });
  }, [active]);

  const go = (i: number) => setActive(Math.min(days.length - 1, Math.max(0, i)));
  const nav =
    "inline-flex size-11 items-center justify-center rounded-full border border-hair text-ink transition-colors duration-200 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="mt-5 border-t border-hair pt-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Your itinerary</p>
          <h3 className="font-display text-2xl font-semibold text-ink">Welcome, {name}</h3>
        </div>
        <ul className="flex flex-wrap gap-2 text-xs text-ink">
          {[`${days.length} days`, `${flights} flights`, `${tours} tour days`].map((c) => (
            <li key={c} className="rounded-full bg-accent-soft px-3 py-1.5 text-accent">
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Day rail */}
      <div role="tablist" aria-label="Itinerary days" className="no-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1">
        {days.map((d, i) => {
          const { w, d: n, m } = parts(d.date);
          const on = i === active;
          return (
            <button
              key={d.date}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="itinerary-day"
              onClick={() => setActive(i)}
              className={`flex min-h-20 w-14 shrink-0 flex-col sm:w-16 items-center justify-center rounded-2xl border text-center transition-all duration-200 ${
                on
                  ? "-translate-y-0.5 border-accent bg-accent text-white"
                  : "border-hair bg-white text-ink hover:border-accent"
              }`}
            >
              <span className={`text-[0.7rem] uppercase tracking-wide ${on ? "text-white/80" : "text-muted"}`}>{w}</span>
              <span className="font-display text-xl font-semibold leading-tight">{n}</span>
              <span className={`text-[0.7rem] ${on ? "text-white/80" : "text-muted"}`}>{m}</span>
              <span className="mt-1 flex gap-0.5" aria-hidden>
                {[...new Set(d.items.map((it) => it.kind))].map((k) => (
                  <span key={k} className={`size-1.5 rounded-full ${on ? "bg-white" : (kinds[k] ?? fallback).dot}`} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      {/* Day detail */}
      <div id="itinerary-day" role="tabpanel" className="mt-4 rounded-2xl bg-lavender p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">
              Day {active + 1} of {days.length} · {day.date}
            </p>
            <h4 className="mt-1 font-display text-xl font-semibold text-ink md:text-2xl">{day.title}</h4>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous day" className={nav}>
              <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
            <button type="button" onClick={() => go(active + 1)} disabled={active === days.length - 1} aria-label="Next day" className={nav}>
              <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>

        <ol ref={panel} className="relative mt-6 grid gap-4 before:absolute before:bottom-4 before:left-4 before:top-4 md:before:left-5 before:w-px before:bg-hair-strong">
          {day.items.map((it) => {
            const k = kinds[it.kind] ?? fallback;
            const flight = it.kind === "flight" ? parseFlight(it.text) : null;
            return (
              <li key={it.text} className="relative flex gap-3 md:gap-4">
                <span className={`relative z-10 grid size-8 shrink-0 md:size-10 place-items-center rounded-full ring-4 ring-lavender ${k.tone}`}>
                  <k.icon className="size-4 md:size-[1.15rem]" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="min-w-0 flex-1 rounded-xl bg-white p-3 text-sm md:p-4 text-ink">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {k.label}
                    {flight && ` · ${flight.no}`}
                  </p>
                  {flight ? (
                    <div className="mt-2 flex items-center gap-3">
                      <div>
                        <p className="font-display text-2xl font-semibold">{flight.fromCode}</p>
                        <p className="text-xs text-muted">{flight.from}</p>
                      </div>
                      <ArrowRight className="size-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                      <div>
                        <p className="font-display text-2xl font-semibold">{flight.toCode}</p>
                        <p className="text-xs text-muted">{flight.to}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1 text-[0.95rem]">{it.text}</p>
                  )}
                  {it.detail && <Detail text={it.detail} />}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Hotel */}
      <section aria-labelledby="hotel-title" className="mt-4 grid gap-5 rounded-2xl border border-hair p-3 text-sm sm:p-4 text-ink md:p-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
            <Image
              key={photo}
              src={hotel.photos[photo].src}
              alt={hotel.photos[photo].alt}
              fill
              sizes="(min-width:1024px) 40vw, 90vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <ul className="mt-2 grid grid-cols-4 gap-2">
            {hotel.photos.map((p, i) => (
              <li key={p.alt}>
                <button
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Show photo ${i + 1}: ${p.alt}`}
                  aria-pressed={i === photo}
                  className={`relative block aspect-[3/2] w-full overflow-hidden rounded-lg border-2 transition-opacity duration-200 ${
                    i === photo ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={p.src} alt="" fill sizes="12vw" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-muted">Your hotel</p>
          <h4 id="hotel-title" className="mt-0.5 font-display text-xl font-semibold">{hotel.name}</h4>
          <p className="mt-1 text-muted">{hotel.address}</p>
          <p className="mt-3">{hotel.blurb}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-accent-soft p-3">
              <dt className="text-xs text-muted">Check-in from</dt>
              <dd className="font-medium text-accent">{hotel.checkIn}</dd>
            </div>
            <div className="rounded-xl bg-accent-soft p-3">
              <dt className="text-xs text-muted">Check-out by</dt>
              <dd className="font-medium text-accent">{hotel.checkOut}</dd>
            </div>
          </dl>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {hotel.facilities.map((f) => (
              <li key={f} className="rounded-full border border-hair px-3 py-1 text-xs">{f}</li>
            ))}
          </ul>
          <a
            href={hotel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex min-h-11 items-center pt-3 text-accent underline-offset-4 hover:underline"
          >
            View hotel website
          </a>
        </div>
      </section>
    </div>
  );
}
