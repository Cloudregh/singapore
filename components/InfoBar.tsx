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
      className="relative z-10 mx-auto -mt-28 w-[calc(100%-2rem)] max-w-6xl rounded-[1.75rem] bg-white shadow-[var(--shadow-float)] md:-mt-32 md:w-[calc(100%-5rem)]"
    >
      <div role="tablist" aria-label="Package details" className="flex gap-1 overflow-x-auto border-b border-line px-4 pt-3 no-scrollbar md:px-6">
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
              className={`relative inline-flex min-h-12 shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors duration-200 ${
                selected ? "text-primary" : "text-muted hover:text-ink"
              }`}
            >
              <t.icon className="size-4" aria-hidden />
              {t.label}
              <span
                aria-hidden
                className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary transition-transform duration-300 ${
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
        className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-end md:p-6"
      >
        <dl ref={fieldsRef} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tab.fields.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="mb-2 text-sm font-medium text-ink">{f.label}</dt>
              <dd className="flex min-h-12 items-center gap-2 rounded-full border border-line px-4 text-[0.95rem] text-ink">
                <f.icon className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="truncate">{f.value}</span>
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={event.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-white shadow-[0_12px_24px_-12px_rgb(11_95_199/0.8)] transition-all duration-200 hover:bg-primary-strong active:scale-[0.98]"
        >
          Reserve Seat
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
