"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
  animate,
  useReducedMotion,
} from "framer-motion";

interface T1PageTurnRevealProps {
  beforeUrl: string;
  afterUrl: string;
  altTag: string;
  procedureType: string;
}

/**
 * The Reveal — the signature moment of the feature.
 * Moving the cursor across the photograph wipes the "after" into view
 * like turning a glossy magazine page. On touch, drag anywhere on the
 * image; a styled range slider provides keyboard access.
 */
export default function T1PageTurnReveal({
  beforeUrl,
  afterUrl,
  altTag,
  procedureType,
}: T1PageTurnRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.45 });
  const [introDone, setIntroDone] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const draggingRef = useRef(false);

  // 0 = all "before", 100 = all "after"
  const progress = useMotionValue(0);
  const eased = useSpring(progress, { stiffness: 110, damping: 24, mass: 0.6 });
  const inset = useTransform(eased, (v) => 100 - v);
  const clipPath = useMotionTemplate`inset(0 ${inset}% 0 0)`;
  const seamLeft = useMotionTemplate`${eased}%`;
  // The turning page casts a soft shadow just ahead of the seam
  const sheenOpacity = useTransform(eased, [0, 4, 96, 100], [0, 1, 1, 0]);

  // Slow opening turn when the plate first scrolls into view
  useEffect(() => {
    if (!inView || introDone) return;
    setIntroDone(true);
    if (reduced) {
      progress.set(50);
      setSliderValue(50);
      return;
    }
    const controls = animate(progress, 55, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setSliderValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, introDone, reduced, progress]);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100)
    );
    progress.set(pct);
    setSliderValue(Math.round(pct));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!introDone) return;
    if (e.pointerType === "mouse") {
      setFromClientX(e.clientX);
    } else if (draggingRef.current) {
      setFromClientX(e.clientX);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      draggingRef.current = true;
      setFromClientX(e.clientX);
    }
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  return (
    <figure className="w-full">
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className="relative w-full cursor-ew-resize select-none overflow-hidden touch-pan-y"
      >
        <div className="relative aspect-[4/3] w-full md:aspect-[21/10]">
          {/* Before — the base page */}
          <Image
            src={beforeUrl}
            alt={`${altTag} — before treatment`}
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
            draggable={false}
          />

          {/* After — wiped in like a turning page */}
          <motion.div className="absolute inset-0" style={{ clipPath }}>
            <Image
              src={afterUrl}
              alt={`${altTag} — after treatment`}
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover"
              draggable={false}
            />
          </motion.div>

          {/* Page-edge sheen ahead of the seam */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-16 -translate-x-full"
            style={{
              left: seamLeft,
              opacity: sheenOpacity,
              background:
                "linear-gradient(to left, rgba(22,19,15,0.28), transparent 70%)",
            }}
          />

          {/* Seam — hairline brass rule with handle */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-px bg-[#9C7E46]"
            style={{ left: seamLeft, opacity: sheenOpacity }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#9C7E46] bg-[#F7F5F0]/90 font-t1-display text-xs italic text-[#9C7E46]">
              ⟷
            </span>
          </motion.div>

          {/* Corner captions */}
          <span className="absolute bottom-4 left-4 bg-[#16130F]/70 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.24em] text-[#F7F5F0]">
            Before
          </span>
          <span className="absolute bottom-4 right-4 bg-[#F7F5F0]/85 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.24em] text-[#16130F]">
            After
          </span>
        </div>
      </div>

      {/* Keyboard-accessible control */}
      <div className="mx-auto mt-5 max-w-md px-2">
        <label htmlFor="t1-reveal-slider" className="sr-only">
          Reveal the after photograph
        </label>
        <input
          id="t1-reveal-slider"
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => {
            const v = Number(e.target.value);
            setSliderValue(v);
            progress.set(v);
          }}
          className="t1-wipe-range"
        />
      </div>

      <figcaption className="mt-4 text-center font-sans text-sm text-[#6B675E]">
        <span className="t1-eyebrow mr-3">{procedureType}</span>
        as documented by the practice — move across the photograph to turn
        the page
      </figcaption>
    </figure>
  );
}
