"use client";

import Image from "next/image";
import type { DoctorProfile } from "@/types/dentist";
import T5Reveal from "./T5Reveal";

interface T5DentistsProps {
  doctors: DoctorProfile[];
}

/** Portraits shipped with the demo, mapped by doctor order. */
const PORTRAITS = [
  {
    src: "/images/team/doctor-portrait.jpeg",
    position: "40% center",
    sticker: "The smile guy",
    stickerClass: "t5-sticker--marigold",
  },
  {
    src: "/images/team/staff-photo.jpg",
    position: "60% center",
    sticker: "Great with nervous kids",
    stickerClass: "t5-sticker--teal",
  },
];

export default function T5Dentists({ doctors }: T5DentistsProps) {
  return (
    <section
      id="dentists"
      className="relative bg-[var(--t5-butter)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            The people
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Meet your dentists.
          </h2>
          <p className="t5-script mt-3 text-[1.6rem] text-[var(--t5-teal-bright)]">
            (they're nice — promise)
          </p>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
          {doctors.map((doc, i) => {
            const portrait = PORTRAITS[i % PORTRAITS.length];
            return (
              <T5Reveal key={doc.name} delay={i * 0.12}>
                <article className="flex h-full flex-col">
                  <div className="relative">
                    <div className="t5-arch relative aspect-[4/3] border-[3px] border-[var(--t5-walnut)] bg-[var(--t5-paper)] shadow-[var(--t5-shadow-print)]">
                      <Image
                        src={portrait.src}
                        alt={`Portrait of ${doc.name}, ${doc.role}`}
                        fill
                        sizes="(max-width: 768px) 90vw, 44vw"
                        className="object-cover"
                        style={{ objectPosition: portrait.position }}
                      />
                    </div>
                    <span
                      className={`t5-sticker ${portrait.stickerClass} absolute -bottom-4 left-8 -rotate-2`}
                    >
                      {portrait.sticker}
                    </span>
                  </div>

                  <h3 className="t5-display mt-9 text-[1.5rem] text-[var(--t5-walnut)]">
                    {doc.name}
                  </h3>
                  <p className="t5-kicker mt-2 text-[var(--t5-teal)]">
                    {doc.role}
                  </p>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-[var(--t5-walnut-soft)]">
                    {doc.biography}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {doc.credentials.map((cred) => (
                      <span key={cred} className="t5-ticket">
                        {cred}
                      </span>
                    ))}
                  </div>
                </article>
              </T5Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
