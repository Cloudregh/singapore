import Motion from "@/components/Motion";
import Hero from "@/components/Hero";
import Topics from "@/components/Topics";
import { About, Cta, Details, Faculty, Footer, MobileCta, Package, Partners } from "@/components/Sections";

export default function Home() {
  return (
    <Motion>
      <main>
        <Hero />
        <Partners />
        <Topics />
        <About />
        <Package />
        <Faculty />
        <Details />
        <Cta />
      </main>
      <Footer />
      <MobileCta />
    </Motion>
  );
}
