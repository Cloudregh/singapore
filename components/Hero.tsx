import Image from "next/image";
import { Plane } from "lucide-react";
import Nav from "./Nav";
import InfoBar from "./InfoBar";
import { event, images } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-190 flex-col overflow-hidden bg-ink md:min-h-205">
      <div data-hero-bg className="absolute inset-0 -z-10">
        <Image
          src={images.supertrees}
          alt="The Supertree Grove at Gardens by the Bay, Singapore, glowing at dusk"
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_38%]"
        />
      </div>
      {/* One quiet scrim for legibility — no glows */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/35" />

      <div aria-hidden className="pointer-events-none absolute left-0 top-[34%] md:top-[30%]">
        <div data-plane className="flex items-center gap-2 text-white/85">
          <span className="h-px w-24 bg-linear-to-r from-transparent to-white/60" />
          <Plane className="size-6 rotate-45" strokeWidth={1.5} />
        </div>
      </div>

      <Nav />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-6 pt-20 text-center md:pt-24">
        <h1
          id="hero-title"
          data-hero-title
          className="font-display text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[1.05] text-white"
        >
          Study &amp; Tour In <span className="text-gold">Singapore</span>
        </h1>

        <p data-hero-fade className="mt-5 text-[0.95rem] text-white/90 md:text-base">
          {event.subtitle} — {event.dateLabel}
        </p>

        <a
          data-hero-fade
          href="#package"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:bg-accent-soft"
        >
          View Package
        </a>
      </div>

      <div className="px-3 pb-6 pt-16 md:px-10 md:pb-10">
        <InfoBar />
      </div>
    </section>
  );
}
