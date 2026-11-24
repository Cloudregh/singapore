import { AccessProvider } from "@/components/Access";
import Motion from "@/components/Motion";
import Hero from "@/components/Hero";
import Topics from "@/components/Topics";
import { About, Cta, Details, Facilitators, Footer, MobileCta, Package, Partners } from "@/components/Sections";

export default function Home() {
  return (
    <AccessProvider>
    <Motion>
      {/* The page sits as a white sheet on a periwinkle canvas, like the reference. */}
      <div className="mx-auto max-w-360 px-2 pt-2 md:px-8 md:pt-8">
        <div className="overflow-hidden rounded-t-[22px] border border-b-0 border-white/70 bg-white md:rounded-t-[28px]">
          <main>
            <Hero />
            <Partners />
            <Topics />
            <div className="wash">
              <About />
              <Package />
              <Facilitators />
              <Details />
              <Cta />
            </div>
          </main>
          <Footer />
        </div>
      </div>
      <MobileCta />
    </Motion>
    </AccessProvider>
  );
}
