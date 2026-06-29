import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho } from "@/data/master-ortho";
import T3OrthoNav from "./components/T3OrthoNav";
import T3OrthoFooter from "./components/T3OrthoFooter";
import T3OrthoHero from "./components/T3OrthoHero";
import T3OrthoBentoServices from "./components/T3OrthoBentoServices";
import T3OrthoPremiumCanvas from "./components/T3OrthoPremiumCanvas";
import PremiumVideoPlayerOrtho from "./components/PremiumVideoPlayerOrtho";
import T3OrthoReviewCarousel from "./components/T3OrthoReviewCarousel";
import T3OrthoContactHours from "./components/T3OrthoContactHours";
import {
  AmbientLightNodes,
  MindfulScrollProgress,
} from "@/components/premium";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Precision orthodontics and smile engineering in ${location.cityServed}. Experience advanced clear aligner therapy, airway-focused treatment, and personalized alignment solutions in a luxury clinical environment.`,
};

export default function Template3OrthoPage() {
  const { doctors } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sanctuary bg-brand-canvas text-brand-mainText relative overflow-x-hidden">
      {/* Mindful Scroll Progress Indicator */}
      <MindfulScrollProgress color="var(--primary-brand)" thickness={2} position="left" />

      {/* Premium Canvas Background with Mouse-Reactive Particles */}
      <T3OrthoPremiumCanvas particleCount={40} orbCount={5} colorPalette="sanctuary" />

      {/* Additional Ambient Light Nodes for premium depth */}
      <AmbientLightNodes count={3} colors={["var(--primary-brand)", "#A8D5BA", "#E8D5C4"]} />

      <T3OrthoNav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Asymmetric Multi-Layered Floating Image Matrix
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3OrthoHero
        practiceName={clientMasterDataOrtho.globalPracticeName}
        cityServed={location.cityServed}
        phoneGBP={location.phoneGBP}
        bookingUrl={clientMasterDataOrtho.onlineBookingUrl}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          WELCOME VIDEO — Cinematic Practice Tour
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-primary/30" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-muted font-medium">
                Welcome
              </p>
              <div className="w-8 h-px bg-brand-primary/30" />
            </div>

            <h2 className="font-sanctuary text-[clamp(1.8rem,4vw,3rem)] font-extralight text-center mb-6 tracking-[0.02em]">
              Engineering Confident Smiles
            </h2>

            <p className="text-center text-neutral-muted font-light max-w-xl mx-auto tracking-wide leading-relaxed">
              Take a moment to meet our team. Discover the precision and artistry behind every alignment journey.
            </p>
          </div>

          {/* Premium Video Player */}
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-white/50">
            <PremiumVideoPlayerOrtho
              poster="/images/team/staff-photo.jpg"
              title="Meet Our Orthodontic Team"
              subtitle="A glimpse into precision smile engineering"
              autoPlay={false}
              muted={true}
              loop={true}
              aspectRatio="video"
            />
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-neutral-muted mt-10">
            Experience structural alignment excellence
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES — Interactive Bento Grid with Micro-Interactions
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3OrthoBentoServices />

      {/* ═══════════════════════════════════════════════════════════════════════
          PHILOSOPHY — Three Pillars with Architectural Numeric Backgrounds
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-brand-primary/30" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-muted font-medium font-sanctuary">
                Our Philosophy
              </p>
              <div className="w-6 h-px bg-brand-primary/30" />
            </div>
            <h2 className="font-sanctuary text-[clamp(1.6rem,4vw,2.8rem)] font-extralight tracking-[0.03em]">
              Precision, Confidence, Transformation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              { title: "Precision", num: "01", description: "Your first visit includes a comprehensive 3D digital scan and airway assessment. We map every dimension of your smile and facial structure before presenting treatment options. No guesswork—only data-driven planning." },
              { title: "Confidence", num: "02", description: "See your finished smile before treatment begins with our SmileView simulation technology. We explain every phase, every appliance, every timeline. You'll never wonder what happens next." },
              { title: "Transformation", num: "03", description: "From Phase 1 early intervention to surgical orthodontics, we guide smiles of all ages and complexities. Every case receives board-certified expertise and obsessive attention to facial harmony." },
            ].map((pillar, index) => (
              <div key={index} className="group relative text-center">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[120px] lg:text-[140px] font-extralight text-slate-100 select-none pointer-events-none font-sanctuary leading-none">
                  {pillar.num}
                </span>

                <div className="relative z-10 pt-16">
                  <h3 className="font-sanctuary text-2xl font-extralight tracking-[0.08em] mb-6 group-hover:text-brand-primary transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  <p className="font-sanctuary text-sm text-neutral-muted font-light leading-relaxed tracking-wide max-w-xs mx-auto">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BEFORE/AFTER — Minimal Gallery
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Transformations
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            The Art of Facial Harmony
          </h2>

          <div className="grid grid-cols-2 gap-px">
            <div className="relative aspect-[4/3] overflow-hidden group border border-brand-primary/10">
              <p className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-white/80">
                Before
              </p>
              <Image
                src="/images/cases/smile-before-ortho.png"
                alt="Before orthodontic treatment"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden group border border-brand-primary/10">
              <p className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-brand-primary">
                After
              </p>
              <Image
                src="/images/cases/smile-after-ortho.png"
                alt="After orthodontic treatment"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-neutral-muted mt-10">
            Structural alignment through advanced biomechanics
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES LIST — Full Width Minimal
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            What We Offer
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            Our Treatment Spectrum
          </h2>

          <div className="space-y-0">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="group flex items-center justify-between py-6 border-b border-neutral-border/30 hover:border-brand-primary/30 transition-colors duration-500 cursor-pointer"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-light text-neutral-muted/50 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-light tracking-[0.02em] group-hover:text-brand-primary transition-colors duration-500">
                    {category}
                  </h3>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-muted/30 group-hover:text-brand-primary group-hover:translate-x-2 transition-all duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DOCTOR PROFILE — Asymmetric 12-Column Editorial Grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-brand-primary/30" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-muted font-medium font-sanctuary">
                Your Orthodontist
              </p>
              <div className="w-6 h-px bg-brand-primary/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-black/[0.03] shadow-sm">
                <Image
                  src="/images/team/doctor-portrait.png"
                  alt={`${primaryDoctor.name} at ${clientMasterDataOrtho.globalPracticeName}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-50/5 via-transparent to-transparent" />
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-2 items-center justify-center h-full">
              <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent" />
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-sanctuary text-3xl md:text-4xl font-extralight tracking-[0.02em] mb-2">
                {primaryDoctor.name}
              </h2>

              <p className="text-brand-primary tracking-[0.12em] text-[11px] uppercase font-medium mb-8">
                {primaryDoctor.role}
              </p>

              <blockquote className="border-l-2 border-brand-primary/40 pl-6 mb-8">
                <p className="font-sanctuary text-xl font-extralight text-brand-mainText/80 italic leading-relaxed tracking-wide">
                  "The best orthodontics is invisible—not just the aligners, but the biomechanics. My job is to engineer smiles so naturally balanced, people forget they were ever treated."
                </p>
              </blockquote>

              <p className="font-sanctuary text-neutral-muted font-light leading-loose tracking-wide mb-6 text-base">
                Dr. {primaryDoctor.name.split(' ').slice(-1)[0]} completed advanced orthodontic residency at a top-tier program before dedicating a decade to perfecting digital treatment planning and airway-focused protocols.
              </p>
              <p className="font-sanctuary text-neutral-muted font-light leading-loose tracking-wide mb-10 text-base">
                Today, the practice integrates cutting-edge 3D imaging, accelerated biomechanics, and myofunctional therapy—creating smiles that don't just look beautiful, but breathe, function, and age gracefully.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary text-xs tracking-wide rounded-sm">
                  Board-Certified Orthodontist
                </span>
                <span className="px-4 py-2 bg-slate-100 text-neutral-muted text-xs tracking-wide rounded-sm">
                  Invisalign® Diamond Provider
                </span>
                <span className="px-4 py-2 bg-slate-100 text-neutral-muted text-xs tracking-wide rounded-sm">
                  Airway-Focused Specialist
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS — Interactive Horizontal Carousel
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3OrthoReviewCarousel reviews={sampleReviewsOrtho} />

      {/* ═══════════════════════════════════════════════════════════════════════
          LOCATION & HOURS — Elite Boutique Layout with Live Status
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Visit Us
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            Your Transformation Awaits
          </h2>

          <T3OrthoContactHours
            addressGBP={location.addressGBP}
            cityServed={location.cityServed}
            stateServed={location.stateServed}
            phoneGBP={location.phoneGBP}
            googleMapsEmbedUrl={location.googleMapsEmbedUrl}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MEMBERSHIP — Spatial Pricing
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Investment
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-6 tracking-[0.05em]">
            Transparent Treatment Plans
          </h2>

          <p className="text-center text-neutral-muted font-light max-w-xl mx-auto mb-16 tracking-wide leading-relaxed">
            Clear pricing for clear results. Every treatment includes comprehensive records, lifetime retention, and white-glove service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Clear Aligners",
                price: "$4,200",
                features: ["Full Invisalign® treatment", "3D smile simulation", "Unlimited refinements", "Lifetime retainers included"],
              },
              {
                name: "Self-Ligating Braces",
                price: "$3,800",
                features: ["Damon® or Iconix® systems", "Accelerated treatment option", "Ceramic upgrade available", "Quarterly adjustments"],
                featured: true,
              },
              {
                name: "Phase 1 (Ages 7-10)",
                price: "$2,400",
                features: ["Early interceptive care", "Airway assessment", "Growth guidance appliances", "Future treatment credit"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`text-center ${plan.featured ? "lg:-mt-6 lg:mb-6" : ""}`}
              >
                {plan.featured && (
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-primary mb-6">
                    Most Popular
                  </p>
                )}

                <h3 className="text-lg font-light tracking-[0.15em] mb-6">{plan.name}</h3>

                <p className="text-4xl font-extralight text-brand-primary mb-2">{plan.price}</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-muted mb-8">starting</p>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <p key={i} className="text-sm text-neutral-muted font-light tracking-wide">
                      {feature}
                    </p>
                  ))}
                </div>

                <a
                  href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className={`inline-block px-8 py-3 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 ${
                    plan.featured
                      ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                      : "border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white"
                  }`}
                >
                  Schedule Consult
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FREE CONSULTATION CTA — Spatial Banner
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-exterior.jpg"
            alt="Our modern orthodontic practice"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-8">
            Complimentary
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light text-white mb-8 tracking-[0.05em]">
            Begin Your Smile Journey
          </h2>

          <p className="text-white/80 font-light leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            We offer complimentary consultations for new patients. A no-pressure conversation to understand your goals and explore your treatment options.
          </p>

          <a
            href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-4 px-10 py-4 border border-white/30 text-white text-sm uppercase tracking-[0.25em] font-light hover:bg-white hover:text-brand-mainText transition-all duration-500"
          >
            <span>Schedule</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US — Floating Typography
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Our Difference
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            Engineering Excellence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "3D Digital Planning",
                description: "iTero® scanning eliminates messy impressions. See your finished smile on-screen before treatment begins. Every movement is calculated to the micron for predictable, beautiful results.",
              },
              {
                title: "Airway-First Philosophy",
                description: "We don't just align teeth—we optimize airways. Every case includes a functional assessment. Proper jaw development supports lifelong breathing health, better sleep, and facial harmony.",
              },
              {
                title: "Accelerated Protocols",
                description: "Propel® and OrthoPulse® reduce treatment time by up to 40% without compromising outcomes. Fewer months in treatment, same exceptional results. Time is valuable—we respect that.",
              },
              {
                title: "Lifetime Retention",
                description: "Your investment is protected forever. We include retainers for life—not just the first set. If your smile shifts, we'll realign it at no additional cost. That's our guarantee.",
              },
            ].map((item, index) => (
              <div key={index} className="group py-6 border-b border-neutral-border/30 hover:border-brand-primary/30 transition-colors duration-500">
                <h3 className="text-lg font-light tracking-[0.05em] mb-3 group-hover:text-brand-primary transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-muted font-light leading-relaxed tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA — Spatial Minimal
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight mb-8 tracking-[0.05em]">
            Where Science Meets Artistry
          </h2>

          <p className="text-neutral-muted font-light leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            Step into a practice where every detail is engineered for your confidence, comfort, and lifelong facial harmony.
          </p>

          <a
            href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-4 text-brand-primary text-sm uppercase tracking-[0.25em] font-light hover:gap-6 transition-all duration-500"
          >
            <span>Begin Your Journey</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <T3OrthoFooter />
    </div>
  );
}
