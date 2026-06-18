import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import { ReviewMatrix } from "@/components/dental";
import T2Nav from "./components/T2Nav";
import T2Footer from "./components/T2Footer";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Advanced digital dentistry in ${location.cityServed}. Precision care with minimal treatment intervals using cutting-edge 3D imaging and laser technology.`,
};

export default function Template2Page() {
  const { trustSignals, doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans">
      <T2Nav />
      {/* Hero Section - Centered Canvas */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-8 py-20 bg-brand-canvas relative overflow-hidden">
        {/* Background Team Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`Our dental team at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            priority
          />
        </div>
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

      {/* Premium Services - Tech Style */}
      <section className="py-20 px-8 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-4">
              Advanced Treatment Solutions
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              Cutting-edge procedures powered by digital precision for optimal outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Invisalign",
                description: "AI-powered clear aligner therapy with real-time progress tracking and predictable results.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Dental Implants",
                description: "3D-guided implant placement with same-day digital crowns for permanent restoration.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
              },
              {
                title: "Full Mouth Restoration",
                description: "Comprehensive digital treatment planning for complete smile reconstruction.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                title: "Porcelain Veneers",
                description: "Digital smile design with CAD/CAM precision for natural, lasting aesthetics.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-brand-canvas border border-neutral-border rounded-xl hover:border-brand-primary hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-brand-canvas transition-all">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-brand-mainText mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-muted leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all"
                >
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

      {/* Trust Indicators - Tech Dashboard Style */}
      <section className="py-12 px-8 bg-brand-canvas border-y border-neutral-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "99.2%", label: "Treatment Accuracy", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { value: "24hr", label: "Digital Turnaround", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { value: "3D", label: "Imaging Technology", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { value: "500+", label: "Digital Restorations", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl bg-brand-primary/5 border border-brand-primary/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-brand-primary mb-1">{stat.value}</p>
                <p className="text-sm text-neutral-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Advanced Technology. Superior Results.
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
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
                className="p-6 rounded-xl border border-gray-600 hover:border-brand-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After - Tech Comparison View */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-mainText mb-4">
              Digital Precision. Real Results.
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              Our advanced imaging and treatment planning technology delivers predictable,
              exceptional outcomes. See the difference digital dentistry makes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-border">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-mainText/90 rounded-lg">
                <span className="text-sm font-semibold text-brand-canvas">BEFORE</span>
              </div>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/cases/smile-before.png"
                  alt="Before digital smile design treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 bg-brand-primary/5">
                <p className="text-sm text-neutral-muted">Initial digital scan and analysis</p>
              </div>
            </div>

            {/* After */}
            <div className="relative rounded-2xl overflow-hidden border border-brand-primary">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-brand-primary rounded-lg">
                <span className="text-sm font-semibold text-brand-canvas">AFTER</span>
              </div>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/cases/smile-after.png"
                  alt="After digital smile design treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 bg-brand-primary/10">
                <p className="text-sm text-brand-primary font-medium">Precision-crafted result</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Doctor - Tech Profile Card */}
      <section className="py-20 px-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-brand-primary/20">
                <Image
                  src="/images/team/doctor-portrait.png"
                  alt={`${primaryDoctor.name}, ${primaryDoctor.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Tech Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm text-gray-300">Digital Dentistry Specialist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3">
              <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Meet Your Dentist
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-brand-accent text-lg mb-6">{primaryDoctor.role}</p>
              <p className="text-gray-300 leading-relaxed mb-8">
                {primaryDoctor.biography}
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {primaryDoctor.credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
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

      <T2Footer />
    </div>
  );
}
