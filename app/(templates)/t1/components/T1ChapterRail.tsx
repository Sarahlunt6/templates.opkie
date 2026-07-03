"use client";

/**
 * Chapter scrub rail — a fixed left rail on desktop: thin ink line with
 * brass ticks per chapter, reading-progress fill in brass, and the
 * current roman numeral in Fraunces crossfading as chapter boundaries
 * pass. Clicking a tick scrolls smoothly to its chapter. Hidden below lg.
 */

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useSmoothScroll } from "@/components/premium/SmoothScrollProvider";
import { T1_EASE } from "./T1Motion";

const CHAPTERS = [
  { numeral: "I", id: "consultation", title: "The Consultation" },
  { numeral: "II", id: "design", title: "The Design" },
  { numeral: "III", id: "craft", title: "The Craft" },
  { numeral: "IV", id: "reveal", title: "The Reveal" },
  { numeral: "¶", id: "practicalities", title: "Practicalities" },
];

export default function T1ChapterRail() {
  const [active, setActive] = useState<string | null>(null);
  const { scrollTo, lenis } = useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    const sections = CHAPTERS.map((c) =>
      document.getElementById(c.id)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    // Clear highlight above chapter I
    const onScroll = () => {
      const first = sections[0];
      if (
        first &&
        first.getBoundingClientRect().top > window.innerHeight * 0.65
      ) {
        setActive(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const current = CHAPTERS.find((c) => c.id === active) ?? null;

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (lenis && !reduced) {
        scrollTo(el, { offset: -88, duration: 1.6 });
      } else {
        el.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
      window.history.replaceState(null, "", `#${id}`);
    };

  return (
    <nav
      aria-label="Chapters and reading progress"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-6"
    >
      {/* current numeral, crossfading at chapter boundaries */}
      <div
        aria-hidden="true"
        className="relative mx-auto mb-4 flex h-8 w-8 items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current?.numeral ?? "front"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: T1_EASE }}
            className="font-t1-display text-lg italic leading-none text-[#9C7E46]"
          >
            {current?.numeral ?? "·"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* the rail — ink line, brass fill, ticks per chapter */}
      <div className="relative mx-auto h-[36vh] min-h-[220px] w-px bg-[#16130F]/12">
        <motion.div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px origin-top bg-[#9C7E46]"
          style={{ scaleY: fill }}
        />
        {CHAPTERS.map((c, i) => {
          const isActive = active === c.id;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={handleClick(c.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`${c.title} — chapter ${c.numeral}`}
              className="group absolute left-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%` }}
            >
              <span
                aria-hidden="true"
                className={`block h-px transition-all duration-500 ease-out ${
                  isActive
                    ? "w-4 bg-[#9C7E46]"
                    : "w-2.5 bg-[#16130F]/30 group-hover:w-4 group-hover:bg-[#5E2A2B]"
                }`}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap border border-[#16130F]/10 bg-[#F7F5F0] px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.24em] text-[#6B675E] opacity-0 shadow-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {c.title}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
