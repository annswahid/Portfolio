import StarfieldScene from '@/components/StarfieldScene';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import FAQ from '@/sections/FAQ';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <StarfieldScene />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
