import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import { ReviewMatrix } from "@/components/dental";
import T5Nav from "./components/T5Nav";
import T5Footer from "./components/T5Footer";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Holistic, patient-centered dental wellness in ${location.cityServed}. Experience personalized care in a serene, spa-like environment focused on your complete oral health.`,
};

export default function Template5Page() {
  const { trustSignals, doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans">
      <T5Nav />
      {/* Hero Section - Zen Minimalist */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-8 py-20 bg-brand-canvas relative">
        {/* Subtle Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at center, var(--primary-brand) 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }} />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Practice Name */}
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-muted mb-8">
            {clientMasterData.globalPracticeName}
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-mainText leading-tight mb-8">
            Oral Wellness,
            <br />
            <span className="font-normal">Thoughtfully Designed</span>
          </h1>

          {/* Divider */}
          <div className="w-16 h-px bg-brand-primary mx-auto mb-8" />

          {/* Philosophy Statement */}
          <p className="text-lg md:text-xl text-neutral-muted leading-relaxed mb-12 max-w-2xl mx-auto">
            We believe exceptional dental care extends beyond treatment. Our holistic approach
            considers your complete wellbeing, creating a personalized path to lasting oral health
            in the heart of {location.cityServed}.
          </p>

          {/* Minimal CTA */}
          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-3 text-brand-primary font-medium hover:gap-4 transition-all"
          >
            <span>Schedule a Private Consultation</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border border-neutral-border flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-brand-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Welcome Video - Minimal/Zen Style */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Welcome
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText mb-4">
              Our Practice, Our People
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              Take a moment to meet our team and hear from those we've had the privilege to serve. Discover the thoughtful care that defines our approach.
            </p>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden">
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
            A glimpse into mindful dental wellness
          </p>
        </div>
      </section>

      {/* Premium Services - Minimal/Zen Style */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Signature Services
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText">
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
                title: "Dental Implants",
                description: "Biocompatible tooth restoration that honors your body's natural processes. Permanent and lasting.",
                number: "02",
              },
              {
                title: "Holistic Restorations",
                description: "Mercury-free, metal-free dentistry using only the most biocompatible materials for your health.",
                number: "03",
              },
              {
                title: "Cosmetic Enhancements",
                description: "Subtle, natural improvements that enhance rather than transform. Authentic beauty, refined.",
                number: "04",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group py-8 border-b border-neutral-border hover:border-brand-primary transition-colors"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-light text-brand-primary">{service.number}</span>
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-16 px-8 bg-brand-canvas border-y border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "12", label: "Years of Mindful Practice" },
              { value: "100%", label: "Personalized Care" },
              { value: "Holistic", label: "Wellness Approach" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-light text-brand-primary mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-8 bg-brand-canvas border-b border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-light text-brand-primary">01</span>
              </div>
              <h3 className="text-lg font-medium text-brand-mainText mb-2">Listen</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">
                We begin every relationship by truly understanding your concerns, goals, and history.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-light text-brand-primary">02</span>
              </div>
              <h3 className="text-lg font-medium text-brand-mainText mb-2">Plan</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">
                Together, we craft a comprehensive wellness strategy tailored to your unique needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-light text-brand-primary">03</span>
              </div>
              <h3 className="text-lg font-medium text-brand-mainText mb-2">Care</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">
                Gentle, precise treatment delivered with respect for your time and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After - Elegant Minimal */}
      <section className="py-24 px-8 bg-brand-primary/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Transformations
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText">
              The Art of Subtle Enhancement
            </h2>
          </div>

          {/* Elegant Side by Side */}
          <div className="grid grid-cols-2 gap-px bg-neutral-border">
            <div className="relative aspect-[4/3] bg-brand-canvas">
              <p className="absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-neutral-muted z-10">
                Before
              </p>
              <Image
                src="/images/cases/smile-before.png"
                alt="Before holistic dental treatment"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] bg-brand-canvas">
              <p className="absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-brand-primary z-10">
                After
              </p>
              <Image
                src="/images/cases/smile-after.png"
                alt="After holistic dental treatment"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          <p className="text-center text-sm text-neutral-muted mt-8 italic">
            Natural enhancement through mindful treatment
          </p>
        </div>
      </section>

      {/* Services - Minimal List */}
      <section className="py-24 px-8 bg-brand-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-brand-mainText text-center mb-16">
            Our Services
          </h2>

          <div className="space-y-0">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <div
                key={index}
                className="py-8 border-b border-neutral-border flex items-center justify-between group cursor-pointer hover:px-4 transition-all"
              >
                <div>
                  <h3 className="text-lg font-medium text-brand-mainText group-hover:text-brand-primary transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-neutral-muted mt-1">
                    Personalized {category.toLowerCase()} with a holistic approach
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all"
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
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Doctor Portrait */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={`${primaryDoctor.name} at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
                fill
                className="object-cover"
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

      {/* Location & Philosophy Block */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText mb-4">
              Serving {location.cityServed} & Beyond
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              Our practice welcomes patients from throughout {location.stateServed}, including
              {" "}{location.localizedNeighborhoods.slice(0, 3).join(", ")}, and surrounding communities.
              We believe that exceptional dental care should be a sanctuary—a place where your
              complete wellbeing is the priority.
            </p>
          </div>

          {/* Map Embed Placeholder */}
          <div className="aspect-[21/9] bg-neutral-border/30 rounded-sm flex items-center justify-center">
            <span className="text-neutral-muted">Google Maps Embed</span>
          </div>
        </div>
      </section>

      {/* Reviews - Minimal */}
      <section className="py-24 px-8 bg-brand-canvas">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-brand-mainText text-center mb-16">
            Patient Experiences
          </h2>
          <ReviewMatrix reviews={sampleReviews.slice(0, 2)} columns={2} />
        </div>
      </section>

      <T5Footer />
    </div>
  );
}
