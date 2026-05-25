import { About } from './components/About';
import { Hero } from './components/Hero';
import { Footer } from './Footer';

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
