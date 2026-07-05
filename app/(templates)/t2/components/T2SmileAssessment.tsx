"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlignHorizontalDistributeCenter,
  Camera,
  Check,
  CircleDashed,
  Droplets,
  HeartPulse,
  Puzzle,
  Sparkles,
  X,
} from "lucide-react";
import { bookingHref, EASE } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Smile assessment — a three-step intake scan. Restyled as a
   diagnostic console: mono step readout, beam progress, square
   geometry. Logic: concerns → optional photo → contact → done.
   ──────────────────────────────────────────────────────────────── */

const CONCERNS = [
  {
    id: "alignment",
    Icon: AlignHorizontalDistributeCenter,
    label: "Crooked or misaligned",
    description: "Crowding, gaps, or rotation",
  },
  {
    id: "color",
    Icon: Droplets,
    label: "Stained or discolored",
    description: "Yellowing or uneven shade",
  },
  {
    id: "missing",
    Icon: Puzzle,
    label: "Missing teeth",
    description: "One or more teeth to replace",
  },
  {
    id: "shape",
    Icon: CircleDashed,
    label: "Chipped or worn",
    description: "Damage or wear on edges",
  },
  {
    id: "gums",
    Icon: HeartPulse,
    label: "Gum concerns",
    description: "Recession or an uneven gumline",
  },
  {
    id: "other",
    Icon: Sparkles,
    label: "Something else",
    description: "Tell us in your own words",
  },
];

const STEPS = ["concerns", "photo", "contact", "complete"] as const;
type Step = (typeof STEPS)[number];

