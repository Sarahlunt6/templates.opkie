"use client";

import Image from "next/image";
import T4Reveal, { T4RuleDraw } from "./T4Reveal";

const INSTRUMENTS = [
  {
    name: "Digital impressions",
    plain: "A small wand scans your teeth in minutes.",
    replaces: "Replaces the tray of impression putty entirely.",
  },
  {
    name: "The porcelain mill",
    plain: "Crowns cut from a solid ceramic block while you wait.",
    replaces: "Replaces the temporary crown and the second visit.",
  },
  {
    name: "3D cone-beam imaging",
    plain: "A complete picture of teeth, roots, and bone.",
    replaces: "Replaces guesswork in implant planning.",
  },
  {
    name: "The smile preview",
    plain: "See a rendering of your finished result before we begin.",
    replaces: "Replaces imagining it and hoping.",
  },
];

export default function T4Craft() {
  return (
    <section id="craft" className="t4-salon relative pb-24 pt-4 lg:pb-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">The workroom</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          {/* instruments as an engraved index */}
          <div className="lg:col-span-5 lg:col-start-5">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg text-[#241a12]">
                Made in-house,{" "}
                <em className="italic text-[var(--t4-brass-ink)]">
                  while you wait.
                </em>
              </h2>
              <p className="mt-6 max-w-lg font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                The lab work most practices send away for two weeks happens
                here, down the hall, the same afternoon. These are the
                instruments of the workroom — in plain language.
              </p>
            </T4Reveal>

            <div className="mt-12">
              {INSTRUMENTS.map((tool, i) => (
                <T4Reveal key={tool.name} delay={i * 0.07}>
                  <div className="group border-t border-[var(--t4-line-light)] py-7 last:border-b">
                    <h3 className="t4-display text-[1.35rem] text-[#241a12]">
                      {tool.name}
                    </h3>
                    <p className="mt-2 font-t4-body text-[0.98rem] font-light text-[var(--t4-espresso-soft)]">
                      {tool.plain}
                    </p>
                    <p className="t4-label mt-3 !normal-case !tracking-[0.08em] text-[var(--t4-brass-ink)]">
                      {tool.replaces}
                    </p>
                  </div>
                </T4Reveal>
              ))}
            </div>
          </div>

          {/* shade-matching plate */}
          <div className="lg:col-span-3 lg:col-start-10">
            <T4Reveal delay={0.2} className="lg:sticky lg:top-32">
              <div className="t4-frame !bg-[var(--t4-porcelain-deep)]" style={{ boxShadow: "var(--t4-shadow-salon)" }}>
                <div className="t4-frame-inner relative aspect-[3/4]">
                  <Image
                    src="/images/services/full-mouth-shade.jpg"
                    alt="Porcelain shade tabs held against a patient's teeth to match color precisely"
                    fill
                    sizes="(max-width: 1024px) 90vw, 22vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 flex items-center gap-3">
                <span className="t4-diamond !bg-[var(--t4-brass-ink)]" />
                <span className="t4-label text-[var(--t4-espresso-faint)]">
                  Shade, matched in natural light
                </span>
              </p>
            </T4Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
