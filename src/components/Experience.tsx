import { ArrowRight, Check, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { accentText, cardEase, experience, featureVideo, primaryText, skillGroups } from '../data';
import { WordsPullUpMultiStyle } from './TextAnimations';

type SkillCardProps = {
  skill: (typeof skillGroups)[number];
  index: number;
};

function SkillCard({ skill, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.article
      ref={ref}
      className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-[#181818] p-5 transition-colors duration-500 hover:border-primary/25 sm:p-6 lg:min-h-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: cardEase }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-7 flex items-start justify-between gap-4">
          <h3 className="max-w-[12rem] text-xl font-normal leading-none sm:text-2xl" style={{ color: primaryText }}>
            {skill.title}
          </h3>
          <span className="rounded-full border border-primary/10 px-2 py-1 text-[10px] text-primary/50">{skill.number}</span>
        </div>

        <ul className="space-y-3">
          {skill.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-tight text-gray-400">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

type ExperienceCardProps = {
  item: (typeof experience)[number];
  index: number;
};

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const displayIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      ref={ref}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#101010]"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: cardEase }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(222,219,200,0.11),transparent_32%),linear-gradient(135deg,rgba(242,179,109,0.09),transparent_45%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative grid gap-0 md:grid-cols-[0.82fr_1.18fr]">
        <div className="relative flex min-h-[260px] flex-col justify-between gap-8 border-b border-white/[0.08] p-5 sm:p-6 md:border-b-0 md:border-r md:p-7">
          <div className="mt-4">
            <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: accentText }}>
              {item.role}
            </p>
            <h3 className="text-4xl font-normal leading-[0.85] sm:text-5xl lg:text-6xl" style={{ color: primaryText }}>
              {item.company}
            </h3>
          </div>

          {item.previewVideo ? (
            <div className="max-w-[18rem] overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 p-1 shadow-2xl shadow-black/30 md:max-w-full">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black">
                <video
                  className="h-full w-full object-cover"
                  src={item.previewVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.03]" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex min-h-[220px] flex-col justify-between p-5 sm:p-6 md:p-7">
          <div className="mb-8 flex items-start justify-between gap-4">
            <p className="rounded-full border border-primary/10 bg-black/25 px-3 py-1.5 text-xs text-primary/70 sm:text-sm">
              {item.period}
            </p>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-primary/5 transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110">
              <ArrowRight className="h-4 w-4 text-primary" />
            </span>
          </div>

          <p className="max-w-3xl text-xl leading-[1.1] text-[#DEDBC8] sm:text-2xl md:text-3xl">
            {item.summary.map((segment) =>
              segment.href ? (
                <a
                  key={`${item.company}-${segment.href}`}
                  href={segment.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80"
                >
                  {segment.text}
                </a>
              ) : (
                segment.text
              ),
            )}
          </p>

          <div className="mt-10 h-px w-full overflow-hidden bg-primary/10">
            <div className="h-full w-24 bg-primary/60 transition-all duration-700 group-hover:w-full" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const videoRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative min-h-screen overflow-hidden bg-black px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-12 md:mb-14">
          <h2 className="text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Frontend ', className: 'text-primary' },
                { text: '&', className: 'text-accent' },
                { text: 'Backend', className: 'text-gray-500' },
              ]}
            />
          </h2>
        </header>

        <div className="mb-16 grid gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-5">
          <motion.article
            ref={videoRef}
            className="relative min-h-[360px] overflow-hidden rounded-[1.25rem] md:col-span-2 lg:col-span-1 lg:min-h-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVideoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: cardEase }}
          >
            <video className="absolute inset-0 h-full w-full object-cover" src={featureVideo} autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-2xl leading-none sm:text-3xl" style={{ color: primaryText }}>
              6 years in production.
            </p>
          </motion.article>

          {skillGroups.map((skill, index) => (
            <SkillCard key={skill.number} skill={skill} index={index + 1} />
          ))}
        </div>

        <div id="experience" className="space-y-5">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: accentText }}>
                Work experience
              </p>
              <h2 className="max-w-3xl text-3xl font-normal leading-none sm:text-4xl md:text-5xl" style={{ color: primaryText }}>
                My production roles and projects
              </h2>
            </div>
          </div>

          {experience.map((item, index) => (
            <ExperienceCard key={`${item.company}-${item.period}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
