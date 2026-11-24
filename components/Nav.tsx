"use client";

import { useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import { event } from "@/lib/content";

const links = [
  { href: "#top", label: "Home" },
  { href: "#topics", label: "Topics" },
  { href: "#about", label: "About" },
  { href: "#package", label: "Package" },
  { href: "#facilitators", label: "Facilitators" },
  { href: "#details", label: "Contact" },
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className={`font-display text-[1.6rem] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}
      aria-label="Study and Tour Singapore — home"
    >
      Study<span className={light ? "text-gold" : "text-accent"}>Tour</span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header data-hero-nav className="relative z-20 flex items-center justify-between gap-4 px-5 pt-5 md:px-14 md:pt-8">
      <Wordmark light />

      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center text-[0.95rem] text-white transition-opacity duration-200 hover:opacity-70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={event.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center rounded-full border border-white px-5 text-[0.95rem] text-white transition-colors duration-200 hover:bg-white hover:text-ink sm:inline-flex"
        >
          Register Now
        </a>
        <a
          href={`mailto:${event.email}`}
          aria-label="Email the organisers"
          className="hidden size-11 items-center justify-center rounded-full border border-white text-white transition-colors duration-200 hover:bg-white hover:text-ink sm:inline-flex"
        >
          <UserRound className="size-5" strokeWidth={1.5} aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white text-white lg:hidden"
        >
          {open ? <X className="size-5" strokeWidth={1.5} aria-hidden /> : <Menu className="size-5" strokeWidth={1.5} aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-2xl border border-hair bg-white p-2 lg:hidden"
        >
          <ul className="grid divide-y divide-hair">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center px-4 text-ink hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-accent font-medium text-white"
          >
            Register Now
          </a>
        </nav>
      )}
    </header>
  );
}
