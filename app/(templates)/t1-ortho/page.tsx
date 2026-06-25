import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho } from "@/data/master-ortho";
import T1OrthoNav from "./components/T1OrthoNav";
import T1OrthoFooter from "./components/T1OrthoFooter";
import BeforeAfterSlider from "@/components/dental/BeforeAfterSlider";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Trusted ${location.primaryCategoryGBP.toLowerCase()} serving ${location.cityServed} and surrounding areas. Accepting new patients for braces, Invisalign, and orthodontic care.`,
};

export default function Template1OrthoPage() {
  const { doctors } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-serif antialiased bg-brand-canvas">
      <T1OrthoNav />

      {/* Hero Section - Editorial Asymmetric Layout */}
      <section className="min-h-[90vh] relative overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/team-ortho.jpeg"
            alt={`Orthodontic team at ${clientMasterDataOrtho.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-mainText/95 via-brand-mainText/70 to-transparent" />
        </div>

        {/* Editorial Overlapping Content */}
        <div className="relative z-10 min-h-[90vh] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 py-20">
            <div className="max-w-2xl">
              {/* Trust Badges - Staggered */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider bg-brand-accent text-brand-mainText shadow-2xl transform -rotate-1">
                  Now Accepting Patients
                </span>
                <span className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider bg-white text-brand-mainText shadow-2xl transform rotate-1 translate-y-2">
                  Free Consultations
                </span>
              </div>

              {/* H1 - Massive Editorial Typography with Overlap */}
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-[0.9] tracking-tight mb-4 -ml-1">
                <span className="block">{location.primaryCategoryGBP}</span>
                <span className="block text-brand-accent italic font-light text-[0.6em] ml-2">
                  in {location.cityServed}
                </span>
              </h1>

              {/* Intro Copy - Offset */}
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-lg ml-4 border-l-2 border-brand-accent pl-6">
                Transform your smile with expert orthodontic care. Board-certified specialists
                creating beautiful, healthy smiles with personalized treatment.
              </p>

              {/* CTA Buttons - Editorial Stack */}
              <div className="flex flex-col sm:flex-row gap-4 ml-4">
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="group inline-flex items-center gap-3 px-8 py-5 bg-white text-brand-mainText font-bold text-lg shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1"
                >
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {location.phoneGBP}
                </a>
                {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
                  <a
                    href={clientMasterDataOrtho.onlineBookingUrl}
                    className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-brand-mainText transition-all duration-500"
                  >
                    Book Online
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats - Asymmetric Position */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-8">
          {[
            { value: "15+", label: "Years" },
            { value: "5.0", label: "Rating" },
            { value: "10K+", label: "Smiles" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md px-6 py-4 border border-white/20 ${
                index === 1 ? "-translate-y-4" : index === 2 ? "translate-y-2" : ""
              }`}
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Video - Editorial Dark */}
      <section className="py-32 px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Column - Offset */}
            <div className="lg:col-span-4 lg:-mr-12 relative z-10">
              <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-4 font-medium">
                The Experience
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[0.95] mb-6">
                Welcome to
                <span className="block text-brand-accent italic font-light">Our Practice</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Get to know our team and see what makes our orthodontic practice special.
              </p>
            </div>
            {/* Video - Overlapping */}
            <div className="lg:col-span-8 relative">
              <div className="aspect-video rounded-none overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/images/team-ortho.jpeg"
                >
                  {/* Video source disabled for demo */}
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-accent/30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services - Staggered Asymmetric Grid */}
      <section className="py-32 px-8 bg-brand-canvas">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Editorial Offset */}
          <div className="max-w-xl mb-20">
            <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Our Expertise
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-mainText leading-[0.95]">
              Premium
              <span className="block text-brand-primary italic font-light">Treatments</span>
            </h2>
          </div>

          {/* Staggered Grid - Asymmetric Vertical Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Invisalign",
                description: "Discreet clear aligners custom-made for your smile journey.",
                image: "/images/services/invisalign.jpg",
                offset: "translate-y-0",
              },
              {
                title: "Traditional Braces",
                description: "Time-tested metal braces for precise, reliable tooth movement.",
                image: "/images/services/braces.jpg",
                offset: "-translate-y-12",
              },
              {
                title: "Ceramic Braces",
                description: "Tooth-colored brackets that blend naturally for a subtle look.",
                image: "/images/services/full-mouth-smile.jpg",
                offset: "translate-y-6",
              },
              {
                title: "Early Treatment",
                description: "Phase 1 orthodontics to guide healthy jaw growth and development.",
                image: "/images/services/full-mouth-shade.jpg",
                offset: "-translate-y-8",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`group ${service.offset}`}
              >
                <div className="relative overflow-hidden shadow-2xl">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText via-brand-mainText/20 to-transparent" />
                  </div>
                  {/* Text overlay with negative margin overlap */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 -ml-2 pl-2 border-l-4 border-brand-accent">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Orthodontist - Editorial Split with Typography Overlap */}
      <section className="py-32 px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Portrait - Full Height */}
            <div className="relative min-h-[600px] lg:min-h-[800px] group">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={primaryDoctor.name}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Bio Content - Overlapping */}
            <div className="relative lg:-ml-24 flex items-center">
              <div className="bg-slate-900 p-12 lg:p-16 w-full">
                <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-4 font-medium">
                  Meet Your Orthodontist
                </p>
                {/* Name with dramatic overlap */}
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[0.95] mb-2 lg:-ml-32 lg:pl-32">
                  {primaryDoctor.name}
                </h2>
                <p className="text-brand-accent text-xl mb-8 italic">{primaryDoctor.role}</p>
                <p className="text-gray-300 leading-relaxed mb-10 text-lg">
                  {primaryDoctor.biography}
                </p>

                {/* Credentials - Editorial List */}
                <ul className="space-y-4 mb-12">
                  {primaryDoctor.credentials.map((credential, index) => (
                    <li key={index} className="flex items-start gap-4 text-gray-300 group/item">
                      <span className="text-brand-accent font-bold text-lg">0{index + 1}</span>
                      <span className="border-b border-gray-700 pb-2 flex-1 group-hover/item:border-brand-accent transition-colors duration-300">
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Stats Row */}
                <div className="flex gap-12 pt-8 border-t border-gray-800">
                  {[
                    { value: "15+", label: "Years" },
                    { value: "10,000+", label: "Smiles" },
                    { value: "98%", label: "Satisfaction" },
                  ].map((stat, index) => (
                    <div key={index}>
                      <p className="text-4xl font-bold text-brand-accent">{stat.value}</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After - Editorial Showcase */}
      <section className="py-32 px-8 bg-brand-canvas">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Transformations
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-mainText leading-[0.95]">
              Real Results,
              <span className="block text-brand-primary italic font-light">Real Smiles</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeUrl="/images/cases/smile-before-ortho.png"
              afterUrl="/images/cases/smile-after-ortho.png"
              altTag="Smile transformation with orthodontic treatment"
              aspectRatio="4/3"
            />
          </div>

          <p className="text-center text-neutral-muted mt-10 text-lg italic">
            Invisalign Treatment Case Study • Completed in 14 months
          </p>
        </div>
      </section>

      {/* Patient Testimonials - Editorial Lookbook Stack */}
      <section className="py-32 px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Patient Stories
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[0.95]">
              What They
              <span className="block text-brand-accent italic font-light">Say</span>
            </h2>
          </div>

          {/* Lookbook Staggered Stack */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sampleReviewsOrtho.slice(0, 3).map((review, index) => (
                <div
                  key={index}
                  className={`relative group ${
                    index === 0 ? "md:translate-y-0" : index === 1 ? "md:-translate-y-8" : "md:translate-y-4"
                  }`}
                >
                  {/* Card with heavy editorial shadow */}
                  <div className="bg-white p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_50px_100px_-25px_rgba(0,0,0,0.6)]">
                    {/* Large decorative quote */}
                    <span className="absolute -top-4 -left-2 text-8xl font-serif text-brand-accent/20 leading-none">
                      &ldquo;
                    </span>
                    {/* Stars */}
                    <div className="flex gap-1 mb-6 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-brand-mainText leading-relaxed mb-8 text-lg italic relative z-10">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                    {/* Author with rounded mask */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center border-2 border-brand-primary/20">
                        <span className="text-xl font-bold text-brand-primary">
                          {review.reviewerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-brand-mainText">{review.reviewerName}</p>
                        <p className="text-sm text-neutral-muted">Verified Patient</p>
                      </div>
                    </div>
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
              <span className="block text-brand-primary italic font-light">Orthodontic Services</span>
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
            alt={`${clientMasterDataOrtho.globalPracticeName} office exterior in ${location.cityServed}`}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
                href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 mt-10 px-8 py-5 bg-brand-primary text-white font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
              >
                Schedule Your Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Map */}
            <div className="relative h-[500px] shadow-2xl lg:translate-y-12">
              <iframe
                src={location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${location.practiceNameGBP}`}
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-primary/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultations Banner - Editorial Asymmetric */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterDataOrtho.globalPracticeName} office interior`}
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
                On Braces, Invisalign, and all orthodontic treatments.
              </p>
              <p className="text-neutral-muted">
                Call us with any questions or conveniently book your consultation online today!
              </p>
            </div>
            <a
              href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
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
                title: "Board-Certified Specialists",
                description: `Our ${clientMasterDataOrtho.globalPracticeName} team includes board-certified orthodontists with specialized training.`,
                cta: "Meet the Team",
              },
              {
                title: "Patient-First Care",
                description: "We prioritize your comfort and well-being with personalized treatment plans designed around your needs.",
                cta: "Meet the Doctor",
              },
              {
                title: "Flexible Financing",
                description: "We offer flexible payment options with 0% interest financing and work with most insurance plans.",
                cta: "Learn More",
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
            src="/images/team-ortho.jpeg"
            alt={`${clientMasterDataOrtho.globalPracticeName} team`}
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
              The {clientMasterDataOrtho.globalPracticeName}
              <span className="block text-brand-accent italic font-light normal-case tracking-normal">Difference</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto italic">
              At {clientMasterDataOrtho.globalPracticeName}, we provide comprehensive orthodontic care to
              create the healthy, beautiful smile you deserve.
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
              {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterDataOrtho.onlineBookingUrl}
                  className="px-10 py-5 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-brand-mainText transition-all duration-500"
                >
                  Request A Consultation
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <T1OrthoFooter />
    </div>
  );
}
