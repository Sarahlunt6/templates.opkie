import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
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

      {/* Kind Words - Zen Testimonials */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Kind Words
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText">
              Voices of Wellness
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleReviews.slice(0, 4).map((review, index) => (
              <div
                key={index}
                className="p-8 bg-brand-canvas border border-neutral-border rounded-sm"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-muted leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
                <p className="text-sm font-medium text-brand-mainText">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us - Zen Style */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Visit Us
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText">
              Your Sanctuary Awaits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Hours */}
            <div>
              <h3 className="text-lg font-medium text-brand-mainText mb-8">Hours of Wellness</h3>
              <div className="space-y-4">
                {[
                  { day: "Monday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM – 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM – 3:00 PM" },
                  { day: "Saturday", hours: "By Appointment" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-neutral-border">
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
            <div className="aspect-square rounded-sm overflow-hidden bg-neutral-border/30">
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

      {/* Membership - Zen Style */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Membership
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText mb-4">
              Wellness Plans
            </h2>
            <p className="text-neutral-muted max-w-xl mx-auto leading-relaxed">
              Simple, transparent care for those who value ongoing wellness. No insurance complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Individual",
                price: "$335",
                period: "per year",
                features: ["Two wellness visits", "Complete examinations", "Digital X-rays", "15% off treatments"],
              },
              {
                name: "Couple",
                price: "$615",
                period: "per year",
                features: ["All Individual benefits", "Coverage for two", "Priority scheduling", "20% off treatments"],
                featured: true,
              },
              {
                name: "Family",
                price: "$965",
                period: "per year",
                features: ["All Couple benefits", "Up to 4 members", "Children's care included", "25% off treatments"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-sm border transition-all ${
                  plan.featured
                    ? "border-brand-primary bg-brand-canvas shadow-sm"
                    : "border-neutral-border bg-brand-canvas hover:border-brand-primary/50"
                }`}
              >
                {plan.featured && (
                  <p className="text-xs uppercase tracking-[0.15em] text-brand-primary mb-4">Recommended</p>
                )}
                <h3 className="text-lg font-medium text-brand-mainText mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-light text-brand-primary">{plan.price}</span>
                  <span className="text-sm text-neutral-muted ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-muted">
                      <svg className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                  className="block w-full py-3 text-center text-sm border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-colors rounded-sm"
                >
                  Begin Journey
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Consultation Banner - Zen Style */}
      <section className="relative py-24 px-8">
        <div className="absolute inset-0">
          <Image
            src="/images/office-exterior.jpg"
            alt="Our serene practice"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-mainText/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
            Complimentary
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
            Begin Your Wellness Journey
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            We offer complimentary consultations for new patients. A quiet conversation to understand your needs and explore how we can serve your oral health.
          </p>
          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-3 text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-brand-mainText transition-all"
          >
            <span>Schedule Consultation</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Why Choose Us - Zen Style */}
      <section className="py-24 px-8 bg-brand-canvas border-t border-neutral-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
              Our Philosophy
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-brand-mainText">
              The Mindful Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Holistic Approach",
                description: "We consider your complete wellbeing, not just your teeth. Mind, body, and oral health in harmony.",
              },
              {
                title: "Biocompatible Materials",
                description: "Only the safest, most natural materials. Mercury-free, metal-free options for your health.",
              },
              {
                title: "Unhurried Care",
                description: "We never rush. Each appointment is a sanctuary of calm, focused attention on your needs.",
              },
              {
                title: "Personalized Wellness",
                description: "Your treatment plan is uniquely yours, crafted to honor your individual health journey.",
              },
            ].map((item, index) => (
              <div key={index} className="p-8 border border-neutral-border rounded-sm">
                <div className="w-10 h-10 rounded-full border border-brand-primary flex items-center justify-center mb-4">
                  <span className="text-sm font-light text-brand-primary">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-medium text-brand-mainText mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Practice Difference CTA - Zen Style */}
      <section className="py-24 px-8 bg-brand-primary/[0.02] border-t border-neutral-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-muted mb-4">
            Experience the Difference
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-brand-mainText mb-6">
            Where Wellness Meets Artistry
          </h2>
          <p className="text-neutral-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Step into a practice where every detail has been thoughtfully considered for your comfort and care. Your journey to oral wellness begins here.
          </p>
          <a
            href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-3 text-brand-primary font-medium hover:gap-4 transition-all"
          >
            <span>Begin Your Journey</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <T5Footer />
    </div>
  );
}
