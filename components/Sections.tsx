import Image from "next/image";
import {
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Globe,
  GraduationCap,
  Handshake,
  Mail,
  Phone,
  PlaneTakeoff,
  Sparkle,
  Ticket,
  Users,
} from "lucide-react";
import partners from "@/assets/images/partners.png";
import Countdown from "./Countdown";
import { Wordmark } from "./Nav";
import { event, faculty, images, pillars, topicsTicker } from "@/lib/content";

const eyebrow = "mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary";

/* ── Partners + ticker ──────────────────────────────────────── */
export function Partners() {
  const loop = [...topicsTicker, ...topicsTicker];
  return (
    <section aria-label="Partners" className="pt-16 md:pt-20">
      <div data-reveal className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 md:flex-row md:justify-between md:px-10">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">In partnership with</p>
        <div className="w-full max-w-md rounded-full bg-white px-4 py-2 shadow-[var(--shadow-soft)]">
          <Image
            src={partners}
            alt="Partner logos: African Institute of Sanitation & Waste Management, The Edge Faculty, KNUST and Stratbridge"
            className="h-auto w-full scale-[1.04]"
          />
        </div>
      </div>

      <div className="mt-14 overflow-hidden bg-primary py-5 text-white" aria-hidden>
        <div data-marquee className="flex w-max gap-10 whitespace-nowrap">
          {loop.map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl font-semibold">
              {t}
              <Sparkle className="size-5 fill-gold text-gold" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About / story ──────────────────────────────────────────── */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <div data-reveal className="mb-6 flex flex-wrap gap-2">
            {["Study", "Tour", "Network"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
                  i === 0 ? "border-primary text-primary" : "border-line text-ink"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <h2 id="about-title" data-reveal className="text-4xl font-bold md:text-5xl">
            Driven by strategy, <span className="text-primary">powered by Singapore.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg text-muted">
            Singapore turned vision and disciplined execution into one of the world&rsquo;s leading business
            hubs. For one week, it becomes your classroom — a place to study how great strategy is built,
            and to see the results for yourself.
          </p>

          <dl data-stagger className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { n: 1, l: "week in Singapore" },
              { n: 4, l: "core topics" },
              { n: 4, l: "partner institutions" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span data-count={s.n} className="block font-display text-4xl font-bold text-primary">
                    {s.n}
                  </span>
                  <span className="text-sm text-muted">{s.l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          <div data-reveal className="relative mt-16 aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src={images.jewel}
              alt="Inside Jewel Changi Airport: a glass dome over an indoor forest"
              fill
              sizes="(min-width:1024px) 22vw, 45vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div data-reveal data-delay="150" className="relative aspect-[3/4.4] overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src={images.mbsNight}
              alt="Marina Bay Sands under a starry night sky"
              fill
              sizes="(min-width:1024px) 22vw, 45vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -left-3 top-4 grid size-24 place-items-center rounded-full bg-gold text-ink shadow-[var(--shadow-soft)] md:-left-8"
          >
            <svg data-spin viewBox="0 0 100 100" className="absolute inset-0 size-full">
              <defs>
                <path id="ring" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text className="fill-ink text-[11px] font-semibold uppercase tracking-[0.2em]">
                <textPath href="#ring">Study · Tour · Lead · </textPath>
              </text>
            </svg>
            <PlaneTakeoff className="size-7" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Package pillars (01/02/03/04) ──────────────────────────── */
const pillarIcons = [BedDouble, Ticket, GraduationCap, Handshake];

export function Package() {
  return (
    <section id="package" aria-labelledby="package-title" className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className={eyebrow}>The package</p>
        <h2 id="package-title" className="text-4xl font-bold md:text-5xl">
          Everything handled. You just lead.
        </h2>
        <p className="mt-4 text-lg text-muted">One rate covers your stay, travel and the full programme.</p>
      </div>

      <ol data-stagger className="mt-14 grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-white sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => {
          const Icon = pillarIcons[i];
          return (
            <li
              key={p.n}
              className="group relative border-line p-8 transition-colors duration-300 hover:bg-primary-soft max-lg:border-b sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-full border border-primary font-display text-sm font-semibold text-primary">
                  {p.n}
                </span>
                <Icon className="size-7 text-gold-deep transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{p.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ── Faculty ────────────────────────────────────────────────── */
export function Faculty() {
  return (
    <section id="faculty" aria-labelledby="faculty-title" className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">
      <div data-reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className={eyebrow}>Faculty</p>
          <h2 id="faculty-title" className="text-4xl font-bold md:text-5xl">
            Learn from people who lead.
          </h2>
        </div>
        <p className="max-w-sm text-muted">Sessions are led by experienced practitioners in business and strategy.</p>
      </div>

      <ul data-stagger className="grid gap-6 md:grid-cols-2">
        {faculty.map((f, i) => (
          <li key={f.name}>
            <article className="group flex h-full flex-row items-center gap-5 rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-soft)] sm:gap-6 sm:p-5">
              <div
                className={`relative grid aspect-square w-24 shrink-0 place-items-center overflow-hidden rounded-3xl sm:w-40 lg:w-48 ${
                  i === 0 ? "bg-gradient-to-br from-primary to-primary-strong" : "bg-gradient-to-br from-primary-strong to-ink"
                }`}
                aria-hidden
              >
                <span className="font-display text-3xl font-bold text-white transition-transform sm:text-5xl lg:text-6xl duration-500 group-hover:scale-110">
                  {f.initials}
                </span>
                <span className="absolute bottom-0 left-0 h-1.5 w-full bg-gold" />
              </div>
              <div className="pb-2 sm:pb-0">
                <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  <Users className="size-3.5" aria-hidden /> Conference faculty
                </p>
                <h3 className="text-xl font-semibold sm:text-2xl">{f.name}</h3>
                <p className="mt-1 text-muted">{f.role}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Details band (rate, dates, countdown) ──────────────────── */
export function Details() {
  return (
    <section id="details" aria-labelledby="details-title" className="px-3 pt-24 md:px-5 md:pt-32">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-white md:px-14 md:py-20">
        <Image
          src={images.marinaBay}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-20 mix-blend-luminosity"
        />
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-primary-bright blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div data-reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">Details</p>
            <h2 id="details-title" className="text-4xl font-bold md:text-5xl">
              Your seat in Singapore is waiting.
            </h2>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-gold/70 p-6">
                <dt className="text-sm font-semibold text-gold">Rate</dt>
                <dd className="mt-1 font-display text-3xl font-bold sm:text-4xl md:text-5xl">{event.rate}</dd>
              </div>
              <div className="rounded-3xl border border-gold/70 p-6">
                <dt className="text-sm font-semibold text-gold">Date</dt>
                <dd className="mt-1 font-display text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
                  28th Nov
                  <br />– 5th Dec
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal data-delay="150" className="rounded-[var(--radius-card)] bg-ink/25 p-6 ring-1 ring-white/15 backdrop-blur-md md:p-8">
            <p className="mb-4 flex items-center gap-2 font-medium text-white/90">
              <CalendarDays className="size-5 text-gold" aria-hidden /> Conference begins in
            </p>
            <Countdown />
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 font-display text-lg font-semibold text-ink transition-all duration-200 hover:bg-gold-bright active:scale-[0.98]"
            >
              Register now
              <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <div className="mt-5 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
              <a href={`mailto:${event.email}`} className="flex min-h-11 items-center gap-2 hover:text-gold">
                <Mail className="size-4" aria-hidden /> {event.email}
              </a>
              <a href={event.phoneHref} className="flex min-h-11 items-center gap-2 hover:text-gold">
                <Phone className="size-4" aria-hidden /> {event.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA with floating gallery ──────────────────────────────── */
const gallery = [
  { src: images.merlion, alt: "The Merlion at night", cls: "h-44 md:h-56 mt-10" },
  { src: images.delegates, alt: "Delegates engaged in a conference session", cls: "h-40 md:h-48" },
  { src: images.supertrees, alt: "Supertrees at Gardens by the Bay", cls: "h-48 md:h-60 mt-14" },
  { src: images.handshake, alt: "Two professionals shaking hands", cls: "h-40 md:h-52" },
  { src: images.mbsNight, alt: "Marina Bay Sands at night", cls: "h-44 md:h-56 mt-10" },
];

export function Cta() {
  return (
    <section aria-labelledby="cta-title" className="overflow-hidden pt-24 md:pt-32">
      <div data-reveal className="mx-auto max-w-3xl px-5 text-center">
        <h2 id="cta-title" className="text-4xl font-bold md:text-6xl">
          Plan your leadership journey with confidence.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Register to reserve your seat. Places for the Singapore conference are limited.
        </p>
        <a
          href={event.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-white shadow-[0_12px_24px_-12px_rgb(11_95_199/0.8)] transition-all duration-200 hover:bg-primary-strong active:scale-[0.98]"
        >
          Reserve Your Seat <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>

      <div data-stagger className="mx-auto mt-14 flex max-w-7xl items-start justify-center gap-3 px-3 md:gap-6">
        {gallery.map((g, i) => (
          <div key={i} className={`shrink-0 ${i === 0 || i === 4 ? "hidden sm:block" : ""}`}>
            <div data-float className={`relative w-28 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] md:w-48 ${g.cls}`}>
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
        { label: "Faculty", href: "#faculty" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "About", href: "#about" },
        { label: "Details", href: "#details" },
        { label: "Register", href: event.registerUrl },
      ],
    },
  ];
  return (
    <footer className="mt-24 border-t border-line bg-white pb-28 pt-16 md:mt-32 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:px-10">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-muted">
            {event.subtitle} in Singapore, {event.dateLabel}. Presented with AISWAM, The Edge Faculty, KNUST
            and Stratbridge.
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="mb-4 text-lg font-semibold">{c.title}</h3>
            <ul className="grid gap-1">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-flex min-h-11 items-center text-muted hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <ul className="grid gap-1 text-muted">
            <li>
              <a href={`mailto:${event.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
                <Mail className="size-4" aria-hidden /> {event.email}
              </a>
            </li>
            <li>
              <a href={event.phoneHref} className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
                <Phone className="size-4" aria-hidden /> {event.phone}
              </a>
            </li>
            <li>
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
              >
                <Globe className="size-4" aria-hidden /> {event.registerLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-5 text-sm text-muted md:px-10">
        Photography via Pexels. Partner logos belong to their respective institutions.
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
        className="flex min-h-14 items-center justify-between rounded-full bg-ink pl-6 pr-2 text-white shadow-[var(--shadow-float)]"
      >
        <span>
          <span className="block text-xs text-white/70">{event.dateLabel}</span>
          <span className="font-display font-semibold">{event.rate} · Register</span>
        </span>
        <span className="grid size-11 place-items-center rounded-full bg-gold text-ink">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </a>
    </div>
  );
}
