import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews, sampleBeforeAfterCases } from "@/data/master";
import { BeforeAfterSlider, ReviewMatrix } from "@/components/dental";
import T4Nav from "./components/T4Nav";
import T4Footer from "./components/T4Footer";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Premium cosmetic dentistry and smile makeovers in ${location.cityServed}. View stunning before and after transformations from our expert team.`,
};

export default function Template4Page() {
  const { trustSignals, doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans">
      <T4Nav />
      {/* Hero Section - Cosmetic Showcase */}
      <section className="min-h-[90vh] flex flex-col">
        {/* Top Typography Section */}
        <div className="py-16 px-8 text-center bg-brand-canvas">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-mainText tracking-tight mb-4">
            The Artistry Behind
            <br />
            <span className="text-brand-primary">Elite Smile Design</span>
          </h1>
          <p className="text-lg text-neutral-muted max-w-xl mx-auto">
            Transforming smiles in {location.cityServed} with precision cosmetic dentistry
            and personalized treatment plans.
          </p>
        </div>

        {/* Before/After Slider Hero - 65% of viewport */}
        <div className="flex-1 px-4 md:px-8 pb-8">
          <div className="h-full max-w-5xl mx-auto">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for Before/After */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-neutral-muted mb-4">Interactive Before/After Slider</p>
                  <div className="w-full max-w-2xl mx-auto px-8">
                    <BeforeAfterSlider
                      beforeUrl="/images/cases/smile-before.png"
                      afterUrl="/images/cases/smile-after.png"
                      altTag="Porcelain veneers smile transformation at Summit Dental Group in Salt Lake City"
                      aspectRatio="16/9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services - Cosmetic/Luxury Style */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Signature Treatments
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-4">
              Our Most Sought-After Transformations
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              Each procedure is artfully crafted to enhance your natural beauty with stunning, lasting results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Porcelain Veneers",
                description: "Ultra-thin, custom-crafted shells that transform your smile with Hollywood-quality aesthetics.",
                tag: "Most Popular",
              },
              {
                title: "Invisalign",
                description: "Invisible orthodontics for the modern patient. Straighten your teeth without compromising your look.",
                tag: "Clear Aligners",
              },
              {
                title: "Full Mouth Restoration",
                description: "Comprehensive smile reconstruction combining multiple procedures for total transformation.",
                tag: "Complete Makeover",
              },
              {
                title: "Dental Implants",
                description: "Premium titanium implants with lifelike ceramic crowns. The gold standard in tooth replacement.",
                tag: "Permanent Solution",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-6 bg-brand-canvas border border-neutral-border rounded-2xl hover:border-brand-primary hover:shadow-xl transition-all"
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-brand-primary/10 text-brand-primary mb-4">
                  {service.tag}
                </span>
                <h3 className="text-lg font-bold text-brand-mainText mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-muted leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3 transition-all"
                >
                  View Gallery
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators - Cosmetic/Luxury Style */}
      <section className="py-12 px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1,200+", label: "Smile Makeovers", detail: "Completed" },
              { value: "15", label: "Years of", detail: "Cosmetic Excellence" },
              { value: "98%", label: "Patient", detail: "Satisfaction" },
              { value: "Award", label: "Winning", detail: "Aesthetics" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-sky-400 mb-1">{stat.value}</p>
                <p className="text-gray-300 text-sm">
                  {stat.label}<br />
                  <span className="text-gray-400">{stat.detail}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Artist - Portfolio Style */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Large Portrait */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/team/doctor-portrait.png"
                    alt={`${primaryDoctor.name}, Cosmetic Dentistry Specialist`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-brand-primary text-brand-canvas rounded-xl shadow-lg">
                  <p className="text-sm font-semibold">Cosmetic Specialist</p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-7">
              <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-4">
                The Artist Behind Your Smile
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-xl text-neutral-muted mb-6">{primaryDoctor.role}</p>

              <div className="prose prose-lg text-neutral-muted mb-8">
                <p className="leading-relaxed">
                  {primaryDoctor.biography}
                </p>
              </div>

              {/* Credentials in elegant list */}
              <div className="border-t border-neutral-border pt-6">
                <p className="text-sm font-semibold text-brand-mainText mb-4">Credentials & Training</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {primaryDoctor.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                      <span className="text-sm text-neutral-muted">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories with City Keywords */}
      <section className="py-20 px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Cosmetic Services in {location.cityServed}
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Each treatment is customized to enhance your unique smile while maintaining
            natural beauty and optimal oral health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Invisalign", tag: "Clear Aligners" },
              { title: "Porcelain Veneers", tag: "Smile Makeover" },
              { title: "Teeth Whitening", tag: "Brightening" },
              { title: "Dental Bonding", tag: "Quick Fix" },
            ].map((treatment, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Placeholder Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-accent" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-brand-accent text-brand-mainText mb-2">
                    {treatment.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {treatment.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {treatment.title} in {location.cityServed}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Before/After Gallery */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-4">
            Smile Transformations
          </h2>
          <p className="text-neutral-muted text-center mb-12 max-w-xl mx-auto">
            Real results from real patients. Explore our gallery of smile makeovers.
          </p>

          {/* Featured Large Comparison */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/90 backdrop-blur rounded-full">
                  <span className="text-sm font-semibold text-neutral-muted">Before</span>
                </div>
                <Image
                  src="/images/cases/smile-before.png"
                  alt="Before cosmetic dental treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3]">
                <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-primary rounded-full">
                  <span className="text-sm font-semibold text-brand-canvas">After</span>
                </div>
                <Image
                  src="/images/cases/smile-after.png"
                  alt="After cosmetic dental treatment - stunning smile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <p className="text-center text-sm text-neutral-muted mt-4">
              Complete smile makeover with porcelain veneers
            </p>
          </div>

          {/* Additional Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleBeforeAfterCases.map((caseItem) => (
              <div key={caseItem.id} className="space-y-4">
                <BeforeAfterSlider
                  beforeUrl={caseItem.beforeUrl}
                  afterUrl={caseItem.afterUrl}
                  altTag={`${caseItem.altTag} at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
                  aspectRatio="4/3"
                />
                <div className="text-center">
                  <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-brand-primary/10 text-brand-primary">
                    {caseItem.procedureType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 px-8 bg-gradient-to-b from-brand-canvas to-brand-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-12">
            Our Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <article key={index} className="p-8 bg-brand-canvas rounded-2xl border border-neutral-border">
                <h3 className="text-xl font-bold text-brand-mainText mb-4">{category}</h3>
                <p className="text-neutral-muted leading-relaxed mb-6">
                  Our {category.toLowerCase()} treatments combine artistic vision with
                  clinical precision. Every procedure is tailored to enhance your natural
                  features while achieving the stunning results you deserve.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:gap-3 transition-all"
                >
                  View {category} Cases
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-4">
            What Our Patients Say
          </h2>
          <p className="text-neutral-muted text-center mb-12 max-w-xl mx-auto">
            Hear from patients who have experienced their own smile transformations.
          </p>
          <ReviewMatrix reviews={sampleReviews.slice(0, 3)} columns={3} />
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 px-8 bg-teal-700 relative overflow-hidden">
        {/* Background Team Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`Our cosmetic dentistry team at ${clientMasterData.globalPracticeName}`}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">
            Schedule a complimentary smile consultation. We'll discuss your goals,
            explore options, and create a personalized treatment plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-teal-700 font-semibold hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {location.phoneGBP}
            </a>
            {clientMasterData.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterData.onlineBookingUrl}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-teal-700 transition-all"
              >
                Book Consultation
              </a>
            )}
          </div>
        </div>
      </section>

      <T4Footer />
    </div>
  );
}
