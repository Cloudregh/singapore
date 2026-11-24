"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Card } from "@/lib/content";

type Access = { cards: Card[] | null; setCards: (c: Card[] | null) => void };

const Ctx = createContext<Access>({ cards: null, setCards: () => {} });

/** Holds the delegate-only content returned by a successful name lookup. */
export function AccessProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[] | null>(null);
  return <Ctx.Provider value={{ cards, setCards }}>{children}</Ctx.Provider>;
}

export const useAccess = () => useContext(Ctx);
