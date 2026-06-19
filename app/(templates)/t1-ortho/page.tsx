import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho } from "@/data/master-ortho";
import T1OrthoNav from "./components/T1OrthoNav";
import T1OrthoFooter from "./components/T1OrthoFooter";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Trusted ${location.primaryCategoryGBP.toLowerCase()} serving ${location.cityServed} and surrounding areas. Accepting new patients for braces, Invisalign, and orthodontic care.`,
};

export default function Template1OrthoPage() {
  const { doctors, trustSignals } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-serif">
      <T1OrthoNav />

      {/* Hero Section - 50/50 Split */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-10"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line-dark) 1px, transparent 1px),
                              linear-gradient(90deg, var(--grid-line-dark) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Left: Team Photo */}
        <div className="group relative min-h-[400px] lg:min-h-0 order-2 lg:order-1 overflow-hidden">
          <Image
            src="/images/team-ortho.jpeg"
            alt={`Orthodontic team at ${clientMasterDataOrtho.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-fluid-lg font-semibold text-white">
              Our Expert Team
            </p>
            <p className="text-fluid-sm text-white/80">Dedicated to your perfect smile</p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center px-fluid py-16 bg-brand-canvas order-1 lg:order-2 relative">
          {/* Trust Badge Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-2 text-fluid-xs font-semibold rounded-full bg-brand-primary text-brand-canvas shadow-premium">
              Accepting New Patients
            </span>
            <span className="px-4 py-2 text-fluid-xs font-semibold rounded-full bg-amber-600 text-white shadow-premium">
              Free Consultations
            </span>
          </div>

          {/* H1 - SEO Optimized */}
          <h1 className="text-fluid-5xl font-bold text-brand-mainText leading-tight mb-6 tracking-tight">
            {location.primaryCategoryGBP} in {location.cityServed}
          </h1>

          {/* Intro Copy */}
          <p className="text-fluid-lg text-neutral-muted leading-relaxed mb-8 max-w-xl">
            Transform your smile with expert orthodontic care tailored to your unique needs. Our team of
            board-certified specialists combines years of expertise with the latest technology
            to create beautiful, healthy smiles in {location.cityServed}.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="btn-primary px-6 py-4 text-lg rounded-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {location.phoneGBP}
            </a>
            {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterDataOrtho.onlineBookingUrl}
                className="inline-flex items-center gap-2 px-6 py-4 text-lg font-semibold rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-canvas transition-all duration-300"
              >
                Book Online
              </a>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-neutral-border">
            <div className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-fluid-sm font-semibold text-brand-mainText">Board Certified</p>
                <p className="text-fluid-xs text-neutral-muted">Orthodontist</p>
              </div>
            </div>
            <div className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-fluid-sm font-semibold text-brand-mainText">5.0 Rating</p>
                <p className="text-fluid-xs text-neutral-muted">Google Reviews</p>
              </div>
            </div>
            <div className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-fluid-sm font-semibold text-brand-mainText">10,000+</p>
                <p className="text-fluid-xs text-neutral-muted">Smiles Created</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Welcome Video */}
      <section className="py-fluid-24 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-sky-400 uppercase tracking-widest text-fluid-xs font-semibold mb-4">Our Story</p>
            <h2 className="text-fluid-4xl font-bold text-white mb-4 tracking-tight">
              Welcome to {clientMasterDataOrtho.globalPracticeName}
            </h2>
            <p className="text-fluid-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get to know our team and see what makes our practice special. Hear from our orthodontists, staff, and patients about the care experience we provide.
            </p>
          </div>
          <div className="group relative aspect-video rounded-xl overflow-hidden shadow-premium-lg border border-white/10">
            <video
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Play button overlay hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Premium Services - 2x2 Grid with Images */}
      <section className="py-fluid-24 px-fluid bg-brand-canvas border-t border-neutral-border relative">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line-dark) 1px, transparent 1px),
                              linear-gradient(90deg, var(--grid-line-dark) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-brand-primary uppercase tracking-widest text-fluid-xs font-semibold mb-4">Treatment Options</p>
            <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-4 tracking-tight">
              Orthodontic Treatments
            </h2>
            <p className="text-fluid-base text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              From traditional braces to clear aligners, we offer comprehensive treatment options for patients of all ages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Invisalign Clear Aligners",
                description: "Straighten your teeth discreetly with custom-made clear aligners that fit your lifestyle.",
                image: "/images/services/invisalign.jpg",
              },
              {
                title: "Traditional Braces",
                description: "Time-tested metal braces for reliable, precise tooth movement and beautiful results.",
                image: "/images/services/braces.jpg",
              },
              {
                title: "Ceramic Braces",
                description: "Tooth-colored brackets that blend in naturally while delivering excellent results.",
                image: "/images/services/full-mouth-smile.jpg",
              },
              {
                title: "Early Treatment",
                description: "Phase 1 orthodontics to guide jaw growth and create space for permanent teeth.",
                image: "/images/services/full-mouth-shade.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-brand-canvas border border-neutral-border rounded-xl overflow-hidden hover:border-brand-primary hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-fluid-lg font-bold text-brand-mainText mb-2">{service.title}</h3>
                  <p className="text-fluid-sm text-neutral-muted leading-relaxed">{service.description}</p>
                  <a href="#" className="inline-flex items-center gap-1 mt-4 text-fluid-sm font-medium text-brand-primary hover:gap-2 transition-all duration-300">
                    Learn More
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Orthodontist - T1 Style: Classic Split Layout */}
      <section className="py-fluid-24 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-premium-lg">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={primaryDoctor.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Bio Content */}
            <div>
              <p className="text-sky-400 uppercase tracking-widest text-fluid-xs font-semibold mb-4">Meet Your Orthodontist</p>
              <h2 className="text-fluid-4xl font-bold text-white mb-2 tracking-tight">
                {primaryDoctor.name}
              </h2>
              <p className="text-fluid-lg text-gray-400 mb-6">{primaryDoctor.role}</p>
              <p className="text-fluid-base text-gray-300 leading-relaxed mb-8">
                {primaryDoctor.biography}
              </p>

              {/* Credentials */}
              <ul className="space-y-3 mb-8">
                {primaryDoctor.credentials.map((credential, index) => (
                  <li key={index} className="group flex items-start gap-3 text-fluid-sm text-gray-300">
                    <svg className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-700">
                <div className="group text-center hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-fluid-3xl font-bold text-sky-400">15+</p>
                  <p className="text-fluid-xs text-gray-400">Years Experience</p>
                </div>
                <div className="group text-center hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-fluid-3xl font-bold text-sky-400">10,000+</p>
                  <p className="text-fluid-xs text-gray-400">Smiles Created</p>
                </div>
                <div className="group text-center hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-fluid-3xl font-bold text-sky-400">98%</p>
                  <p className="text-fluid-xs text-gray-400">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Showcase - T1 Style: Side by Side Comparison */}
      <section className="py-fluid-24 px-fluid bg-brand-canvas relative">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line-dark) 1px, transparent 1px),
                              linear-gradient(90deg, var(--grid-line-dark) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-brand-primary uppercase tracking-widest text-fluid-xs font-semibold mb-4">Transformations</p>
            <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-4 tracking-tight">
              Real Results, Real Smiles
            </h2>
            <p className="text-fluid-base text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              See the transformative power of orthodontic treatment. These results showcase
              our commitment to creating beautiful, healthy smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="group relative">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-mainText text-brand-canvas text-fluid-xs font-semibold rounded-lg shadow-premium">
                Before
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-4 border-neutral-border group-hover:border-brand-mainText transition-colors duration-300">
                <Image
                  src="/images/cases/smile-before-ortho.png"
                  alt="Before orthodontic treatment"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* After */}
            <div className="group relative">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-primary text-brand-canvas text-fluid-xs font-semibold rounded-lg shadow-premium">
                After
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-4 border-brand-primary group-hover:shadow-premium-lg transition-all duration-300">
                <Image
                  src="/images/cases/smile-after-ortho.png"
                  alt="After orthodontic treatment"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-fluid-sm text-neutral-muted mt-8">
            Invisalign Treatment Case Study • Completed in 14 months
          </p>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-fluid-24 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-sky-400 uppercase tracking-widest text-fluid-xs font-semibold mb-4">Patient Stories</p>
            <h2 className="text-fluid-4xl font-bold text-white mb-4 tracking-tight">
              Hear From Our Patients
            </h2>
            <p className="text-fluid-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Real experiences from patients who have transformed their smiles with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleReviewsOrtho.slice(0, 3).map((review, index) => (
              <div key={index} className="group bg-slate-700/50 p-8 rounded-xl border border-slate-600 hover:border-sky-400/50 hover:bg-slate-700/70 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-fluid-sm text-gray-300 leading-relaxed mb-6 italic">&ldquo;{review.reviewText}&rdquo;</p>
                <p className="text-fluid-sm text-white font-semibold">{review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Services Section */}
      <section className="py-fluid-24 px-fluid bg-brand-canvas border-t border-neutral-border relative">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line-dark) 1px, transparent 1px),
                              linear-gradient(90deg, var(--grid-line-dark) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-brand-primary uppercase tracking-widest text-fluid-xs font-semibold mb-4">Our Services</p>
            <h2 className="text-fluid-4xl font-bold text-brand-mainText tracking-tight">
              Comprehensive Orthodontic Services in {location.cityServed}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <article key={index} className="group p-8 border border-neutral-border rounded-xl hover:border-brand-primary hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-fluid-xl font-bold text-brand-mainText mb-4">{category}</h3>
                <p className="text-fluid-sm text-neutral-muted leading-relaxed">
                  Our {category.toLowerCase()} services are designed to meet your individual
                  needs with precision and care. We utilize advanced techniques and
                  state-of-the-art technology to deliver exceptional results for patients
                  throughout {location.cityServed} and the surrounding {location.stateServed} communities.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Office Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Office Exterior Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/office-exterior.jpg"
            alt={`${clientMasterDataOrtho.globalPracticeName} office exterior in ${location.cityServed}`}
            fill
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-mainText/90 via-brand-mainText/70 to-brand-mainText/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-fluid py-20">
          <div className="max-w-2xl">
            <p className="text-brand-accent uppercase tracking-widest text-fluid-xs font-semibold mb-4">Location</p>
            <h2 className="text-fluid-4xl font-bold text-white mb-6 tracking-tight">
              Visit Our Office
            </h2>
            <p className="text-fluid-lg text-gray-200 leading-relaxed mb-8">
              Conveniently located in {location.cityServed}, our modern facility is designed
              with your comfort in mind. Easy parking and a welcoming atmosphere await you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="group flex items-start gap-3 text-white">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-fluid-base font-semibold">{location.addressGBP}</p>
                  <p className="text-fluid-sm text-gray-300">{location.cityServed}, {location.stateServed}</p>
                </div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${location.addressGBP}, ${location.cityServed}, ${location.stateServed}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-white text-brand-mainText font-semibold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-premium-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Come Visit Us Section - Hours + Map */}
      <section className="relative py-fluid-24 px-fluid bg-brand-canvas border-t border-neutral-border overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line-dark) 1px, transparent 1px),
                              linear-gradient(90deg, var(--grid-line-dark) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hours */}
            <div>
              <p className="uppercase tracking-widest text-fluid-xs font-semibold text-brand-primary mb-4">
                Office Hours
              </p>
              <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-8">
                Come Visit Us
              </h2>
              <div className="space-y-4">
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
                    className="flex justify-between items-center py-3 border-b border-neutral-border last:border-0 hover:bg-brand-primary/5 hover:px-3 -mx-3 transition-all duration-300 rounded"
                  >
                    <span className="text-fluid-base text-brand-mainText font-medium">{schedule.day}</span>
                    <span className={`text-fluid-base ${schedule.hours === "Closed" ? "text-neutral-muted" : "text-brand-mainText"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-lg bg-brand-primary text-brand-canvas font-semibold hover:brightness-110 hover:-translate-y-1 hover:shadow-premium-lg transition-all duration-300"
              >
                Schedule Your Consultation
              </a>
            </div>

            {/* Right: Map */}
            <div className="group relative rounded-xl overflow-hidden shadow-premium border border-neutral-border h-[400px] hover:shadow-premium-lg hover:border-brand-primary/30 transition-all duration-500">
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
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultations Banner */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden group">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterDataOrtho.globalPracticeName} office interior`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors duration-500" />
        </div>

        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 w-full px-fluid py-fluid-20">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="glass p-8 lg:p-12 rounded-xl max-w-xl shadow-premium-lg hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-500">
              <p className="uppercase tracking-widest text-fluid-xs font-semibold text-brand-primary mb-4">
                No Cost Consultation
              </p>
              <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-2">
                Free consultations—
              </h2>
              <h3 className="text-fluid-4xl font-bold text-brand-mainText mb-4">
                always.
              </h3>
              <p className="text-fluid-lg text-neutral-muted mb-2">
                On Braces, Invisalign, and all orthodontic treatments.
              </p>
              <p className="text-fluid-sm text-neutral-muted">
                Call us with any questions or conveniently book your consultation online today!
              </p>
            </div>
            <a
              href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-brand-primary text-brand-canvas font-semibold text-fluid-lg hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,118,110,0.4)] transition-all duration-300 shadow-premium-lg"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Dark Section */}
      <section className="relative py-fluid-24 px-fluid bg-brand-mainText overflow-hidden">
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <p className="uppercase tracking-widest text-fluid-xs font-semibold text-brand-primary mb-4">
            Our Difference
          </p>
          <h2 className="text-fluid-4xl font-bold text-white mb-12">
            <span className="font-light italic">Why</span> Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Board-Certified Specialists",
                description: `Our ${clientMasterDataOrtho.globalPracticeName} team includes board-certified orthodontists with specialized training.`,
                cta: "Meet the Team",
              },
              {
                title: "Patient-First Care",
                description: "We prioritize your comfort with personalized treatment plans designed around your unique smile goals.",
                cta: "Meet the Doctor",
              },
              {
                title: "Flexible Payment Options",
                description: "We offer flexible financing with 0% interest options and work with most insurance plans to make treatment affordable.",
                cta: "Learn More",
              },
            ].map((item, index) => (
              <div key={index} className="border-l border-white/20 pl-6 hover:border-brand-primary/60 hover:bg-white/5 -ml-px py-4 transition-all duration-300">
                <h3 className="text-fluid-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-fluid-base text-gray-400 leading-relaxed mb-6">{item.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white text-fluid-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {item.cta}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Practice Difference CTA */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden group">
        <div className="absolute inset-0">
          <Image
            src="/images/team-ortho.jpeg"
            alt={`${clientMasterDataOrtho.globalPracticeName} team`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/55 transition-colors duration-500" />
        </div>

        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 w-full px-fluid py-fluid-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-fluid-xs font-semibold text-brand-primary mb-4">
              Experience the Difference
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-bold text-white uppercase tracking-wider mb-8">
              The {clientMasterDataOrtho.globalPracticeName} Difference
            </h2>
            <p className="text-fluid-lg text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto italic">
              At {clientMasterDataOrtho.globalPracticeName}, we provide comprehensive orthodontic care to
              create the healthy, beautiful smile you deserve. If you have questions or
              want more information about our treatments, please contact us today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-mainText font-semibold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-premium-lg transition-all duration-300"
              >
                Call Us
              </a>
              {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterDataOrtho.onlineBookingUrl}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,118,110,0.4)] transition-all duration-300"
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
