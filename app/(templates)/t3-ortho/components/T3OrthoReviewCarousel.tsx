"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Review {
  reviewText: string;
  reviewerName: string;
}

interface T3OrthoReviewCarouselProps {
  reviews: Review[];
}

function MagneticArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
        disabled
          ? "border-neutral-border/30 text-neutral-muted/30 cursor-not-allowed"
          : "border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary"
      }`}
    >
      <svg
        className={`w-5 h-5 ${direction === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </motion.button>
  );
}

export default function T3OrthoReviewCarousel({ reviews }: T3OrthoReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = useMotionValue(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      progress.set((currentIndex - 1) / (reviews.length - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
      progress.set((currentIndex + 1) / (reviews.length - 1));
    }
  };

  return (
    <section className="relative py-32 overflow-hidden bg-brand-primary/[0.02]">
      <div className="max-w-5xl mx-auto px-8">
        <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
          Kind Words
        </p>

        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
          Happy Smiles
        </h2>

        {/* Review Container */}
        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="flex"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4 md:px-16"
              >
                <div className="text-center max-w-3xl mx-auto">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-brand-primary/50"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl md:text-2xl lg:text-3xl font-extralight leading-relaxed tracking-wide text-brand-mainText/80 mb-10">
                    &ldquo;{review.reviewText}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-8 h-px bg-brand-primary/30" />
                    <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-muted">
                      {review.reviewerName}
                    </span>
                    <div className="w-8 h-px bg-brand-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-16">
          <MagneticArrow
            direction="left"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          />

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  progress.set(index / (reviews.length - 1));
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-brand-primary w-6"
                    : "bg-brand-primary/20 hover:bg-brand-primary/40"
                }`}
              />
            ))}
          </div>

          <MagneticArrow
            direction="right"
            onClick={handleNext}
            disabled={currentIndex === reviews.length - 1}
          />
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-16">
          <p className="text-4xl font-extralight text-brand-primary/60 mb-2">
            5.0
          </p>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted">
            200+ Verified Reviews
          </p>
        </div>
      </div>
    </section>
  );
}
