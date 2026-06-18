import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews, sampleBeforeAfterCases } from "@/data/master";
import { BeforeAfterSlider, ReviewMatrix } from "@/components/dental";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Premium cosmetic dentistry and smile makeovers in ${location.cityServed}. View stunning before and after transformations from our expert team.`,
};

export default function Template4Page() {
  const { trustSignals, doctors } = clientMasterData;

  return (
    <div className="font-sans">
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
                      beforeUrl="/images/cases/veneers-before-placeholder.jpg"
                      afterUrl="/images/cases/veneers-after-placeholder.jpg"
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

      {/* Treatment Categories with City Keywords */}
      <section className="py-20 px-8 bg-brand-mainText">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-canvas text-center mb-4">
            Cosmetic Services in {location.cityServed}
          </h2>
          <p className="text-brand-canvas/70 text-center mb-12 max-w-2xl mx-auto">
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

      {/* Case Gallery */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-4">
            Smile Transformations
          </h2>
          <p className="text-neutral-muted text-center mb-12 max-w-xl mx-auto">
            Real results from real patients. Explore our gallery of smile makeovers.
          </p>

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
      <section className="py-20 px-8 bg-brand-primary relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold text-brand-canvas mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="text-brand-canvas/80 mb-8 max-w-xl mx-auto">
            Schedule a complimentary smile consultation. We'll discuss your goals,
            explore options, and create a personalized treatment plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-canvas text-brand-primary font-semibold hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {location.phoneGBP}
            </a>
            {clientMasterData.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterData.onlineBookingUrl}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-brand-canvas text-brand-canvas font-semibold hover:bg-brand-canvas hover:text-brand-primary transition-all"
              >
                Book Consultation
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-brand-mainText">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold text-brand-canvas mb-4">{location.practiceNameGBP}</h3>
            <address className="not-italic text-brand-canvas/70 leading-relaxed">
              <p>{location.addressGBP}</p>
              <p>{location.cityServed}, {location.stateServed}</p>
              <p className="mt-2">
                <a href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`} className="hover:text-brand-accent">
                  {location.phoneGBP}
                </a>
              </p>
            </address>
          </div>
          <div>
            <h4 className="font-semibold text-brand-canvas mb-4">Hours</h4>
            <ul className="text-brand-canvas/70 space-y-2">
              {location.hoursOfOperation.map((h, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span>{h.dayRange}</span>
                  <span>{h.structuralHours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-canvas mb-4">Insurance</h4>
            <p className="text-brand-canvas/70 text-sm">{trustSignals.insuranceAcceptedText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
