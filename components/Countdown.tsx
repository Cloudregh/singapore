"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/content";

type Parts = { d: number; h: number; m: number; s: number };

const start = new Date(event.startsAt).getTime();
const end = new Date(event.endsAt).getTime();

function compute(now: number): Parts | "live" | "ended" {
  if (now >= end) return "ended";
  if (now >= start) return "live";
  const diff = Math.floor((start - now) / 1000);
  return {
    d: Math.floor(diff / 86400),
    h: Math.floor((diff % 86400) / 3600),
    m: Math.floor((diff % 3600) / 60),
    s: diff % 60,
  };
}

export default function Countdown() {
  // null until mounted: the clock is client-only, so SSR renders placeholders.
  const [state, setState] = useState<ReturnType<typeof compute> | null>(null);

  useEffect(() => {
    const tick = () => setState(compute(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (state === "live" || state === "ended") {
    return (
      <p className="rounded-xl border border-hair px-5 py-4 font-display text-xl font-medium text-ink">
        {state === "live" ? "The conference is happening now in Singapore." : "This edition has ended — register for the next one."}
      </p>
    );
  }

  const cells: [string, number | undefined][] = [
    ["Days", state?.d],
    ["Hours", state?.h],
    ["Minutes", state?.m],
    ["Seconds", state?.s],
  ];

  return (
    <div role="timer" aria-label="Time until the conference starts" className="grid grid-cols-4 gap-2 sm:gap-3">
      {cells.map(([label, v]) => (
        <div key={label} className="rounded-xl border border-hair px-2 py-4 text-center">
          <span className="block font-display text-3xl font-semibold tabular-nums text-ink sm:text-4xl">
            {v === undefined ? "--" : String(v).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
