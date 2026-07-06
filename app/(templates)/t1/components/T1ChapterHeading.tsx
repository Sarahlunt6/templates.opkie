"use client";

import { useEffect, useRef, useState } from "react";
import { LineReveal, Fade } from "./T1Motion";

interface T1ChapterHeadingProps {
  numeral: string;
  kicker: string;
  title: string;
  deck?: string;
  /** invert colors for dark (ink) sections */
  dark?: boolean;
}

/**
 * T1 PRESS — indexed chapter divider. "[ 01 ]" mono red index and a
 * mono kicker on a ruled row, Anton uppercase title, Newsreader lede.
 * The top and bottom rules draw themselves in (scaleX 0→1, CSS-only,
 * IntersectionObserver-triggered) like a pen stroke just before the
 * heading fades up; under prefers-reduced-motion they render drawn.
 */
export default function T1ChapterHeading({
  numeral,
  kicker,
  title,
  deck,
  dark = false,
}: T1ChapterHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ruleColor = dark ? "bg-[rgba(243,239,230,0.22)]" : "bg-[rgba(26,23,19,0.15)]";

  return (
    <header
      ref={ref}
      data-inview={inView}
      className="relative py-6 md:py-8"
    >
      {/* self-drawing rules replace the static border-y */}
      <span
        aria-hidden="true"
        className={`t1-rule absolute inset-x-0 top-0 ${ruleColor}`}
      />
      <span
        aria-hidden="true"
        className={`t1-rule t1-rule-delay absolute inset-x-0 bottom-0 ${ruleColor}`}
      />

      <div className="flex items-baseline justify-between gap-4">
        <p className="t1-mono-label t1-mono-label-red">[ {numeral} ]</p>
        <p
          className={`t1-mono-label text-right ${
            dark ? "!text-[#F3EFE6]/60" : "t1-mono-label-stone"
          }`}
        >
          [ {kicker.toUpperCase()} ]
        </p>
      </div>

      <LineReveal
        as="h2"
        className={`t1-display mt-5 max-w-4xl ${
          dark ? "text-[#F3EFE6]" : "text-[#1A1713]"
        }`}
      >
        {title}
      </LineReveal>

      {deck && (
        <Fade delay={0.1}>
          <p
            className={`font-t3-serif mt-4 max-w-xl text-[16px] leading-[1.7] ${
              dark ? "text-[#F3EFE6]/70" : "text-[#6B675E]"
            }`}
          >
            {deck}
          </p>
        </Fade>
      )}
    </header>
  );
}
