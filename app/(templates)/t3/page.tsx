"use client";

import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T3Nav from "./components/T3Nav";
import T3Footer from "./components/T3Footer";
import T3Hero from "./components/T3Hero";
import T3SplitPaneNavigator from "./components/T3SplitPaneNavigator";
import T3InvisalignMorph from "./components/T3InvisalignMorph";
import T3PremiumCanvas from "./components/T3PremiumCanvas";
import PremiumVideoPlayer from "./components/PremiumVideoPlayer";
import T3ReviewCarousel from "./components/T3ReviewCarousel";
import T3ContactHours from "./components/T3ContactHours";
import T3SmoothScrollWrapper from "./components/T3SmoothScrollWrapper";
import T3BloomingText from "./components/T3BloomingText";
import T3OrganicBlobs from "./components/T3OrganicBlobs";
import T3AtmosphericParallax from "./components/T3AtmosphericParallax";
import T3SensoryCheckIn from "./components/T3SensoryCheckIn";
import {
  AmbientLightNodes,
  MindfulScrollProgress,
} from "@/components/premium";

const location = clientMasterData.locations[0];

export default function Template3Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <T3SmoothScrollWrapper>
      <div className="font-sanctuary bg-brand-canvas text-brand-mainText relative overflow-x-hidden pt-20 lg:pt-24">
        {/* Mindful Scroll Progress Indicator */}
        <MindfulScrollProgress color="var(--primary-brand)" thickness={2} position="left" />

        {/* Premium Canvas Background with Mouse-Reactive Particles */}
        <T3PremiumCanvas particleCount={40} orbCount={5} colorPalette="sanctuary" />

        {/* Organic Morphing Background Blobs */}
        <T3OrganicBlobs count={3} opacity={0.6} />

        {/* Additional Ambient Light Nodes for premium depth */}
        <AmbientLightNodes count={3} colors={["var(--primary-brand)", "#A8D5BA", "#E8D5C4"]} />

        <T3Nav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Asymmetric Multi-Layered Floating Image Matrix
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3Hero
        practiceName={clientMasterData.globalPracticeName}
        cityServed={location.cityServed}
        phoneGBP={location.phoneGBP}
        bookingUrl={clientMasterData.onlineBookingUrl}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          WELCOME VIDEO — Cinematic Testimonial Player
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3AtmosphericParallax className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-primary/30" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-muted font-medium">
                Welcome
              </p>
              <div className="w-8 h-px bg-brand-primary/30" />
            </div>

            <T3BloomingText
              as="h2"
              className="font-sanctuary text-[clamp(1.8rem,4vw,3rem)] font-extralight text-center mb-6 tracking-[0.02em]"
              delay={0.2}
            >
              Our Practice, Our People
            </T3BloomingText>

            <T3BloomingText
              as="p"
              className="text-center text-neutral-muted font-light max-w-xl mx-auto tracking-wide leading-relaxed"
              delay={0.4}
            >
              Take a moment to meet our team. Discover the thoughtful care that defines our approach.
            </T3BloomingText>
          </div>

          {/* Premium Video Player */}
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-white/50">
            <PremiumVideoPlayer
              poster="/images/team/staff-photo.jpg"
              title="Meet Our Team"
              subtitle="A glimpse into mindful wellness"
              autoPlay={false}
              muted={true}
              loop={true}
              aspectRatio="video"
            />
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-neutral-muted mt-10">
            Experience the sanctuary difference
          </p>
        </div>
      </T3AtmosphericParallax>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES — Interactive Split-Pane Navigator with Dynamic Content
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3SplitPaneNavigator />

      {/* ═══════════════════════════════════════════════════════════════════════
          PHILOSOPHY — Three Pillars with Architectural Numeric Backgrounds
          Large low-opacity numerics as clean architectural background layers
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3AtmosphericParallax
        className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]"
        intensity={0.02}
      >
        <div className="max-w-5xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-brand-primary/30" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-muted font-medium font-sanctuary">
                Our Philosophy
              </p>
              <div className="w-6 h-px bg-brand-primary/30" />
            </div>
            <T3BloomingText
              as="h2"
              className="font-sanctuary text-[clamp(1.6rem,4vw,2.8rem)] font-extralight tracking-[0.03em]"
            >
              Listen, Plan, Care
            </T3BloomingText>
          </div>

          {/* Three Pillars with Large Numeric Backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              { title: "Listen", num: "01", description: "Your first appointment is 90 minutes—twice the industry standard. We ask about your sleep, your stress, your past experiences. Treatment doesn't start until you feel heard." },
              { title: "Plan", num: "02", description: "We show you every option on screen, explain the tradeoffs, and let you decide. No pressure, no upselling. Your treatment timeline works around your life, not ours." },
              { title: "Care", num: "03", description: "Weighted blankets. Noise-canceling headphones. Breaks whenever you need them. We stop the moment you raise a hand. Your comfort isn't optional—it's the foundation." },
            ].map((pillar, index) => (
              <div key={index} className="group relative text-center">
                {/* Large Architectural Numeric Background */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[120px] lg:text-[140px] font-extralight text-slate-100 select-none pointer-events-none font-sanctuary leading-none">
                  {pillar.num}
                </span>

                {/* Content */}
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
      </T3AtmosphericParallax>

      {/* ═══════════════════════════════════════════════════════════════════════
          INVISALIGN TRANSFORMATION — Asymmetric Smile Alignment Morphing
          Chaotic scattered cards morph into harmonious Bento grid on scroll
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3InvisalignMorph />

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES LIST — Full Width Minimal
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            What We Offer
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            Our Services
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
          Image: 5 cols | Separator: 2 cols | Biography: 5 cols
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-brand-primary/30" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-muted font-medium font-sanctuary">
                Your Provider
              </p>
              <div className="w-6 h-px bg-brand-primary/30" />
            </div>
          </div>

          {/* Asymmetric 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            {/* Image Column - 5 slots */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-black/[0.03] shadow-sm">
                <Image
                  src="/images/team/doctor-portrait.png"
                  alt={`${primaryDoctor.name} at ${clientMasterData.globalPracticeName}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                {/* Subtle warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-50/5 via-transparent to-transparent" />
              </div>
            </div>

            {/* Vertical Separator Line - 2 slots */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center h-full">
              <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent" />
            </div>

            {/* Biography Column - 5 slots */}
            <div className="lg:col-span-5">
              <h2 className="font-sanctuary text-3xl md:text-4xl font-extralight tracking-[0.02em] mb-2">
                {primaryDoctor.name}
              </h2>

              <p className="text-brand-primary tracking-[0.12em] text-[11px] uppercase font-medium mb-8">
                {primaryDoctor.role}
              </p>

              {/* Pull Quote */}
              <blockquote className="border-l-2 border-brand-primary/40 pl-6 mb-8">
                <p className="font-sanctuary text-xl font-extralight text-brand-mainText/80 italic leading-relaxed tracking-wide">
                  "The best dentistry is the kind you barely notice happening. My job is to make you forget you're at the dentist at all."
                </p>
              </blockquote>

              <p className="font-sanctuary text-neutral-muted font-light leading-loose tracking-wide mb-6 text-base">
                Dr. Roberts spent his first decade in traditional dentistry before realizing something was broken: patients were avoiding care not because of cost, but because of fear.
              </p>
              <p className="font-sanctuary text-neutral-muted font-light leading-loose tracking-wide mb-10 text-base">
                He retrained in sedation dentistry, studied holistic approaches at the Kois Center, and built this practice from the ground up around one question: "What would make a nervous patient actually want to come back?"
              </p>

              {/* Credentials with refined styling */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary text-xs tracking-wide rounded-sm">
                  Certified Sedation Dentist
                </span>
                <span className="px-4 py-2 bg-slate-100 text-neutral-muted text-xs tracking-wide rounded-sm">
                  Kois Center Graduate
                </span>
                <span className="px-4 py-2 bg-slate-100 text-neutral-muted text-xs tracking-wide rounded-sm">
                  Holistic Dental Association
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS — Interactive Horizontal Carousel with Magnetic Arrows
      ═══════════════════════════════════════════════════════════════════════ */}
      <T3ReviewCarousel reviews={sampleReviews} />

      {/* ═══════════════════════════════════════════════════════════════════════
          LOCATION & HOURS — Elite Boutique Layout with Live Status
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Visit Us
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            Your Sanctuary Awaits
          </h2>

          <T3ContactHours
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
            Membership
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-6 tracking-[0.05em]">
            Wellness Plans
          </h2>

          <p className="text-center text-neutral-muted font-light max-w-xl mx-auto mb-16 tracking-wide leading-relaxed">
            Simple, transparent care for those who value ongoing wellness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Individual",
                price: "$335",
                features: ["Two wellness visits", "Complete examinations", "Digital X-rays", "15% off treatments"],
              },
              {
                name: "Couple",
                price: "$615",
                features: ["All Individual benefits", "Coverage for two", "Priority scheduling", "20% off treatments"],
                featured: true,
              },
              {
                name: "Family",
                price: "$965",
                features: ["All Couple benefits", "Up to 4 members", "Children's care included", "25% off treatments"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`text-center ${plan.featured ? "lg:-mt-6 lg:mb-6" : ""}`}
              >
                {plan.featured && (
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-primary mb-6">
                    Recommended
                  </p>
                )}

                <h3 className="text-lg font-light tracking-[0.15em] mb-6">{plan.name}</h3>

                <p className="text-4xl font-extralight text-brand-primary mb-2">{plan.price}</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-muted mb-8">per year</p>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <p key={i} className="text-sm text-neutral-muted font-light tracking-wide">
                      {feature}
                    </p>
                  ))}
                </div>

                <a
                  href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className={`inline-block px-8 py-3 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 ${
                    plan.featured
                      ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                      : "border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white"
                  }`}
                >
                  Begin
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FREE CONSULTATION CTA — Spatial Banner with Sensory Check-In
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-40 overflow-hidden bg-slate-900">
        {/* Background Image with Fixed Position */}
        <div className="absolute inset-0">
          <Image
            src="/images/office-exterior.jpg"
            alt="Our serene practice environment"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          {/* Gradient overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
          {/* Label */}
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-8 font-light">
            Complimentary
          </p>

          {/* Heading - Clean and stable */}
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extralight text-white mb-8 tracking-tight leading-[1.1]">
            Begin Your Wellness Journey
          </h2>

          {/* Description */}
          <p className="text-white/90 font-light leading-relaxed text-xl mb-16 max-w-3xl mx-auto">
            We offer complimentary consultations for new patients. A quiet conversation to understand your needs.
          </p>

          {/* Buttons with consistent spacing */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-4 px-14 py-6 bg-white text-slate-900 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white/90 transition-colors duration-300 shadow-xl"
            >
              <span>Schedule</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Sensory Check-In Interactive Modal */}
            <T3SensoryCheckIn onComplete={(selections) => console.log("Patient comfort preferences:", selections)} />
          </div>

          {/* Trust message with elegant separator */}
          <div className="max-w-2xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
            <p className="text-white/70 text-base font-light leading-relaxed">
              No pressure. No sales pitch. Just a thoughtful conversation about your dental wellness goals.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US — Floating Typography
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Our Philosophy
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            The Mindful Difference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Extended Appointments",
                description: "Standard cleanings are 60 minutes, not 30. First visits are 90 minutes. We'd rather run behind than rush you out.",
              },
              {
                title: "Comfort Menu",
                description: "Choose your own adventure: weighted blanket, aromatherapy diffuser, noise-canceling AirPods, or Netflix on the ceiling. Yes, the ceiling.",
              },
              {
                title: "Signal System",
                description: "Raise one finger to pause. Raise two to stop completely. We check in every few minutes. You're in control the entire time.",
              },
              {
                title: "Mercury-Free Practice",
                description: "No amalgam fillings. No metal crowns. Every material we use has been vetted for biocompatibility. Your body will thank you.",
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
            Where Wellness Meets Artistry
          </h2>

          <p className="text-neutral-muted font-light leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            Step into a practice where every detail has been thoughtfully considered for your comfort and care.
          </p>

          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-4 text-brand-primary text-sm uppercase tracking-[0.25em] font-light hover:gap-6 transition-all duration-500"
          >
            <span>Begin Your Journey</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

        <T3Footer />
      </div>
    </T3SmoothScrollWrapper>
  );
}
