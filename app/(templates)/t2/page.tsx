"use client";

import "./t2-theme.css";

import T2Nav from "./components/T2Nav";
import T2Hero from "./components/T2Hero";
import T2CareBand from "./components/T2CareBand";
import T2TechTriptych from "./components/T2TechTriptych";
import T2Services from "./components/T2Services";
import T2ScanCompare from "./components/T2ScanCompare";
import T2Doctors from "./components/T2Doctors";
import T2FinancingCalculator from "./components/T2FinancingCalculator";
import T2SmileAssessment from "./components/T2SmileAssessment";
import T2Reviews from "./components/T2Reviews";
import T2Visit from "./components/T2Visit";
import T2FinalCTA from "./components/T2FinalCTA";
import T2Footer from "./components/T2Footer";
import T2MobileBar from "./components/T2MobileBar";
import { SectionHeader, ScanDivider, Reveal } from "./components/T2Kit";
import { practice } from "./components/t2-lib";

/* ═══════════════════════════════════════════════════════════════════
   T2 PRECISION — dark cinematic digital dentistry
   The practice as a precision imaging lab. One motif — the scan —
   runs the whole page: it reveals the hero, divides the sections,
   and drives the before/after comparison.
   ═══════════════════════════════════════════════════════════════════ */

export default function Template2Page() {
  return (
    <div className="t2p font-sans antialiased relative overflow-x-hidden">
      <T2Nav />

      <main>
        {/* 00 — Cinematic hero: parallax video + scanline reveal */}
        <T2Hero />

        {/* 00.5 — The human beat before the hardware */}
        <T2CareBand />

        {/* 01 — Instrumentation */}
        <T2TechTriptych />

        <ScanDivider />

        {/* 02 — Services grid */}
        <T2Services />

        <ScanDivider />

        {/* 03 — Signature scan comparison */}
        <T2ScanCompare />

        <ScanDivider />

        {/* 04 — Operator profiles */}
        <T2Doctors />

        <ScanDivider />

        {/* 05 — Planning tools: financing + smile assessment */}
        <section id="tools" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
          <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto">
            <SectionHeader
              index="05"
              label="Planning tools"
              title={
                <>
                  Run the numbers <span className="t2p-duotext">before you sit down.</span>
                </>
              }
              lede="Two tools, zero obligation: model a monthly payment, or send us a first look at your smile."
            />

            <Reveal>
              <T2FinancingCalculator />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[var(--t2p-line)] bg-[var(--t2p-surface)] px-7 md:px-9 py-7">
                <div className="max-w-xl">
                  <p className="t2p-label mb-2.5">Intake scan</p>
                  <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
                    Not sure where to start?
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--t2p-text-70)]">
                    Three questions and an optional photo. A coordinator at{" "}
                    {practice.globalPracticeName} reads every submission and
                    replies within one business day.
                  </p>
                </div>
                <div className="shrink-0">
                  <T2SmileAssessment />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <ScanDivider />

        {/* 06 — Case telemetry (reviews) */}
        <T2Reviews />

        <ScanDivider />

        {/* 07 — Coordinates: hours, map, insurance, emergency */}
        <T2Visit />

        {/* 08 — Begin your scan */}
        <T2FinalCTA />
      </main>

      <T2Footer />
      <T2MobileBar />
    </div>
  );
}
