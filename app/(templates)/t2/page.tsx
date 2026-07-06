"use client";

import "./t2-theme.css";

import T2Nav from "./components/T2Nav";
import T2Hero from "./components/T2Hero";
import T2CareBand from "./components/T2CareBand";
import T2TechTriptych from "./components/T2TechTriptych";
import T2Services from "./components/T2Services";
import T2ScanCompare from "./components/T2ScanCompare";
import T2Compare from "./components/T2Compare";
import T2Doctors from "./components/T2Doctors";
import T2ToolTabs from "./components/T2ToolTabs";
import T2Reviews from "./components/T2Reviews";
import T2Visit from "./components/T2Visit";
import T2FinalCTA from "./components/T2FinalCTA";
import T2Footer from "./components/T2Footer";
import T2MobileBar from "./components/T2MobileBar";
import T2ScanSpine from "./components/T2ScanSpine";
import { SectionHeader, ScanDivider, Reveal } from "./components/T2Kit";

/* ═══════════════════════════════════════════════════════════════════
   T2 PRECISION — porcelain lab digital dentistry
   Cool clinical white, graphite ink, blue scan-light. The practice
   presented like a flagship instrument: porcelain canvas, pill CTAs,
   mono spec readouts, and HUD calibration dots. One motif — the scan
   — still runs the page: it reveals the hero, divides the sections,
   and drives the before/after comparison. Numbers do the persuading.
   Section headers are indexed in FDI tooth notation (11–18, upper
   quadrants); the nav keeps plain 01–08 for patient-facing clarity.
   ═══════════════════════════════════════════════════════════════════ */

export default function Template2Page() {
  return (
    <div className="t2p font-sans antialiased relative overflow-x-hidden">
      {/* Fixed scan spine — page scroll progress as a scan-light fill, lg+ only */}
      <T2ScanSpine />

      <T2Nav />

      <main>
        {/* 00 — Product-launch hero: parallax video + scanline reveal */}
        <T2Hero />

        {/* 00.5 — The human beat before the hardware */}
        <T2CareBand />

        {/* 01 — Engineered for precision (bento) */}
        <T2TechTriptych />

        <ScanDivider />

        {/* 02 — Technical specifications (services) */}
        <T2Services />

        <ScanDivider />

        {/* 03 — Signature scan comparison */}
        <T2ScanCompare />

        <ScanDivider />

        {/* 04 — Summit digital vs. the old way */}
        <T2Compare />

        <ScanDivider />

        {/* 05 — Operator profiles */}
        <T2Doctors />

        <ScanDivider />

        {/* 06 — Planning tools: configurator + smile assessment */}
        <section id="tools" className="relative py-24 md:py-32 px-6 md:px-12 scroll-mt-20">
          <div className="t2p-blueprint absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto">
            <SectionHeader
              index="16"
              label="Planning tools"
              title={
                <>
                  Run the numbers <span className="t2p-duotext">before you sit down.</span>
                </>
              }
              lede="One panel, two instruments — model a monthly payment, or send us a first look at your smile. Zero obligation either way."
            />

            <Reveal>
              <T2ToolTabs />
            </Reveal>
          </div>
        </section>

        <ScanDivider />

        {/* 07 — Case telemetry (reviews) */}
        <T2Reviews />

        <ScanDivider />

        {/* 08 — Coordinates: hours, map, insurance, emergency */}
        <T2Visit />

        {/* 09 — Begin your scan */}
        <T2FinalCTA />
      </main>

      <T2Footer />
      <T2MobileBar />
    </div>
  );
}
