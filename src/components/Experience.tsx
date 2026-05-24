import { ArrowRight, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cardEase, experience, featureVideo, primaryText, skillGroups } from '../data';
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
      className="flex min-h-[320px] flex-col justify-between rounded-[1.25rem] bg-[#212121] p-5 sm:p-6 lg:min-h-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: cardEase }}
    >
      <div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <h3 className="max-w-[12rem] text-xl font-normal leading-none sm:text-2xl" style={{ color: primaryText }}>
            {skill.title}
          </h3>
          <span className="text-xs text-gray-500">{skill.number}</span>
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

  return (
    <motion.article
      ref={ref}
      className="rounded-[1.25rem] bg-[#151515] p-5 sm:p-6"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: cardEase }}
    >
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/50">{item.role}</p>
          <h3 className="text-2xl font-normal leading-none sm:text-3xl" style={{ color: primaryText }}>
            {item.company}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{item.location}</p>
        </div>
        <p className="text-sm text-primary/70">{item.period}</p>
      </div>

      <p className="mb-5 max-w-4xl text-sm leading-relaxed text-[#DEDBC8] sm:text-base">{item.summary}</p>
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
                { text: 'High-load product engineering.', className: 'text-primary' },
                { text: 'Frontend depth with full stack delivery.', className: 'text-gray-500' },
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
              5+ years in production.
            </p>
          </motion.article>

          {skillGroups.map((skill, index) => (
            <SkillCard key={skill.number} skill={skill} index={index + 1} />
          ))}
        </div>

        <div id="experience" className="space-y-3">
          {experience.map((item, index) => (
            <ExperienceCard key={`${item.company}-${item.period}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
