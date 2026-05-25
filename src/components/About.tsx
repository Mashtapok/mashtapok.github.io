import { motion } from 'framer-motion';
import { primaryText } from '../data';

export function About() {
  return (
    <section id="about" className="bg-black px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#101010] px-5 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24">
        <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-primary/70 sm:text-xs">About me</p>
        <motion.div
          className="mx-auto max-w-4xl"
          style={{ color: primaryText }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-4xl italic leading-none sm:text-5xl md:text-6xl lg:text-7xl">
            I am a full stack software engineer.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-[1.25] text-primary/80 sm:text-2xl md:text-3xl">
            I've been writing code for 6 years, building high-load product interfaces and Web Apps with React, TypeScript
            and Node.js.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
