import { About } from './components/About';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="relative isolate bg-black">
      <div className="bg-noise pointer-events-none absolute inset-0 z-0 opacity-[0.12]" />
      <Hero />
      <About />
      <Experience />
      <Footer />
    </main>
  );
}
