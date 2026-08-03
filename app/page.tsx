"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { t1FontVariables } from "./(templates)/t1/fonts";
import { t2FontVariables } from "./(templates)/t2/fonts";
import { t3FontVariables } from "./(templates)/t3/fonts";
import { t4FontVariables } from "./(templates)/t4/fonts";
import { t5FontVariables } from "./(templates)/t5/fonts";
import { useBrandStudio } from "@/components/brand/BrandStudioProvider";
import { readableOn } from "@/lib/brand/color";

/* ────────────────────────────────────────────────────────────────
   The Opkie Collection — hub page.
   A dark gallery wall hung with three specimen plates: each concept's
   actual homepage, framed, with a placard set in that concept's own
   typography and accent. Hovering a plate plays that template's
   signature moment over its live screenshot while the others quiet.
   ──────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Add an alpha channel to a #RRGGBB hex. */
function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Concept = {
  id: string;
  numeral: string;
  name: string;
  discipline: string;
  pullLine: string;
  /* visual identity */
  bg: string;
  /** accent tuned for legibility on the dark gallery wall */
  accentOnDark: string;
  nameFont: string;
  nameClass: string;
  eyebrowFont: string;
  pullFont: string;
};

const concepts: Concept[] = [
  {
    id: "t1",
    numeral: "I",
    name: "Press",
    discipline: "Big graphic editorial",
    pullLine: "Good dentistry deserves to be seen.",
    bg: "#F3EFE6",
    accentOnDark: "#E5382C",
    nameFont: "font-t1-press",
    nameClass: "uppercase tracking-[0.01em]",
    eyebrowFont: "font-t1-mono",
    pullFont: "font-t3-serif italic",
  },
  {
    id: "t2",
    numeral: "II",
    name: "Precision",
    discipline: "The porcelain lab",
    pullLine: "Scanned. Designed. Delivered under one roof.",
    bg: "#F6F8FA",
    accentOnDark: "#38BDF8",
    nameFont: "font-innovator",
    nameClass: "font-medium tracking-[-0.02em]",
    eyebrowFont: "font-t2-mono",
    pullFont: "font-t2-mono",
  },
  {
    id: "t3",
    numeral: "III",
    name: "Haven",
    discipline: "Organic calm",
    pullLine: "walk in nervous. leave lighter.",
    bg: "#E8EFE3",
    accentOnDark: "#A0C0AF",
    nameFont: "font-sanctuary",
    nameClass: "font-extralight lowercase tracking-[0.01em]",
    eyebrowFont: "font-sanctuary",
    pullFont: "font-t3-serif italic",
  },
  {
    id: "t4",
    numeral: "IV",
    name: "Atelier",
    discipline: "After-dark couture",
    pullLine: "Every smile, made to measure.",
    bg: "#1E1410",
    accentOnDark: "#C9A56A",
    nameFont: "font-t4-display",
    nameClass: "tracking-[0.05em]",
    eyebrowFont: "font-t4-body",
    pullFont: "font-t4-display italic",
  },
  {
    id: "t5",
    numeral: "V",
    name: "Marigold",
    discipline: "Main-street retro",
    pullLine: "The dentist your kids ask to visit.",
    bg: "#FFF6E8",
    accentOnDark: "#F0A32F",
    nameFont: "font-t5-display",
    nameClass: "tracking-[0.005em]",
    eyebrowFont: "font-t5-body",
    pullFont: "font-t5-script",
  },
];

/* ── Per-concept ambient signatures, played over the screenshot ──── */

function PressEffect({ active }: { active: boolean }) {
  return (
    <>
      {/* Ink hairlines draw in from the edges, like the chapter rules */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-6 right-6 top-[24%] h-px origin-left"
        style={{ backgroundColor: "#1A1713" }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 0.28 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-6 right-6 bottom-[26%] h-px origin-right"
        style={{ backgroundColor: "#1A1713" }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 0.28 : 0 }}
        transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
      />
      {/* Oversized red Anton index, like the giant cover wordmark */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-2 bottom-[-3rem] select-none font-t1-press text-[11rem] uppercase leading-none"
        style={{ color: "rgba(217,43,33,0.14)" }}
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : 20 }}
        transition={{ duration: 1, ease: EASE }}
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
            "linear-gradient(rgba(23,32,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,42,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
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
      className="pointer-events-none absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(109,139,125,0.30) 0%, rgba(109,139,125,0.10) 45%, transparent 70%)",
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
          ? {
              opacity: { duration: 0.8 },
              scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            }
          : { duration: 0.6 }
      }
    />
  );
}