export default function T2SmileAssessment() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("concerns");
  const [selected, setSelected] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const stepIdx = STEPS.indexOf(step);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setStep("complete");
  };

  const close = () => {
    setOpen(false);
    setStep("concerns");
    setSelected([]);
    setPhoto(null);
    setForm({ firstName: "", email: "", phone: "" });
  };

  const fade = {
    initial: reduced ? {} : { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: reduced ? {} : { opacity: 0, x: -32 },
    transition: { duration: 0.35, ease: EASE },
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="t2p-btn t2p-btn-primary">
        <span>Begin smile assessment</span>
        <span aria-hidden="true">→</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="t2p fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#040603]/85 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Smile assessment"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 28, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--t2p-line-strong)] bg-[var(--t2p-bg)]"
            >
              {/* Console header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--t2p-line)] bg-[var(--t2p-bg)] px-6 py-4">
                <span className="t2p-label">Smile assessment</span>
                <div className="flex items-center gap-4">
                  {step !== "complete" && (
                    <span className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)]">
                      Step {stepIdx + 1} / 3
                    </span>
                  )}
                  <button
                    onClick={close}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--t2p-line-strong)] text-[var(--t2p-text-70)] hover:text-[var(--t2p-volt)] hover:border-[var(--t2p-volt-dim)] transition-colors"
                    aria-label="Close assessment"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Beam progress */}
              {step !== "complete" && (
                <div className="relative h-px bg-[var(--t2p-line)]" aria-hidden="true">
                  <motion.div
                    className="t2p-beam-h absolute inset-y-0 left-0"
                    animate={{ width: `${((stepIdx + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              )}

              <div className="p-6 md:p-9">
                <AnimatePresence mode="wait">
                  {step === "concerns" && (
                    <motion.div key="concerns" {...fade}>
                      <h3 className="font-innovator text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                        What should we look at first?
                      </h3>
                      <p className="mt-2 text-sm text-[var(--t2p-text-70)]">
                        Select everything that applies.
                      </p>

                      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {CONCERNS.map((c) => {
                          const on = selected.includes(c.id);
                          return (
                            <button
                              key={c.id}
                              onClick={() => toggle(c.id)}
                              aria-pressed={on}
                              className={`relative flex items-start gap-3.5 rounded-xl p-4 text-left border transition-colors duration-300 ${
                                on
                                  ? "border-[var(--t2p-volt)] bg-[rgba(126,224,75,0.06)]"
                                  : "border-[var(--t2p-line-strong)] hover:border-[var(--t2p-volt-dim)]"
                              }`}
                            >
                              <c.Icon
                                className={`mt-0.5 h-5 w-5 shrink-0 ${
                                  on ? "text-[var(--t2p-volt)]" : "text-[var(--t2p-text-50)]"
                                }`}
                                strokeWidth={1.25}
                                aria-hidden="true"
                              />
                              <span>
                                <span className="block text-sm font-medium text-[var(--t2p-text)]">
                                  {c.label}
                                </span>
                                <span className="mt-0.5 block text-xs text-[var(--t2p-text-50)]">
                                  {c.description}
                                </span>
                              </span>
                              {on && (
                                <Check
                                  className="absolute top-3 right-3 h-3.5 w-3.5 text-[var(--t2p-volt)]"
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setStep("photo")}
                        disabled={selected.length === 0}
                        className="t2p-btn t2p-btn-primary mt-8 w-full disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {step === "photo" && (
                    <motion.div key="photo" {...fade}>
                      <h3 className="font-innovator text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                        Add a photo of your smile
                      </h3>
                      <p className="mt-2 text-sm text-[var(--t2p-text-70)]">
                        Optional — it helps us prepare before you arrive.
                      </p>

                      <button
                        onClick={() => fileRef.current?.click()}
                        className={`mt-7 w-full rounded-xl border border-dashed p-8 text-center transition-colors duration-300 ${
                          photo
                            ? "border-[var(--t2p-volt-dim)] bg-[rgba(126,224,75,0.04)]"
                            : "border-[var(--t2p-line-strong)] hover:border-[var(--t2p-volt-dim)]"
                        }`}
                      >
                        {photo ? (
                          <span className="relative mx-auto block h-44 w-44">
                            <Image
                              src={photo}
                              alt="Your uploaded smile photo"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </span>
                        ) : (
                          <span className="block">
                            <Camera
                              className="mx-auto h-8 w-8 text-[var(--t2p-text-50)]"
                              strokeWidth={1.25}
                              aria-hidden="true"
                            />
                            <span className="t2p-mono mt-4 block text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--t2p-text-70)]">
                              Tap to upload
                            </span>
                            <span className="mt-1.5 block text-xs text-[var(--t2p-text-50)]">
                              JPG or PNG, up to 10 MB
                            </span>
                          </span>
                        )}
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        className="hidden"
                        aria-label="Upload smile photo"
                      />
                      {photo && (
                        <button
                          onClick={() => setPhoto(null)}
                          className="t2p-mono mt-3 text-[0.625rem] uppercase tracking-[0.16em] text-[var(--t2p-text-50)] hover:text-[var(--t2p-volt)] transition-colors"
                        >
                          Remove photo
                        </button>
                      )}

                      <div className="mt-8 flex gap-2.5">
                        <button
                          onClick={() => setStep("concerns")}
                          className="t2p-btn t2p-btn-ghost flex-1"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setStep("contact")}
                          className="t2p-btn t2p-btn-primary flex-1"
                        >
                          {photo ? "Continue" : "Skip"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === "contact" && (
                    <motion.div key="contact" {...fade}>
                      <h3 className="font-innovator text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                        Where should we send the read?
                      </h3>
                      <p className="mt-2 text-sm text-[var(--t2p-text-70)]">
                        A coordinator reviews every assessment within one
                        business day.
                      </p>

                      <div className="mt-7 space-y-4">
                        <div>
                          <label
                            htmlFor="t2sa-name"
                            className="t2p-mono mb-2 block text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]"
                          >
                            First name
                          </label>
                          <input
                            id="t2sa-name"
                            type="text"
                            autoComplete="given-name"
                            value={form.firstName}
                            onChange={(e) =>
                              setForm({ ...form, firstName: e.target.value })
                            }
                            className="t2p-field"
                            placeholder="Your first name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="t2sa-email"
                            className="t2p-mono mb-2 block text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]"
                          >
                            Email
                          </label>
                          <input
                            id="t2sa-email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="t2p-field"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="t2sa-phone"
                            className="t2p-mono mb-2 block text-[0.625rem] uppercase tracking-[0.2em] text-[var(--t2p-text-50)]"
                          >
                            Phone (optional)
                          </label>
                          <input
                            id="t2sa-phone"
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="t2p-field"
                            placeholder="(555) 000-0000"
                          />
                        </div>
                      </div>

                      <div className="mt-8 flex gap-2.5">
                        <button
                          onClick={() => setStep("photo")}
                          className="t2p-btn t2p-btn-ghost flex-1"
                        >
                          Back
                        </button>
                        <button
                          onClick={submit}
                          disabled={!form.firstName || !form.email || submitting}
                          className="t2p-btn t2p-btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {submitting ? "Transmitting…" : "Submit"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === "complete" && (
                    <motion.div key="complete" {...fade} className="py-6 text-center">
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--t2p-volt-dim)] bg-[rgba(126,224,75,0.08)]">
                        <Check
                          className="h-7 w-7 text-[var(--t2p-volt)]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="font-innovator mt-7 text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                        Assessment received
                      </h3>
                      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--t2p-text-70)]">
                        Thanks, {form.firstName}. We&apos;ll review your notes
                        and reach out within one business day with next steps.
                      </p>
                      <div className="mt-8 flex flex-col items-center gap-3">
                        <a href={bookingHref} className="t2p-btn t2p-btn-primary">
                          Book now instead
                        </a>
                        <button
                          onClick={close}
                          className="t2p-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--t2p-text-50)] hover:text-[var(--t2p-volt)] transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
