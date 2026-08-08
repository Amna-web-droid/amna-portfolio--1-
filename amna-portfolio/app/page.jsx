import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Designs from "@/components/Designs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StatusWidget from "@/components/StatusWidget";

export const revalidate = 10;


export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero>
          <StatusWidget />
        </Hero>
        <About />
        <Projects />
        <Designs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
