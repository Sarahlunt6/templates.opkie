"use client";

import "./t2-theme.css";

import T2Nav from "./components/T2Nav";
import T2Hero from "./components/T2Hero";
import T2CareBand from "./components/T2CareBand";
import T2TechTriptych from "./components/T2TechTriptych";
import T2Services from "./components/T2Services";
import T2ScanCompare from "./components/T2ScanCompare";
import T2Doctors from "./components/T2Doctors";
import T2Financing from "./components/T2Financing";
import T2Comfort from "./components/T2Comfort";
import T2FirstVisit from "./components/T2FirstVisit";
import T2Reviews from "./components/T2Reviews";
import T2Visit from "./components/T2Visit";
import T2FinalCTA from "./components/T2FinalCTA";
import T2Footer from "./components/T2Footer";
import T2MobileBar from "./components/T2MobileBar";
import T2ScanSpine from "./components/T2ScanSpine";
import T2Faq from "./components/T2Faq";
import { ScanDivider } from "./components/T2Kit";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { clientMasterData, sampleReviews, sampleFaqs } from "@/data/master";

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
    <div id="top" className="t2p font-sans antialiased relative overflow-x-hidden">
      <SchemaMarkup
        practiceData={clientMasterData}
        faqs={sampleFaqs}
        reviews={sampleReviews}
      />
      {/* Fixed scan spine — page scroll progress as a scan-light fill, lg+ only */}
      <T2ScanSpine />

      <T2Nav homeHref="/t2" />

      <main>
        {/* 00 — Product-launch hero: parallax video + scanline reveal */}
        <T2Hero />

        {/* 00.5 — The human beat before the hardware (about/mission) */}
        <T2CareBand />

        {/* 01 — Technical specifications (services) */}
        <T2Services />

        <ScanDivider />

        {/* 02 — Engineered for precision (technology bento) */}
        <T2TechTriptych />

        <ScanDivider />

        {/* 03 — Signature scan comparison */}
        <T2ScanCompare />

        <ScanDivider />

        {/* 04 — Operator profiles */}
        <T2Doctors />

        <ScanDivider />

        {/* 06 — Comfort & sedation protocol */}
        <T2Comfort />

        <ScanDivider />

        {/* 07 — First-visit intake sequence */}
        <T2FirstVisit />

        <ScanDivider />

        {/* 08 — Financing & insurance: payment configurator + coverage */}
        <T2Financing />

        <ScanDivider />

        {/* 07 — Case telemetry (reviews) */}
        <T2Reviews />

        <ScanDivider />

        {/* 08 — Query console (FAQ) */}
        <T2Faq />

        <ScanDivider />

        {/* 09 — Coordinates: hours, map, insurance, emergency */}
        <T2Visit />

        {/* 09 — Begin your scan */}
        <T2FinalCTA />
      </main>

      <T2Footer homeHref="/t2" />
      <T2MobileBar />
    </div>
  );
}
