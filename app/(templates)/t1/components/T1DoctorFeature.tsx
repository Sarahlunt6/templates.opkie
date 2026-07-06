"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fade, T1_EASE } from "./T1Motion";

interface DoctorEntry {
  name: string;
  role: string;
  credentials: string[];
  biography: string;
}

interface T1DoctorFeatureProps {
  doctors: DoctorEntry[];
  city: string;
}

/** Local portrait assets — the data placeholders do not ship with the demo */
const PORTRAITS = [
  "/images/team/doctor-portrait.jpeg",
  "/images/team/staff-photo.jpg",
];

/**
 * T1 PRESS — print-profile spread, now a tabbed feature well. When the
 * practice lists more than one clinician, a ruled selector runs across
 * the top and each doctor gets the full spread — large duotone portrait
 * with a halftone edge, Anton name, mono credential index, and the one
 * red pull quote — cross-cut on change. Single-doctor practices render
 * the spread alone, no selector.
 */
export default function T1DoctorFeature({
  doctors,
  city,
}: T1DoctorFeatureProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const doc = doctors[active];
  const multi = doctors.length > 1;

  const move = (delta: number) => {
    const next = (active + delta + doctors.length) % doctors.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <Fade>
      {/* Doctor selector — only when there's more than one to choose from */}
      {multi && (
        <div
          role="tablist"
          aria-label="Our doctors"
          onKeyDown={onKeyDown}
          className="mt-12 flex flex-col gap-px border border-[rgba(26,23,19,0.15)] bg-[rgba(26,23,19,0.15)] sm:flex-row lg:mt-16"
        >
          {doctors.map((d, i) => {
            const on = i === active;
            return (
              <button
                key={d.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`doc-tab-${i}`}
                aria-selected={on}
                aria-controls="doc-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex flex-1 items-center gap-4 p-5 text-left transition-colors duration-300 md:p-6 ${
                  on ? "bg-[#F3EFE6]" : "bg-[#E9E3D4] hover:bg-[#EFEADC]"
                }`}
              >
                <span
                  className={`t1-mono-label shrink-0 ${
                    on ? "t1-mono-label-red" : "t1-mono-label-stone"
                  }`}
                >
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-t1-press text-lg uppercase leading-tight transition-colors duration-300 ${
                      on ? "text-[#1A1713]" : "text-[#6B675E]"
                    }`}
                  >
                    {d.name}
                  </span>
                  <span className="t1-mono-label t1-mono-label-stone mt-1 block">
                    {d.role.toUpperCase()}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* The spread — cross-cut when the selected doctor changes */}
      <div role="tabpanel" id="doc-panel" aria-labelledby={`doc-tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={doc.name}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: T1_EASE }}
            className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 ${
              multi ? "mt-10" : "mt-12 lg:mt-16"
            }`}
          >
            {/* Portrait — staggered down so the spread reads asymmetric, like a
                feature well rather than another aligned grid */}
            <div className="lg:col-span-5 lg:mt-24">
              <figure className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#1A1713] bg-[#E9E3D4]">
                  <Image
                    src={PORTRAITS[active] ?? PORTRAITS[0]}
                    alt={`Portrait of ${doc.name}, ${doc.role}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                    className="t1-duotone object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="t1-halftone pointer-events-none absolute inset-x-0 bottom-0 h-24"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 border-x border-b border-[#1A1713] px-3 py-2">
                  <span className="t1-mono-label t1-mono-label-stone">
                    FIG. 02 — THE DOCTOR
                  </span>
                  <span className="t1-mono-label t1-mono-label-red hidden sm:block">
                    [ {city.toUpperCase()} ]
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Profile text */}
            <div className="lg:col-span-7">
              <p className="t1-mono-label t1-mono-label-red">[ THE PROFILE ]</p>
              <h3 className="mt-4 font-t1-press text-[clamp(2rem,4.5vw,3.4rem)] uppercase leading-[0.95] text-[#1A1713]">
                {doc.name}
              </h3>
              <p className="t1-mono-label t1-mono-label-stone mt-3">
                {doc.role.toUpperCase()}
              </p>

              <p className="mt-6 max-w-prose font-sans text-base leading-[1.8] text-[#1A1713]">
                {doc.biography}
              </p>
              <p className="mt-4 max-w-prose font-sans text-base leading-[1.8] text-[#6B675E]">
                Patients arrive from across {city} with photographs, questions,
                and occasionally decades of putting this off. The first hour ends
                with an honest account of what is possible, what is necessary,
                and what is neither.
              </p>

              {/* Credentials — mono index list, pulled left to overlap the
                  portrait's right edge at lg+ */}
              <ul
                className="mt-8 bg-[#F3EFE6] lg:-ml-24 lg:border lg:border-[rgba(26,23,19,0.15)] lg:p-6"
                aria-label={`Credentials of ${doc.name}`}
              >
                {doc.credentials.map((credential, i) => (
                  <li
                    key={credential}
                    className="flex items-baseline gap-5 border-t border-[rgba(26,23,19,0.15)] py-3"
                  >
                    <span className="t1-mono-label t1-mono-label-red shrink-0">
                      [ {String(i + 1).padStart(2, "0")} ]
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-[#1A1713]">
                      {credential}
                    </span>
                  </li>
                ))}
                <li
                  className="border-t border-[rgba(26,23,19,0.15)]"
                  aria-hidden="true"
                />
              </ul>

              {/* Pull quote — the one red statement of the spread */}
              <blockquote className="mt-10 border-l-2 border-[#D92B21] pl-6">
                <p className="font-t1-press text-2xl uppercase leading-tight text-[#1A1713] md:text-3xl">
                  &ldquo;The best dentistry is the kind you eventually stop
                  thinking about.&rdquo;
                </p>
                <footer className="t1-mono-label t1-mono-label-stone mt-3">
                  — {doc.name.toUpperCase()}
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Fade>
  );
}
