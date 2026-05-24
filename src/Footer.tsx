import React from 'react';
import { motion } from 'framer-motion';
import { profile } from './data';

export function Footer() {
  return (
    <footer id="contacts">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-primary/60">Contacts</p>
          <h2 className="bg-gradient-to-br from-[#fff6d8] via-[#e1e0cc] to-[#c58a54] bg-clip-text py-4 text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Let&apos;s build <br /> software that matters
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-primary/70">
            <a className="transition-colors hover:text-primary" href={`mailto:${profile.email}`}>
              {profile.emailLabel}
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-primary/30 sm:block" />
            <a className="transition-colors hover:text-primary" href={profile.telegram} target="_blank" rel="noreferrer">
              {profile.telegramLabel}
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-primary/30 sm:block" />
            <a className="transition-colors hover:text-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedinLabel}
            </a>
            <a className="transition-colors hover:text-primary" href={profile.github} target="_blank" rel="noreferrer">
              {profile.githubLabel}
            </a>
          </div>
        </motion.div>
      </LampContainer>
    </footer>
  );
}

export const LampContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black ${className}`}
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.35, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-[#f2b36d] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.35, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#f2b36d] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#f2b36d] opacity-35 blur-3xl" />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#ffd0a3] opacity-80 blur-2xl"
        />
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[#ffd0a3]"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black" />
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">{children}</div>
    </div>
  );
};
