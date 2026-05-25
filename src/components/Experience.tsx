import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { accentText, cardEase, experience, primaryText } from '../data';

type ExperienceCardProps = {
  item: (typeof experience)[number];
  index: number;
};

type ProjectPreviewProps = {
  preview: (typeof experience)[number]['preview'];
  index: number;
};

function ProjectPreview({ preview, index }: ProjectPreviewProps) {
  const tiltClass =
    index % 2 === 0
      ? 'rotate-[1deg] [transform:rotateY(-8deg)_rotateX(2deg)] group-hover:[transform:rotateY(-5deg)_rotateX(1deg)]'
      : 'rotate-[-1deg] [transform:rotateY(8deg)_rotateX(2deg)] group-hover:[transform:rotateY(5deg)_rotateX(1deg)]';

  return (
    <div className="relative mx-auto w-full max-w-[18rem] [perspective:900px] md:max-w-full">
      <div className="pointer-events-none absolute -inset-4 rounded-[1.5rem] bg-primary/10 opacity-45 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
      <div
        className={`relative rounded-[1.15rem] border border-white/10 bg-[#050505] p-1.5 shadow-2xl shadow-black/50 transition-transform duration-700 ${tiltClass}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.85rem] border border-white/[0.08] bg-black">
          {preview.type === 'video' ? (
            <video
              className="h-full w-full object-fill"
              src={preview.src}
              aria-label={preview.label}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img className="h-full w-full object-fill" src={preview.src} alt={preview.label} loading="lazy" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.05]" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}

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
        <div className="relative flex min-h-[300px] flex-col justify-between gap-8 border-b border-white/[0.08] p-5 sm:p-6 md:border-b-0 md:border-r md:p-7">
          <div className="mt-4">
            <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: accentText }}>
              {item.role}
            </p>
            <h3 className="text-4xl font-normal leading-[0.85] sm:text-5xl lg:text-6xl" style={{ color: primaryText }}>
              {item.company}
            </h3>
          </div>

          <ProjectPreview preview={item.preview} index={index} />
        </div>

        <div className="flex min-h-[220px] flex-col justify-between p-5 sm:p-6 md:p-7">
          <div className="mb-8 flex items-start justify-between gap-4">
            <p className="rounded-full border border-primary/10 bg-black/25 px-3 py-1.5 text-xs text-primary/70 sm:text-sm">
              {item.period}
            </p>
          </div>

          <p className="max-w-3xl text-xl leading-[1.1] text-[#DEDBC8] sm:text-2xl md:text-3xl">
            {item.summary.map((segment) =>
              segment.href ? (
                <a
                  key={`${item.company}-${segment.href}`}
                  href={segment.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80"
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
    <section id="skills" className="relative z-10 min-h-screen overflow-hidden bg-transparent px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div id="experience" className="space-y-5">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: accentText }}>
                Work experience
              </p>
              <h2 className="max-w-3xl text-3xl font-normal leading-none sm:text-4xl md:text-5xl" style={{ color: primaryText }}>
                Featured projects
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
