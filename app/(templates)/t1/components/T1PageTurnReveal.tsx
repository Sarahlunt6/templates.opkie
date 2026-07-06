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
 * T1 PRESS — the before/after plate. Moving across the photograph
 * wipes the "after" into view along a hard red seam, like two press
 * proofs laid over each other. Drag on touch; a range slider provides
 * keyboard access.
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
  const eased = useSpring(progress, { stiffness: 160, damping: 26, mass: 0.5 });
  const inset = useTransform(eased, (v) => 100 - v);
  const clipPath = useMotionTemplate`inset(0 ${inset}% 0 0)`;
  const seamLeft = useMotionTemplate`${eased}%`;
  const seamOpacity = useTransform(eased, [0, 4, 96, 100], [0, 1, 1, 0]);

  // Quick opening wipe when the plate first scrolls into view
  useEffect(() => {
    if (!inView || introDone) return;
    setIntroDone(true);
    if (reduced) {
      progress.set(50);
      setSliderValue(50);
      return;
    }
    const controls = animate(progress, 55, {
      duration: 0.9,
      ease: [0.25, 1, 0.4, 1],
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
        className="relative w-full cursor-ew-resize select-none overflow-hidden border border-[#1A1713] touch-pan-y"
      >
        <div className="relative aspect-[4/3] w-full md:aspect-[21/10]">
          {/* Before — the base proof */}
          <Image
            src={beforeUrl}
            alt={`${altTag} — before treatment`}
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
            draggable={false}
          />

          {/* After — wiped in along the seam */}
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

          {/* Seam — a hard red rule with a square handle */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#D92B21]"
            style={{ left: seamLeft, opacity: seamOpacity }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#D92B21] bg-[#F3EFE6] font-mono text-[11px] tracking-[0.1em] text-[#D92B21]">
              &lt;&gt;
            </span>
          </motion.div>

          {/* Corner captions */}
          <span className="t1-mono-label absolute bottom-3 left-3 bg-[#1A1713] px-2.5 py-1.5 !text-[#F3EFE6]">
            BEFORE
          </span>
          <span className="t1-mono-label absolute bottom-3 right-3 bg-[#F3EFE6] px-2.5 py-1.5">
            AFTER
          </span>
        </div>
      </div>

      {/* Keyboard-accessible control */}
      <div className="mx-auto mt-4 max-w-md px-2">
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

      <figcaption className="mt-3 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-center">
        <span className="t1-mono-label t1-mono-label-red">
          [ {procedureType.toUpperCase()} ]
        </span>
        <span className="t1-mono-label t1-mono-label-stone">
          AS DOCUMENTED BY THE PRACTICE — MOVE ACROSS THE PLATE
        </span>
      </figcaption>
    </figure>
  );
}
