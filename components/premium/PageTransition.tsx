"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

// Destination-specific theme configurations
const destinationThemes: Record<string, { bg: string; text: string; accent: string }> = {
  "/t1": {
    bg: "#FBFBFA", // Ivory/Alabaster
    text: "#111215", // Charcoal
    accent: "#C9B896", // Warm gold
  },
  "/t2": {
    bg: "#0D0E12", // Obsidian/Onyx
    text: "#F0F4F8", // Ice Blue/White
    accent: "#3B82F6", // Electric blue
  },
  "/t3": {
    bg: "#FAF9F6", // Soft warm minimalist white
    text: "#5C5C52", // Muted Olive/Taupe
    accent: "#A8B5A0", // Sage
  },
  "/": {
    bg: "#0A0A0B", // Hub dark
    text: "#FAFAFA", // White
    accent: "#888888", // Neutral
  },
};

// Get theme for a destination, with fallback
function getThemeForDestination(path: string) {
  // Check exact match first
  if (destinationThemes[path]) {
    return destinationThemes[path];
  }
  // Check if path starts with a known route
  for (const route of Object.keys(destinationThemes)) {
    if (path.startsWith(route) && route !== "/") {
      return destinationThemes[route];
    }
  }
  // Default fallback
  return destinationThemes["/"];
}

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(destinationThemes["/"]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animate counter from 00 to 100
  const animateCounter = useCallback((duration: number) => {
    if (!counterRef.current) return;

    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(counter.value)).padStart(2, "0");
        }
      },
    });
  }, []);

  // Main transition animation
  const performTransition = useCallback(
    async (destinationPath: string) => {
      if (isTransitioning || !overlayRef.current) return;

      setIsTransitioning(true);
      const theme = getThemeForDestination(destinationPath);
      setCurrentTheme(theme);

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const overlay = overlayRef.current;
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Reset counter
      if (counterRef.current) {
        counterRef.current.textContent = "00";
      }

      // Phase 1: Reveal the curtain (slide up from bottom)
      tl.set(overlay, {
        visibility: "visible",
        backgroundColor: theme.bg,
        yPercent: 100,
      });

      tl.set([counterRef.current, labelRef.current], {
        color: theme.text,
        opacity: 0,
        y: 20,
      });

      // Slide curtain up
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });

      // Fade in counter and label
      tl.to(
        [counterRef.current, labelRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Start counter animation
      animateCounter(0.8);

      // Wait for counter to complete
      tl.to({}, { duration: 0.9 });

      // Navigate to new page
      tl.call(() => {
        router.push(destinationPath);
      });

      // Small delay for page load
      tl.to({}, { duration: 0.3 });

      // Phase 2: Hide the curtain (slide up and out)
      tl.to([counterRef.current, labelRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
      });

      tl.to(overlay, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden", yPercent: 100 });
          setIsTransitioning(false);
        },
      });
    },
    [isTransitioning, router, animateCounter]
  );

  // Intercept link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only intercept internal links
      if (href.startsWith("/") && !href.startsWith("//")) {
        // Don't intercept if it's the current page
        if (href === pathname) return;

        // Don't intercept if modifier keys are pressed
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        // Don't intercept if target="_blank"
        if (anchor.target === "_blank") return;

        e.preventDefault();
        performTransition(href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, performTransition]);

  // Handle route changes triggered by browser navigation
  useEffect(() => {
    // Reset transition state when pathname changes
    if (!isTransitioning && overlayRef.current) {
      gsap.set(overlayRef.current, { visibility: "hidden", yPercent: 100 });
    }
  }, [pathname, isTransitioning]);

  return (
    <>
      {children}

      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
        style={{
          visibility: "hidden",
          backgroundColor: currentTheme.bg,
          transform: "translateY(100%)",
        }}
        aria-hidden="true"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${currentTheme.text} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.text} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Counter display */}
        <div className="relative flex flex-col items-center gap-4">
          <span
            ref={counterRef}
            className="font-mono text-[12vw] md:text-[8vw] font-extralight tracking-[-0.04em] leading-none"
            style={{ color: currentTheme.text }}
          >
            00
          </span>
          <span
            ref={labelRef}
            className="font-mono text-xs tracking-[0.3em] uppercase opacity-60"
            style={{ color: currentTheme.text }}
          >
            Loading
          </span>
        </div>

        {/* Corner accents */}
        <div
          className="absolute top-8 left-8 w-12 h-12 border-l border-t opacity-20"
          style={{ borderColor: currentTheme.text }}
        />
        <div
          className="absolute top-8 right-8 w-12 h-12 border-r border-t opacity-20"
          style={{ borderColor: currentTheme.text }}
        />
        <div
          className="absolute bottom-8 left-8 w-12 h-12 border-l border-b opacity-20"
          style={{ borderColor: currentTheme.text }}
        />
        <div
          className="absolute bottom-8 right-8 w-12 h-12 border-r border-b opacity-20"
          style={{ borderColor: currentTheme.text }}
        />
      </div>
    </>
  );
}

// Export theme getter for external use
export { getThemeForDestination, destinationThemes };
