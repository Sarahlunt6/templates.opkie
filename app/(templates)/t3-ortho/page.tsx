import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho } from "@/data/master-ortho";
import T3OrthoNav from "./components/T3OrthoNav";
import T3OrthoFooter from "./components/T3OrthoFooter";
import T3OrthoHero from "./components/T3OrthoHero";
import T3OrthoServiceAccordion from "./components/T3OrthoServiceAccordion";
import T3OrthoAmbientBackground from "./components/T3OrthoAmbientBackground";
import T3OrthoReviewCarousel from "./components/T3OrthoReviewCarousel";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Thoughtful, patient-centered orthodontic care in ${location.cityServed}. Experience personalized treatment in a serene, welcoming environment.`,
};

export default function Template3OrthoPage() {
  const { doctors } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans bg-brand-canvas relative">
      {/* Ambient Background */}
      <T3OrthoAmbientBackground />

      <T3OrthoNav />

      {/* Hero Section with Floating Parallax Images */}
      <T3OrthoHero
        practiceName={clientMasterDataOrtho.globalPracticeName}
        cityServed={location.cityServed}
        phoneGBP={location.phoneGBP}
        bookingUrl={clientMasterDataOrtho.onlineBookingUrl}
      />

      {/* Welcome Video - Minimal/Zen Style */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-4">
              Welcome
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-extralight text-brand-mainText mb-4 tracking-[0.05em]">
              Our Practice, Our People
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto leading-relaxed font-light">
              Take a moment to meet our team and hear from those we've had the privilege to serve. Discover the thoughtful care that defines our approach.
            </p>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-brand-primary/10">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              {/* Video source disabled for demo */}
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-[11px] text-neutral-muted mt-6 italic tracking-wide">
            A glimpse into personalized orthodontic care
          </p>
        </div>
      </section>

      {/* Interactive Service Accordion */}
      <T3OrthoServiceAccordion />

      {/* Trust Indicators - Minimal/Zen Style */}
      <section className="py-16 px-8 bg-brand-canvas border-y border-neutral-border/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "5,000+", label: "Smiles Created" },
              { value: "Board", label: "Certified Specialists" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-extralight text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 bg-brand-canvas border-b border-neutral-border/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-12 h-12 rounded-full border border-brand-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-extralight text-brand-primary group-hover:text-white transition-colors duration-300">01</span>
              </div>
              <h3 className="text-lg font-light text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors tracking-wide">Listen</h3>
              <p className="text-sm text-neutral-muted leading-relaxed font-light">
                We begin every relationship by truly understanding your concerns, goals, and smile vision.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 rounded-full border border-brand-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-extralight text-brand-primary group-hover:text-white transition-colors duration-300">02</span>
              </div>
              <h3 className="text-lg font-light text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors tracking-wide">Plan</h3>
              <p className="text-sm text-neutral-muted leading-relaxed font-light">
                Together, we craft a comprehensive treatment strategy tailored to your unique needs.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 rounded-full border border-brand-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-extralight text-brand-primary group-hover:text-white transition-colors duration-300">03</span>
              </div>
              <h3 className="text-lg font-light text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors tracking-wide">Transform</h3>
              <p className="text-sm text-neutral-muted leading-relaxed font-light">
                Gentle, precise treatment delivered with respect for your time and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After - Elegant Minimal */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-4">
              Transformations
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-extralight text-brand-mainText tracking-[0.05em]">
              The Art of Beautiful Smiles
            </h2>
          </div>

          {/* Elegant Side by Side */}
          <div className="grid grid-cols-2 gap-px bg-neutral-border/30 group shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative aspect-[4/3] bg-brand-canvas overflow-hidden">
              <p className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-neutral-muted z-10">
                Before
              </p>
              <Image
                src="/images/cases/smile-before-ortho.png"
                alt="Before orthodontic treatment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] bg-brand-canvas overflow-hidden">
              <p className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-brand-primary z-10">
                After
              </p>
              <Image
                src="/images/cases/smile-after-ortho.png"
                alt="After orthodontic treatment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="50vw"
              />
            </div>
          </div>

          <p className="text-center text-[11px] text-neutral-muted mt-8 italic tracking-wide">
            Natural enhancement through personalized treatment
          </p>
        </div>
      </section>

      {/* Services - Minimal List */}
      <section className="py-24 px-8 bg-brand-canvas relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-4 text-center">
            What We Offer
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-extralight text-brand-mainText text-center mb-16 tracking-[0.05em]">
            Our Treatments
          </h2>

          <div className="space-y-0">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="py-8 border-b border-neutral-border/30 flex items-center justify-between group cursor-pointer hover:px-4 hover:bg-brand-primary/[0.02] transition-all duration-300"
              >
                <div>
                  <h3 className="text-lg font-light text-brand-mainText group-hover:text-brand-primary transition-colors tracking-wide">
                    {category}
                  </h3>
                  <p className="text-sm text-neutral-muted mt-1 font-light">
                    Personalized {category.toLowerCase()} with a patient-centered approach
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-muted/50 group-hover:text-brand-primary group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Profile - Elegant */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Doctor Portrait */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 border border-brand-primary/10">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={`${primaryDoctor.name} at ${clientMasterDataOrtho.globalPracticeName} in ${location.cityServed}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Bio */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-4">
                Your Provider
              </p>
              <h2 className="text-2xl font-light text-brand-mainText mb-2 tracking-wide">
                {primaryDoctor.name}
              </h2>
              <p className="text-brand-primary mb-6 font-light">{primaryDoctor.role}</p>
              <p className="text-neutral-muted leading-relaxed mb-6 font-light">
                {primaryDoctor.biography}
              </p>
              <ul className="space-y-2">
                {primaryDoctor.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-neutral-muted font-light">
                    <svg className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Review Carousel */}
      <T3OrthoReviewCarousel reviews={sampleReviewsOrtho} />

      {/* Visit Us - Zen Style */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-muted mb-4">
              Visit Us
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-extralight text-brand-mainText tracking-[0.05em]">
              Your Smile Journey Awaits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Hours */}
            <div>
              <h3 className="text-lg font-light text-brand-mainText mb-8 tracking-wide">Office Hours</h3>
              <div className="space-y-4">
                {[
                  { day: "Monday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM – 2:00 PM" },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-neutral-border/30 hover:bg-brand-primary/[0.02] hover:px-2 transition-all duration-300">
                    <span className="text-neutral-muted font-light">{item.day}</span>
                    <span className="text-brand-mainText font-light">{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-neutral-border/30">
                <p className="text-sm text-neutral-muted mb-2 font-light">{location.addressGBP}</p>
                <p className="text-sm text-neutral-muted font-light">{location.cityServed}, {location.stateServed}</p>
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 text-brand-primary mt-4 hover:gap-3 transition-all tracking-wide"
                >
                  <span>{location.phoneGBP}</span>
                </a>
              </div>
            </div>
            {/* Map */}
            <div className="aspect-square rounded-sm overflow-hidden bg-neutral-border/10 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-primary/10">
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
                <div className="w-full h-full flex items-center justify-center text-neutral-muted">
                  Map
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultation Banner - Zen Style */}
      <section className="relative py-24 px-8 group">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/office-exterior.jpg"
            alt="Our welcoming practice"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-8">
            Complimentary
          </p>
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light text-white mb-8 tracking-[0.05em]">
            Begin Your Smile Journey
          </h2>
          <p className="text-white/80 font-light leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            We offer complimentary consultations for new patients. A conversation to understand your goals and explore how we can create your perfect smile.
          </p>
          <a
            href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-4 px-10 py-4 border border-white/30 text-white text-sm uppercase tracking-[0.25em] font-light hover:bg-white hover:text-brand-mainText transition-all duration-500"
          >
            <span>Schedule</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      <T3OrthoFooter />
    </div>
  );
}
