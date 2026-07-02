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
import T3AtmosphericParallax from "./components/T3AtmosphericParallax";
import {
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

            <h2 className="font-sanctuary text-[clamp(1.8rem,4vw,3rem)] font-extralight text-center mb-6 tracking-[0.02em]">
              The Hand-Raise Rule
            </h2>

            <p className="text-center text-neutral-muted font-light max-w-xl mx-auto tracking-wide leading-relaxed">
              We stop the moment you signal. No explanations needed. Your comfort drives every decision we make.
            </p>
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
            90-minute appointments · Sedation available · Breaks whenever you need
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
            <h2 className="font-sanctuary text-[clamp(1.6rem,4vw,2.8rem)] font-extralight tracking-[0.03em]">
              Listen, Plan, Care
            </h2>
          </div>

          {/* Three Pillars - Process Flow (semantically justified as a sequence) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { title: "Listen", description: "Your first appointment is 90 minutes—twice the industry standard. We ask about your sleep, your stress, your past experiences. Treatment doesn't start until you feel heard." },
              { title: "Plan", description: "We show you every option on screen, explain the tradeoffs, and let you decide. No pressure, no upselling. Your treatment timeline works around your life, not ours. Wellness membership plans available—see Membership below." },
              { title: "Care", description: "Weighted blankets. Noise-canceling headphones. Breaks whenever you need them. We stop the moment you raise a hand. Your comfort isn't optional—it's the foundation." },
            ].map((pillar, index) => (
              <div key={index} className="group relative text-center">
                {/* Subtle connecting line between pillars */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-8 lg:-right-10 w-16 lg:w-20 h-px bg-gradient-to-r from-brand-primary/30 to-transparent" />
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Small step indicator - justified as this IS a process */}
                  <span className="inline-block text-[10px] tracking-[0.3em] text-brand-primary/60 uppercase mb-4 font-medium">
                    Step {index + 1}
                  </span>
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
                <h3 className="text-lg font-light tracking-[0.02em] group-hover:text-brand-primary transition-colors duration-500">
                  {category}
                </h3>
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
          MEMBERSHIP — Asymmetric Editorial Table Layout (breaks centered pattern)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-5xl mx-auto px-8">
          {/* Asymmetric Header - Left Aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-4">
                Membership
              </p>
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight tracking-[0.05em]">
                Wellness Plans
              </h2>
            </div>
            <div className="lg:col-span-7 lg:flex lg:items-end">
              <p className="text-neutral-muted font-light tracking-wide leading-relaxed text-sm lg:text-base lg:border-l lg:border-brand-primary/20 lg:pl-8">
                Simple, transparent care for those who value ongoing wellness. No insurance required. No hidden fees. Cancel anytime.
              </p>
            </div>
          </div>

          {/* Horizontal Table Layout - Editorial Rows */}
          <div className="space-y-0">
            {[
              {
                name: "Individual",
                price: "$335",
                desc: "Personal wellness",
                features: ["2 visits", "X-rays", "15% off"],
              },
              {
                name: "Couple",
                price: "$615",
                desc: "Partner coverage",
                features: ["2 members", "Priority", "20% off"],
                featured: true,
              },
              {
                name: "Family",
                price: "$965",
                desc: "Complete household",
                features: ["Up to 4", "Children", "25% off"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`group grid grid-cols-12 gap-4 py-8 border-b border-brand-primary/10 items-center transition-all duration-500 hover:bg-brand-primary/[0.02] ${
                  plan.featured ? "bg-brand-primary/[0.03]" : ""
                }`}
              >
                {/* Plan Name - 3 cols */}
                <div className="col-span-12 sm:col-span-3 flex items-center gap-3">
                  <h3 className="text-lg font-light tracking-[0.1em]">{plan.name}</h3>
                  {plan.featured && (
                    <span className="text-[8px] uppercase tracking-[0.3em] text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-sm">
                      Popular
                    </span>
                  )}
                </div>

                {/* Description - 2 cols */}
                <div className="col-span-6 sm:col-span-2">
                  <p className="text-xs text-neutral-muted tracking-wide">{plan.desc}</p>
                </div>

                {/* Features - 4 cols */}
                <div className="col-span-6 sm:col-span-4 flex flex-wrap gap-2">
                  {plan.features.map((feature, i) => (
                    <span key={i} className="text-[11px] text-neutral-muted/70 tracking-wide">
                      {feature}{i < plan.features.length - 1 ? " ·" : ""}
                    </span>
                  ))}
                </div>

                {/* Price + CTA - 3 cols */}
                <div className="col-span-12 sm:col-span-3 flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0">
                  <p className="text-2xl font-extralight text-brand-primary">
                    {plan.price}<span className="text-xs text-neutral-muted/60">/yr</span>
                  </p>
                  <a
                    href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="px-5 py-2 text-xs uppercase tracking-[0.2em] font-light border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500"
                  >
                    Select
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FREE CONSULTATION CTA — Bold Color Risk
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-brand-primary">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          {/* Heading - Inverted on accent */}
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extralight text-white mb-6 tracking-tight leading-[1.2]">
            Your First Visit is on Us</h2>

          {/* Description */}
          <p className="text-white/80 font-light leading-relaxed text-base mb-12 max-w-2xl mx-auto">
            Complimentary consultations for new patients. No pressure. No sales pitch.
            Just a thoughtful conversation about your wellness goals.
          </p>

          {/* Single CTA - Inverted */}
          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-brand-primary text-sm uppercase tracking-[0.2em] font-medium hover:bg-white/90 transition-colors duration-300 shadow-lg"
          >
            <span>Schedule Your Visit</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Trust message */}
          <p className="text-white/60 text-sm mt-8 font-light">
            Same-week appointments • Most insurance accepted • Serving {location.cityServed}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US — Floating Typography
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Why Patients Stay
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            We Treat Anxiety, Not Just Teeth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "90-Minute First Visits",
                description: "You'll spend 30 minutes just talking. No drill touches your mouth until we've discussed your history, fears, and goals. Treatment doesn't start until you feel heard.",
              },
              {
                title: "The Hand-Raise Rule",
                description: "One finger = pause. Two fingers = stop. We check in every 3-5 minutes. You control the pace, always. Your comfort trumps our schedule.",
              },
              {
                title: "Weighted Blankets & Netflix",
                description: "Ceiling-mounted screens. Noise-canceling headphones. Aromatherapy diffusers. Weighted blankets for grounding. Choose what helps you relax.",
              },
              {
                title: "Mercury-Free Since Day One",
                description: "No amalgam fillings. No metal crowns. BPA-free composites only. Every material tested for biocompatibility before we use it on you.",
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
