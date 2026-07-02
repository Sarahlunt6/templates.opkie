"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { sampleBeforeAfterCases } from "@/data/master";
import { SectionHeader } from "./T2Kit";
import { EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Scan comparison — the signature moment. The before/after divider
   is the scanner beam itself: when the section enters the viewport
   it performs one full sweep (the "scan"), then hands control to
   the visitor. Drag, or use arrow keys on the beam handle.
   ──────────────────────────────────────────────────────────────── */

export default function T2ScanCompare() {
  const cases = sampleBeforeAfterCases;
  const [caseIdx, setCaseIdx] = useState(0);
  const [pos, setPos] = useState(50); // % from left
  const [hasScanned, setHasScanned] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const reduced = useReducedMotion();
  const inView = useInView(frameRef, { once: true, amount: 0.45 });

  const activeCase = cases[caseIdx];

  // Intro sweep: one pass left→right→center when first seen
  useEffect(() => {
    if (!inView || hasScanned) return;
    setHasScanned(true);
    if (reduced) return;

    let raf = 0;
    const start = performance.now();
    const DURATION = 2600;
    const tick = (t: number) => {
      if (draggingRef.current) return;
      const p = Math.min((t - start) / DURATION, 1);
      // 8 → 92 → 50, eased
      const eased = 1 - Math.pow(1 - p, 2);
      const value =
        eased < 0.5 ? 8 + (92 - 8) * (eased / 0.5) : 92 - (92 - 50) * ((eased - 0.5) / 0.5);
      setPos(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, hasScanned, reduced]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      draggingRef.current = true;
      setPos((p) => Math.max(4, p - 4));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      draggingRef.current = true;
      setPos((p) => Math.min(96, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(4);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(96);
    }
  };

  return (
    <section id="results" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
      <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto">
        <SectionHeader
          index="03"
          label="Scan comparison"
          title={
            <>
              Before the scan. <span className="t2p-duotext">After the work.</span>
            </>
          }
          lede="Drag the beam. Every case below was planned digitally and finished in this practice."
        />

        {/* Case selector */}
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Select case">
          {cases.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={i === caseIdx}
              onClick={() => setCaseIdx(i)}
              className={`t2p-mono px-4 py-2 text-[0.6875rem] uppercase tracking-[0.14em] border transition-colors duration-300 ${
                i === caseIdx
                  ? "border-[var(--t2p-ice)] text-[var(--t2p-ice)] bg-[rgba(103,232,249,0.06)]"
                  : "border-[var(--t2p-line-strong)] text-[var(--t2p-text-70)] hover:border-[var(--t2p-ice-dim)]"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {c.procedureType}
            </button>
          ))}
        </div>

        {/* Comparison frame */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="t2p-tick relative border border-[var(--t2p-line-strong)]"
        >
          <div
            ref={frameRef}
            className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden select-none touch-none cursor-ew-resize"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* After (base layer) */}
            <Image
              src={activeCase.afterUrl}
              alt={`${activeCase.altTag} — after`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
              draggable={false}
            />
            {/* Before (clipped to the left of the beam) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={activeCase.beforeUrl}
                alt={`${activeCase.altTag} — before`}
                fill
                loading="lazy"
                className="object-cover saturate-[0.35] brightness-[0.85]"
                sizes="(max-width: 1024px) 100vw, 960px"
                draggable={false}
              />
              {/* Faint wireframe over the un-treated side */}
              <div className="t2p-wireframe absolute inset-0 opacity-[0.14]" aria-hidden="true" />
            </div>

            {/* Scanner beam divider */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Comparison position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)} percent before, ${100 - Math.round(pos)} percent after`}
              onKeyDown={onKeyDown}
              className="absolute top-0 bottom-0 z-10 w-10 -ml-5 flex justify-center cursor-ew-resize"
              style={{ left: `${pos}%` }}
            >
              <span className="t2p-beam-v h-full w-[2px]" aria-hidden="true" />
              {/* Diamond handle */}
              <span
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rotate-45 border border-[var(--t2p-ice)] bg-[#0A0C10] shadow-[0_0_14px_rgba(103,232,249,0.6)]"
                aria-hidden="true"
              />
            </div>

            {/* Mono readouts */}
            <span className="t2p-mono absolute top-3 left-3 md:top-4 md:left-4 text-[0.5625rem] md:text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-70)] bg-[#0A0C10]/70 px-2 py-1">
              01 / source
            </span>
            <span className="t2p-mono absolute top-3 right-3 md:top-4 md:right-4 text-[0.5625rem] md:text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-ice)] bg-[#0A0C10]/70 px-2 py-1">
              02 / result
            </span>
            <span
              className="t2p-mono absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.625rem] tracking-[0.14em] text-[var(--t2p-text-70)] bg-[#0A0C10]/70 px-2.5 py-1"
              aria-hidden="true"
            >
              scan {Math.round(pos)}%
            </span>
          </div>

          {/* Case metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--t2p-line)] px-4 md:px-5 py-3.5 bg-[var(--t2p-surface)]">
            <span className="t2p-mono text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-70)]">
              Case {String(caseIdx + 1).padStart(3, "0")} — {activeCase.procedureType}
            </span>
            <span className="t2p-mono text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)]">
              Planned digitally · finished in-house
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
