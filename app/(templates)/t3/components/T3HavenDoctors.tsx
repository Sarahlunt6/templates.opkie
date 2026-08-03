"use client";

import Image from "next/image";
import type { DoctorProfile } from "@/types/dentist";
import T3Reveal from "./T3Reveal";

interface T3HavenDoctorsProps {
  doctors: DoctorProfile[];
  practiceName: string;
}

/**
 * Local portraits are used in this demo template (the master-data portrait
 * paths are placeholders); at client-swap time these map to real headshots.
 */
const PORTRAITS = [
  "/images/team/doctor-portrait.jpeg",
  "/images/team/staff-photo.jpg",
];

export default function T3HavenDoctors({
  doctors,
  practiceName,
}: T3HavenDoctorsProps) {
  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
      style={{ backgroundColor: "rgba(231,224,210,0.4)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <T3Reveal className="mb-16 max-w-2xl sm:mb-24">
          <p className="t3-marker mb-6 text-sm font-light text-[var(--t3-moss-soft)]">
            who you&rsquo;ll meet
          </p>
          <h2
            id="doctors-heading"
            className="t3-display text-[var(--t3-moss)]"
          >
            the people who&rsquo;ll{" "}
            <em className="t3-serif text-[var(--t3-euc-deep)]">
              take care of you
            </em>
          </h2>
        </T3Reveal>

        <div className="space-y-20 lg:space-y-28">
          {doctors.map((doctor, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={doctor.name}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8"
              >
                {/* portrait */}
                <T3Reveal
                  delay={0.1}
                  className={`lg:col-span-5 ${
                    flipped ? "lg:order-2 lg:col-start-8" : ""
                  }`}
                >
                  <div className="group relative mx-auto max-w-[420px]">
                    <div
                      aria-hidden="true"
                      className={`absolute -inset-6 opacity-60 transition-opacity duration-700 group-hover:opacity-100 ${
                        flipped ? "t3-blob-b" : "t3-blob"
                      }`}
                      style={{
                        background:
                          "radial-gradient(circle at 50% 40%, rgb(var(--t3-euc-rgb) / 0.18), transparent 70%)",
                      }}
                    />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--t3-shadow-soft)] transition-shadow duration-700 group-hover:shadow-[var(--t3-shadow-bloom)] sm:rounded-[2.5rem]">
                      <Image
                        src={PORTRAITS[i % PORTRAITS.length]}
                        alt={`${doctor.name}, ${doctor.role} at ${practiceName}`}
                        fill
                        loading="lazy"
                        className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 90vw, 420px"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(165deg, rgba(242,246,238,0.18), transparent 40%)",
                        }}
                      />
                    </div>
                  </div>
                </T3Reveal>

                {/* biography */}
                <T3Reveal
                  delay={0.25}
                  className={`lg:col-span-6 ${
                    flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <h3 className="mb-2 text-[clamp(1.6rem,3vw,2.2rem)] font-extralight text-[var(--t3-moss)]">
                    {doctor.name}
                  </h3>
                  <p className="t3-serif mb-7 text-lg text-[var(--t3-euc-ink)]">
                    {doctor.role.toLowerCase()}
                  </p>
                  <p className="mb-8 max-w-lg text-base font-light leading-loose text-[var(--t3-moss-soft)]">
                    {doctor.biography}
                  </p>

                  <ul className="max-w-lg space-y-0">
                    {doctor.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="flex items-baseline gap-3 border-t border-[var(--t3-line)] py-3 text-sm font-light text-[var(--t3-moss)]"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 flex-shrink-0 translate-y-[-1px] rounded-full bg-[var(--t3-euc)]"
                        />
                        {credential}
                      </li>
                    ))}
                  </ul>
                </T3Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
