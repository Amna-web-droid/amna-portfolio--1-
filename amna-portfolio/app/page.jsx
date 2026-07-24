import Nav from "@/components/Nav";
export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Designs from "@/components/Designs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Designs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
