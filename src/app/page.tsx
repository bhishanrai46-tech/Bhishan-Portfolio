import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Interests } from "@/components/Interests";
import { Beyond } from "@/components/Beyond";
import { Achievements } from "@/components/Achievements";
import { Notes } from "@/components/Notes";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Journey />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Interests />
        <Beyond />
        <Achievements />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
