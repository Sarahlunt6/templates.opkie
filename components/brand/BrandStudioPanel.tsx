"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { isFramed, useBrandStudio } from "./BrandStudioProvider";
import { isValidHex, normalizeHex } from "@/lib/brand/color";
import { LogoError, readLogoFile } from "@/lib/brand/logo";
import { TEMPLATE_BRANDS, type BrandColors } from "@/lib/brand/templates";

/* ------------------------------------------------------------------ *
 *  Brand Studio — the panel.
 *
 *  A tool, not a template: it deliberately wears none of the five house
 *  styles, so a client always knows which part of the screen is the
 *  website and which part is the control. Non-modal on purpose — the
 *  page keeps scrolling behind it while colors change live.
 * ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Starting points, so nobody faces two empty color fields. */
const PALETTES: { name: string; colors: BrandColors }[] = [
  { name: "Clinic teal", colors: { primary: "#0f766e", accent: "#38bdf8" } },
  { name: "Deep navy", colors: { primary: "#1e3a5f", accent: "#c9a227" } },
  { name: "Sage", colors: { primary: "#6d8b7d", accent: "#c97e5d" } },
  { name: "Plum", colors: { primary: "#6b2c4f", accent: "#d99a6c" } },
  { name: "Slate rose", colors: { primary: "#3f4a56", accent: "#c26b6b" } },
  { name: "Forest", colors: { primary: "#2f5d3a", accent: "#d8a13a" } },
];

export default function BrandStudioPanel() {
  const studio = useBrandStudio();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Inside a hub preview plate this document is a picture of a website,
     not a website — the control that drives it belongs to the page doing
     the framing. */
  const [framed, setFramed] = useState(false);
  useEffect(() => setFramed(isFramed()), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!studio || framed) return null;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed right-0 top-1/2 z-[190] flex -translate-y-1/2 items-center gap-2.5 rounded-l-lg bg-[#16181c] py-4 pl-3.5 pr-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:bg-[#22262c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white print:hidden"
            aria-label="Open brand preview — try your own colors and logo"
          >
            <span className="flex flex-col gap-1">
              <span
                className="block h-2.5 w-2.5 rounded-full ring-1 ring-white/30"
                style={{ backgroundColor: studio.colors.primary }}
              />
              <span
                className="block h-2.5 w-2.5 rounded-full ring-1 ring-white/30"
                style={{ backgroundColor: studio.colors.accent }}
              />
            </span>
            <span className="[writing-mode:vertical-rl]">Your brand</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Brand preview"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.42, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[200] flex w-full max-w-[27rem] flex-col border-l border-black/10 bg-white font-sans text-[#16181c] shadow-[-24px_0_60px_-30px_rgba(0,0,0,0.45)] print:hidden"
          >
            <PanelBody onClose={() => setOpen(false)} closeRef={closeRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */

function PanelBody({
  onClose,
  closeRef,
}: {
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement>;
}) {
  const studio = useBrandStudio();
  if (!studio) return null;

  return (
    <>
      <header className="flex items-start justify-between gap-4 border-b border-black/10 px-6 py-5">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
            Your brand, on every template
          </h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-black/55">
            Drop in your colors and logo, then browse the collection to see
            which one wears them best.
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close brand preview"
          className="-mr-1.5 -mt-1 shrink-0 rounded-md p-2 text-black/45 transition-colors hover:bg-black/5 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16181c]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
        <ColorSection />
        <PaletteSection />
        <LogoSection />
        <TemplateNotes />
      </div>

      <footer className="border-t border-black/10 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11.5px] leading-snug text-black/45">
            Nothing is uploaded or saved. This preview lives in this browser
            tab only.
          </p>
          <button
            type="button"
            onClick={studio.reset}
            disabled={!studio.active}
            className="shrink-0 rounded-md border border-black/15 px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-black/35 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16181c]"
          >
            Reset
          </button>
        </div>
      </footer>
    </>
  );
}

/* ---- colors ------------------------------------------------------- */

function ColorSection() {
  return (
    <section>
      <SectionLabel>Your colors</SectionLabel>
      <div className="mt-3 space-y-2.5">
        <ColorRow
          role="primary"
          label="Primary"
          hint="Your main brand color"
        />
        <ColorRow role="accent" label="Accent" hint="The supporting color" />
      </div>
    </section>
  );
}

function ColorRow({
  role,
  label,
  hint,
}: {
  role: keyof BrandColors;
  label: string;
  hint: string;
}) {
  const studio = useBrandStudio();
  const inputId = useId();
  const value = studio?.colors[role] ?? "#000000";

  /* The text field is free-typed, so it keeps its own draft while the
     swatch stays on the last value that actually parsed. */
  const [draft, setDraft] = useState(value);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setDraft(value);
  }, [value, focused]);

  if (!studio) return null;

  const commit = (next: string) => {
    setDraft(next);
    if (isValidHex(next)) studio.setColor(role, next);
  };

  const valid = isValidHex(draft);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-black/10 p-2.5 transition-colors focus-within:border-black/30">
      <label
        htmlFor={inputId}
        className="relative block h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-md ring-1 ring-inset ring-black/15"
        style={{ backgroundColor: value }}
      >
        <span className="sr-only">{label} color</span>
        <input
          id={inputId}
          type="color"
          value={value}
          onChange={(e) => studio.setColor(role, e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-medium">{label}</span>
          <span className="truncate text-[11px] text-black/45">{hint}</span>
        </div>
        <input
          type="text"
          value={draft}
          spellCheck={false}
          aria-label={`${label} color hex value`}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setDraft(normalizeHex(draft) ?? value);
          }}
          onChange={(e) => commit(e.target.value)}
          className={`mt-1 w-full rounded border bg-transparent px-2 py-1 font-mono text-[12px] uppercase tracking-wide outline-none transition-colors ${
            valid
              ? "border-black/10 focus:border-black/40"
              : "border-red-400 text-red-600"
          }`}
        />
      </div>
    </div>
  );
}

