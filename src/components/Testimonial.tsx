import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import quoteSymbolImg from "../assets/quote-symbol.png";
import testimonialAvatarImg from "../assets/testimonial-avatar.png";

const TESTIMONIAL_TEXT =
  "Fermor revolutionized how I manage my wealth using smart calculators and trackers. I am now forecasting my financial goals better than I ever imagined! Fermor revolutionized how I manage my wealth using smart calculators.";

function WordItem({
  word,
  range,
  progress,
  isLast,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["hsl(0 0% 35%)", "hsl(0 0% 100%)"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.3em] inline-block transition-colors"
    >
      {word}
      {isLast && <span className="text-muted-foreground ml-2">"</span>}
    </motion.span>
  );
}

export function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = TESTIMONIAL_TEXT.split(" ");
  const total = words.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <section className="min-h-screen flex items-center justify-center py-24 md:py-32 px-8 md:px-28 bg-black">
      <div
        ref={containerRef}
        className="max-w-3xl mx-auto flex flex-col items-start gap-10 text-left w-full"
      >
        {/* Quote symbol image (w-14 h-10 object-contain) */}
        <div className="w-14 h-10 flex items-center justify-start">
          <img
            src={quoteSymbolImg}
            alt="Double quote glyph"
            referrerPolicy="no-referrer"
            style={{ mixBlendMode: "screen" }}
            className="w-14 h-10 object-contain opacity-90"
          />
        </div>

        {/* Testimonial text (text-4xl md:text-5xl font-medium leading-[1.2], wrapped in flex flex-wrap) */}
        <p className="text-4xl md:text-5xl font-medium leading-[1.2] flex flex-wrap items-baseline tracking-tight">
          {words.map((word, i) => {
            const range: [number, number] = [i / total, (i + 1) / total];
            return (
              <WordItem
                key={`${word}-${i}`}
                word={word}
                range={range}
                progress={scrollYProgress}
                isLast={i === total - 1}
              />
            );
          })}
        </p>

        {/* Author row (flex items-center gap-4) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <img
              src={testimonialAvatarImg}
              alt="Arjun Mehta"
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full border-[3px] border-foreground object-cover shadow-lg"
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold leading-7 text-foreground">
                Arjun Mehta
              </span>
              <span className="text-sm font-normal leading-5 text-muted-foreground">
                Retail Investor · Bengaluru, India
              </span>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-neutral-400 font-mono">
            Tracking ₹1.4 Cr portfolio · Zerodha & CAMS connected
          </div>
        </div>
      </div>
    </section>
  );
}