function AtelierEffect({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <>
      {/* a cone of gallery light warming from above */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% -8%, rgba(230,203,150,0.30), rgba(230,203,150,0.06) 50%, transparent 72%)",
        }}
        animate={{ opacity: active ? 1 : 0.35 }}
        transition={{ duration: 0.8 }}
      />
      {/* brass hairline, drawn like a fitting mark */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-6 right-6 bottom-[22%] h-px origin-left"
        style={{ backgroundColor: "rgba(201,165,106,0.55)" }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      {/* the champagne sheen sweeping across the dark */}
      {active && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(100deg, transparent 10%, rgba(230,203,150,0.16) 50%, transparent 90%)",
          }}
          initial={{ x: "-140%" }}
          animate={{ x: "340%" }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 1.1,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );
}

function MarigoldEffect({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <>
      {/* the scalloped awning rolls down over the storefront */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 origin-top"
        animate={{
          scaleY: active ? 1 : 0,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          style={{
            height: 14,
            background:
              "repeating-linear-gradient(90deg, #F0A32F 0 28px, #FFFDF7 28px 56px)",
          }}
        />
        <div
          style={{
            height: 13,
            backgroundImage:
              "radial-gradient(circle at 14px 0, #F0A32F 12px, transparent 13px), radial-gradient(circle at 42px 0, #FFFDF7 12px, transparent 13px)",
            backgroundSize: "56px 13px",
            backgroundRepeat: "repeat-x",
          }}
        />
      </motion.div>
      {/* the marigold sun rising in the corner */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-8 h-36 w-36 rounded-full"
        style={{ backgroundColor: "rgba(240,163,47,0.85)" }}
        animate={
          active
            ? reduced
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: -8, scale: 1 }
            : { opacity: 0, y: 24, scale: 0.85 }
        }
        transition={{ duration: 0.55, ease: EASE }}
      />
    </>
  );
}

function ConceptAmbient({ id, active }: { id: string; active: boolean }) {
  if (id === "t1") return <PressEffect active={active} />;
  if (id === "t2") return <PrecisionEffect active={active} />;
  if (id === "t4") return <AtelierEffect active={active} />;
  if (id === "t5") return <MarigoldEffect active={active} />;
  return <HavenEffect active={active} />;
}

/* ── Specimen plate ────────────────────────────────────────────── */

function ConceptCard({ concept, index }: { concept: Concept; index: number }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const studio = useBrandStudio();

  /* Once a client has set their colors, the placards on this wall switch
     to their primary, lifted to read on the dark ground. The plates
     themselves are photographs of the original designs — the concept in
     their palette is one click away, inside the template. */
  const a =
    studio?.active && studio.hydrated
      ? readableOn(studio.colors.primary, "#0D0D0F", 4.5)
      : concept.accentOnDark;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: EASE }}
    >
      <Link
        href={`/${concept.id}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0D0D0F]"
        style={{ ["--tw-ring-color" as string]: a }}
      >
        {/* Framed preview — the plate */}
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-xl border"
          style={{
            backgroundColor: concept.bg,
            borderColor: hovered
              ? withAlpha(a, 0.5)
              : "rgba(255,255,255,0.10)",
            transform: hovered && !reduced ? "translateY(-6px)" : "none",
            boxShadow: hovered
              ? `0 34px 64px -28px ${withAlpha(a, 0.5)}, 0 0 0 1px ${withAlpha(a, 0.18)}`
              : "0 22px 44px -30px rgba(0,0,0,0.85)",
            transition:
              "transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Image
            src={`/images/templates/${concept.id}-preview.png`}
            alt={`${concept.name} homepage design preview`}
            fill
            sizes="(max-width: 768px) 90vw, 32vw"
            priority={index === 0}
            className="object-cover object-top"
            style={{
              transform: hovered && !reduced ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* The concept's own signature, played over its live screenshot */}
          <ConceptAmbient id={concept.id} active={hovered} />
        </div>

        {/* Placard */}
        <div className="mt-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`text-[11px] uppercase tracking-[0.3em] ${concept.eyebrowFont}`}
              style={{ color: a }}
            >
              No. {concept.numeral}
            </span>
            <span
              className={`text-[10.5px] uppercase tracking-[0.24em] text-white/40 ${concept.eyebrowFont}`}
            >
              {concept.discipline}
            </span>
          </div>

          <h2
            className={`${concept.nameFont} ${concept.nameClass} text-[clamp(2.1rem,3vw,2.9rem)] leading-none text-white`}
          >
            {concept.name}
          </h2>

          <p
            className={`${concept.pullFont} text-[14.5px] leading-snug`}
            style={{ color: a }}
          >
            {concept.pullLine}
          </p>

          <span className="mt-2 inline-flex items-center gap-2.5">
            <span
              className={`relative text-[11px] uppercase tracking-[0.2em] text-white/80 ${concept.eyebrowFont}`}
            >
              View concept
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left"
                style={{
                  backgroundColor: a,
                  transform: hovered ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </span>
            <svg
              className="h-3.5 w-3.5"
              style={{
                color: a,
                transform: hovered && !reduced ? "translateX(4px)" : "none",
                transition: "transform 0.3s ease-out",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
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
}

/**
 * The plates on this wall are photographs of the original designs, so
 * they cannot carry a client's palette. Rather than let that read as a
 * bug, say it plainly and point at where the colors do live.
 */
function BrandPreviewNote() {
  const studio = useBrandStudio();
  if (!studio?.hydrated || !studio.active) return null;

  return (
    <p className="mt-5 flex items-center gap-2.5 text-[12.5px] font-light leading-relaxed text-white/45">
      <span className="flex shrink-0 -space-x-1">
        <span
          className="block h-3 w-3 rounded-full ring-1 ring-white/25"
          style={{ backgroundColor: studio.colors.primary }}
        />
        <span
          className="block h-3 w-3 rounded-full ring-1 ring-white/25"
          style={{ backgroundColor: studio.colors.accent }}
        />
      </span>
      Your colors are on. The previews below are the original designs — open
      any concept to see it wearing yours.
    </p>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function CollectionPage() {
  const reduced = useReducedMotion();

  return (
    <main
      className={`relative flex min-h-screen w-full flex-col overflow-x-clip bg-[#0D0D0F] text-white ${t1FontVariables} ${t2FontVariables} ${t3FontVariables} ${t4FontVariables} ${t5FontVariables}`}
    >
      {/* Gallery-wall lighting: a soft lift from the top, quiet at the edges */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -8%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-20 px-6 py-7 lg:px-12 lg:py-8"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Image
            src="/images/opkie-logo.svg"
            alt="Opkie"
            width={86}
            height={32}
            className="brightness-0 invert"
            priority
          />
          <span className="h-4 w-px bg-white/20" />
          <span className="text-[10px] font-light uppercase tracking-[0.32em] text-white/45">
            The Collection
          </span>
        </div>
      </motion.header>

      {/* ── Intro + gallery ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-10 lg:px-12 lg:py-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mb-11 max-w-2xl lg:mb-14"
        >
          <h1 className="text-[clamp(1.9rem,3.4vw,3rem)] font-light leading-[1.08] tracking-[-0.015em] [text-wrap:balance]">
            One practice.
            <br className="hidden sm:block" /> Five ways to meet it.
          </h1>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed text-white/55">
            Five homepage concepts, each with its own voice and interactive
            signature. Open the one that fits your practice — we tailor every
            word, photograph, and color from there.
          </p>
          <BrandPreviewNote />
        </motion.div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {concepts.map((c, i) => (
            <ConceptCard key={c.id} concept={c} index={i} />
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-20 border-t border-white/10 px-6 py-5 lg:px-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[10.5px] font-light uppercase tracking-[0.2em] text-white/40">
            <span>
              <span className="text-white/70">01</span> Choose a concept
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>
              <span className="text-white/70">02</span> We tailor it to your
              practice
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>
              <span className="text-white/70">03</span> Launch
            </span>
          </div>

          <span className="text-[10px] font-light uppercase tracking-[0.2em] text-white/30">
            Designed &amp; engineered by{" "}
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
