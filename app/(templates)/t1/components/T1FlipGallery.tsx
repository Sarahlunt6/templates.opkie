"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

interface T1FlipGalleryProps {
  items: GalleryItem[];
  categories: string[];
}

/**
 * T1 FLIP Gallery Component
 *
 * Premium gallery with smooth layout animations using Framer Motion's layout prop.
 * Features:
 * - FLIP (First, Last, Invert, Play) technique for smooth transitions
 * - Cards fluidly glide and resize into new positions
 * - Hardware-accelerated transforms
 * - Respects prefers-reduced-motion
 */
export default function T1FlipGallery({ items, categories }: T1FlipGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Custom spring configuration for premium feel
  const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  };

  return (
    <section className="py-16 lg:py-32 px-6 lg:px-8 bg-brand-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-xl mb-10 lg:mb-16">
          <p className="text-brand-primary uppercase tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-sm mb-3 lg:mb-4 font-medium">
            Our Work
          </p>
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-brand-mainText leading-[0.95]">
            Smile
            <span className="block text-brand-primary italic font-light">Gallery</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10 lg:mb-16">
          {["All", ...categories].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand-primary text-white shadow-lg"
                  : "bg-white text-brand-mainText border-2 border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/5"
              }`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              layout={!prefersReducedMotion}
              transition={prefersReducedMotion ? { duration: 0 } : springConfig}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid with FLIP Animation */}
        <motion.div
          layout={!prefersReducedMotion}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          transition={prefersReducedMotion ? { duration: 0 } : springConfig}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                transition={prefersReducedMotion ? { duration: 0 } : springConfig}
                className="group relative overflow-hidden border border-brand-primary/20 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText/90 via-brand-mainText/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-primary text-white rounded-full shadow-lg">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="p-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-neutral-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Hover Arrow Icon */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-xl text-neutral-muted">
              No items found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
