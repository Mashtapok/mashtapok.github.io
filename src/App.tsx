import { About } from './components/About';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Footer } from './Footer';

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Experience />
      <Footer />
    </main>
  );
}
