import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T2Nav from "./components/T2Nav";
import T2Footer from "./components/T2Footer";
import BeforeAfterSlider from "@/components/dental/BeforeAfterSlider";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Advanced digital dentistry in ${location.cityServed}. Precision care with minimal treatment intervals using cutting-edge 3D imaging and laser technology.`,
};

export default function Template2Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans bg-slate-950 text-white">
      <T2Nav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — INSTRUMENTATION DASHBOARD
          High-precision 1px grid overlay, sharp borders, monospace technical labels
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen relative overflow-hidden">
        {/* 1px Precision Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Background Image - Full Bleed with Sharp Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`Our dental team at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950" />
        </div>

        {/* Technical Corner Labels */}
        <div className="absolute top-6 left-6 z-20">
          <span className="font-mono text-[10px] tracking-[0.3em] text-brand-primary/60 uppercase">
            [SYS_INIT // 01]
          </span>
        </div>
        <div className="absolute top-6 right-6 z-20">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            LAT: {location.cityServed.toUpperCase()} // ACTIVE
          </span>
        </div>

        {/* Main Content - Absolute Lower Third Positioning */}
        <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-24">
          {/* Technical Metric Label */}
          <div className="mb-6">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // PRECISION_DENTAL_UNIT]
            </span>
          </div>

          {/* Main Headline - Bold Sans with Tight Tracking */}
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-[-0.03em] leading-[0.95] mb-6 max-w-4xl">
            <span className="block">PRECISION</span>
            <span className="block">DIGITAL</span>
            <span className="block text-brand-primary">DENTISTRY.</span>
          </h1>

          {/* Subheading with Technical Style */}
          <p className="font-mono text-sm md:text-base text-white/60 max-w-xl mb-10 leading-relaxed tracking-wide">
            Advanced 3D imaging and laser technology for exceptional results. Minimal treatment intervals. Maximum precision.
          </p>

          {/* Sharp CTA Button - rounded-none */}
          <div className="flex flex-wrap gap-4">
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-bold text-sm uppercase tracking-[0.2em] rounded-none border border-brand-primary hover:bg-transparent transition-all duration-300"
            >
              <span>Initialize Consultation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-bold text-sm uppercase tracking-[0.2em] rounded-none border border-white/30 hover:border-white transition-all duration-300"
            >
              <span>{location.phoneGBP}</span>
            </a>
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "99.2%", label: "ACCURACY_RATE" },
                { value: "24HR", label: "TURNAROUND" },
                { value: "3D", label: "IMAGING_SYS" },
                { value: "500+", label: "PROCEDURES" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <p className="text-3xl md:text-4xl font-black text-brand-primary tracking-tight mb-1">{stat.value}</p>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          INFINITE MARQUEE — TECHNICAL SEPARATOR
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/10 bg-slate-900/50 py-4">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              <span className="font-mono text-xs tracking-[0.4em] text-brand-primary">INVISALIGN</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-white/60">DENTAL IMPLANTS</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-brand-primary">PORCELAIN VENEERS</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-white/60">FULL RESTORATION</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-brand-primary">LASER DENTISTRY</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-white/60">3D IMAGING</span>
              <span className="text-white/20">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES GRID — INSTRUMENTATION CARDS
          Sharp rounded-none borders, full-bleed assets, absolute lower-third text
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        {/* 1px Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Label */}
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 02]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              TREATMENT PROTOCOLS
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Advanced digital procedures for optimal outcomes.
            </p>
          </div>

          {/* Instrumentation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10">
            {[
              {
                id: "01",
                title: "INVISALIGN",
                subtitle: "Clear Aligner Therapy",
                description: "AI-powered alignment with real-time progress tracking.",
                image: "/images/services/invisalign.jpg",
              },
              {
                id: "02",
                title: "IMPLANTS",
                subtitle: "3D-Guided Placement",
                description: "Same-day digital crowns with precision mapping.",
                image: "/images/services/implants.jpg",
              },
              {
                id: "03",
                title: "RESTORATION",
                subtitle: "Full Reconstruction",
                description: "Comprehensive digital treatment planning.",
                image: "/images/services/restoration.jpg",
              },
              {
                id: "04",
                title: "VENEERS",
                subtitle: "CAD/CAM Precision",
                description: "Digital smile design for lasting aesthetics.",
                image: "/images/services/veneers.jpg",
              },
            ].map((service) => (
              <div
                key={service.id}
                className="group relative aspect-[3/4] bg-slate-900 overflow-hidden rounded-none"
              >
                {/* Full-Bleed Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Technical Corner ID */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                    [CASE_ID // {service.id}]
                  </span>
                </div>

                {/* Lower Third Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-brand-primary mb-2 uppercase">
                    {service.subtitle}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Border Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECOND MARQUEE
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/10 bg-slate-900/50 py-4">
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-12">
              <span className="font-mono text-xs tracking-[0.4em] text-white/60">PRECISION</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-brand-primary">TECHNOLOGY</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-white/60">INNOVATION</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-brand-primary">EXCELLENCE</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-white/60">DIGITAL</span>
              <span className="text-white/20">◆</span>
              <span className="font-mono text-xs tracking-[0.4em] text-brand-primary">ADVANCED</span>
              <span className="text-white/20">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          WELCOME VIDEO — INSTRUMENTATION STYLE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Label */}
          <div className="mb-8">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 03]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              SYSTEM_OVERVIEW
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Meet the digital dentistry team. See the technology in action.
            </p>
          </div>

          {/* Video Container - Sharp Borders */}
          <div className="relative aspect-video rounded-none overflow-hidden border border-white/10 group">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Technical Corner Labels */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 bg-slate-950/80 px-2 py-1">
                [PLAYBACK // ACTIVE]
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 bg-slate-950/80 px-2 py-1">
                PRACTICE_TOUR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BEFORE/AFTER — DIAGNOSTIC COMPARISON
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 04]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              DIAGNOSTIC_RESULTS
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Digital precision. Verified outcomes. Real transformations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-none border border-white/10 overflow-hidden">
              <BeforeAfterSlider
                beforeUrl="/images/cases/smile-before.png"
                afterUrl="/images/cases/smile-after.png"
                altTag="Digital smile design transformation"
                aspectRatio="4/3"
              />
            </div>
            <p className="text-center font-mono text-xs text-white/40 mt-6 tracking-wide">
              [DRAG_TO_COMPARE // BEFORE_AFTER]
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DOCTOR PROFILE — INSTRUMENTATION CARD
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 05]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4">
              LEAD_OPERATOR
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-white/10">
            {/* Image Panel */}
            <div className="relative aspect-square lg:aspect-auto bg-slate-900 overflow-hidden group">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={`${primaryDoctor.name}, ${primaryDoctor.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              {/* Technical Labels */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 bg-slate-950/80 px-2 py-1">
                  [PROFILE // ACTIVE]
                </span>
              </div>

              {/* Lower Status */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/60">
                    DIGITAL DENTISTRY SPECIALIST
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Panel */}
            <div className="bg-slate-900 p-8 md:p-12 flex flex-col justify-center">
              <p className="font-mono text-[10px] tracking-[0.3em] text-brand-primary mb-4 uppercase">
                {primaryDoctor.role}
              </p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                {primaryDoctor.name}
              </h3>
              <p className="font-mono text-sm text-white/60 leading-relaxed mb-8">
                {primaryDoctor.biography}
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 gap-2">
                {primaryDoctor.credentials.map((credential, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-none hover:border-brand-primary/30 transition-colors"
                  >
                    <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-mono text-xs text-white/70">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TECHNOLOGY FEATURES — INSTRUMENT PANELS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 06]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              SYSTEM_CAPABILITIES
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Advanced instrumentation for superior results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10">
            {[
              {
                id: "A1",
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                title: "3D IMAGING",
                description: "Cone beam CT scanning for precise diagnostics and treatment planning.",
              },
              {
                id: "A2",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "LASER SYSTEMS",
                description: "Minimally invasive procedures with faster healing and reduced discomfort.",
              },
              {
                id: "A3",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "CAD/CAM",
                description: "Same-day crowns and restorations with digital precision workflow.",
              },
            ].map((feature) => (
              <div
                key={feature.id}
                className="group bg-slate-950 p-8 rounded-none hover:bg-slate-900 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-none flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">[{feature.id}]</span>
                </div>
                <h3 className="text-xl font-black tracking-tight mb-3">{feature.title}</h3>
                <p className="font-mono text-xs text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES LIST — TECHNICAL GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 07]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              SERVICE_PROTOCOLS
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Comprehensive care in {location.cityServed}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="group bg-slate-900 p-6 rounded-none hover:bg-slate-800 transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <svg className="w-4 h-4 text-brand-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-base font-bold tracking-tight group-hover:text-brand-primary transition-colors">
                  {category}
                </h3>
                <p className="font-mono text-[10px] text-white/40 mt-2 leading-relaxed">
                  Advanced digital technology.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DIAGNOSTIC REVIEW TERMINAL — SPLIT-SCREEN HOVER
          Patient testimonials as technical readouts
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 08]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              PATIENT_FEEDBACK_LOG
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Verified outcomes. Real testimonials.
            </p>
          </div>

          {/* Diagnostic Terminal Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-white/10">
            {sampleReviews.slice(0, 3).map((review, index) => (
              <div
                key={index}
                className="group relative bg-slate-950 p-8 rounded-none overflow-hidden"
              >
                {/* Hover Overlay - Split Screen Effect */}
                <div className="absolute inset-0 bg-brand-primary/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                {/* Terminal Header */}
                <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                      FEEDBACK_ID // {String(index + 1).padStart(3, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="relative z-10">
                  <p className="font-mono text-sm text-white/70 leading-relaxed mb-6">
                    &ldquo;{review.reviewText}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/20 rounded-none flex items-center justify-center">
                      <span className="font-mono text-sm font-bold text-brand-primary">
                        {review.reviewerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">{review.reviewerName}</p>
                      <p className="font-mono text-[10px] text-white/40 tracking-wide">VERIFIED_PATIENT</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>

          {/* Overall Rating Bar */}
          <div className="mt-8 p-6 bg-slate-950 border border-white/10 rounded-none">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">AGGREGATE_RATING</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-brand-primary">5.0</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs text-white/40">200+ VERIFIED_REVIEWS // GOOGLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LOCATION & HOURS — INSTRUMENTATION PANEL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 09]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              LOCATION_DATA
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-white/10">
            {/* Hours Panel */}
            <div className="bg-slate-900 p-8 md:p-12">
              <p className="font-mono text-[10px] tracking-[0.3em] text-brand-primary mb-6 uppercase">
                OPERATIONAL_HOURS
              </p>
              <div className="space-y-2">
                {[
                  { day: "MON", hours: "08:00 — 17:00" },
                  { day: "TUE", hours: "08:00 — 17:00" },
                  { day: "WED", hours: "08:00 — 17:00" },
                  { day: "THU", hours: "08:00 — 17:00" },
                  { day: "FRI", hours: "08:00 — 12:00" },
                  { day: "SAT", hours: "OFFLINE" },
                  { day: "SUN", hours: "OFFLINE" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/5 border border-white/10 rounded-none hover:border-brand-primary/30 transition-colors"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-white/70">{schedule.day}</span>
                    <span className={`font-mono text-xs tracking-wider ${schedule.hours === "OFFLINE" ? "text-white/30" : "text-brand-primary"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-brand-primary text-white font-bold text-sm uppercase tracking-[0.2em] rounded-none border border-brand-primary hover:bg-transparent transition-all duration-300"
              >
                <span>SCHEDULE_APPOINTMENT</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Map Panel */}
            <div className="relative aspect-square lg:aspect-auto min-h-[400px] bg-slate-900">
              <iframe
                src={location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${location.practiceNameGBP}`}
                className="absolute inset-0"
              />
              {/* Technical Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 bg-slate-950/90 px-2 py-1">
                  [GPS_COORDINATES // ACTIVE]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MEMBERSHIP — TECHNICAL PRICING PANELS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [CASE_ID // 10]
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mt-4 mb-2">
              MEMBERSHIP_PROTOCOLS
            </h2>
            <p className="font-mono text-sm text-white/50 tracking-wide">
              Optimized savings on digital dentistry. 25% off all procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10">
            {[
              { tier: "INDIVIDUAL", price: "335", code: "TIER_01" },
              { tier: "COUPLE", price: "615", code: "TIER_02", popular: true },
              { tier: "FAMILY", price: "965", code: "TIER_03", extra: "+$95 per additional" },
            ].map((plan) => (
              <div
                key={plan.code}
                className={`group relative bg-slate-950 p-8 rounded-none ${plan.popular ? "ring-1 ring-brand-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-px left-0 right-0 h-[2px] bg-brand-primary" />
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">[{plan.code}]</span>
                  {plan.popular && (
                    <span className="font-mono text-[10px] tracking-[0.3em] text-brand-primary bg-brand-primary/10 px-2 py-1">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs tracking-[0.3em] text-brand-primary mb-2">{plan.tier}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="font-mono text-xs text-white/40">/YEAR</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {["2 Cleanings", "2 Doctor Exams", "2 Oral Cancer Screening", "2 Fluoride Varnish", "2 Digital/3D X-ray", "25% off All Procedures"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-mono text-xs text-white/60">
                      <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                  {plan.extra && (
                    <li className="font-mono text-xs text-brand-primary pt-2 border-t border-white/10">{plan.extra}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA — INSTRUMENTATION BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterData.globalPracticeName} office interior`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/90" />
          {/* 1px Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                                linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-mono text-[11px] tracking-[0.4em] text-brand-primary uppercase">
              [SYSTEM_READY // INITIALIZE]
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.02em] mt-6 mb-6">
              READY TO BEGIN?
            </h2>
            <p className="font-mono text-sm text-white/50 mb-10 max-w-xl mx-auto">
              Free digital consultations on Implants, Dentures, and Invisalign. Experience our 3D imaging at no cost.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-primary text-white font-bold text-sm uppercase tracking-[0.2em] rounded-none border border-brand-primary hover:bg-transparent transition-all duration-300"
              >
                <span>INITIALIZE_CONSULTATION</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-white font-bold text-sm uppercase tracking-[0.2em] rounded-none border border-white/30 hover:border-white transition-all duration-300"
              >
                <span>{location.phoneGBP}</span>
              </a>
            </div>

            {/* Bottom Status */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                NOW_ACCEPTING_NEW_PATIENTS // {location.cityServed.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>

      <T2Footer />
    </div>
  );
}
