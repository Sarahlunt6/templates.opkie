"use client";

import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollProgress: number;
  scrollVelocity: number;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
  /** Duration of scroll animation (default: 1.4) */
  duration?: number;
  /** Enable infinite scroll behavior (default: false) */
  infinite?: boolean;
  /** Custom easing function */
  easing?: (t: number) => number;
}

// Premium exponential easing - silky smooth deceleration curve
const luxuryEasing = (t: number): number => {
  // Custom bezier-inspired easing for ultra-premium feel
  return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
};

export default function SmoothScrollProvider({
  children,
  duration = 1.4,
  infinite = false,
  easing = luxuryEasing,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  // Memoized scroll methods for context
  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      lenisRef.current?.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? duration,
        immediate: options?.immediate ?? false,
        lock: options?.lock ?? false,
        onComplete: options?.onComplete,
      });
    },
    [duration]
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    // Initialize Lenis with boutique-grade configuration
    const lenis = new Lenis({
      duration,
      easing,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.7, // Reduced for premium, deliberate feel
      touchMultiplier: 1.8, // Enhanced touch responsiveness
      infinite,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Track scroll progress and velocity for ambient effects
    lenis.on("scroll", (e: Lenis) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress);
      setScrollVelocity(e.velocity);
    });

    // High-performance RAF loop with GSAP integration
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Disable GSAP lag smoothing for buttery animation
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
    };
  }, [duration, easing, infinite]);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollProgress,
        scrollVelocity,
        scrollTo,
        stop,
        start,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
