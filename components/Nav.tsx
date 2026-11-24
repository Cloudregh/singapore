"use client";

import { useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import { event } from "@/lib/content";

const links = [
  { href: "#topics", label: "Topics" },
  { href: "#about", label: "About" },
  { href: "#package", label: "Package" },
  { href: "#faculty", label: "Faculty" },
  { href: "#details", label: "Details" },
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className={`font-display text-2xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}
      aria-label="Study and Tour in Singapore — home"
    >
      Study<span className="text-gold">&amp;</span>Tour
      <span className={`ml-1 align-super text-[0.55em] font-semibold ${light ? "text-white/80" : "text-primary"}`}>
        SG
      </span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header data-hero-nav className="relative z-20 flex items-center justify-between gap-4 px-5 pt-5 md:px-10 md:pt-7">
      <Wordmark light />

      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-md">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium text-white/90 transition-colors duration-200 hover:bg-white hover:text-ink"
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
          className="hidden min-h-11 items-center rounded-full border border-white/60 px-5 text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-white hover:text-ink sm:inline-flex"
        >
          Register Now
        </a>
        <a
          href={`mailto:${event.email}`}
          aria-label="Email the organisers"
          className="hidden size-11 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-200 hover:bg-white hover:text-ink sm:inline-flex"
        >
          <UserRound className="size-5" aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-3xl bg-white p-3 shadow-[var(--shadow-float)] lg:hidden"
        >
          <ul className="grid">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-2xl px-4 font-medium text-ink hover:bg-primary-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-primary font-semibold text-white"
              >
                Register Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
