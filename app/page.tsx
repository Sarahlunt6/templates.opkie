"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────────
   The Opkie Collection — hub page.
   Each column is rendered in its template's own design language,
   and each hover effect demos that template's signature moment.
   ──────────────────────────────────────────────────────────────── */

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
}

type Concept = {
  id: string;
  numeral: string;
  name: string;
  discipline: string;
  audience: string;
  pullLine: string;
  signatures: string[];
  /* visual identity */
  bg: string;
  text: string;
  muted: string;
  accent: string;
  nameFont: string;
  nameClass: string;
  eyebrowFont: string;
  pullFont: string;
  ctaLabel: string;
};

const concepts: Concept[] = [
  {
    id: "t1",
    numeral: "I",
    name: "Press",
    discipline: "Big graphic editorial",
    audience: "For the practice proud enough to make front-page news.",
    pullLine: "Good dentistry deserves to be seen.",
    signatures: [
      "A giant red wordmark the cover photo rises into",
      "Duotone photography that develops into color on hover",
      "Chapters with a running folio, set in Anton & Courier Prime",
    ],
    bg: "#F3EFE6",
    text: "#1A1713",
    muted: "#6B675E",
    accent: "#D92B21",
    nameFont: "font-t1-press",
    nameClass: "uppercase tracking-[0.01em]",
    eyebrowFont: "font-t1-mono",
    pullFont: "font-t3-serif italic",
    ctaLabel: "Enter the concept",
  },
  {
    id: "t2",
    numeral: "II",
    name: "Precision",
    discipline: "The porcelain lab",
    audience: "For the practice that leads with what it can measure.",
    pullLine: "Scanned. Designed. Delivered under one roof.",
    signatures: [
      "A blue scan spine that fills as you read",
      "Digital vs. traditional, proven side by side",
      "Financing configurator & smile-check instruments",
    ],
    bg: "#F6F8FA",
    text: "#17202A",
    muted: "rgba(23,32,42,0.55)",
    accent: "#0369A1",
    nameFont: "font-innovator",
    nameClass: "font-medium tracking-[-0.02em]",
    eyebrowFont: "font-t2-mono",
    pullFont: "font-t2-mono",
    ctaLabel: "Enter the concept",
  },
  {
    id: "t3",
    numeral: "III",
    name: "Haven",
    discipline: "Organic calm",
    audience: "For the patients who dread the dentist — until they visit.",
    pullLine: "walk in nervous. leave lighter.",
    signatures: [
      "A guided-breath moment for anxious patients",
      "Floating glass chips over the welcome photograph",
      "A page that breathes — one slow, shared rhythm",
    ],
    bg: "#E8EFE3",
    text: "#2E3B34",
    muted: "#5F6E65",
    accent: "#566E61",
    nameFont: "font-sanctuary",
    nameClass: "font-extralight lowercase tracking-[0.01em]",
    eyebrowFont: "font-sanctuary",
    pullFont: "font-t3-serif italic",
    ctaLabel: "Enter the concept",
  },
];

/* ── Per-concept ambient hover effects ─────────────────────────── */

function PressEffect({ active }: { active: boolean }) {
  return (
    <>
      {/* Ink hairline rules draw in from the edges, like the chapter rules */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-10 right-10 top-[26%] h-px origin-left"
        style={{ backgroundColor: "#1A1713" }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 0.3 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-10 right-10 bottom-[30%] h-px origin-right"
        style={{ backgroundColor: "#1A1713" }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 0.3 : 0 }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Oversized red Anton index, like the giant cover wordmark */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-t1-press text-[15rem] uppercase leading-none"
        style={{ color: "rgba(217,43,33,0.12)" }}
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : 24 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        01
      </motion.span>
    </>
  );
}

function PrecisionEffect({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <>
      {/* Faint engineering grid, graphite on porcelain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,32,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,42,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
      {/* Blue scan-light sweep */}
      {active && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #38BDF8 30%, #22D3EE 70%, transparent)",
            boxShadow: "0 0 18px rgba(56,189,248,0.5)",
          }}
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </>
  );
}

function HavenEffect({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(109,139,125,0.22) 0%, rgba(109,139,125,0.08) 45%, transparent 70%)",
      }}
      animate={
        active
          ? reduced
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: [1, 1.16, 1] }
          : { opacity: 0, scale: 0.9 }
      }
      transition={
        active && !reduced
          ? { opacity: { duration: 0.8 }, scale: { duration: 9, repeat: Infinity, ease: "easeInOut" } }
          : { duration: 0.6 }
      }
    />
  );
}

