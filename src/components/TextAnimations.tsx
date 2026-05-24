import { motion, useInView, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { ease, primaryText } from '../data';

type WordsPullUpProps = {
  text: string;
  className?: string;
};

export function WordsPullUp({ text, className = '' }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={{ color: primaryText }}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pr-[0.07em]">
          <motion.span
            className="relative inline-block"
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

type StyledSegment = {
  text: string;
  className?: string;
};

export function WordsPullUpMultiStyle({ segments, className = '' }: { segments: StyledSegment[]; className?: string }) {
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

export function AnimatedLetter({ char, index, total, progress }: { char: string; index: number; total: number; progress: any }) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} aria-hidden="true">
      {char}
    </motion.span>
  );
}
