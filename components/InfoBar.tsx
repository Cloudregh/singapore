"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { animate, stagger } from "animejs";
import {
  ArrowUpRight,
  BedDouble,
  CalendarCheck2,
  CalendarDays,
  CalendarX2,
  DollarSign,
  MapPin,
  Mic2,
  Moon,
  PlaneTakeoff,
  Stamp,
  Ticket,
} from "lucide-react";
import { event } from "@/lib/content";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Field = { label: string; value: string; icon: Icon };

const tabs: { id: string; label: string; icon: Icon; fields: Field[] }[] = [
  {
    id: "conference",
    label: "Conference",
    icon: Mic2,
    fields: [
      { label: "Location", value: "Singapore", icon: MapPin },
      { label: "Starts", value: event.startLabel, icon: CalendarDays },
      { label: "Ends", value: event.endLabel, icon: CalendarX2 },
      { label: "Rate / delegate", value: event.rate, icon: DollarSign },
    ],
  },
  {
    id: "flight",
    label: "Flight & Visa",
    icon: PlaneTakeoff,
    fields: [
      { label: "Destination", value: "Singapore", icon: MapPin },
      { label: "Ticket", value: "Return, included", icon: Ticket },
      { label: "Visa", value: "Included", icon: Stamp },
      { label: "Travel window", value: event.dateLabel, icon: CalendarDays },
    ],
  },
  {
    id: "hotel",
    label: "Hotel",
    icon: BedDouble,
    fields: [
      { label: "Stay", value: "4-Star Hotel", icon: BedDouble },
      { label: "Check in", value: event.startLabel, icon: CalendarCheck2 },
      { label: "Check out", value: event.endLabel, icon: CalendarX2 },
      { label: "Duration", value: "1 week", icon: Moon },
    ],
  },
];

export default function InfoBar() {
  const [active, setActive] = useState(tabs[0].id);
  const fieldsRef = useRef<HTMLDListElement>(null);
  const first = useRef(true);
  const tab = tabs.find((t) => t.id === active)!;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!fieldsRef.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(Array.from(fieldsRef.current.children), {
      opacity: [0, 1],
      y: [12, 0],
      duration: 450,
      delay: stagger(60),
      ease: "out(3)",
    });
  }, [active]);

  return (
    <div
      data-infobar
      className="relative z-10 mx-auto w-full max-w-275 rounded-2xl bg-white"
    >
      <div role="tablist" aria-label="Package details" className="flex gap-4 overflow-x-auto border-b border-hair px-4 pt-2 no-scrollbar md:gap-6 md:px-6">
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls="infobar-panel"
              onClick={() => setActive(t.id)}
              className={`relative inline-flex min-h-12 shrink-0 items-center gap-2 text-sm transition-colors duration-200 ${
                selected ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              <t.icon className="size-4" strokeWidth={1.5} aria-hidden />
              {t.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-px bg-accent transition-transform duration-300 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        id="infobar-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab.id}`}
        className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-end md:px-6 md:pb-6 md:pt-5"
      >
        <dl ref={fieldsRef} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tab.fields.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="mb-2 text-sm text-ink">{f.label}</dt>
              <dd className="flex min-h-11 items-center gap-2.5 rounded-full border border-hair px-4 text-sm text-ink">
                <f.icon className="size-4 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
                <span className="truncate">{f.value}</span>
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={event.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-strong"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          Reserve Seat
        </a>
      </div>
    </div>
  );
}
