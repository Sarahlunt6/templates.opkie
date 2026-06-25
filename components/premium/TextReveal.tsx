"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealType = "chars" | "words" | "lines";
type RevealStyle = "fade-up" | "fade-in" | "blur-in" | "slide-mask" | "cascade";

interface TextRevealProps {
  children: ReactNode;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section" | "article";
  className?: string;
  type?: RevealType;
  style?: RevealStyle;
  duration?: number;
  stagger?: number;
  delay?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  once?: boolean;
}

export default function TextReveal({
  children,
  as = "div",
  className = "",
  type = "words",
  style = "fade-up",
  duration = 0.8,
  stagger = 0.02,
  delay = 0,
  scrub = false,
  start = "top 85%",
  end = "top 20%",
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const Component = as;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Split the text
    splitRef.current = new SplitType(element, {
      types: type === "chars" ? "chars,words" : type === "words" ? "words" : "lines",
      tagName: "span",
    });

    const targets =
      type === "chars"
        ? splitRef.current.chars
        : type === "words"
        ? splitRef.current.words
        : splitRef.current.lines;

    if (!targets || targets.length === 0) return;

    // Set initial states based on style
    const initialState = getInitialState(style);
    gsap.set(targets, initialState);

    // Create animation based on style
    const animationProps = getAnimationProps(style);

    // Build the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end: scrub ? end : undefined,
        scrub: scrub,
        once: once && !scrub,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    tl.to(targets, {
      ...animationProps,
      duration: scrub ? 1 : duration,
      stagger: scrub ? stagger * 0.5 : stagger,
      delay: scrub ? 0 : delay,
      ease: scrub ? "none" : "power3.out",
    });

    // Cleanup
    return () => {
      tl.kill();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [type, style, duration, stagger, delay, scrub, start, end, once]);

  // Using a div wrapper for simplicity to avoid complex type unions
  return (
    <div ref={containerRef} className={className} data-text-reveal-as={as}>
      {children}
    </div>
  );
}

// Helper functions for animation states
function getInitialState(style: RevealStyle) {
  switch (style) {
    case "fade-up":
      return { opacity: 0, y: 30 };
    case "fade-in":
      return { opacity: 0 };
    case "blur-in":
      return { opacity: 0, filter: "blur(10px)" };
    case "slide-mask":
      return { clipPath: "inset(0 100% 0 0)" };
    case "cascade":
      return { opacity: 0, y: 50, rotateX: -45 };
    default:
      return { opacity: 0, y: 30 };
  }
}

function getAnimationProps(style: RevealStyle) {
  switch (style) {
    case "fade-up":
      return { opacity: 1, y: 0 };
    case "fade-in":
      return { opacity: 1 };
    case "blur-in":
      return { opacity: 1, filter: "blur(0px)" };
    case "slide-mask":
      return { clipPath: "inset(0 0% 0 0)" };
    case "cascade":
      return { opacity: 1, y: 0, rotateX: 0 };
    default:
      return { opacity: 1, y: 0 };
  }
}

// Utility component for headline reveals with dramatic effect
export function HeadlineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <TextReveal
      as="h1"
      className={className}
      type="chars"
      style="cascade"
      duration={1}
      stagger={0.015}
      delay={delay}
    >
      {children}
    </TextReveal>
  );
}

// Utility component for subheadlines
export function SubheadReveal({
  children,
  className = "",
  delay = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <TextReveal
      as="p"
      className={className}
      type="words"
      style="fade-up"
      duration={0.8}
      stagger={0.03}
      delay={delay}
    >
      {children}
    </TextReveal>
  );
}

// Scroll-scrubbed paragraph reveal
export function ParagraphScrub({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TextReveal
      as="p"
      className={className}
      type="words"
      style="blur-in"
      scrub={1.5}
      start="top 90%"
      end="top 40%"
    >
      {children}
    </TextReveal>
  );
}
