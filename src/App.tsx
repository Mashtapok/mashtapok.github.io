import { ArrowRight, Check } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';

const primaryText = '#E1E0CC';
const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';
const featureVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const navItems = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'];

const features = [
  {
    number: '01',
    title: 'Project Storyboard.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: ['Visual briefs organized by scene', 'Shot lists with creative intent', 'Moodboards for every direction', 'References mapped to deliverables'],
  },
  {
    number: '02',
    title: 'Smart Critiques.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: ['AI analysis for visual rhythm', 'Creative notes that stay contextual', 'Tool integrations for fast revision'],
  },
  {
    number: '03',
    title: 'Immersion Capsule.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: ['Notification silencing for focus', 'Ambient soundscapes for flow', 'Schedule syncing with creative blocks'],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const cardEase = [0.22, 1, 0.36, 1] as const;

type WordsPullUpProps = {
  text: string;
  className?: string;
  showAsterisk?: boolean;
};

function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={{ color: primaryText }}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pr-[0.07em]">
            <motion.span
              className="relative inline-block"
              initial={{ y: 20 }}
              animate={isInView ? { y: 0 } : { y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease }}
            >
              {word}
              {showAsterisk && isLast ? (
                <sup className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] leading-none">*</sup>
              ) : null}
              {index < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

type StyledSegment = {
  text: string;
  className?: string;
};

function WordsPullUpMultiStyle({ segments, className = '' }: { segments: StyledSegment[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const words = useMemo(
    () =>
      segments.flatMap((segment, segmentIndex) =>
        segment.text.split(' ').map((word) => ({
          word,
          className: segment.className ?? '',
          segmentIndex,
        })),
      ),
    [segments],
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ word, className: wordClassName, segmentIndex }, index) => (
        <span key={`${word}-${segmentIndex}-${index}`} className="inline-block overflow-hidden pr-[0.22em]">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedLetter({ char, index, total, progress }: { char: string; index: number; total: number; progress: any }) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} aria-hidden="true">
      {char}
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video className="absolute inset-0 h-full w-full object-cover" src={heroVideo} autoPlay loop muted playsInline />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
          <ul className="flex items-center gap-3 whitespace-nowrap sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#about"
                  className="text-[10px] transition-colors sm:text-xs md:text-sm"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = primaryText;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6 sm:px-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
          <div className="grid grid-cols-12 items-end gap-y-5 md:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="m-0 font-medium leading-[0.85] tracking-[-0.07em]">
                <WordsPullUp
                  text="Stepan Mashtakov"
                  showAsterisk
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                />
              </h1>
            </div>

            <div className="col-span-12 flex max-w-xl flex-col items-start gap-5 justify-self-start sm:max-w-md lg:col-span-4 lg:justify-self-end">
              <motion.p
                className="m-0 text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or
                labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.a
                href="#features"
                className="group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3 sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                Join the lab
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const text =
    'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.';
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);

  return (
    <section id="about" className="bg-black px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#101010] px-5 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24">
        <p className="mb-8 text-[10px] text-primary sm:text-xs">Visual arts</p>
        <h2
          className="mx-auto max-w-3xl text-3xl font-normal leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: primaryText }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Stepan Mashtakov,', className: 'font-normal' },
              { text: 'a creative web developer.', className: 'font-serif italic' },
              { text: 'I craft cinematic interfaces, motion systems, and narrative digital experiences.', className: 'font-normal' },
            ]}
          />
        </h2>

        <p
          ref={ref}
          className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:mt-12 md:text-base"
          aria-label={text}
        >
          {chars.map((char, index) => (
            <AnimatedLetter key={`${char}-${index}`} char={char} index={index} total={chars.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}

function FeatureInfoCard({
  feature,
  index,
}: {
  feature: {
    number: string;
    title: string;
    icon: string;
    items: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.article
      ref={ref}
      className="flex min-h-[360px] flex-col justify-between rounded-[1.25rem] bg-[#212121] p-5 sm:p-6 lg:min-h-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: cardEase }}
    >
      <div>
        <img src={feature.icon} alt="" className="mb-8 h-10 w-10 rounded object-cover sm:h-12 sm:w-12" />
        <div className="mb-7 flex items-start justify-between gap-4">
          <h3 className="max-w-[10rem] text-xl font-normal leading-none sm:text-2xl" style={{ color: primaryText }}>
            {feature.title}
          </h3>
          <span className="text-xs text-gray-500">{feature.number}</span>
        </div>

        <ul className="space-y-3">
          {feature.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-tight text-gray-400">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="#about" className="mt-10 inline-flex items-center gap-2 self-start text-sm text-primary">
        Learn more
        <ArrowRight className="h-4 w-4 -rotate-45" />
      </a>
    </motion.article>
  );
}

function Features() {
  const videoRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoRef, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-14">
          <h2 className="text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Studio-grade workflows for visionary creators.', className: 'text-primary' },
                { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500' },
              ]}
            />
          </h2>
        </header>

        <div className="grid gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
          <motion.article
            ref={videoRef}
            className="relative min-h-[360px] overflow-hidden rounded-[1.25rem] lg:min-h-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVideoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: cardEase }}
          >
            <video className="absolute inset-0 h-full w-full object-cover" src={featureVideo} autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-2xl leading-none sm:text-3xl" style={{ color: primaryText }}>
              Your creative canvas.
            </p>
          </motion.article>

          {features.map((feature, index) => (
            <FeatureInfoCard key={feature.number} feature={feature} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Features />
    </main>
  );
}
