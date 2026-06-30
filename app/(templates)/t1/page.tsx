import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T1Nav from "./components/T1Nav";
import T1Footer from "./components/T1Footer";
import T1SmoothScrollWrapper from "./components/T1SmoothScrollWrapper";
import T1PremiumHero from "./components/T1PremiumHero";
import T1EditorialServices from "./components/T1EditorialServices";
import T1MouseRevealBeforeAfter from "./components/T1MouseRevealBeforeAfter";
import {
  HeadlineReveal,
  SubheadReveal,
  TextReveal,
  StickyHorizontalCredentials,
  MagneticElement,
  ParallaxFrame,
  EditorialDivider,
  AnimatedCounter,
  AquaSonicCursor,
} from "@/components/premium";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Trusted ${location.primaryCategoryGBP.toLowerCase()} serving ${location.cityServed} and surrounding areas. Accepting new patients for cosmetic, restorative, and emergency dental care.`,
};

export default function Template1Page() {
  const { doctors, trustSignals } = clientMasterData;
  const primaryDoctor = doctors[0];

  // Premium services data for editorial layout
  const premiumServices = [
    {
      title: "Invisalign",
      description: "Straighten your smile in 6-18 months without anyone knowing. Our Diamond Provider status means faster results with fewer office visits.",
      image: "/images/services/invisalign.jpg",
    },
    {
      title: "Dental Implants",
      description: "Eat, speak, and smile with complete confidence again. Our implants have a 98% success rate and last a lifetime with proper care.",
      image: "/images/services/implant.jpg",
    },
    {
      title: "Full Mouth Restoration",
      description: "Transform decades of dental problems into a healthy, beautiful smile. Most cases completed in just 4-6 visits over 3 months.",
      image: "/images/services/full-mouth-smile.jpg",
    },
    {
      title: "Porcelain Veneers",
      description: "Get the smile you've always wanted in just two appointments. Custom-matched to your natural tooth color for results that look real, not fake.",
      image: "/images/services/full-mouth-shade.jpg",
    },
  ];

  return (
    <T1SmoothScrollWrapper>
      <div className="font-serif antialiased bg-brand-canvas overflow-x-hidden">
        <AquaSonicCursor />
        <T1Nav />

        {/* Hero Section - Premium with Split-Text & Scale Animation */}
        <T1PremiumHero
          cityServed={location.cityServed}
          phoneNumber={location.phoneGBP}
          onlineBookingUrl={clientMasterData.onlineBookingUrl}
        />

        {/* LEGACY HERO - REMOVE THIS SECTION */}
        <section className="hidden min-h-[100svh] lg:min-h-[90vh] relative overflow-hidden pt-36 md:pt-44 lg:pt-48">
        {/* Looping Ambient Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/team/staff-photo.jpg"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          {/* Dark-tinted overlay mask for text contrast */}
          <div className="absolute inset-0 bg-slate-950/50 lg:bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        </div>

        {/* Editorial Overlapping Content */}
        <div className="relative z-10 min-h-[100svh] lg:min-h-[90vh] flex items-end lg:items-center pb-8 lg:pb-0">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20">
            <div className="max-w-2xl">
              {/* H1 - Fluid Typography with clamp() */}
              <HeadlineReveal className="text-[clamp(2rem,7vw,6rem)] font-bold text-white leading-[0.95] tracking-tight mb-4 -ml-0.5 lg:-ml-1">
                <span className="block">
                  {location.cityServed}&apos;s{" "}
                  <span className="font-serif italic font-light">Highest-Rated</span>
                </span>
                <span className="block text-brand-accent italic font-light text-[0.55em] lg:text-[0.6em] ml-1 lg:ml-2">
                  Cosmetic Dentist
                </span>
              </HeadlineReveal>

              {/* Intro Copy - Offset + Subtle Reveal */}
              <SubheadReveal className="text-base lg:text-xl text-white/80 leading-relaxed mb-8 lg:mb-10 max-w-lg ml-2 lg:ml-4 border-l-2 border-brand-accent pl-4 lg:pl-6" delay={0.4}>
                Nervous about dental work? You&apos;re not alone. Our sedation options and gentle approach
                have helped thousands of anxious patients finally get the smile they deserve.
              </SubheadReveal>

              {/* CTA Buttons - Mobile: Full-width stack, Desktop: Side-by-side */}
              <div id="hero-ctas" className="flex flex-col gap-3 lg:gap-4 ml-2 lg:ml-4">
                <MagneticElement strength={0.2}>
                  <a
                    href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="group inline-flex items-center justify-center gap-3 w-full lg:w-auto px-6 lg:px-8 py-4 lg:py-5 bg-white text-brand-mainText font-bold text-base lg:text-lg shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] min-h-[52px]"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {location.phoneGBP}
                  </a>
                </MagneticElement>
                {clientMasterData.onlineBookingUrl !== "none" && (
                  <MagneticElement strength={0.2}>
                    <a
                      href={clientMasterData.onlineBookingUrl}
                      className="inline-flex items-center justify-center w-full lg:w-auto px-6 lg:px-8 py-4 lg:py-5 text-base lg:text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-brand-mainText transition-all duration-500 active:scale-[0.98] min-h-[52px]"
                    >
                      Book Online
                    </a>
                  </MagneticElement>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Authority Metrics - Mobile: Horizontal scroll, Desktop: Flow layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-8 lg:pb-16">
          <div
            id="hero-metrics"
            className="flex overflow-x-auto lg:overflow-visible gap-6 lg:gap-16 pb-2 lg:pb-0 lg:justify-end scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {[
              { value: 15, suffix: "+", label: "Years Experience" },
              { value: 5.0, suffix: "", label: "Google (312 reviews)", isRating: true },
              { value: 5000, suffix: "+", label: "Smiles Transformed" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center flex-shrink-0 min-w-[140px]"
                style={{ scrollSnapAlign: "center" }}
              >
                {/* Oversized elegant serif with animated counter */}
                <p className="text-[clamp(2rem,8vw,5rem)] lg:text-7xl font-serif font-light text-white tracking-tight leading-none whitespace-nowrap">
                  {stat.isRating ? (
                    stat.value
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                  )}
                </p>
                {/* Tracking-wide lowercase sans-serif description tokens */}
                <p className="text-[10px] lg:text-xs font-sans uppercase tracking-[0.25em] lg:tracking-[0.35em] text-white/50 mt-2 whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Video - Editorial Dark */}
      <section className="py-16 lg:py-32 px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Column - Offset */}
            <div className="lg:col-span-4 lg:-mr-12 relative z-10">
              <p className="text-brand-accent uppercase tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-sm mb-3 lg:mb-4 font-medium">
                The Experience
              </p>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-[0.95] mb-4 lg:mb-6">
                Welcome to
                <span className="block text-brand-accent italic font-light">Our Practice</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                Get to know our team and see what makes our practice special.
              </p>
            </div>
            {/* Video - Overlapping */}
            <div className="lg:col-span-8 relative">
              <div className="aspect-video rounded-none overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  webkit-playsinline="true"
                  poster="/images/team/staff-photo.jpg"
                >
                  {/* Video source disabled for demo */}
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Decorative frame - hidden on mobile */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-accent/30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services - Editorial Parallax Scroll */}
      <T1EditorialServices services={premiumServices} />

      {/* Meet the Dentist - Asymmetric Overlapping Collage Layout */}
      <section className="py-16 lg:py-32 px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch">
            {/* Portrait - Refined Layout Frame Container */}
            <div className="relative lg:col-span-5 aspect-[4/5] lg:aspect-auto lg:min-h-[800px]">
              {/* Decorative frame accent - hidden on mobile */}
              <div className="hidden lg:block absolute top-6 left-6 right-6 bottom-6 border border-brand-accent/20 pointer-events-none z-10" />
              <div className="absolute inset-0 group">
                <Image
                  src="/images/team/doctor-portrait.jpeg"
                  alt={primaryDoctor.name}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                {/* Subtle gradient fade to content area - softer blend */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent lg:hidden" />
              </div>
            </div>

            {/* Bio Content - Overlapping with negative margin into portrait */}
            <div className="relative lg:col-span-7 lg:-ml-16 flex items-center z-10">
              <div className="bg-slate-900/95 backdrop-blur-sm p-6 lg:p-10 xl:p-14 w-full lg:mr-8">
                <p className="text-brand-accent uppercase tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-sm mb-3 lg:mb-4 font-medium">
                  Meet Your Dentist
                </p>
                {/* Name with dramatic overlap */}
                <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-[0.95] mb-2">
                  {primaryDoctor.name}
                </h2>
                <p className="text-brand-accent text-base lg:text-xl mb-6 lg:mb-8 italic">{primaryDoctor.role}</p>

                {/* Pull Quote */}
                <blockquote className="border-l-4 border-brand-accent pl-4 lg:pl-6 mb-6 lg:mb-8">
                  <p className="text-lg lg:text-2xl xl:text-3xl font-serif italic text-white/90 leading-relaxed">
                    &ldquo;I became a dentist because I saw how a confident smile changed my father&apos;s life after years of avoiding photos.&rdquo;
                  </p>
                </blockquote>

                {/* Narrative Bio */}
                <p className="text-gray-300 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-lg">
                  Dr. Roberts grew up watching his father hide his smile in every family photo. That experience drove him to pursue cosmetic dentistry at the University of Utah, where he graduated top of his class.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6 lg:mb-10 text-sm lg:text-lg">
                  Today, he&apos;s transformed over 5,000 smiles across the Wasatch Front and earned the Invisalign Diamond Provider designation—given to fewer than 1% of providers nationwide. When he&apos;s not in the office, you&apos;ll find him skiing at Snowbird with his two kids.
                </p>

                {/* Credentials as badges */}
                <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-10">
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-brand-accent/20 text-brand-accent text-xs lg:text-sm font-medium rounded-sm">
                    Invisalign Diamond Provider
                  </span>
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-white/10 text-white/80 text-xs lg:text-sm font-medium rounded-sm">
                    AACD Fellow
                  </span>
                  <span className="px-3 lg:px-4 py-1.5 lg:py-2 bg-white/10 text-white/80 text-xs lg:text-sm font-medium rounded-sm">
                    University of Utah DDS
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex gap-6 lg:gap-12 pt-6 lg:pt-8 border-t border-white/10">
                  {[
                    { value: "15+", label: "Years" },
                    { value: "5,000+", label: "Smiles" },
                    { value: "98%", label: "Would Recommend" },
                  ].map((stat, index) => (
                    <div key={index}>
                      <p className="text-2xl lg:text-4xl font-serif font-light text-white tracking-tight">{stat.value}</p>
                      <p className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-[0.15em] lg:tracking-[0.2em] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After - Premium Mouse-Reveal Interaction */}
      <section className="py-16 lg:py-32 px-6 lg:px-8 bg-brand-canvas">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 lg:mb-16">
            <p className="text-brand-primary uppercase tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-sm mb-3 lg:mb-4 font-medium">
              Transformations
            </p>
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-brand-mainText leading-[0.95]">
              Real Results,
              <span className="block text-brand-primary italic font-light">Real Smiles</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <T1MouseRevealBeforeAfter
              beforeUrl="/images/cases/smile-before.png"
              afterUrl="/images/cases/smile-after.png"
              altTag="Smile transformation with porcelain veneers"
              aspectRatio="4/3"
            />
          </div>

          <p className="text-center text-neutral-muted mt-6 lg:mt-10 text-sm lg:text-lg italic">
            8 Porcelain Veneers • Patient age 34 • Completed in 2 visits over 3 weeks
          </p>
          <p className="text-center text-xs lg:text-sm text-neutral-muted/70 mt-2">
            Treatment by Dr. Michael Roberts, DDS • Results may vary
          </p>
        </div>
      </section>

      {/* Patient Testimonials - Large-Format Typographic Review Canvas */}
      <section className="py-16 lg:py-32 xl:py-40 px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:32px_32px]" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Section Label */}
          <div className="text-center mb-20">
            <p className="text-brand-accent uppercase tracking-[0.4em] text-sm mb-4 font-medium">
              Patient Stories
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[0.95]">
              What They
              <span className="block text-brand-accent italic font-light">Say</span>
            </h2>
          </div>

          {/* Featured Testimonial - Large Typographic Canvas */}
          <div className="relative">
            {sampleReviews.slice(0, 1).map((review, index) => (
              <div key={index} className="text-center">
                {/* Oversized elegant serif italic quote - directly on canvas */}
                <blockquote className="relative">
                  <p className="text-[clamp(1.5rem,5vw,3rem)] lg:text-5xl font-serif italic text-white/95 leading-[1.3] tracking-tight max-w-4xl mx-auto">
                    "{review.reviewText}"
                  </p>
                </blockquote>

                {/* Fine tracking-wide patient identifier */}
                <div className="mt-12 flex flex-col items-center gap-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-medium">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                    Verified Patient
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Reviews - Minimal typographic treatment */}
          <div className="mt-24 pt-16 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {sampleReviews.slice(1, 3).map((review, index) => (
                <div key={index} className="text-center">
                  <p className="text-[clamp(1.125rem,3vw,1.5rem)] lg:text-2xl font-serif italic text-white/80 leading-relaxed mb-8">
                    "{review.reviewText}"
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/30">
                      Verified Patient
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Services - Editorial List */}
      <section className="py-32 px-8 bg-brand-canvas">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Full-Service Care
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-mainText leading-[0.95]">
              Comprehensive
              <span className="block text-brand-primary italic font-light">Dental Services</span>
            </h2>
          </div>

          <div className="space-y-0">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <article
                key={index}
                className="group border-b border-neutral-border py-10 flex items-center justify-between hover:pl-6 transition-all duration-500"
              >
                <div className="flex items-center gap-8">
                  <span className="text-5xl font-light text-brand-primary/30 group-hover:text-brand-primary transition-colors duration-500">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-mainText group-hover:text-brand-primary transition-colors duration-300">
                      {category}
                    </h3>
                    <p className="text-neutral-muted mt-1">
                      Expert {category.toLowerCase()} care for patients throughout {location.cityServed}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-8 h-8 text-brand-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Office - Full Bleed Editorial */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-exterior.jpg"
            alt={`${clientMasterData.globalPracticeName} office exterior in ${location.cityServed}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-mainText/95 via-brand-mainText/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 lg:px-16 py-20">
          <div className="max-w-2xl">
            <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Our Location
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[0.95] mb-8">
              Visit Our
              <span className="block text-brand-accent italic font-light">Office</span>
            </h2>
            <div className="flex items-start gap-4 text-white mb-8">
              <svg className="w-8 h-8 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-2xl font-bold">{location.addressGBP}</p>
                <p className="text-white/70 text-lg">{location.cityServed}, {location.stateServed}</p>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${location.addressGBP}, ${location.cityServed}, ${location.stateServed}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 bg-white text-brand-mainText font-bold text-lg shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Hours + Map - Editorial Split */}
      <section className="py-32 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hours - Staggered Layout */}
            <div>
              <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
                Office Hours
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold text-brand-mainText leading-[0.95] mb-12">
                Come
                <span className="block text-brand-primary italic font-light">Visit Us</span>
              </h2>
              <div className="space-y-0">
                {[
                  { day: "Monday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM - 12:00 PM" },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-5 border-b border-neutral-border group hover:bg-brand-primary/5 hover:px-4 transition-all duration-300"
                  >
                    <span className="font-bold text-brand-mainText">{schedule.day}</span>
                    <span className={schedule.hours === "Closed" ? "text-neutral-muted" : "text-brand-primary font-medium"}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 mt-10 px-8 py-5 bg-brand-primary text-white font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
              >
                Make An Appointment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Map */}
            <div className="relative aspect-square lg:aspect-[4/5] w-full overflow-hidden shadow-2xl border border-neutral-border/30">
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
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultations Banner - Editorial Asymmetric */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterData.globalPracticeName} office interior`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full px-8 lg:px-16 py-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="bg-white p-12 lg:p-16 shadow-2xl max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-mainText leading-[0.95] mb-4">
                Free consultations—
                <span className="block text-brand-primary italic font-light">always.</span>
              </h2>
              <p className="text-xl text-neutral-muted mb-2">
                On Implants, Dentures, and Invisalign.
              </p>
              <p className="text-neutral-muted">
                Call us with any questions or conveniently book your appointment online today!
              </p>
            </div>
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="px-12 py-6 bg-brand-primary text-white font-bold text-xl shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Editorial Border Layout */}
      <section className="py-32 px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Our Commitment
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[0.95]">
              <span className="font-light italic">Why</span> Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                title: "Experienced Team",
                description: `Our ${clientMasterData.globalPracticeName} team brings decades of combined experience to your care.`,
                cta: "Meet the Team",
              },
              {
                title: "Patient-First Care",
                description: "We prioritize your comfort and well-being with personalized treatment plans designed around your needs.",
                cta: "Meet the Doctor",
              },
              {
                title: "Comfortable Office",
                description: "Our modern facility offers amenities including blankets, TVs, headsets, and sedation options for your comfort.",
                cta: "Office Tour",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border-l-2 border-brand-accent/30 pl-8 py-8 group hover:border-brand-accent hover:bg-white/5 transition-all duration-500"
              >
                <span className="text-6xl font-light text-brand-accent/20 mb-4 block">0{index + 1}</span>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">{item.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium hover:bg-white hover:text-brand-mainText transition-all duration-300 group/btn"
                >
                  {item.cta}
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Practice Difference CTA - Editorial Full Bleed */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`${clientMasterData.globalPracticeName} team`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 w-full px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-6 font-medium">
              Experience Excellence
            </p>
            <h2 className="text-5xl lg:text-7xl font-bold text-white uppercase tracking-wider mb-8">
              The {clientMasterData.globalPracticeName}
              <span className="block text-brand-accent italic font-light normal-case tracking-normal">Difference</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto italic">
              At {clientMasterData.globalPracticeName}, we provide a comprehensive range of services to
              ensure the health and beauty of your smile.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand-mainText font-bold text-lg shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
              </a>
              {clientMasterData.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterData.onlineBookingUrl}
                  className="px-10 py-5 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-brand-mainText transition-all duration-500"
                >
                  Request An Appointment
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <T1Footer />
      </div>
    </T1SmoothScrollWrapper>
  );
}
