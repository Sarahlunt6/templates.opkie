"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { MagneticElement, AnimatedCounter } from "@/components/premium";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface T1PremiumHeroProps {
  cityServed: string;
  phoneNumber: string;
  onlineBookingUrl: string;
}

/**
 * T1 Premium Hero Component
 *
 * Ultra-luxury hero section with:
 * - Line-by-line split-text reveal with overflow mask
 * - Subtle background video scale-up animation
 * - Hardware-accelerated transforms for 60fps
 * - Respects prefers-reduced-motion
 */
export default function T1PremiumHero({
  cityServed,
  phoneNumber,
  onlineBookingUrl,
}: T1PremiumHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Show all content immediately for accessibility
      if (headlineRef.current) headlineRef.current.style.opacity = "1";
      if (subtitleRef.current) subtitleRef.current.style.opacity = "1";
      if (subheadRef.current) subheadRef.current.style.opacity = "1";
      return;
    }

    // Split text into lines for reveal animation
    const headlineSplit = headlineRef.current
      ? new SplitType(headlineRef.current, { types: "lines", tagName: "span" })
      : null;
    const subtitleSplit = subtitleRef.current
      ? new SplitType(subtitleRef.current, { types: "lines", tagName: "span" })
      : null;

    // Wrap lines in overflow containers for mask effect
    if (headlineSplit?.lines) {
      headlineSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        wrapper.style.paddingTop = "0.1em";
        wrapper.style.paddingBottom = "0.1em";
        wrapper.style.marginTop = "-0.1em";
        wrapper.style.marginBottom = "-0.1em";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
    }

    if (subtitleSplit?.lines) {
      subtitleSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        wrapper.style.paddingTop = "0.1em";
        wrapper.style.paddingBottom = "0.1em";
        wrapper.style.marginTop = "-0.1em";
        wrapper.style.marginBottom = "-0.1em";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
    }

    // Create master timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate headline lines sliding up from masked state
    if (headlineSplit?.lines) {
      gsap.set(headlineSplit.lines, { yPercent: 100, opacity: 0 });
      tl.to(
        headlineSplit.lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
        },
        0.3
      );
    }

    // Animate subtitle lines
    if (subtitleSplit?.lines) {
      gsap.set(subtitleSplit.lines, { yPercent: 100, opacity: 0 });
      tl.to(
        subtitleSplit.lines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
        },
        0.6
      );
    }

    // Fade in subhead
    if (subheadRef.current) {
      gsap.set(subheadRef.current, { opacity: 0, y: 20 });
      tl.to(
        subheadRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        0.9
      );
    }

    // Subtle background video scale animation
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        }
      );

      // Parallax video on scroll
      gsap.to(videoRef.current, {
        scale: 1.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Cleanup
    return () => {
      headlineSplit?.revert();
      subtitleSplit?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[100svh] lg:min-h-[90vh] relative overflow-hidden pt-28 md:pt-32 lg:pt-36"
    >
      {/* Background Video with Transform Animation */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          poster="/images/team/staff-photo.jpg"
          style={{ transform: "scale(1.1)" }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/50 lg:bg-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
      </div>

      {/* Editorial Overlapping Content */}
      <div className="relative z-10 min-h-[100svh] lg:min-h-[90vh] flex items-end lg:items-center pb-8 lg:pb-0">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20">
          <div className="max-w-2xl">
            {/* H1 - Line-by-line Reveal with Mask */}
            <div
              ref={headlineRef}
              className="text-[clamp(2rem,7vw,6rem)] font-bold text-white leading-[0.95] tracking-tight mb-4 -ml-0.5 lg:-ml-1"
            >
              <span className="block">
                {cityServed}&apos;s{" "}
                <span className="font-serif italic font-light">Highest-Rated</span>
              </span>
            </div>
            <div
              ref={subtitleRef}
              className="text-[clamp(2.5rem,8vw,7rem)] font-bold text-brand-accent italic font-light leading-[0.95] tracking-tight mb-4 ml-1 lg:ml-2"
            >
              Cosmetic Dentist
            </div>

            {/* Intro Copy - Subtle Reveal */}
            <div
              ref={subheadRef}
              className="text-base lg:text-xl text-white/80 leading-relaxed mb-8 lg:mb-10 max-w-lg ml-2 lg:ml-4 border-l-2 border-brand-accent pl-4 lg:pl-6"
            >
              We sedate 60% of our patients. Not because procedures hurt—because anxiety
              shouldn&apos;t stop you from getting care. Most veneers take 2 weeks. Ours take 90 minutes.
            </div>

            {/* CTA Buttons - Editorial Sharp Design */}
            <div className="flex flex-col gap-4 ml-2 lg:ml-4">
              <MagneticElement strength={0.2}>
                <a
                  href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                  className="group relative inline-block w-full lg:w-auto overflow-hidden"
                >
                  {/* Sharp editorial left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent transition-all duration-300 group-hover:w-2" />

                  <div className="relative px-8 lg:px-10 py-5 lg:py-6 bg-white text-brand-mainText font-bold text-base lg:text-lg transition-all duration-300 group-hover:pl-10 lg:group-hover:pl-12">
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="uppercase tracking-wider text-sm lg:text-base">{phoneNumber}</span>
                    </div>
                  </div>

                  {/* Bottom underline that grows on hover */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-accent transition-all duration-500 group-hover:w-full" />
                </a>
              </MagneticElement>

              {onlineBookingUrl !== "none" && (
                <MagneticElement strength={0.2}>
                  <a
                    href={onlineBookingUrl}
                    className="group relative inline-block w-full lg:w-auto border-2 border-white text-white overflow-hidden"
                  >
                    <div className="relative px-8 lg:px-10 py-5 lg:py-6 font-bold text-base lg:text-lg bg-transparent transition-all duration-300 group-hover:bg-white group-hover:text-brand-mainText">
                      <div className="flex items-center justify-center gap-3">
                        <span className="uppercase tracking-wider text-sm lg:text-base">Book Online</span>
                        <svg
                          className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </MagneticElement>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Authority Metrics */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-8 lg:pb-16">
        <div
          className="flex overflow-x-auto lg:overflow-visible gap-6 lg:gap-16 pb-2 lg:pb-0 lg:justify-end scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {[
            { value: 312, suffix: "", label: "Five-Star Reviews" },
            { value: 98, suffix: "%", label: "Would Refer a Friend" },
            { value: 3, suffix: " Days", label: "Avg Wait for Appointment", isCompact: true },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center flex-shrink-0 min-w-[140px]"
              style={{ scrollSnapAlign: "center" }}
            >
              <p className="text-[clamp(2rem,8vw,5rem)] lg:text-7xl font-serif font-light text-white tracking-tight leading-none whitespace-nowrap">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
              </p>
              <p className="text-[10px] lg:text-xs font-sans uppercase tracking-[0.25em] lg:tracking-[0.35em] text-white/50 mt-2 whitespace-nowrap">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
