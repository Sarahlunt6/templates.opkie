import type { Metadata } from "next";
import { clientMasterData, sampleReviews } from "@/data/master";
import { ReviewMatrix } from "@/components/dental";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Family-friendly dental care in ${location.cityServed}. Creating stress-free experiences for patients of all ages with gentle, compassionate treatment.`,
};

export default function Template3Page() {
  const { trustSignals, doctors } = clientMasterData;

  const firstVisitSteps = [
    {
      step: 1,
      title: "Warm Welcome",
      description: "Our friendly team greets you and handles paperwork digitally.",
    },
    {
      step: 2,
      title: "Comfort Check",
      description: "We discuss any concerns and customize your comfort options.",
    },
    {
      step: 3,
      title: "Gentle Exam",
      description: "Thorough evaluation at your pace with clear explanations.",
    },
    {
      step: 4,
      title: "Personal Plan",
      description: "Together we create a care plan that fits your life.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section - Wide Background with Family Focus */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 to-brand-accent/70">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[200px] font-bold text-brand-canvas">[Family Image]</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-8 lg:px-16 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-canvas leading-tight mb-6">
              {location.primaryCategoryGBP} in {location.cityServed}
            </h1>
            <p className="text-xl text-brand-canvas/90 leading-relaxed mb-8 max-w-xl">
              Where every smile matters and every patient feels like family. Experience
              gentle, compassionate dental care designed for comfort at every age.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-canvas text-brand-primary font-semibold hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {location.phoneGBP}
              </a>
              {clientMasterData.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterData.onlineBookingUrl}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-brand-canvas text-brand-canvas font-semibold hover:bg-brand-canvas hover:text-brand-primary transition-all"
                >
                  Schedule a Visit
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert Strip */}
      {trustSignals.hasSameDayEmergency && (
        <div className="bg-emergency py-4 px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">
                Dental Emergency? Same-Day Appointments Available
              </span>
            </div>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="px-6 py-2 rounded-full bg-white text-emergency font-semibold hover:bg-white/90 transition-colors"
            >
              Call Now: {location.phoneGBP}
            </a>
          </div>
        </div>
      )}

      {/* First Visit Process Map */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-4">
              Your First Visit: Entirely Stress-Free
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              We've designed every step of your experience to be comfortable, clear, and
              completely at your pace. Here's what to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {firstVisitSteps.map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 border border-neutral-border"
              >
                <div className="w-12 h-12 rounded-full bg-brand-primary text-brand-canvas flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-brand-mainText mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comfort Amenities */}
      <section className="py-20 px-8 bg-brand-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-12">
            Comfort is Our Priority
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", label: "TVs in Every Room" },
              { icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3", label: "Calming Music" },
              { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", label: "Aromatherapy" },
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Comfort Menu" },
            ].map((amenity, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-brand-canvas border border-neutral-border">
                <div className="w-14 h-14 rounded-full bg-brand-accent/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium text-brand-mainText">{amenity.label}</span>
              </div>
            ))}
          </div>

          {trustSignals.hasSedationAnxietyCare && (
            <div className="mt-12 p-8 rounded-2xl bg-brand-canvas border border-neutral-border text-center">
              <h3 className="text-xl font-semibold text-brand-mainText mb-2">
                Sedation Dentistry Available
              </h3>
              <p className="text-neutral-muted max-w-xl mx-auto">
                For patients with dental anxiety, we offer gentle sedation options to ensure
                a completely comfortable experience. Ask us about our anxiety-free care program.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-12">
            Services for the Whole Family
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-2xl border border-neutral-border hover:border-brand-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-mainText mb-2">{category}</h3>
                  <p className="text-sm text-neutral-muted leading-relaxed">
                    Gentle, patient-focused {category.toLowerCase()} for every member of your family.
                    We take the time to ensure everyone feels safe and cared for.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-8 bg-gradient-to-b from-brand-canvas to-brand-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-12">
            Happy Families, Healthy Smiles
          </h2>
          <ReviewMatrix reviews={sampleReviews.slice(0, 3)} columns={3} />
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
            <h4 className="font-semibold text-brand-canvas mb-4">Office Hours</h4>
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
