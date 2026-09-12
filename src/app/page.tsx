import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Wip from "@/components/Wip";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageReveal from "@/components/PageReveal";

export default function Home() {
  return (
    <main className="bg-background selection:bg-brand selection:text-surface">
      <PageReveal>
        <Header />
        <Hero />
        <About />
        <Projects />
        <Wip />
        <Testimonials />
        <Contact />
        <Footer />
      </PageReveal>
    </main>
  );
}