function ConceptAmbient({ id, active }: { id: string; active: boolean }) {
  if (id === "t1") return <PressEffect active={active} />;
  if (id === "t2") return <PrecisionEffect active={active} />;
  return <HavenEffect active={active} />;
}

/* ── Shared bits ───────────────────────────────────────────────── */

function SignatureList({
  concept,
  visible,
}: {
  concept: Concept;
  visible: boolean;
}) {
  return (
    <ul className="flex flex-col gap-2.5" aria-hidden={!visible}>
      {concept.signatures.map((s, i) => (
          <motion.li
            key={s}
            className="flex items-start gap-3 text-[13px] leading-relaxed"
            style={{ color: concept.muted }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
            transition={{
              duration: 0.5,
              delay: visible ? 0.12 + i * 0.08 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              aria-hidden
              className="mt-[0.55em] h-px w-4 shrink-0"
              style={{ backgroundColor: concept.accent }}
            />
            {s}
          </motion.li>
      ))}
    </ul>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

function CollectionContent() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const flexFor = (index: number) => {
    if (hovered === null) return 1;
    return hovered === index ? 1.6 : 0.78;
  };

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#0C0C0C] text-white lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      {/* ── Header: the pitch ── */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 border-b border-white/10 bg-[#0C0C0C] px-6 py-8 lg:px-12 lg:py-9"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/images/opkie-logo.svg"
                alt="Opkie"
                width={92}
                height={34}
                className="brightness-0 invert"
                priority
              />
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="hidden text-[10px] font-light uppercase tracking-[0.3em] text-white/40 sm:block">
                The collection
              </span>
            </div>
            <h1 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-[1.12] tracking-[-0.01em] [text-wrap:balance]">
              One practice. Three ways to meet it.
            </h1>
            <p className="mt-3 max-w-xl text-[13.5px] font-light leading-relaxed text-white/55">
              Each concept below is a homepage design with its own typography,
              personality, and interactive signature. Choose the one that feels
              like your practice — we tailor every word, photograph, color, and
              detail to your practice.
            </p>
          </div>

          <div className="hidden flex-col items-end gap-1.5 text-right md:flex">
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              Prepared for your practice
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              Three concepts · No. I — III
            </span>
          </div>
        </div>
      </motion.header>

      {/* ── Desktop: the triptych ── */}
      {!isMobile && (
        <div className="flex min-h-0 flex-1">
          {concepts.map((c, index) => {
            const active = hovered === index;
            const dimmed = hovered !== null && !active;
            return (
              <motion.div
                key={c.id}
                className="relative h-full overflow-hidden"
                style={{
                  flex: flexFor(index),
                  backgroundColor: c.bg,
                  transition: "flex 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                  borderRight: index < concepts.length - 1 ? "1px solid rgba(12,12,12,0.35)" : "none",
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 28 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ConceptAmbient id={c.id} active={active} />

                {/* Dim veil when a sibling is hovered */}
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    backgroundColor: c.bg,
                    opacity: dimmed ? 0.45 : 0,
                    transition: "opacity 0.5s ease-out",
                  }}
                />

                <Link
                  href={`/${c.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 flex h-full flex-col justify-between px-10 py-10 outline-none focus-visible:ring-2 focus-visible:ring-inset xl:px-14"
                  style={{ color: c.text }}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                >
                  {/* Top: numeral + discipline */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] uppercase tracking-[0.32em] ${c.eyebrowFont}`}
                      style={{ color: c.accent }}
                    >
                      No. {c.numeral}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-[0.26em] ${c.eyebrowFont}`}
                      style={{ color: c.muted }}
                    >
                      {c.discipline}
                    </span>
                  </div>

                  {/* Middle: the specimen */}
                  <div className="flex flex-col gap-6">
                    <h2
                      className={`${c.nameFont} ${c.nameClass} text-[clamp(2.6rem,4.6vw,4.4rem)] leading-none`}
                    >
                      {c.name}
                    </h2>

                    <p
                      className={`${c.pullFont} text-[15px] leading-snug`}
                      style={{ color: c.id === "t1" ? "#5E2A2B" : c.accent }}
                    >
                      {c.pullLine}
                    </p>

                    <p
                      className="max-w-[300px] text-[13.5px] font-light leading-relaxed"
                      style={{ color: c.muted }}
                    >
                      {c.audience}
                    </p>

                    <SignatureList concept={c} visible={active} />
                  </div>

                  {/* Bottom: CTA */}
                  <div className="flex flex-col gap-6">
                    <span className="group/cta inline-flex items-center gap-3">
                      <span
                        className={`relative text-[12px] uppercase tracking-[0.18em] ${c.eyebrowFont}`}
                        style={{ color: c.text }}
                      >
                        {c.ctaLabel}
                        <span
                          className="absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-500 ease-out"
                          style={{
                            backgroundColor: c.accent,
                            transform: active ? "scaleX(1)" : "scaleX(0.35)",
                          }}
                        />
                      </span>
                      <svg
                        className="h-4 w-4 transition-transform duration-300"
                        style={{
                          color: c.accent,
                          transform: active ? "translateX(4px)" : "none",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.25}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Mobile: identity cards ── */}
      {isMobile && (
        <div className="flex flex-col gap-5 px-5 py-8">
          {concepts.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl"
              style={{ backgroundColor: c.bg, color: c.text }}
            >
              <ConceptAmbient id={c.id} active />

              <div className="relative z-10 flex flex-col gap-5 p-7">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] uppercase tracking-[0.3em] ${c.eyebrowFont}`}
                    style={{ color: c.accent }}
                  >
                    No. {c.numeral}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-[0.24em] ${c.eyebrowFont}`}
                    style={{ color: c.muted }}
                  >
                    {c.discipline}
                  </span>
                </div>

                <h2 className={`${c.nameFont} ${c.nameClass} text-[2.6rem] leading-none`}>
                  {c.name}
                </h2>

                <p
                  className={`${c.pullFont} text-[15px] leading-snug`}
                  style={{ color: c.id === "t1" ? "#5E2A2B" : c.accent }}
                >
                  {c.pullLine}
                </p>

                <p className="text-[13.5px] font-light leading-relaxed" style={{ color: c.muted }}>
                  {c.audience}
                </p>

                <SignatureList concept={c} visible />

                <Link
                  href={`/${c.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit items-center gap-3 rounded-full px-6 py-3.5"
                  style={{
                    backgroundColor: c.id === "t2" ? "#0369A1" : c.text,
                    color: c.id === "t2" ? "#FFFFFF" : c.bg,
                  }}
                >
                  <span className={`text-[12px] uppercase tracking-[0.16em] ${c.eyebrowFont}`}>
                    {c.ctaLabel}
                  </span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Footer: the process, quietly ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-20 border-t border-white/10 bg-[#0C0C0C] px-6 py-5 lg:px-12"
      >
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[10.5px] font-light uppercase tracking-[0.2em] text-white/45">
            <span>
              <span className="text-white/70">01</span> Choose a concept
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>
              <span className="text-white/70">02</span> We tailor it to your practice
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>
              <span className="text-white/70">03</span> Launch
            </span>
          </div>

          <span className="text-[10px] font-light uppercase tracking-[0.2em] text-white/30">
            Designed & engineered by{" "}
            <a
              href="https://opkie.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition-colors hover:text-white"
            >
              Opkie
            </a>{" "}
            · © 2026
          </span>
        </div>
      </motion.footer>
    </main>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#0C0C0C]" />}>
      <CollectionContent />
    </Suspense>
  );
}