/* ---- presets ------------------------------------------------------ */

function PaletteSection() {
  const studio = useBrandStudio();
  if (!studio) return null;

  return (
    <section className="mt-7">
      <SectionLabel>Or start from a palette</SectionLabel>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {PALETTES.map((palette) => {
          const on =
            studio.active &&
            studio.colors.primary === palette.colors.primary &&
            studio.colors.accent === palette.colors.accent;
          return (
            <button
              key={palette.name}
              type="button"
              onClick={() => studio.setColors(palette.colors)}
              aria-pressed={on}
              className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16181c] ${
                on
                  ? "border-black/45 bg-black/[0.03]"
                  : "border-black/10 hover:border-black/25"
              }`}
            >
              <span className="flex shrink-0 -space-x-1.5">
                <span
                  className="block h-5 w-5 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: palette.colors.primary }}
                />
                <span
                  className="block h-5 w-5 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: palette.colors.accent }}
                />
              </span>
              <span className="truncate text-[12px]">{palette.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ---- logo --------------------------------------------------------- */

function LogoSection() {
  const studio = useBrandStudio();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  if (!studio) return null;

  const accept = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try {
      studio.setLogo(await readLogoFile(file));
    } catch (e) {
      setError(
        e instanceof LogoError ? e.message : "That file could not be read.",
      );
    }
  };

  return (
    <section className="mt-7">
      <SectionLabel>Your logo</SectionLabel>

      {studio.logo ? (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-black/10 p-3">
          <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded bg-[repeating-conic-gradient(#f1f1f1_0_25%,#ffffff_0_50%)] bg-[length:12px_12px] p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={studio.logo.src}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium">
              {studio.logo.name}
            </p>
            <p className="mt-0.5 text-[11.5px] text-black/45">
              Showing in every header and footer
            </p>
          </div>
          <button
            type="button"
            onClick={() => studio.setLogo(null)}
            className="shrink-0 rounded-md px-2 py-1 text-[12px] text-black/50 underline-offset-2 transition-colors hover:text-black hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16181c]"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void accept(e.dataTransfer.files[0]);
          }}
          className={`mt-3 flex w-full flex-col items-center gap-1.5 rounded-lg border border-dashed px-4 py-7 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16181c] ${
            dragging
              ? "border-black/50 bg-black/[0.03]"
              : "border-black/20 hover:border-black/40"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="text-black/35"
          >
            <path
              d="M10 13.5V4m0 0L6.5 7.5M10 4l3.5 3.5M3.5 13v2A1.5 1.5 0 005 16.5h10a1.5 1.5 0 001.5-1.5v-2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[13px] font-medium">Add your logo</span>
          <span className="text-[11.5px] text-black/45">
            Drag one in, or click to choose — PNG, SVG, or JPG
          </span>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/svg+xml,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          void accept(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {error && (
        <p role="alert" className="mt-2 text-[11.5px] text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}

/* ---- how each template reads the colors ---------------------------- */

function TemplateNotes() {
  return (
    <section className="mt-7 rounded-lg bg-black/[0.03] p-4">
      <SectionLabel>How each template uses them</SectionLabel>
      <dl className="mt-3 space-y-2.5">
        {TEMPLATE_BRANDS.map((spec) => (
          <div key={spec.id}>
            <dt className="text-[12px] font-semibold">{spec.name}</dt>
            <dd className="mt-0.5 text-[11.5px] leading-relaxed text-black/55">
              {spec.note}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3.5 border-t border-black/10 pt-3 text-[11.5px] leading-relaxed text-black/45">
        Each template keeps its own paper, ink, and neutrals — your colors are
        placed the way that design was built to carry them, and shades are
        adjusted to stay readable.
      </p>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">
      {children}
    </h3>
  );
}
