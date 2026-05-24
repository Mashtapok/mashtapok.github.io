import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { primaryText } from '../data';
import { AnimatedLetter, WordsPullUpMultiStyle } from './TextAnimations';

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  return (
    <section id="about" className="bg-black px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#101010] px-5 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24">
        <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-primary/70 sm:text-xs">About me</p>
        <h2
          className="mx-auto max-w-4xl text-3xl font-normal leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: primaryText }}
        >
          <WordsPullUpMultiStyle
            segments={[
              // { text: 'I am Stepan Mashtakov,', className: 'font-normal' },
              { text: 'I am a full stack software engineer.', className: 'font-serif italic' },
              { text: 'I build high-load product interfaces and Web Apps with React, TypeScript and Node.js.', className: 'font-normal' },
            ]}
          />
        </h2>
      </div>
    </section>
  );
}
