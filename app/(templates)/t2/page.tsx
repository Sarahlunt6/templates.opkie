import type { Metadata } from "next";
import { clientMasterData, sampleReviews } from "@/data/master";
import { ReviewMatrix } from "@/components/dental";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Advanced digital dentistry in ${location.cityServed}. Precision care with minimal treatment intervals using cutting-edge 3D imaging and laser technology.`,
};

export default function Template2Page() {
  const { trustSignals } = clientMasterData;

  return (
    <div className="font-sans">
      {/* Hero Section - Centered Canvas */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-8 py-20 bg-brand-canvas relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--primary-brand) 1px, transparent 1px),
                              linear-gradient(90deg, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Google Review Badge */}
        <div className="relative z-10 mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brand-canvas border border-neutral-border shadow-sm">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-brand-mainText">5.0</span>
            <span className="text-neutral-muted">|</span>
            <span className="text-neutral-muted">200+ Reviews on Google</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-brand-mainText text-center max-w-4xl leading-tight mb-6">
          Precision Digital Dentistry.
          <br />
          <span className="text-brand-primary">Minimal Treatment Intervals.</span>
        </h1>

        {/* Subheading */}
        <p className="relative z-10 text-lg md:text-xl text-neutral-muted text-center max-w-2xl mb-10">
          Experience the future of dental care in {location.cityServed}. Our advanced 3D imaging
          and laser technology deliver exceptional results with unprecedented comfort.
        </p>

        {/* Interactive Card Container */}
        <div className="relative z-10 w-full max-w-xl">
          <div className="bg-brand-canvas border border-neutral-border rounded-2xl shadow-xl p-8">
            <h2 className="text-lg font-semibold text-brand-mainText mb-4 text-center">
              Find Your Treatment
            </h2>

            {/* Treatment Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-muted mb-2">
                  Select Treatment Type
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all">
                  <option>Invisalign Clear Aligners</option>
                  <option>Dental Implants</option>
                  <option>Teeth Whitening</option>
                  <option>Porcelain Veneers</option>
                  <option>Emergency Care</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-muted mb-2">
                  Your Zip Code
                </label>
                <input
                  type="text"
                  placeholder="Enter zip code"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-border focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                />
              </div>

              <button className="w-full py-4 rounded-lg bg-brand-primary text-brand-canvas font-semibold hover:brightness-110 transition-all">
                Check Availability
              </button>
            </div>

            {/* Quick Contact */}
            <div className="mt-6 pt-6 border-t border-neutral-border text-center">
              <p className="text-sm text-neutral-muted mb-2">Or call us directly</p>
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="text-xl font-semibold text-brand-primary hover:underline"
              >
                {location.phoneGBP}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 px-8 bg-brand-mainText">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-canvas text-center mb-4">
            Advanced Technology. Superior Results.
          </h2>
          <p className="text-brand-canvas/70 text-center mb-12 max-w-2xl mx-auto">
            Our investment in cutting-edge dental technology means better outcomes,
            faster recovery, and a more comfortable experience for every patient.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                title: "3D Digital Imaging",
                description: "Precise diagnostics with cone beam CT scanning for accurate treatment planning.",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Laser Dentistry",
                description: "Minimally invasive procedures with faster healing and reduced discomfort.",
              },
              {
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "Digital Workflow",
                description: "Same-day crowns and restorations with CAD/CAM technology.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-brand-canvas/10 hover:border-brand-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-canvas"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-brand-canvas mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-canvas/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-12">
            Our Services in {location.cityServed}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-neutral-border hover:border-brand-primary hover:shadow-lg transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-brand-mainText group-hover:text-brand-primary transition-colors">
                  {category}
                </h3>
                <p className="text-sm text-neutral-muted mt-2">
                  Advanced {category.toLowerCase()} using the latest digital technology.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-8 bg-gradient-to-b from-brand-canvas to-brand-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-mainText text-center mb-12">
            Verified Patient Reviews
          </h2>
          <ReviewMatrix reviews={sampleReviews.slice(0, 3)} columns={3} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-brand-mainText">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-brand-canvas mb-4">
                {location.practiceNameGBP}
              </h3>
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
              <h4 className="font-semibold text-brand-canvas mb-3">Hours</h4>
              <ul className="text-brand-canvas/70 text-sm space-y-1">
                {location.hoursOfOperation.map((h, i) => (
                  <li key={i}>{h.dayRange}: {h.structuralHours}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-canvas mb-3">Insurance</h4>
              <p className="text-brand-canvas/70 text-sm">{trustSignals.insuranceAcceptedText}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
