"use client";

/**
 * T1 PRESS — motion primitives.
 * Print does not float: reveals are quick, editorial fades and short
 * slides. Every primitive degrades to a static state under
 * prefers-reduced-motion. Legacy export names are preserved so nothing
 * downstream breaks.
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
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/** Sharp editorial ease — fast in, hard stop */
export const T1_EASE: [number, number, number, number] = [0.25, 1, 0.4, 1];

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
/*  LineReveal — quick slide-up for display headlines                  */
/* ------------------------------------------------------------------ */

interface LineRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** kept for API compatibility; unused in the print voice */
  start?: string;
}

export function LineReveal({
  as = "div",
  children,
  className = "",
  delay = 0,
}: LineRevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      <motion.span
        className="block"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.45, delay, ease: T1_EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Fade — quick fade-up for supporting copy and frames                */
/* ------------------------------------------------------------------ */

export function Fade({
  children,
  className = "",
  delay = 0,
  y = 16,
  duration = 0.45,
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
/*  ParallaxImage — kept for API compatibility; in the print voice it  */
/*  renders a static, duotone-friendly image frame with a quick fade.  */
/* ------------------------------------------------------------------ */

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  drift: _drift = 0,
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** kept for API compatibility; print plates do not drift */
  drift?: number;
  reveal?: boolean;
}) {
  const reduced = useReducedMotion();
  const animate = reveal && !reduced;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={animate ? { opacity: 0 } : false}
      whileInView={animate ? { opacity: 1 } : undefined}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4, ease: T1_EASE }}
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
  );
}

/* ------------------------------------------------------------------ */
/*  Drift — restrained scroll parallax for large ornaments             */
/* ------------------------------------------------------------------ */

export function Drift({
  children,
  className = "",
  range = 12,
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
      className={`relative ${className}`}
      style={reduced ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic — retired behavior, kept as a stable wrapper. Print CTAs  */
/*  are rectangular and stationary; hover states carry the response.  */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength: _strength = 0,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={`inline-block ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  BrassCounter — numeral count-up (now set in red, name preserved).  */
/*  Static under reduced motion.                                       */
/* ------------------------------------------------------------------ */

export function BrassCounter({
  value,
  decimals = 0,
  suffix = "",
  className = "",
  duration = 1.2,
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
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -9.5 * progress);
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
