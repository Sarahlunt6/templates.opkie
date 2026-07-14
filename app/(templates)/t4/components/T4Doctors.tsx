"use client";

import Image from "next/image";
import type { DoctorProfile } from "@/types/dentist";
import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4DoctorsProps {
  doctors: DoctorProfile[];
}

/** Portraits shipped with the demo — mapped by doctor order. */
const PORTRAITS = [
  { src: "/images/team/doctor-portrait.jpeg", position: "40% center" },
  { src: "/images/team/staff-photo.jpg", position: "60% center" },
];

export default function T4Doctors({ doctors }: T4DoctorsProps) {
  return (
    <section id="doctors" className="relative pb-24 pt-4 lg:pb-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-champagne)]">The doctors</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg max-w-2xl text-[var(--t4-ivory)]">
                Two doctors.{" "}
                <em className="italic text-[var(--t4-champagne-bright)]">
                  One standard.
                </em>
              </h2>
            </T4Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
              {doctors.map((doc, i) => (
                <T4Reveal
                  key={doc.name}
                  delay={i * 0.12}
                  className={i % 2 === 1 ? "md:mt-20" : ""}
                >
                  <article>
                    <div className="t4-vitrine-case relative">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-x-8 -top-12 bottom-0"
                      >
                        <div className="t4-spot" />
                      </div>
                      <div className="t4-frame relative">
                        <div className="t4-frame-inner t4-grade relative aspect-[3/4]">
                          <Image
                            src={PORTRAITS[i % PORTRAITS.length].src}
                            alt={`Portrait of ${doc.name}, ${doc.role}`}
                            fill
                            sizes="(max-width: 768px) 90vw, 36vw"
                            className="object-cover"
                            style={{
                              objectPosition:
                                PORTRAITS[i % PORTRAITS.length].position,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="t4-display mt-8 text-[1.6rem] text-[var(--t4-ivory)]">
                      {doc.name}
                    </h3>
                    <p className="t4-label mt-2 text-[var(--t4-champagne)]">
                      {doc.role}
                    </p>

                    <p className="mt-5 font-t4-body text-[0.98rem] font-light leading-relaxed text-[var(--t4-ivory-soft)]">
                      {doc.biography}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-[var(--t4-line-dark)] pt-6">
                      {doc.credentials.map((cred) => (
                        <li key={cred} className="flex items-center gap-3">
                          <span className="t4-diamond" />
                          <span className="t4-label !tracking-[0.14em] text-[var(--t4-ivory-faint)]">
                            {cred}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </T4Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
