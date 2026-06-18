import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import { ReviewMatrix } from "@/components/dental";
import T1Nav from "./components/T1Nav";
import T1Footer from "./components/T1Footer";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Trusted ${location.primaryCategoryGBP.toLowerCase()} serving ${location.cityServed} and surrounding areas. Accepting new patients for cosmetic, restorative, and emergency dental care.`,
};

export default function Template1Page() {
  const { doctors, trustSignals } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-serif">
      <T1Nav />

      {/* Hero Section - 50/50 Split */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16 bg-brand-canvas">
          {/* Trust Badge Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-2 text-sm font-semibold rounded-full bg-brand-primary text-brand-canvas">
              Accepting New Patients
            </span>
            {trustSignals.hasSameDayEmergency && (
              <span className="px-4 py-2 text-sm font-semibold rounded-full bg-emergency text-white">
                Same-Day Emergency Care
              </span>
            )}
          </div>

          {/* H1 - SEO Optimized */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-mainText leading-tight mb-6">
            {location.primaryCategoryGBP} in {location.cityServed}
          </h1>

          {/* Intro Copy */}
          <p className="text-lg lg:text-xl text-neutral-muted leading-relaxed mb-8 max-w-xl">
            Experience exceptional dental care tailored to your unique needs. Our team of
            skilled professionals combines decades of expertise with compassionate,
            patient-centered treatment in the heart of {location.cityServed}.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-4 text-lg font-semibold rounded-lg bg-brand-primary text-brand-canvas hover:brightness-110 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {location.phoneGBP}
            </a>
            {clientMasterData.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterData.onlineBookingUrl}
                className="inline-flex items-center gap-2 px-6 py-4 text-lg font-semibold rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-canvas transition-all"
              >
                Book Online
              </a>
            )}
          </div>

          {/* Accreditation Badges */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-neutral-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-border/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-xs text-neutral-muted">ADA</span>
              </div>
              <span className="text-xs text-neutral-muted">ADA Member</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-border/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-xs text-neutral-muted">AACD</span>
              </div>
              <span className="text-xs text-neutral-muted">AACD Fellow</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-border/30 rounded-lg flex items-center justify-center mb-2">
                <span className="text-xs text-neutral-muted">5.0</span>
              </div>
              <span className="text-xs text-neutral-muted">Google Rating</span>
            </div>
          </div>
        </div>

        {/* Right: Team Photo */}
        <div className="relative min-h-[400px] lg:min-h-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`Dental team at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-lg font-semibold text-white">
              Our Expert Team
            </p>
            <p className="text-sm text-white/80">Dedicated to your smile</p>
          </div>
        </div>
      </section>

      {/* Welcome Video */}
      <section className="py-20 px-8 lg:px-16 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Welcome to {clientMasterData.globalPracticeName}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get to know our team and see what makes our practice special. Hear from our dentists, staff, and patients about the care experience we provide.
            </p>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-20 px-8 lg:px-16 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-4">
              Premium Dental Services
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              Transform your smile with our most sought-after treatments, delivered with precision and artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Invisalign",
                description: "Straighten your teeth discreetly with clear aligners custom-made for your smile.",
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Dental Implants",
                description: "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
              },
              {
                title: "Full Mouth Restoration",
                description: "Complete smile reconstruction combining multiple treatments for optimal results.",
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              },
              {
                title: "Porcelain Veneers",
                description: "Custom-crafted shells that create a flawless, natural-looking smile makeover.",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-brand-canvas border border-neutral-border rounded-xl hover:border-brand-primary hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-mainText mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-muted leading-relaxed">{service.description}</p>
                <a href="#" className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-primary hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Dentist - T1 Style: Classic Split Layout */}
      <section className="py-20 px-8 lg:px-16 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={primaryDoctor.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Bio Content */}
            <div>
              <p className="text-sky-400 uppercase tracking-widest text-sm mb-4">Meet Your Dentist</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-gray-400 text-lg mb-6">{primaryDoctor.role}</p>
              <p className="text-gray-300 leading-relaxed mb-8">
                {primaryDoctor.biography}
              </p>

              {/* Credentials */}
              <ul className="space-y-3 mb-8">
                {primaryDoctor.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <p className="text-3xl font-bold text-sky-400">15+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-sky-400">5,000+</p>
                  <p className="text-sm text-gray-400">Smiles Created</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-sky-400">98%</p>
                  <p className="text-sm text-gray-400">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Showcase - T1 Style: Side by Side Comparison */}
      <section className="py-20 px-8 lg:px-16 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-4 text-center">
            Real Results, Real Smiles
          </h2>
          <p className="text-neutral-muted text-center mb-12 max-w-2xl mx-auto">
            See the transformative power of our cosmetic dentistry. These results showcase
            our commitment to creating beautiful, natural-looking smiles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="relative">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-mainText text-brand-canvas text-sm font-semibold rounded-lg">
                Before
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-4 border-neutral-border">
                <Image
                  src="/images/cases/smile-before.png"
                  alt="Before dental treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* After */}
            <div className="relative">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-primary text-brand-canvas text-sm font-semibold rounded-lg">
                After
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-4 border-brand-primary">
                <Image
                  src="/images/cases/smile-after.png"
                  alt="After dental treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-neutral-muted mt-8 text-sm">
            Porcelain Veneers Case Study • Completed in 2 visits
          </p>
        </div>
      </section>

      {/* Secondary Services Section */}
      <section className="py-20 px-8 lg:px-16 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-12 text-center">
            Comprehensive Dental Services in {location.cityServed}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <article key={index} className="p-8 border border-neutral-border rounded-xl">
                <h3 className="text-xl font-bold text-brand-mainText mb-4">{category}</h3>
                <p className="text-neutral-muted leading-relaxed">
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

      {/* Reviews Section */}
      <section className="py-20 px-8 lg:px-16 bg-gradient-to-b from-brand-canvas to-brand-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-4 text-center">
            What Our Patients Say
          </h2>
          <p className="text-neutral-muted text-center mb-12 max-w-2xl mx-auto">
            Read verified reviews from real patients who have experienced our commitment
            to exceptional dental care.
          </p>
          <ReviewMatrix reviews={sampleReviews.slice(0, 3)} columns={3} />
        </div>
      </section>

      <T1Footer />
    </div>
  );
}
