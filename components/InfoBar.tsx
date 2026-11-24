"use client";

import { useState, type FormEvent } from "react";
import { useAccess } from "./Access";
import type { Card } from "@/lib/content";
import Itinerary, { type Day } from "./Itinerary";
import { Search } from "lucide-react";


type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "done"; matches: string[]; itinerary: Day[] };

export default function InfoBar() {
  const [name, setName] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const { setCards } = useAccess();
  const [picked, setPicked] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setState({ kind: "loading" });
    setPicked(null);
    setCards(null);
    try {
      const res = await fetch("/api/delegate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      const { matches, itinerary, cards } = (await res.json()) as {
        matches: string[];
        itinerary: Day[];
        cards: Card[];
      };
      setState({ kind: "done", matches, itinerary });
      setCards(matches.length ? cards : null);
      if (matches.length === 1) setPicked(matches[0]);
    } catch {
      setState({ kind: "error" });
    }
  }

  const matches = state.kind === "done" ? state.matches : [];

  return (
    <div data-infobar className="relative z-10 mx-auto w-full max-w-275 rounded-2xl bg-white p-4 md:p-6">
      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <label htmlFor="delegate-name" className="mb-2 block text-sm text-ink">
            Find Your Travel Itinerary
          </label>
          <input
            id="delegate-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="First name, last name or both"
            className="min-h-11 w-full rounded-full border border-hair px-5 text-sm text-ink outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          disabled={state.kind === "loading"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-strong disabled:opacity-60"
        >
          <Search className="size-4" strokeWidth={1.75} aria-hidden />
          {state.kind === "loading" ? "Searching…" : "View Itinerary"}
        </button>
      </form>

      <div aria-live="polite" className="empty:hidden">
        {state.kind === "error" && (
          <p className="mt-4 text-sm text-ink">Something went wrong. Please try again.</p>
        )}
        {state.kind === "done" && matches.length === 0 && (
          <p className="mt-4 text-sm text-ink">
            We couldn&rsquo;t find that name. Check the spelling or try just your first or last name.
          </p>
        )}
        {matches.length > 1 && !picked && (
          <div className="mt-4">
            <p className="text-sm text-muted">Several delegates match. Which one are you?</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {matches.map((m) => (
                <li key={m}>
                  <button
                    type="button"
                    onClick={() => setPicked(m)}
                    className="min-h-11 rounded-full border border-hair px-4 text-sm text-ink hover:border-accent hover:text-accent"
                  >
                    {m}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {picked && state.kind === "done" && <Itinerary name={picked} days={state.itinerary} />}
      </div>
    </div>
  );
}
