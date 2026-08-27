import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Markets from "@/components/Markets";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import TickerBand from "@/components/TickerBand";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <TickerBand />
      <About />
      <Services />
      <Stats />
      <Markets />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
