import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho } from "@/data/master-ortho";
import T5OrthoNav from "./components/T5OrthoNav";
import T5OrthoFooter from "./components/T5OrthoFooter";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Thoughtful, patient-centered orthodontic care in ${location.cityServed}. Experience personalized treatment in a serene, welcoming environment.`,
};

export default function Template5OrthoPage() {
  const { doctors } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans">
      <T5OrthoNav />
      {/* Hero Section - Zen with Visual Interest */}
      <section className="min-h-[90vh] flex items-center px-8 pt-8 pb-20 bg-brand-canvas relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at center, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }} />
        </div>

        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start lg:pt-8">
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
              {/* Practice Name Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-brand-primary" />
                <p className="text-xs uppercase tracking-[0.2em] text-brand-primary font-medium">
                  {clientMasterDataOrtho.globalPracticeName}
                </p>
              </div>

              {/* Main Headline */}
              <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-light text-brand-mainText leading-[1.1] mb-6">
                Your Perfect Smile,
                <br />
                <span className="font-normal text-brand-primary">Thoughtfully Designed</span>
              </h1>

              {/* Decorative Line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-brand-primary" />
                <span className="text-xs uppercase tracking-[0.15em] text-neutral-muted">Personalized Care</span>
              </div>

              {/* Philosophy Statement */}
              <p className="text-lg text-neutral-muted leading-relaxed mb-10 max-w-lg">
                We believe exceptional orthodontic care extends beyond treatment. Our patient-centered approach
                creates a personalized path to your perfect smile
                in the heart of {location.cityServed}.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-medium rounded-sm hover:brightness-110 hover:shadow-xl hover:shadow-brand-primary/25 transition-all duration-300"
                >
                  <span>Schedule Consultation</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 text-brand-mainText font-medium hover:text-brand-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{location.phoneGBP}</span>
                </a>
              </div>
            </div>

            {/* Right: Image Composition */}
            <div className="order-1 lg:order-2 relative">
              {/* Main Image - Office Interior */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/images/office-interior.jpg"
                  alt={`${clientMasterDataOrtho.globalPracticeName} serene orthodontic office interior`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText/30 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-sm shadow-xl hover:shadow-2xl p-6 border border-neutral-border transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-brand-mainText">100%</p>
                    <p className="text-xs uppercase tracking-wider text-neutral-muted">Patient-Centered</p>
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -top-4 -right-4 bg-brand-primary text-white rounded-sm shadow-xl hover:shadow-2xl px-6 py-4 transition-all duration-300 hover:-translate-y-1">
                <p className="text-3xl font-light">15+</p>
                <p className="text-xs uppercase tracking-wider text-white/80">Years Experience</p>
              </div>

              {/* Decorative frame accent */}
              <div className="absolute -z-10 top-8 left-8 right-8 bottom-8 border border-brand-primary/20 rounded-sm" />
            </div>
          </div>
        </div>

      </section>

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
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Welcome
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText mb-4">
              Our Practice, Our People
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              Take a moment to meet our team and hear from those we've had the privilege to serve. Discover the thoughtful care that defines our approach.
            </p>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-neutral-muted mt-6 italic">
            A glimpse into personalized orthodontic care
          </p>
        </div>
      </section>

      {/* Premium Services - Minimal/Zen Style */}
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
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Signature Treatments
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText">
              Thoughtful Care, Exceptional Results
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Invisalign",
                description: "Discreet alignment therapy that works with your lifestyle. Clear, comfortable, and precisely planned.",
                number: "01",
              },
              {
                title: "Traditional Braces",
                description: "Time-tested metal brackets with modern comfort features. Reliable results for all ages.",
                number: "02",
              },
              {
                title: "Ceramic Braces",
                description: "Tooth-colored brackets that blend naturally with your smile. Effective and discreet.",
                number: "03",
              },
              {
                title: "Early Treatment",
                description: "Phase 1 interceptive care for developing smiles. Guiding healthy growth from the start.",
                number: "04",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group py-8 border-b border-neutral-border hover:border-brand-primary hover:bg-brand-primary/[0.02] hover:px-4 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <span className="text-sm font-light text-brand-primary group-hover:text-white transition-colors duration-300">{service.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-muted leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm text-brand-primary hover:gap-3 transition-all"
                    >
                      <span>Explore</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators - Minimal/Zen Style */}
      <section className="py-16 px-8 bg-brand-canvas border-y border-neutral-border relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "5,000+", label: "Smiles Created" },
              { value: "Board", label: "Certified Specialists" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <p className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 bg-brand-canvas border-b border-neutral-border relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-light text-brand-primary group-hover:text-white transition-colors duration-300">01</span>
              </div>
              <h3 className="text-lg font-medium text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors">Listen</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">
                We begin every relationship by truly understanding your concerns, goals, and smile vision.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-light text-brand-primary group-hover:text-white transition-colors duration-300">02</span>
              </div>
              <h3 className="text-lg font-medium text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors">Plan</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">
                Together, we craft a comprehensive treatment strategy tailored to your unique needs.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-light text-brand-primary group-hover:text-white transition-colors duration-300">03</span>
              </div>
              <h3 className="text-lg font-medium text-brand-mainText mb-2 group-hover:text-brand-primary transition-colors">Transform</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">
                Gentle, precise treatment delivered with respect for your time and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After - Elegant Minimal */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Transformations
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText">
              The Art of Beautiful Smiles
            </h2>
          </div>

          {/* Elegant Side by Side */}
          <div className="grid grid-cols-2 gap-px bg-neutral-border group shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative aspect-[4/3] bg-brand-canvas overflow-hidden">
              <p className="absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-neutral-muted z-10">
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
              <p className="absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-brand-primary z-10">
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

          <p className="text-center text-sm text-neutral-muted mt-8 italic">
            Natural enhancement through personalized treatment
          </p>
        </div>
      </section>

      {/* Services - Minimal List */}
      <section className="py-24 px-8 bg-brand-canvas relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4 text-center">
            What We Offer
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText text-center mb-16">
            Our Treatments
          </h2>

          <div className="space-y-0">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="py-8 border-b border-neutral-border flex items-center justify-between group cursor-pointer hover:px-4 hover:bg-brand-primary/[0.02] transition-all duration-300"
              >
                <div>
                  <h3 className="text-lg font-medium text-brand-mainText group-hover:text-brand-primary transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-neutral-muted mt-1">
                    Personalized {category.toLowerCase()} with a patient-centered approach
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-muted group-hover:text-brand-primary group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Profile - Elegant */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Doctor Portrait */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300">
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
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
                Your Provider
              </p>
              <h2 className="text-2xl font-medium text-brand-mainText mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-brand-primary mb-6">{primaryDoctor.role}</p>
              <p className="text-neutral-muted leading-relaxed mb-6">
                {primaryDoctor.biography}
              </p>
              <ul className="space-y-2">
                {primaryDoctor.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-neutral-muted">
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

      {/* Kind Words - Zen Testimonials */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] border-t border-neutral-border relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Kind Words
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText">
              Happy Smiles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleReviewsOrtho.slice(0, 4).map((review, index) => (
              <div
                key={index}
                className="p-8 bg-brand-canvas border border-neutral-border rounded-sm hover:border-brand-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-muted leading-relaxed mb-6 italic">
                  "{review.reviewText}"
                </p>
                <p className="text-sm font-medium text-brand-mainText">{review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us - Zen Style */}
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
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Visit Us
            </p>
            <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText">
              Your Smile Journey Awaits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Hours */}
            <div>
              <h3 className="text-lg font-medium text-brand-mainText mb-8">Office Hours</h3>
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
                  <div key={index} className="flex justify-between py-3 border-b border-neutral-border hover:bg-brand-primary/[0.02] hover:px-2 transition-all duration-300">
                    <span className="text-neutral-muted">{item.day}</span>
                    <span className="text-brand-mainText">{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-neutral-border">
                <p className="text-sm text-neutral-muted mb-2">{location.addressGBP}</p>
                <p className="text-sm text-neutral-muted">{location.cityServed}, {location.stateServed}</p>
                <a
                  href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 text-brand-primary mt-4 hover:gap-3 transition-all"
                >
                  <span>{location.phoneGBP}</span>
                </a>
              </div>
            </div>
            {/* Map */}
            <div className="aspect-square rounded-sm overflow-hidden bg-neutral-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
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
          />
          <div className="absolute inset-0 bg-brand-mainText/80" />
          {/* Architectural Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: "80px 80px"
            }} />
          </div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
            Complimentary
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-white mb-6">
            Begin Your Smile Journey
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            We offer complimentary consultations for new patients. A conversation to understand your goals and explore how we can create your perfect smile.
          </p>
          <a
            href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="group/btn inline-flex items-center gap-3 text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-brand-mainText hover:shadow-xl transition-all duration-300"
          >
            <span>Schedule Consultation</span>
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* The Practice Difference CTA - Zen Style */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] border-t border-neutral-border relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px), linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
            Experience the Difference
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-light text-brand-mainText mb-6">
            Where Excellence Meets Artistry
          </h2>
          <p className="text-neutral-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Step into a practice where every detail has been thoughtfully considered for your comfort and care. Your journey to a perfect smile begins here.
          </p>
          <a
            href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="group inline-flex items-center gap-3 text-brand-primary font-medium hover:gap-4 transition-all"
          >
            <span>Begin Your Journey</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <T5OrthoFooter />
    </div>
  );
}
