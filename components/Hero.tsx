import Image from "next/image";
import { Plane } from "lucide-react";
import Nav from "./Nav";
import InfoBar from "./InfoBar";
import { event, images } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative isolate min-h-[720px] overflow-hidden rounded-[2rem] bg-ink md:min-h-[820px]">
        <div data-hero-bg className="absolute inset-0 -z-10 origin-center">
          <Image
            src={images.supertrees}
            alt="The Supertree Grove at Gardens by the Bay, Singapore, glowing at dusk"
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[50%_40%]"
          />
        </div>
        {/* Legibility scrims */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/80" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(11_27_51/0.45),transparent_65%)]" />

        {/* Flight path */}
        <div aria-hidden className="pointer-events-none absolute left-0 top-[30%] z-0 md:top-[24%]">
          <div data-plane className="flex items-center gap-2 text-white/90">
            <span className="h-px w-28 bg-gradient-to-r from-transparent to-white/70" />
            <Plane className="size-7 rotate-45 fill-white/90 drop-shadow" strokeWidth={1.25} />
          </div>
        </div>

        <Nav />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-44 pt-20 text-center md:pt-28">
          <p
            data-hero-fade
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
          >
            <span className="size-2 rounded-full bg-gold" aria-hidden />
            {event.subtitle}
          </p>

          <h1
            id="hero-title"
            data-hero-title
            className="font-display text-[clamp(2.75rem,8vw,6.25rem)] font-bold leading-[1] text-white"
          >
            Study &amp; Tour in <span className="text-gold">Singapore</span>
          </h1>

          <p data-hero-fade className="mt-6 max-w-xl text-lg text-white/90">
            One week of strategy, growth and leadership in Asia&rsquo;s business capital — with your
            flight, visa and 4-star stay taken care of.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#package"
              className="inline-flex min-h-12 items-center rounded-full bg-white px-7 font-semibold text-ink transition-all duration-200 hover:bg-gold active:scale-[0.98]"
            >
              View Package
            </a>
            <a
              href="#topics"
              className="inline-flex min-h-12 items-center rounded-full border border-white/50 px-7 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
            >
              Explore Topics
            </a>
          </div>
        </div>
      </div>

      <InfoBar />
    </section>
  );
}
