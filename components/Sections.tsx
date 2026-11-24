import Image from "next/image";
import { ArrowUpRight, Asterisk, Globe, Mail, Phone } from "lucide-react";
import partners from "@/assets/images/partners.png";
import Countdown from "./Countdown";
import { Wordmark } from "./Nav";
import { event, facilitators, images, pillars } from "@/lib/content";

const btn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-strong";

/* ── Partners: a single hairline row under the hero ─────────── */
export function Partners() {
  return (
    <section aria-label="Partners" className="bg-white px-5 md:px-14">
      <div data-reveal className="flex flex-col items-center gap-4 border-b border-hair py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted">In Partnership With</p>
        <Image
          src={partners}
          alt="Partner logos: African Institute of Sanitation & Waste Management, The Edge Faculty, KNUST and Stratbridge"
          className="h-auto w-full max-w-105"
        />
      </div>
    </section>
  );
}

/* ── Our Story ──────────────────────────────────────────────── */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-5 pt-20 md:px-14 md:pt-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <h2 id="about-title" data-reveal className="max-w-md text-[2rem] font-semibold md:text-[2.6rem]">
            Our Story: Driven By Strategy, Powered By Singapore
          </h2>

          <div data-reveal className="mt-10 grid grid-cols-[1fr_1fr] items-start gap-6">
            <div className="relative aspect-[4/3.3] overflow-hidden rounded-2xl">
              <Image
                src={images.jewel}
                alt="Inside Jewel Changi Airport: a glass dome over an indoor forest"
                fill
                sizes="(min-width:1024px) 18vw, 45vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div className="pt-1">
              <Asterisk className="mb-8 size-6 text-accent" strokeWidth={2} aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                We Bring Leaders To The City That Turned Vision And Disciplined Execution Into One Of The
                World&rsquo;s Leading Business Hubs. Join Us And Let&rsquo;s Turn Strategy Into Results.
              </p>
            </div>
          </div>
        </div>

        <div>
          <ul data-reveal className="mb-6 flex flex-wrap gap-2 lg:justify-end" aria-label="Programme themes">
            {["Study", "Tour", "Network"].map((t, i) => (
              <li
                key={t}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  i === 0 ? "border-accent text-accent" : "border-hair text-ink"
                }`}
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
            <div data-reveal className="relative aspect-[4/4.6] overflow-hidden rounded-2xl">
              <Image
                src={images.mbsNight}
                alt="Marina Bay Sands under a starry night sky"
                fill
                sizes="(min-width:1024px) 24vw, 90vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div data-reveal data-delay="120" className="flex flex-col">
              <h3 className="text-xl font-medium leading-snug">
                We Believe Leadership Is Learned Best Where Strategy Comes To Life
              </h3>
              <p className="mt-3 text-sm text-muted">
                One Week Of Sessions, Site Visits And Conversations With Fellow Leaders — In A City Built On
                Long-Term Thinking.
              </p>
              <a href="#package" className={`${btn} mt-8 self-start sm:mt-auto`}>
                View Package
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Package: bordered row with fading hairlines ────────────── */
export function Package() {
  return (
    <section id="package" aria-labelledby="package-title" className="px-5 pt-24 md:px-14 md:pt-32">
      <div data-reveal className="text-center">
        <h2 id="package-title" className="text-[2rem] font-semibold md:text-[2.75rem]">
          Everything In Your Package
        </h2>
        <p className="mt-3 text-sm text-muted">One Rate Covers Your Stay, Your Travel And The Full Programme.</p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="hairline-x h-px" aria-hidden />
        <ol data-stagger className="grid sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li
              key={p.n}
              className={`bg-white/40 px-7 py-8 ${i > 0 ? "border-hair-strong lg:border-l" : ""} ${
                i % 2 === 1 ? "sm:border-l" : ""
              } ${i < 2 ? "max-lg:border-b max-lg:border-hair-strong" : ""}`}
            >
              <span className="grid size-11 place-items-center rounded-full bg-white font-display text-sm font-semibold italic text-accent">
                {p.n}
              </span>
              <h3 className="mt-7 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
        <div className="hairline-x h-px" aria-hidden />
      </div>
    </section>
  );
}

/* ── Facilitators: flat white cards, like the reviews row ───── */
export function Facilitators() {
  return (
    <section id="facilitators" aria-labelledby="facilitators-title" className="px-5 pt-24 md:px-14 md:pt-32">
      <h2 id="facilitators-title" data-reveal className="mb-10 text-[2rem] font-semibold md:text-[2.75rem]">
        Meet Your Facilitators
      </h2>

      <ul data-stagger className="grid gap-5 md:grid-cols-2">
        {facilitators.map((f) => (
          <li key={f.name}>
            <article className="grid h-full grid-cols-[auto_1fr] gap-5 rounded-2xl bg-white p-4 md:gap-7 md:p-5">
              {f.photo ? (
                <div className="relative size-28 overflow-hidden rounded-xl bg-accent-soft sm:size-40 lg:size-52">
                  <Image
                    src={f.photo}
                    alt={`Portrait of ${f.name}`}
                    fill
                    sizes="(min-width:1024px) 208px, (min-width:640px) 160px, 112px"
                    placeholder="blur"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  aria-hidden
                  className="grid size-28 place-items-center rounded-xl bg-accent-soft font-display text-3xl font-semibold text-accent sm:size-40 sm:text-5xl lg:size-52"
                >
                  {f.initials}
                </div>
              )}
              <div className="flex flex-col py-1">
                <p className="text-[0.95rem] leading-relaxed text-ink md:text-lg">
                  Facilitator, 1-Week Strategic Leadership Conference In Singapore.
                </p>
                <div className="mt-auto pt-6">
                  <h3 className="text-lg font-medium">{f.name}</h3>
                  <p className="text-sm text-muted">{f.role}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Details: rate, dates, countdown ────────────────────────── */
export function Details() {
  const rows = [
    { k: "Rate", v: `${event.rate} Per Delegate` },
    { k: "Date", v: "28th Nov – 5th Dec" },
    { k: "Location", v: "Singapore" },
    { k: "Includes", v: "4-Star Hotel, Return Ticket & Visa" },
  ];
  return (
    <section id="details" aria-labelledby="details-title" className="px-5 pt-24 md:px-14 md:pt-32">
      <div className="grid overflow-hidden rounded-2xl bg-white lg:grid-cols-2">
        <div data-reveal className="p-6 md:p-10">
          <h2 id="details-title" className="text-[2rem] font-semibold md:text-[2.75rem]">
            Conference Details
          </h2>
          <dl className="mt-8 divide-y divide-hair border-y border-hair">
            {rows.map((r) => (
              <div key={r.k} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-muted">{r.k}</dt>
                <dd className="text-right font-medium">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal data-delay="120" className="border-hair p-6 md:p-10 max-lg:border-t lg:border-l">
          <p className="text-sm text-muted">Conference Begins In</p>
          <div className="mt-4">
            <Countdown />
          </div>
          <a href={event.registerUrl} target="_blank" rel="noopener noreferrer" className={`${btn} mt-6 w-full`}>
            Register Now <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          </a>
          <div className="mt-6 grid gap-1 text-sm sm:grid-cols-2">
            <a href={`mailto:${event.email}`} className="flex min-h-11 items-center gap-2 text-ink underline-offset-4 hover:underline">
              <Mail className="size-4" strokeWidth={1.5} aria-hidden /> {event.email}
            </a>
            <a href={event.phoneHref} className="flex min-h-11 items-center gap-2 text-ink underline-offset-4 hover:underline">
              <Phone className="size-4" strokeWidth={1.5} aria-hidden /> {event.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA with staggered photo row ───────────────────────────── */
const gallery = [
  { src: images.merlion, alt: "The Merlion at night", cls: "mt-12 h-36 w-24 md:h-56 md:w-40" },
  { src: images.delegates, alt: "Delegates in a conference session", cls: "h-32 w-24 md:h-48 md:w-32" },
  { src: images.supertrees, alt: "Supertrees at Gardens by the Bay", cls: "mt-12 h-36 w-32 md:h-56 md:w-48" },
  { src: images.handshake, alt: "Two professionals shaking hands", cls: "h-32 w-24 md:h-48 md:w-32" },
  { src: images.mbsNight, alt: "Marina Bay Sands at night", cls: "mt-12 h-36 w-24 md:h-56 md:w-44" },
];

export function Cta() {
  return (
    <section aria-labelledby="cta-title" className="overflow-hidden pt-24 md:pt-32">
      <div data-reveal className="mx-auto max-w-2xl px-5 text-center">
        <h2 id="cta-title" className="text-[2rem] font-semibold md:text-[2.75rem]">
          Plan Your Leadership Journey With Confidence And Ease
        </h2>
        <p className="mt-4 text-sm text-muted">Register To Reserve Your Seat For The Singapore Conference.</p>
        <a href={event.registerUrl} target="_blank" rel="noopener noreferrer" className={`${btn} mt-7`}>
          Reserve Your Seat
        </a>
      </div>

      <div data-stagger className="mt-10 flex items-start justify-center gap-3 px-3 md:gap-8">
        {gallery.map((g, i) => (
          <div key={i} className={`shrink-0 ${i === 0 || i === 4 ? "hidden sm:block" : ""}`}>
            <div data-float className={`relative overflow-hidden rounded-lg ${g.cls}`}>
              <Image src={g.src} alt={g.alt} fill sizes="200px" placeholder="blur" className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
export function Footer() {
  const cols = [
    {
      title: "Programme",
      links: [
        { label: "Topics", href: "#topics" },
        { label: "Package", href: "#package" },
        { label: "Facilitators", href: "#facilitators" },
      ],
    },
    {
      title: "See More",
      links: [
        { label: "Our Story", href: "#about" },
        { label: "Details", href: "#details" },
        { label: "Register", href: event.registerUrl },
      ],
    },
  ];
  return (
    <footer className="bg-[#f3f7fc] px-5 pb-28 pt-20 md:px-14 md:pb-14 md:pt-24">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink">
            A 1-Week Strategic Leadership Conference In Singapore, {event.dateLabel}. Presented With AISWAM, The
            Edge Faculty, KNUST And Stratbridge.
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="mb-3 text-lg font-medium">{c.title}</h3>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-flex min-h-10 items-center text-sm text-ink hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h3 className="mb-3 text-lg font-medium">Contact</h3>
          <ul className="text-sm text-ink">
            <li>
              <a href={`mailto:${event.email}`} className="inline-flex min-h-10 items-center gap-2 underline underline-offset-2 hover:text-accent">
                <Mail className="size-4" strokeWidth={1.5} aria-hidden /> {event.email}
              </a>
            </li>
            <li>
              <a href={event.phoneHref} className="inline-flex min-h-10 items-center gap-2 hover:text-accent">
                <Phone className="size-4" strokeWidth={1.5} aria-hidden /> {event.phone}
              </a>
            </li>
            <li>
              <a href={event.registerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 hover:text-accent">
                <Globe className="size-4" strokeWidth={1.5} aria-hidden /> {event.registerLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-14 border-t border-hair-strong pt-6 text-xs text-muted">
        Photography Via Pexels. Partner Logos Belong To Their Respective Institutions.
      </p>
    </footer>
  );
}

/* ── Mobile sticky register ─────────────────────────────────── */
export function MobileCta() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <a
        href={event.registerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-13 items-center justify-between rounded-full border border-hair bg-white py-1.5 pl-5 pr-1.5 text-ink"
      >
        <span className="text-sm">
          {event.dateLabel} · <span className="font-medium">{event.rate}</span>
        </span>
        <span className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-white">
          Register
        </span>
      </a>
    </div>
  );
}
