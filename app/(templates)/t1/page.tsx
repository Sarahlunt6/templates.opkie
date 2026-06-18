import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import { ReviewMatrix } from "@/components/dental";

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

      {/* NAP Footer Section */}
      <footer className="py-16 px-8 lg:px-16 bg-brand-mainText text-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Location NAP */}
            <div>
              <h3 className="text-xl font-bold mb-4">{location.practiceNameGBP}</h3>
              <address className="not-italic text-brand-canvas/80 leading-relaxed">
                <p>{location.addressGBP}</p>
                <p>{location.cityServed}, {location.stateServed}</p>
                <p className="mt-2">
                  <a
                    href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {location.phoneGBP}
                  </a>
                </p>
              </address>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <ul className="text-brand-canvas/80 space-y-2">
                {location.hoursOfOperation.map((hours, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{hours.dayRange}</span>
                    <span>{hours.structuralHours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insurance */}
            <div>
              <h3 className="text-xl font-bold mb-4">Insurance & Payment</h3>
              <p className="text-brand-canvas/80 leading-relaxed">
                {trustSignals.insuranceAcceptedText}
              </p>
              {trustSignals.membershipPlanSummary && (
                <p className="text-brand-canvas/80 leading-relaxed mt-4">
                  {trustSignals.membershipPlanSummary}
                </p>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
