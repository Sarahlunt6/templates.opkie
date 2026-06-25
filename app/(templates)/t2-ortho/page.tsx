import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho } from "@/data/master-ortho";
import T2OrthoNav from "./components/T2OrthoNav";
import T2OrthoFooter from "./components/T2OrthoFooter";
import BeforeAfterSlider from "@/components/dental/BeforeAfterSlider";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Advanced digital orthodontics in ${location.cityServed}. Precision care with cutting-edge 3D imaging and treatment technology for braces and Invisalign.`,
};

export default function Template2OrthoPage() {
  const { doctors } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans bg-zinc-950 text-white">
      <T2OrthoNav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — PRECISION MEDICAL
          Clean grid overlay, sophisticated typography, patient-focused metrics
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Background Image - Full Bleed with Refined Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/team-ortho.jpeg"
            alt={`Our orthodontic team at ${clientMasterDataOrtho.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/60 to-zinc-950" />
        </div>

        {/* Refined Corner Labels */}
        <div className="absolute top-6 left-6 z-20">
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-medium">
            Advanced Orthodontics
          </span>
        </div>
        <div className="absolute top-6 right-6 z-20">
          <span className="text-[10px] tracking-[0.25em] text-white/40">
            {location.cityServed} • Now Accepting Patients
          </span>
        </div>

        {/* Main Content - Absolute Lower Third Positioning */}
        <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-24">
          {/* Category Label */}
          <div className="mb-6">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Precision Digital Orthodontics
            </span>
          </div>

          {/* Main Headline - Title Case, Refined Weight */}
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-6 max-w-4xl">
            <span className="block">Your Perfect Smile,</span>
            <span className="block">Precisely</span>
            <span className="block text-brand-primary">Designed.</span>
          </h1>

          {/* Subheading with Elegant Style */}
          <p className="text-base md:text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
            3D imaging, digital treatment planning, and personalized care. Experience orthodontics designed around your comfort and lasting results.
          </p>

          {/* Rounded CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
            >
              <span>Schedule Consultation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <span>{location.phoneGBP}</span>
            </a>
          </div>

          {/* Patient-Focused Stats Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "99.2%", label: "Patient Satisfaction" },
                { value: "3D", label: "Digital Planning" },
                { value: "5,000+", label: "Smiles Created" },
                { value: "15+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <p className="text-3xl md:text-4xl font-semibold text-brand-primary tracking-tight mb-1">{stat.value}</p>
                  <p className="text-[11px] tracking-[0.15em] text-white/50 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          REFINED MARQUEE — ELEGANT SEPARATOR
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-slate-800 bg-zinc-900/50 py-5">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Invisalign</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Traditional Braces</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Ceramic Braces</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Early Treatment</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Teen Orthodontics</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Retainers</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES GRID — SOPHISTICATED MEDICAL CARDS
          Rounded corners, refined typography, patient-focused descriptions
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Our Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Treatment Excellence
            </h2>
            <p className="text-base text-white/50 max-w-lg">
              Advanced digital treatments designed for optimal outcomes and lasting results.
            </p>
          </div>

          {/* Refined Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "01",
                title: "Invisalign",
                subtitle: "Clear Aligner Therapy",
                description: "Discreet alignment with real-time progress tracking for your perfect smile.",
                image: "/images/services/invisalign.jpg",
              },
              {
                id: "02",
                title: "Traditional Braces",
                subtitle: "Precision Metal Brackets",
                description: "Time-tested treatment with digital placement for reliable results.",
                image: "/images/services/braces.jpg",
              },
              {
                id: "03",
                title: "Ceramic Braces",
                subtitle: "Discreet Treatment",
                description: "Tooth-colored brackets that blend naturally with your smile.",
                image: "/images/services/full-mouth-smile.jpg",
              },
              {
                id: "04",
                title: "Early Treatment",
                subtitle: "Phase 1 Orthodontics",
                description: "Interceptive care to guide healthy jaw growth and development.",
                image: "/images/services/full-mouth-shade.jpg",
              },
            ].map((service) => (
              <div
                key={service.id}
                className="group relative aspect-[3/4] bg-slate-900 overflow-hidden rounded-2xl"
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20 z-10" />
                <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Numeric Counter */}
                <div className="absolute top-5 left-5 z-20">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <span className="text-[11px] font-medium text-white/70">{service.id}</span>
                  </div>
                </div>

                {/* Lower Third Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="text-[10px] tracking-[0.2em] text-brand-primary mb-2 uppercase font-medium">
                    {service.subtitle}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECOND MARQUEE — REVERSED
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-slate-800 bg-zinc-900/50 py-5">
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <span className="text-xs tracking-[0.2em] text-white/50">Precision</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Technology</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Innovation</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Excellence</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Digital</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Advanced</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          WELCOME VIDEO — REFINED PRESENTATION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-8">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Meet Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Practice Overview
            </h2>
            <p className="text-base text-white/50">
              Step inside our state-of-the-art facility. See the technology in action.
            </p>
          </div>

          {/* Video Container - Rounded */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 group">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team-ortho.jpeg"
            >
              {/* Video source disabled for demo */}
              Your browser does not support the video tag.
            </video>

            {/* Refined Labels */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="text-[10px] tracking-[0.2em] text-white/70 bg-zinc-950/80 px-3 py-1.5 rounded-full">
                Practice Tour
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] text-white/70 bg-zinc-950/80 px-3 py-1.5 rounded-full">
                Live Preview
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BEFORE/AFTER — CLINICAL RESULTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Verified Results
            </h2>
            <p className="text-base text-white/50">
              Real transformations. Precision outcomes. Documented success.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-800 overflow-hidden">
              <BeforeAfterSlider
                beforeUrl="/images/cases/smile-before-ortho.png"
                afterUrl="/images/cases/smile-after-ortho.png"
                altTag="Digital smile design transformation"
                aspectRatio="4/3"
              />
            </div>
            <p className="text-center text-sm text-white/40 mt-6">
              Drag to compare before and after results
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DOCTOR PROFILE — REFINED MEDICAL PRESENTATION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Your Provider
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4">
              Meet Your Orthodontist
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Panel */}
            <div className="relative aspect-square lg:aspect-auto bg-zinc-900 overflow-hidden rounded-2xl group">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={`${primaryDoctor.name}, ${primaryDoctor.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

              {/* Refined Status */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] tracking-[0.15em] text-white/70">
                    Board-Certified Orthodontist
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Panel */}
            <div className="bg-zinc-900 p-8 md:p-12 flex flex-col justify-center rounded-2xl">
              <p className="text-[11px] tracking-[0.2em] text-brand-primary mb-4 uppercase font-medium">
                {primaryDoctor.role}
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                {primaryDoctor.name}
              </h3>
              <p className="text-base text-white/60 leading-relaxed mb-8">
                {primaryDoctor.biography}
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 gap-2">
                {primaryDoctor.credentials.map((credential, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-3 px-4 bg-white/5 border border-slate-800 rounded-xl hover:border-brand-primary/30 transition-colors"
                  >
                    <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-white/70">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TECHNOLOGY FEATURES — REFINED MEDICAL PANELS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Our Technology
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Advanced Capabilities
            </h2>
            <p className="text-base text-white/50">
              State-of-the-art technology for superior patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: "01",
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                title: "3D Imaging",
                description: "iTero scanning for precise diagnostics and comprehensive treatment planning.",
              },
              {
                id: "02",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Accelerated Treatment",
                description: "Advanced techniques that can reduce treatment time while improving comfort.",
              },
              {
                id: "03",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "Digital Workflow",
                description: "Virtual monitoring and real-time progress tracking throughout treatment.",
              },
            ].map((feature) => (
              <div
                key={feature.id}
                className="group bg-zinc-950 p-8 rounded-2xl hover:bg-zinc-900/80 transition-colors duration-300 border border-slate-800"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] font-medium text-white/40">{feature.id}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES LIST — CLEAN GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Full Service Menu
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Comprehensive Care
            </h2>
            <p className="text-base text-white/50">
              Complete orthodontic services in {location.cityServed}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="group bg-zinc-900 p-5 rounded-xl hover:bg-zinc-800 transition-colors duration-300 cursor-pointer border border-slate-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-[9px] font-medium text-white/40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-brand-primary opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium tracking-tight group-hover:text-brand-primary transition-colors">
                  {category}
                </h3>
                <p className="text-[11px] text-white/40 mt-1.5">
                  Digital precision care
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PATIENT REVIEWS — REFINED TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Patient Experiences
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              What Our Patients Say
            </h2>
            <p className="text-base text-white/50">
              Real stories from real patients. Verified reviews.
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {sampleReviewsOrtho.slice(0, 3).map((review, index) => (
              <div
                key={index}
                className="group relative bg-zinc-950 p-8 rounded-2xl overflow-hidden border border-slate-800"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-primary/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] tracking-[0.15em] text-white/40">
                      Verified Patient
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="relative z-10">
                  <p className="text-base text-white/70 leading-relaxed mb-6">
                    &ldquo;{review.reviewText}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                    <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-brand-primary">
                        {review.reviewerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.reviewerName}</p>
                      <p className="text-[11px] text-white/40">Google Review</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
              </div>
            ))}
          </div>

          {/* Overall Rating Bar */}
          <div className="mt-8 p-6 bg-zinc-950 border border-slate-800 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Overall Rating</span>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-brand-primary">5.0</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-white/40">200+ Verified Reviews on Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LOCATION & HOURS — REFINED PANEL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Visit Us
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4">
              Location & Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Hours Panel */}
            <div className="bg-zinc-900 p-8 md:p-12 rounded-2xl border border-slate-800">
              <p className="text-[11px] tracking-[0.2em] text-brand-primary mb-6 uppercase font-medium">
                Office Hours
              </p>
              <div className="space-y-2">
                {[
                  { day: "Monday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM — 2:00 PM" },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/5 border border-slate-800 rounded-xl hover:border-brand-primary/30 transition-colors"
                  >
                    <span className="text-sm text-white/70">{schedule.day}</span>
                    <span className={`text-sm ${schedule.hours === "Closed" ? "text-white/30" : "text-brand-primary"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
              >
                <span>Schedule Consultation</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Map Panel */}
            <div className="relative aspect-square lg:aspect-auto min-h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-slate-800">
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
              {/* Refined Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] tracking-[0.2em] text-white/70 bg-zinc-950/90 px-3 py-1.5 rounded-full">
                  {location.cityServed}, {location.stateServed}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PAYMENT PLANS — REFINED PRICING CARDS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Flexible Financing
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] mt-4 mb-3">
              Affordable Care
            </h2>
            <p className="text-base text-white/50">
              Flexible payment plans with 0% financing available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: "Basic Braces", price: "99", code: "01" },
              { tier: "Invisalign", price: "149", code: "02", popular: true },
              { tier: "Teen Treatment", price: "89", code: "03" },
            ].map((plan) => (
              <div
                key={plan.code}
                className={`group relative bg-zinc-950 p-8 rounded-2xl border ${plan.popular ? "border-brand-primary" : "border-slate-800"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] tracking-[0.2em] text-brand-primary bg-brand-primary/10 px-4 py-1.5 rounded-full uppercase font-medium border border-brand-primary/30">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] font-medium text-white/40">{plan.code}</span>
                  </div>
                </div>

                <p className="text-sm tracking-[0.2em] text-brand-primary mb-2 uppercase font-medium">{plan.tier}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-semibold">${plan.price}</span>
                  <span className="text-sm text-white/40">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {["All Adjustments Included", "Retainers Included", "24/7 Emergency Support", "Flexible Scheduling", "0% Financing Available"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA — REFINED BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterDataOrtho.globalPracticeName} office interior`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-zinc-950/90" />
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Start Your Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.01em] mt-6 mb-6">
              Ready to Begin?
            </h2>
            <p className="text-base text-white/50 mb-10 max-w-xl mx-auto">
              Complimentary consultations for Braces, Invisalign, and all orthodontic treatments. Experience our 3D imaging technology at no cost.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
              >
                <span>Schedule Consultation</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <span>{location.phoneGBP}</span>
              </a>
            </div>

            {/* Bottom Status */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/40">
                Now Accepting New Patients in {location.cityServed}
              </span>
            </div>
          </div>
        </div>
      </section>

      <T2OrthoFooter />
    </div>
  );
}
