import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T3Nav from "./components/T3Nav";
import T3Footer from "./components/T3Footer";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Holistic, patient-centered dental wellness in ${location.cityServed}. Experience personalized care in a serene, spa-like environment focused on your complete oral health.`,
};

export default function Template3Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans bg-brand-canvas text-brand-mainText">
      <T3Nav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — SPATIAL GALLERY SANCTUARY
          Narrow editorial column, deep whitespace, ultra-lightweight typography
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Deep Whitespace Container - Narrow Editorial Column */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-32 text-center">
          {/* Subtle Top Label */}
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-16">
            {clientMasterData.globalPracticeName}
          </p>

          {/* Main Headline - Ultra Lightweight with Dramatic Spacing */}
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-extralight leading-[1.1] tracking-[0.02em] mb-8">
            <span className="block">Oral Wellness,</span>
            <span className="block text-brand-primary tracking-[0.08em]">Thoughtfully Designed</span>
          </h1>

          {/* Thin Decorative Line */}
          <div className="w-16 h-px bg-brand-primary/30 mx-auto mb-10" />

          {/* Philosophy Statement - Minimal */}
          <p className="text-lg font-light text-neutral-muted leading-relaxed max-w-2xl mx-auto mb-16 tracking-wide">
            We believe exceptional dental care extends beyond treatment. Our holistic approach
            considers your complete wellbeing, creating a personalized path to lasting oral health
            in {location.cityServed}.
          </p>

          {/* Minimal CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-4 px-10 py-4 bg-brand-primary text-white text-sm uppercase tracking-[0.25em] font-light hover:bg-brand-primary/90 transition-colors duration-500"
            >
              <span>Schedule</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="text-sm tracking-[0.2em] text-neutral-muted hover:text-brand-primary transition-colors duration-500"
            >
              {location.phoneGBP}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-brand-primary/30 to-brand-primary/10" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WELCOME VIDEO — SPATIAL GALLERY STYLE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-8">
          {/* Section Label */}
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Welcome
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-6 tracking-[0.05em]">
            Our Practice, Our People
          </h2>

          <p className="text-center text-neutral-muted font-light max-w-xl mx-auto mb-16 tracking-wide leading-relaxed">
            Take a moment to meet our team. Discover the thoughtful care that defines our approach.
          </p>

          {/* Video - Clean Minimal Frame */}
          <div className="relative aspect-video overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-neutral-muted mt-8">
            A glimpse into mindful wellness
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES — FLOATING TYPOGRAPHIC LIST
          Narrow column, numbered list, dramatic whitespace
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden border-t border-neutral-border/30">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Signature Services
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-20 tracking-[0.05em]">
            Thoughtful Care, Exceptional Results
          </h2>

          {/* Services List - Editorial Style */}
          <div className="space-y-12">
            {[
              {
                title: "Invisalign",
                description: "Discreet alignment therapy that works with your lifestyle. Clear, comfortable, and precisely planned.",
              },
              {
                title: "Dental Implants",
                description: "Biocompatible tooth restoration that honors your body's natural processes. Permanent and lasting.",
              },
              {
                title: "Holistic Restorations",
                description: "Mercury-free, metal-free dentistry using only the most biocompatible materials for your health.",
              },
              {
                title: "Cosmetic Enhancements",
                description: "Subtle, natural improvements that enhance rather than transform. Authentic beauty, refined.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group grid grid-cols-12 gap-6 items-baseline py-8 border-b border-neutral-border/30 hover:border-brand-primary/30 transition-colors duration-500"
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-sm font-light text-brand-primary/40 tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="col-span-10 md:col-span-11">
                  <h3 className="text-xl md:text-2xl font-light tracking-[0.02em] mb-3 group-hover:text-brand-primary transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-neutral-muted font-light leading-relaxed tracking-wide max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PHILOSOPHY — THREE PILLARS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { title: "Listen", description: "We begin every relationship by truly understanding your concerns, goals, and history." },
              { title: "Plan", description: "Together, we craft a comprehensive wellness strategy tailored to your unique needs." },
              { title: "Care", description: "Gentle, precise treatment delivered with respect for your time and comfort." },
            ].map((pillar, index) => (
              <div key={index} className="group">
                <div className="w-12 h-12 rounded-full border border-brand-primary/30 flex items-center justify-center mx-auto mb-6 group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all duration-500">
                  <span className="text-sm font-light text-brand-primary">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-light tracking-[0.1em] mb-4 group-hover:text-brand-primary transition-colors duration-500">
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-muted font-light leading-relaxed tracking-wide">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BEFORE/AFTER — MINIMAL GALLERY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Transformations
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            The Art of Subtle Enhancement
          </h2>

          {/* Side by Side - Minimal */}
          <div className="grid grid-cols-2 gap-px">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <p className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-white/80">
                Before
              </p>
              <Image
                src="/images/cases/smile-before.png"
                alt="Before holistic dental treatment"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden group">
              <p className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-brand-primary">
                After
              </p>
              <Image
                src="/images/cases/smile-after.png"
                alt="After holistic dental treatment"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-neutral-muted mt-10">
            Natural enhancement through mindful treatment
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVICES LIST — FULL WIDTH MINIMAL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-brand-primary/[0.02]">
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
          DOCTOR PROFILE — SPATIAL EDITORIAL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={`${primaryDoctor.name} at ${clientMasterData.globalPracticeName}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Bio */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8">
                Your Provider
              </p>

              <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.02em] mb-2">
                {primaryDoctor.name}
              </h2>

              <p className="text-brand-primary tracking-[0.1em] text-sm mb-10">
                {primaryDoctor.role}
              </p>

              <p className="text-neutral-muted font-light leading-loose tracking-wide mb-12">
                {primaryDoctor.biography}
              </p>

              {/* Credentials - Minimal List */}
              <div className="space-y-3">
                {primaryDoctor.credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-4 text-sm text-neutral-muted font-light tracking-wide">
                    <div className="w-1 h-1 rounded-full bg-brand-primary/40" />
                    {credential}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS — FLOATING TYPOGRAPHIC REVIEWS
          Pure typographic statements floating on canvas, no cards/borders/avatars
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Kind Words
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-20 tracking-[0.05em]">
            Voices of Wellness
          </h2>

          {/* Floating Typographic Reviews - No Cards, No Borders */}
          <div className="space-y-24">
            {sampleReviews.slice(0, 3).map((review, index) => (
              <div
                key={index}
                className={`relative group ${
                  index % 2 === 0 ? "text-left" : "text-right"
                }`}
              >
                {/* Large Quote */}
                <p className={`text-xl md:text-2xl font-extralight leading-relaxed tracking-wide text-brand-mainText/80 mb-6 ${
                  index % 2 === 0 ? "max-w-2xl" : "max-w-2xl ml-auto"
                }`}>
                  &ldquo;{review.reviewText}&rdquo;
                </p>

                {/* Attribution - Minimal */}
                <div className={`flex items-center gap-4 ${index % 2 === 0 ? "" : "justify-end"}`}>
                  <div className="w-8 h-px bg-brand-primary/30" />
                  <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-muted">
                    {review.reviewerName}
                  </span>
                </div>

                {/* Floating Stars - Subtle */}
                <div className={`flex items-center gap-1 mt-3 ${index % 2 === 0 ? "" : "justify-end"}`}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-brand-primary/40" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="text-center mt-24">
            <p className="text-5xl font-extralight text-brand-primary/60 mb-3">5.0</p>
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted">
              200+ Verified Reviews
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LOCATION & HOURS — SPATIAL GALLERY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-8 text-center">
            Visit Us
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-center mb-16 tracking-[0.05em]">
            Your Sanctuary Awaits
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Hours */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-brand-primary mb-8">
                Hours of Wellness
              </p>

              <div className="space-y-3">
                {[
                  { day: "Monday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM — 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM — 3:00 PM" },
                  { day: "Saturday", hours: "By Appointment" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-neutral-border/30 hover:border-brand-primary/20 transition-colors duration-500"
                  >
                    <span className="text-neutral-muted font-light tracking-wide">{item.day}</span>
                    <span className="text-brand-mainText font-light tracking-wide">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-neutral-border/30">
                <p className="text-sm text-neutral-muted font-light tracking-wide mb-2">
                  {location.addressGBP}
                </p>
                <p className="text-sm text-neutral-muted font-light tracking-wide mb-6">
                  {location.cityServed}, {location.stateServed}
                </p>
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="text-brand-primary tracking-[0.1em] hover:tracking-[0.15em] transition-all duration-500"
                >
                  {location.phoneGBP}
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-square overflow-hidden">
              {location.googleMapsEmbedUrl ? (
                <iframe
                  src={location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Practice Location"
                />
              ) : (
                <div className="w-full h-full bg-neutral-border/10 flex items-center justify-center text-neutral-muted font-light tracking-widest">
                  Map
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MEMBERSHIP — SPATIAL PRICING
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-brand-primary/[0.02]">
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
          FREE CONSULTATION CTA — SPATIAL BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-exterior.jpg"
            alt="Our serene practice"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-mainText/85" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-8">
            Complimentary
          </p>

          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight text-white mb-8 tracking-[0.05em]">
            Begin Your Wellness Journey
          </h2>

          <p className="text-white/60 font-light leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            We offer complimentary consultations for new patients. A quiet conversation to understand your needs.
          </p>

          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
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
          WHY CHOOSE US — FLOATING TYPOGRAPHY
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-brand-primary/[0.02]">
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
                title: "Holistic Approach",
                description: "We consider your complete wellbeing, not just your teeth. Mind, body, and oral health in harmony.",
              },
              {
                title: "Biocompatible Materials",
                description: "Only the safest, most natural materials. Mercury-free, metal-free options for your health.",
              },
              {
                title: "Unhurried Care",
                description: "We never rush. Each appointment is a sanctuary of calm, focused attention on your needs.",
              },
              {
                title: "Personalized Wellness",
                description: "Your treatment plan is uniquely yours, crafted to honor your individual health journey.",
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
          FINAL CTA — SPATIAL MINIMAL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
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
  );
}
