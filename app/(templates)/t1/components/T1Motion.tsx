"use client";

/**
 * T1 Maison — motion primitives.
 * Paper-and-ink motion language: slow, weighted, expo/quart-out easings.
 * Every primitive degrades to a static state under prefers-reduced-motion.
 */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type Ref,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Weighted editorial ease — shared across the template */
export const T1_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/*  LineReveal — SplitType line-mask reveal for display headlines      */
/* ------------------------------------------------------------------ */

interface LineRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}

export function LineReveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  start = "top 88%",
}: LineRevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitType(el, { types: "lines,words", tagName: "span" });
    split.lines?.forEach((line) => line.classList.add("t1-mask-line"));
    if (!split.words || split.words.length === 0) return;

    gsap.set(split.words, { yPercent: 112 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start, once: true },
    });
    tl.to(split.words, {
      yPercent: 0,
      duration: 1.15,
      delay,
      ease: "expo.out",
      stagger: 0.03,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, [delay, start]);

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Fade — quiet fade-up for supporting copy and frames                */
/* ------------------------------------------------------------------ */

export function Fade({
  children,
  className = "",
  delay = 0,
  y = 28,
  duration = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration, delay, ease: T1_EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ParallaxImage — image drifting slowly inside a fixed frame         */
/* ------------------------------------------------------------------ */

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  drift = 6,
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** total drift, in % of frame height */
  drift?: number;
  /** unmask the frame with a clip-path reveal as it scrolls into view */
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);
  const unmask = reveal && !reduced;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={unmask ? { clipPath: "inset(0 0 100% 0)" } : false}
      whileInView={unmask ? { clipPath: "inset(0 0 0% 0)" } : undefined}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.05, ease: T1_EASE }}
    >
      <motion.div
        className="absolute -inset-x-0 -inset-y-[8%]"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drift — subtle scroll parallax for ornaments (chapter numerals)    */
/* ------------------------------------------------------------------ */

export function Drift({
  children,
  className = "",
  range = 20,
}: {
  children: ReactNode;
  className?: string;
  /** total vertical travel in px (±range/2 around rest) */
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic — CTA buttons that lean toward the cursor                 */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 16 });
  const springY = useSpring(y, { stiffness: 140, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  BrassCounter — slow numeral count-up, static under reduced motion  */
/* ------------------------------------------------------------------ */

export function BrassCounter({
  value,
  decimals = 0,
  suffix = "",
  className = "",
  duration = 2.4,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return;
        setDone(true);
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / (duration * 1000), 1);
          // press-counter feel: fast spin-up, long settle (expo out)
          const eased =
            progress === 1 ? 1 : 1 - Math.pow(2, -9.5 * progress);
          setDisplay(eased * value);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, done]);

  const text =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}
