"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  title: string;
  description: string;
  image: string;
}

interface T1EditorialServicesProps {
  services: Service[];
}

/**
 * T1 Editorial Services Component
 *
 * Premium asymmetric parallax scroll effect mimicking luxury magazine layouts.
 * Features:
 * - Staggered image/text blocks at offset speeds
 * - Hardware-accelerated transforms
 * - Respects prefers-reduced-motion
 */
export default function T1EditorialServices({ services }: T1EditorialServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, index) => {
      const image = card.querySelector("[data-parallax-image]");
      const content = card.querySelector("[data-parallax-content]");

      // Alternating parallax speeds for editorial asymmetry
      const imageSpeed = index % 2 === 0 ? -30 : -50;
      const contentSpeed = index % 2 === 0 ? -20 : -40;

      // Image parallax
      if (image) {
        gsap.to(image, {
          yPercent: imageSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Content parallax (slower than image for depth)
      if (content) {
        gsap.to(content, {
          yPercent: contentSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Fade in on scroll
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 px-6 lg:px-8 bg-brand-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Editorial Offset */}
        <div className="max-w-xl mb-10 lg:mb-20">
          <p className="text-brand-primary uppercase tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-sm mb-3 lg:mb-4 font-medium">
            Our Expertise
          </p>
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-brand-mainText leading-[0.95]">
            Premium
            <span className="block text-brand-primary italic font-light">Services</span>
          </h2>
        </div>

        {/* Desktop: Staggered grid with parallax, Mobile: Horizontal scroll */}
        <div
          className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`group flex-shrink-0 w-[min(280px,calc(100vw-64px))] lg:w-auto ${
                index === 1 ? "lg:translate-y-12" : index === 2 ? "lg:-translate-y-6" : index === 3 ? "lg:translate-y-6" : ""
              }`}
              style={{ scrollSnapAlign: "center" }}
            >
              <div className="relative overflow-hidden border border-brand-primary/20 h-full">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <div data-parallax-image className="absolute inset-0 will-change-transform">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 280px, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText via-brand-mainText/20 to-transparent" />
                </div>

                {/* Text overlay with parallax */}
                <div
                  data-parallax-content
                  className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 will-change-transform"
                >
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 -ml-2 pl-2 border-l-4 border-brand-accent">
                    {service.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-white/70 leading-relaxed line-clamp-3 lg:line-clamp-none">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
