import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T2Nav from "./components/T2Nav";
import T2Footer from "./components/T2Footer";
import BeforeAfterSlider from "@/components/dental/BeforeAfterSlider";
import {
  TextReveal,
  HeadlineReveal,
  CursorGlow,
  AnimatedCounter,
  MagneticElement,
} from "@/components/premium";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Advanced digital dentistry in ${location.cityServed}. Precision care with minimal treatment intervals using cutting-edge 3D imaging and laser technology.`,
};

export default function Template2Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-innovator bg-zinc-950 text-white relative">
      {/* Cursor Tracking Glow Effect */}
      <CursorGlow color="var(--primary-brand)" size={500} blur={120} opacity={0.12} />

      <T2Nav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — ELITE MULTI-LAYERED PREMIUM MASTERPIECE
          Depth-injected ambient canvas, overlapping structural framework,
          glassmorphic UI elements, architectural crosshairs
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen relative overflow-hidden bg-zinc-950">
        {/* ══════════════════════════════════════════════════════════════════
            LAYER 0: Fullscreen Video Background
            Ambient cinematic video with dark overlay for text legibility
        ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            {/* Video source disabled for demo */}
          </video>
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-zinc-950/70" />
          {/* Gradient fade at bottom for metrics bar transition */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 0.5: Ambient Glow Overlay (Depth Injection)
            Ultra-soft radial gradient glow elements with CSS animation
        ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Deep teal ambient glow - behind heading area */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[160px] bg-teal-500/[0.06] animate-drift top-[15%] left-[10%]"
          />
          {/* Soft slate ambient glow - behind clinician area */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-slate-400/[0.04] animate-drift-reverse top-[25%] right-[5%]"
          />
          {/* Subtle brand accent glow - lower left */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-brand-primary/[0.03] animate-drift-slow bottom-[10%] left-[20%]"
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 1: Refined Corner UI Tags (High-End Micro-Labels)
            Sharp uppercase sans-serif with geometric design marks
        ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute top-8 left-8 z-30 flex items-center gap-3">
          {/* Geometric design mark - vertical line token */}
          <div className="w-[2px] h-4 bg-brand-primary/60" />
          <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
            Advanced Dentistry
          </span>
        </div>
        <div className="absolute top-8 right-8 z-30 flex items-center gap-3">
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
            {location.cityServed}
          </span>
          {/* Geometric separator */}
          <div className="w-1 h-1 bg-white/20 rotate-45" />
          <span className="text-[10px] tracking-[0.25em] text-brand-primary/70 uppercase font-medium">
            Now Accepting
          </span>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 2: Architectural Crosshairs & Alignment Grid
            Precise intersection indicators with + symbols
        ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Corner structural frames */}
          <div className="absolute top-16 left-16 w-24 h-24 border-l border-t border-white/[0.04]" />
          <div className="absolute top-16 right-16 w-24 h-24 border-r border-t border-white/[0.04]" />
          <div className="absolute bottom-32 left-16 w-24 h-24 border-l border-b border-white/[0.04]" />
          <div className="absolute bottom-32 right-16 w-24 h-24 border-r border-b border-white/[0.04]" />

          {/* Intersection crosshair indicators */}
          <span className="absolute top-16 left-16 -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs font-light select-none">+</span>
          <span className="absolute top-16 right-16 translate-x-1/2 -translate-y-1/2 text-white/20 text-xs font-light select-none">+</span>
          <span className="absolute bottom-32 left-16 -translate-x-1/2 translate-y-1/2 text-white/20 text-xs font-light select-none">+</span>
          <span className="absolute bottom-32 right-16 translate-x-1/2 translate-y-1/2 text-white/20 text-xs font-light select-none">+</span>

          {/* Center vertical alignment rule */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 3: Primary Content Grid with Overlapping Framework
            Text block overlaps clinician card boundary by 15-20%
        ══════════════════════════════════════════════════════════════════ */}
        <div className="min-h-screen relative z-20 px-8 md:px-12 lg:px-16 py-32 lg:py-24">
          <div className="max-w-7xl mx-auto h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full">

              {/* Left Column - Typography Stack (overlaps into col 7-8) */}
              <div className="lg:col-span-7 relative z-20">
                {/* Category Label - High-end UI tag */}
                <div className="flex items-center gap-3 mb-8">
                  {/* Crisp geometric square mark */}
                  <div className="w-2 h-2 bg-brand-primary/80 rotate-45" />
                  <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
                    Precision Digital Dentistry
                  </span>
                </div>

                {/* Main Headline - Designed to overlap clinician card + Text Reveal */}
                <HeadlineReveal className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1.02] mb-8 lg:pr-0">
                  <span className="block">Same-Day Crowns.</span>
                  <span className="block">3D-Guided Implants.</span>
                  <span className="block text-brand-primary">Zero Guesswork.</span>
                </HeadlineReveal>

                {/* Subheading */}
                <p className="text-base md:text-lg text-white/50 max-w-md mb-10 leading-relaxed">
                  Our CEREC system mills your permanent crown while you wait. Our CBCT scanner plans your implant to the tenth of a millimeter. This is dentistry without second appointments.
                </p>

                {/* CTA Buttons - Glassmorphic capsule styling with Magnetic Effect */}
                <div className="flex flex-wrap gap-4">
                  <MagneticElement strength={0.15}>
                    <a
                      href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-300"
                    >
                      <span>Schedule Consultation</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </MagneticElement>
                  <MagneticElement strength={0.15}>
                    <a
                      href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-white/15 hover:bg-white/[0.03] hover:backdrop-blur-md hover:border-white/25 transition-all duration-300"
                    >
                      <span>{location.phoneGBP}</span>
                    </a>
                  </MagneticElement>
                </div>
              </div>

              {/* Right Column - Team Photo Panel */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <div className="relative lg:-ml-12">
                  {/* Team Photo Container */}
                  <div className="relative aspect-[4/3] max-w-lg ml-auto rounded-2xl border border-white/[0.05] bg-zinc-900/40 overflow-hidden shadow-2xl">
                    <Image
                      src="/images/team/staff-photo.jpg"
                      alt={`The team at ${clientMasterData.globalPracticeName}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                      priority
                    />

                    {/* Subtle bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/50 to-transparent" />

                    {/* Corner architectural frames */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/[0.08]" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-white/[0.08]" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-white/[0.08]" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/[0.08]" />

                    {/* Team badge */}
                    <div className="absolute bottom-5 left-5 right-5 z-10">
                      <div className="backdrop-blur-xl bg-zinc-950/60 border border-white/[0.08] rounded-xl px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[11px] tracking-[0.15em] text-white/70 uppercase">Our Team</span>
                        </div>
                        <span className="text-[10px] tracking-[0.2em] text-white/40">Now Accepting Patients</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative offset frame */}
                  <div className="absolute -top-3 -right-3 w-full h-full rounded-2xl border border-white/[0.03] -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 4: Metrics Bar - Individual Micro-Panel Containers
            Each data point in separate container with top border highlight
        ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.04] bg-zinc-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]">
              {[
                { value: "4.9", label: "Google (287 reviews)" },
                { value: "Same-Day", label: "CEREC Crowns" },
                { value: "0.1mm", label: "CBCT Precision" },
                { value: "2,400+", label: "Implants Placed" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative py-6 px-6 md:px-8 hover:bg-white/[0.02] transition-all duration-300 cursor-default"
                >
                  {/* Top border highlight rule */}
                  <div className="absolute top-0 left-6 right-6 md:left-8 md:right-8 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:via-brand-primary/20 transition-all duration-300" />

                  {/* Metric content */}
                  <div className="border-t border-white/[0.05] pt-4">
                    <span className="block text-2xl md:text-3xl font-semibold text-brand-primary tracking-tight mb-1">
                      {stat.value}
                    </span>
                    <span className="block text-[10px] tracking-[0.15em] text-white/40 uppercase">
                      {stat.label}
                    </span>
                  </div>
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
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Same-Day CEREC Crowns</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">3D-Guided Implants</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">Solea Laser Dentistry</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">iTero Invisalign Scanning</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-brand-primary font-medium">CBCT 3D Imaging</span>
              <span className="text-white/10">•</span>
              <span className="text-xs tracking-[0.2em] text-white/50">Digital Smile Design</span>
              <span className="text-white/10">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES — ASYMMETRIC SIDE-BY-SIDE PRESENTATION LAYOUT
          Left: Minimal vertical typography stack | Right: Dynamic showcase window
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Our Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
              Treatment Excellence
            </h2>
            <p className="text-base text-white/50 max-w-lg">
              Advanced digital procedures designed for optimal outcomes and lasting results.
            </p>
          </div>

          {/* Asymmetric Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Side - Minimal Vertical Typography Stack */}
            <div className="lg:col-span-5 space-y-0">
              {[
                {
                  id: "01",
                  title: "Invisalign",
                  subtitle: "iTero Scanner + Diamond Provider",
                  description: "See your final smile in 3D before you start. Our Diamond status means we've treated 500+ cases—so we finish faster.",
                  image: "/images/services/invisalign.jpg",
                },
                {
                  id: "02",
                  title: "Dental Implants",
                  subtitle: "CBCT-Guided Surgery",
                  description: "Your implant is planned to the tenth of a millimeter. Surgical guides mean shorter surgery, faster healing.",
                  image: "/images/services/implant.jpg",
                },
                {
                  id: "03",
                  title: "Full Restoration",
                  subtitle: "Digital Smile Design",
                  description: "We design your new smile on screen first. You approve before we start. No surprises, just results.",
                  image: "/images/services/full-mouth-smile.jpg",
                },
                {
                  id: "04",
                  title: "Veneers",
                  subtitle: "CEREC Same-Day Delivery",
                  description: "Digital impressions mean perfect fit. Mill-cut ceramics mean you leave with your final veneers—not temporaries.",
                  image: "/images/services/full-mouth-shade.jpg",
                },
              ].map((service, index) => (
                <div
                  key={service.id}
                  className="group relative py-6 border-b border-white/[0.05] cursor-pointer hover:bg-white/[0.02] transition-all duration-300 -mx-4 px-4"
                >
                  <div className="flex items-start gap-6">
                    {/* Numeric Tag */}
                    <span className="text-[11px] tracking-[0.2em] text-white/30 font-medium pt-1 w-8 flex-shrink-0">
                      {service.id}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">
                            {service.subtitle}
                          </p>
                        </div>
                        {/* Hover Arrow */}
                        <svg className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mt-3 max-w-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator line */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full" />
                </div>
              ))}
            </div>

            {/* Right Side - Large Format Dynamic Showcase Window */}
            <div className="lg:col-span-7 relative">
              <div className="sticky top-24">
                {/* Main Showcase Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/services/invisalign.jpg"
                    alt="Featured dental service"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                  {/* Floating info panel */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl p-6">
                      <p className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-medium mb-2">
                        Featured Treatment
                      </p>
                      <h4 className="text-2xl font-semibold tracking-tight mb-2">
                        Precision Care
                      </h4>
                      <p className="text-sm text-white/50">
                        Experience the difference of digital dentistry with our advanced treatment protocols.
                      </p>
                    </div>
                  </div>

                  {/* Corner architectural elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/[0.1]" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-white/[0.1]" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-white/[0.1] z-20" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/[0.1] z-20" />
                </div>
              </div>
            </div>
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
          WELCOME VIDEO — PRECISION FRAMING ON CANVAS
          Direct canvas placement, widescreen frame, no boxed containers
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Asymmetric Grid: Video + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Video Frame - Wide Widescreen */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/images/team/staff-photo.jpg"
                >
                  {/* Video source disabled for demo */}
                  Your browser does not support the video tag.
                </video>

                {/* Corner architectural frames */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-white/[0.1] pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-white/[0.1] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-white/[0.1] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-white/[0.1] pointer-events-none" />

                {/* Status indicators */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] tracking-[0.15em] text-white/60 uppercase">Practice Tour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content - Narrow Offset */}
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
                Meet Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4 mb-4">
                Practice Overview
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Step inside our state-of-the-art facility. See the technology in action.
              </p>
              {/* Thin separator */}
              <div className="border-t border-white/[0.05] pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Duration</span>
                  <span className="text-sm text-white/60">3:45</span>
                </div>
              </div>
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
                beforeUrl="/images/cases/smile-before.png"
                afterUrl="/images/cases/smile-after.png"
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
          DOCTOR PROFILE — DIRECT CANVAS PRESENTATION
          No heavy boxed cards, thin separators, elegant offset layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Portrait - Direct on canvas */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/team/doctor-portrait.png"
                  alt={`${primaryDoctor.name}, ${primaryDoctor.role}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />

                {/* Corner frames */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-white/[0.08]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-white/[0.08]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-white/[0.08]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-white/[0.08]" />
              </div>

              {/* Status badge */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.15em] text-white/60 uppercase">Accepting Patients</span>
                </div>
              </div>
            </div>

            {/* Bio Content - Narrow offset text box */}
            <div className="lg:col-span-7 lg:pt-12">
              <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
                Your Provider
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-lg text-white/40 mb-8 italic">{primaryDoctor.role}</p>

              {/* Thin separator */}
              <div className="border-t border-white/[0.05] pt-8 mb-8">
                <p className="text-base text-white/60 leading-relaxed max-w-lg">
                  {primaryDoctor.biography}
                </p>
              </div>

              {/* Credentials - Thin underline frames */}
              <div className="space-y-0">
                {primaryDoctor.credentials.map((credential, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.05] group hover:border-white/[0.1] transition-colors"
                  >
                    <span className="text-[10px] tracking-[0.2em] text-white/30 font-medium w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{credential}</span>
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
                title: "Carestream CS 9600 CBCT",
                description: "Full 3D jaw imaging at 0.1mm resolution. See bone density, nerve pathways, and sinus proximity before we touch a drill.",
              },
              {
                id: "02",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Solea CO₂ Laser",
                description: "Cuts soft tissue without bleeding. Most procedures need zero anesthesia. You'll feel pressure, not pain.",
              },
              {
                id: "03",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "CEREC Primescan + Mill",
                description: "Digital scan replaces goopy impressions. Mill carves your crown from solid ceramic in 12 minutes. Walk out same day.",
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
              Complete dental services in {location.cityServed}.
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
          PATIENT REVIEWS — ASYMMETRIC INTERACTIVE SLIDER FRAMEWORK
          Primary testimonial floating over translucent background, secondary cards offset
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900 relative overflow-hidden">
        {/* Elegant translucent background layer */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[70%] h-[80%] bg-gradient-to-bl from-brand-primary/[0.03] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Asymmetric Layout: Large Primary + Stacked Secondary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Side - Section Header + Secondary Reviews */}
            <div className="lg:col-span-5 space-y-8">
              {/* Header */}
              <div>
                <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
                  Patient Experiences
                </span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
                  Trusted Results
                </h2>
                <p className="text-base text-white/50">
                  Real stories from verified patients.
                </p>
              </div>

              {/* Overall Rating Badge */}
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-semibold text-brand-primary block">4.9</span>
                    <div className="flex items-center gap-0.5 mt-2 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="h-12 w-[1px] bg-white/[0.08]" />
                  <div>
                    <span className="text-2xl font-semibold block">287</span>
                    <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">Google Reviews</span>
                  </div>
                </div>
              </div>

              {/* Secondary Reviews - Compact Stack */}
              <div className="space-y-3">
                {sampleReviews.slice(1, 3).map((review, index) => (
                  <div
                    key={index}
                    className="group relative py-5 px-6 border-l-2 border-white/[0.06] hover:border-brand-primary/50 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-3">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-brand-primary">
                            {review.reviewerName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-white/70">{review.reviewerName}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2.5 h-2.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Large Primary Testimonial Floating Quote */}
            <div className="lg:col-span-7 relative">
              <div className="relative">
                {/* Large quote mark - positioned outside and above the card */}
                <div className="absolute -top-16 -left-6 text-[140px] leading-none text-brand-primary/[0.15] font-serif select-none pointer-events-none z-0">
                  &ldquo;
                </div>

                {/* Primary Testimonial Card - Glassmorphism */}
                <div className="relative z-10 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 md:p-14">
                  {/* Corner architectural elements */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/[0.08]" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/[0.08]" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/[0.08]" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/[0.08]" />

                  {/* Verified Badge */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Featured Review</span>
                  </div>

                  {/* Quote Text - Large Format */}
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light mb-10">
                    {sampleReviews[0].reviewText}
                  </p>

                  {/* Thin separator */}
                  <div className="border-t border-white/[0.06] pt-8">
                    <div className="flex items-center justify-between">
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-brand-primary">
                            {sampleReviews[0].reviewerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-base font-medium">{sampleReviews[0].reviewerName}</p>
                          <p className="text-[11px] text-white/40 tracking-wide">Verified Patient • Google</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider Navigation Dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button className="w-8 h-1 rounded-full bg-brand-primary" aria-label="Review 1" />
                  <button className="w-2 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors" aria-label="Review 2" />
                  <button className="w-2 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors" aria-label="Review 3" />
                </div>
              </div>
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
                  { day: "Friday", hours: "8:00 AM — 12:00 PM" },
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
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
              >
                <span>Schedule Appointment</span>
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
          MEMBERSHIP — EXPANDABLE ROW MATRIX STACK
          Clean responsive data rows, expandable details on selection
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="text-[11px] tracking-[0.3em] text-brand-primary uppercase font-medium">
              Membership Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 mb-3">
              Digital Care Membership
            </h2>
            <p className="text-base text-white/50 max-w-lg mx-auto">
              No insurance? No problem. Members get 2 cleanings, full CBCT scans, and 25% off every procedure—including same-day crowns.
            </p>
          </div>

          {/* Benefits Row - Compact Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {["2 Cleanings", "2 Exams", "CBCT 3D Scan", "25% Off Everything"].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] rounded-full">
                <svg className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs tracking-wide text-white/60">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Row Matrix Stack */}
          <div className="space-y-2">
            {[
              { tier: "Individual", price: "335", code: "01", description: "Perfect for single patients seeking comprehensive preventive care coverage." },
              { tier: "Couple", price: "615", code: "02", popular: true, description: "Ideal for partners. Both members receive full membership benefits." },
              { tier: "Family", price: "965", code: "03", description: "Coverage for parents and children. Add additional members for $95/year each.", extra: "+$95 per additional member" },
            ].map((plan) => (
              <details
                key={plan.code}
                className="group"
              >
                <summary className={`flex items-center justify-between p-6 md:p-8 cursor-pointer list-none rounded-2xl transition-all duration-300 ${plan.popular ? "bg-brand-primary/[0.05] border border-brand-primary/20 hover:border-brand-primary/40" : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"}`}>
                  <div className="flex items-center gap-6">
                    {/* Code Badge */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.popular ? "bg-brand-primary/20 border border-brand-primary/30" : "bg-white/5 border border-white/10"}`}>
                      <span className={`text-xs font-medium ${plan.popular ? "text-brand-primary" : "text-white/40"}`}>{plan.code}</span>
                    </div>

                    {/* Tier Name */}
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">{plan.tier}</h3>
                        {plan.popular && (
                          <span className="text-[9px] tracking-[0.2em] text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full uppercase font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      {plan.extra && (
                        <p className="text-xs text-brand-primary/70 mt-1">{plan.extra}</p>
                      )}
                    </div>
                  </div>

                  {/* Price + Expand Indicator */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-3xl font-semibold">${plan.price}</span>
                      <span className="text-sm text-white/40">/year</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </summary>

                {/* Expandable Content */}
                <div className="overflow-hidden">
                  <div className={`p-6 md:p-8 mt-1 rounded-2xl ${plan.popular ? "bg-brand-primary/[0.03] border border-brand-primary/10" : "bg-white/[0.01] border border-white/[0.04]"}`}>
                    <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
                      {plan.description}
                    </p>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {["2 Cleanings", "2 Doctor Exams", "2 Oral Cancer Screenings", "2 Fluoride Treatments", "2 Digital/3D X-rays", "25% off All Procedures"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 py-2">
                          <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-white/70">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <a
                      href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 transition-all duration-300"
                    >
                      <span>Enroll Now</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/40">
              No insurance required. Membership benefits activate immediately upon enrollment.
            </p>
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
            alt={`${clientMasterData.globalPracticeName} office interior`}
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
              Complimentary consultations for Implants, Dentures, and Invisalign. Experience our 3D imaging technology at no cost.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
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

      <T2Footer />
    </div>
  );
}
