import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T1Nav from "./components/T1Nav";
import T1Footer from "./components/T1Footer";
import BeforeAfterSlider from "@/components/dental/BeforeAfterSlider";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Trusted ${location.primaryCategoryGBP.toLowerCase()} serving ${location.cityServed} and surrounding areas. Accepting new patients for cosmetic, restorative, and emergency dental care.`,
};

export default function Template1Page() {
  const { doctors, trustSignals } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-serif antialiased">
      <T1Nav />

      {/* Hero Section - 50/50 Split with Premium Animations */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-2 section-bordered">
        {/* Left: Team Photo */}
        <div className="relative min-h-[400px] lg:min-h-0 order-2 lg:order-1 group overflow-hidden">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`Dental team at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-mainText/70 via-brand-mainText/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
            <p className="text-fluid-lg font-semibold text-white">
              Our Expert Team
            </p>
            <p className="text-fluid-sm text-white/80">Dedicated to your smile</p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center px-fluid py-fluid-16 bg-brand-canvas order-1 lg:order-2">
          {/* Trust Badge Row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="px-4 py-2 text-fluid-sm font-semibold rounded-full bg-brand-primary text-brand-canvas shadow-premium animate-fade-in">
              Accepting New Patients
            </span>
            {trustSignals.hasSameDayEmergency && (
              <span className="px-4 py-2 text-fluid-sm font-semibold rounded-full bg-amber-600 text-white shadow-premium animate-fade-in-up-delay">
                Same-Day Emergency Care
              </span>
            )}
          </div>

          {/* H1 - SEO Optimized with Fluid Typography */}
          <h1 className="text-fluid-5xl font-bold text-brand-mainText leading-[1.1] mb-6 tracking-tight">
            {location.primaryCategoryGBP} in {location.cityServed}
          </h1>

          {/* Intro Copy */}
          <p className="text-fluid-lg text-neutral-muted leading-relaxed mb-8 max-w-xl">
            Experience exceptional dental care tailored to your unique needs. Our team of
            skilled professionals combines decades of expertise with compassionate,
            patient-centered treatment in the heart of {location.cityServed}.
          </p>

          {/* CTA Buttons with Premium Hover Effects */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="btn-primary text-fluid-base group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {location.phoneGBP}
            </a>
            {clientMasterData.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterData.onlineBookingUrl}
                className="inline-flex items-center gap-2 px-6 py-4 text-fluid-base font-semibold rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-canvas transition-all duration-300 hover:shadow-premium"
              >
                Book Online
              </a>
            )}
          </div>

          {/* Trust Indicators with Grid Alignment */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-8 mt-12 pt-8 border-t border-neutral-border">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary/20 group-hover:scale-105">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-fluid-sm font-semibold text-brand-mainText">15+ Years</p>
                <p className="text-fluid-xs text-neutral-muted">Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary/20 group-hover:scale-105">
                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-fluid-sm font-semibold text-brand-mainText">5.0 Rating</p>
                <p className="text-fluid-xs text-neutral-muted">Google Reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary/20 group-hover:scale-105">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-fluid-sm font-semibold text-brand-mainText">5,000+</p>
                <p className="text-fluid-xs text-neutral-muted">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Welcome Video - Premium Dark Section */}
      <section className="py-fluid-20 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-brand-accent uppercase tracking-widest text-fluid-xs mb-4 font-medium">Experience Our Practice</p>
            <h2 className="text-fluid-4xl font-bold text-white mb-4">
              Welcome to {clientMasterData.globalPracticeName}
            </h2>
            <p className="text-fluid-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get to know our team and see what makes our practice special. Hear from our dentists, staff, and patients about the care experience we provide.
            </p>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-premium-lg group">
            <video
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Play button overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Premium Services - 2x2 Grid with Images */}
      <section className="py-fluid-20 px-fluid bg-brand-canvas section-bordered">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-primary uppercase tracking-widest text-fluid-xs mb-4 font-medium">Our Expertise</p>
            <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-4">
              Premium Dental Services
            </h2>
            <p className="text-fluid-base text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              Transform your smile with our most sought-after treatments, delivered with precision and artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Invisalign",
                description: "Straighten your teeth discreetly with clear aligners custom-made for your smile.",
                image: "/images/services/invisalign.jpg",
              },
              {
                title: "Dental Implants",
                description: "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
                image: "/images/services/implant.jpg",
              },
              {
                title: "Full Mouth Restoration",
                description: "Complete smile reconstruction combining multiple treatments for optimal results.",
                image: "/images/services/full-mouth-smile.jpg",
              },
              {
                title: "Porcelain Veneers",
                description: "Custom-crafted shells that create a flawless, natural-looking smile makeover.",
                image: "/images/services/full-mouth-shade.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="card-elevated group overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-fluid-lg font-bold text-brand-mainText mb-2">{service.title}</h3>
                  <p className="text-fluid-sm text-neutral-muted leading-relaxed">{service.description}</p>
                  <a href="#" className="link-premium inline-flex items-center gap-1 mt-4 text-fluid-sm font-medium text-brand-primary group/link">
                    Learn More
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Dentist - T1 Style: Classic Split Layout */}
      <section className="py-fluid-20 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-premium-lg group">
              <Image
                src="/images/team/doctor-portrait.png"
                alt={primaryDoctor.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Bio Content */}
            <div>
              <p className="text-brand-accent uppercase tracking-widest text-fluid-xs mb-4 font-medium">Meet Your Dentist</p>
              <h2 className="text-fluid-4xl font-bold text-white mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-gray-400 text-fluid-lg mb-6">{primaryDoctor.role}</p>
              <p className="text-gray-300 leading-relaxed mb-8 text-fluid-base">
                {primaryDoctor.biography}
              </p>

              {/* Credentials */}
              <ul className="space-y-3 mb-8">
                {primaryDoctor.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 text-fluid-sm group">
                    <svg className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-700">
                <div className="text-center group cursor-default">
                  <p className="text-fluid-3xl font-bold text-brand-accent transition-transform duration-300 group-hover:scale-105">15+</p>
                  <p className="text-fluid-xs text-gray-400">Years Experience</p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-fluid-3xl font-bold text-brand-accent transition-transform duration-300 group-hover:scale-105">5,000+</p>
                  <p className="text-fluid-xs text-gray-400">Smiles Created</p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-fluid-3xl font-bold text-brand-accent transition-transform duration-300 group-hover:scale-105">98%</p>
                  <p className="text-fluid-xs text-gray-400">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Showcase - Interactive Slider with Spring Physics */}
      <section className="py-fluid-20 px-fluid bg-brand-canvas section-bordered">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-primary uppercase tracking-widest text-fluid-xs mb-4 font-medium">Transformations</p>
            <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-4">
              Real Results, Real Smiles
            </h2>
            <p className="text-fluid-base text-neutral-muted max-w-2xl mx-auto leading-relaxed">
              See the transformative power of our cosmetic dentistry. These results showcase
              our commitment to creating beautiful, natural-looking smiles.
            </p>
          </div>

          {/* Interactive Before/After Slider */}
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              beforeUrl="/images/cases/smile-before.png"
              afterUrl="/images/cases/smile-after.png"
              altTag="Smile transformation with porcelain veneers"
              aspectRatio="4/3"
            />
          </div>

          <p className="text-center text-neutral-muted mt-8 text-fluid-sm">
            Porcelain Veneers Case Study • Completed in 2 visits
          </p>
        </div>
      </section>

      {/* Patient Testimonials - Premium Dark Section */}
      <section className="py-fluid-20 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-brand-accent uppercase tracking-widest text-fluid-xs mb-4 font-medium">Patient Stories</p>
            <h2 className="text-fluid-4xl font-bold text-white mb-4">
              Hear From Our Patients
            </h2>
            <p className="text-fluid-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Real experiences from patients who have transformed their smiles with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {sampleReviews.slice(0, 3).map((review, index) => (
              <div key={index} className="glass-dark p-8 rounded-xl transition-all duration-500 hover:translate-y-[-4px] hover:shadow-premium-lg group">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
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
      <section className="py-fluid-20 px-fluid bg-brand-canvas section-bordered">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-primary uppercase tracking-widest text-fluid-xs mb-4 font-medium">Full-Service Care</p>
            <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-4">
              Comprehensive Dental Services in {location.cityServed}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {location.secondaryCategoriesGBP.map((category, index) => (
              <article key={index} className="card-elevated p-8 group">
                <h3 className="text-fluid-xl font-bold text-brand-mainText mb-4 transition-colors duration-300 group-hover:text-brand-primary">{category}</h3>
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
        <div className="absolute inset-0 group">
          <Image
            src="/images/office-exterior.jpg"
            alt={`${clientMasterData.globalPracticeName} office exterior in ${location.cityServed}`}
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-mainText/90 via-brand-mainText/70 to-brand-mainText/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-fluid py-fluid-20">
          <div className="max-w-2xl">
            <p className="text-brand-accent uppercase tracking-widest text-fluid-xs mb-4 font-medium">Our Location</p>
            <h2 className="text-fluid-4xl font-bold text-white mb-6">
              Visit Our Office
            </h2>
            <p className="text-fluid-base text-gray-200 leading-relaxed mb-8">
              Conveniently located in {location.cityServed}, our modern facility is designed
              with your comfort in mind. Easy parking and a welcoming atmosphere await you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-start gap-3 text-white group/addr cursor-default">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/addr:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-fluid-base">{location.addressGBP}</p>
                  <p className="text-gray-300 text-fluid-sm">{location.cityServed}, {location.stateServed}</p>
                </div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${location.addressGBP}, ${location.cityServed}, ${location.stateServed}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-white text-brand-mainText font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-premium group/btn"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Come Visit Us Section - Hours + Map */}
      <section className="py-fluid-20 px-fluid bg-brand-canvas section-bordered">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Hours */}
            <div>
              <p className="text-brand-primary uppercase tracking-widest text-fluid-xs mb-4 font-medium">Office Hours</p>
              <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-8">
                Come Visit Us
              </h2>
              <div className="space-y-1">
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
                    className="flex justify-between items-center py-4 border-b border-neutral-border last:border-0 group hover:bg-slate-50 transition-colors duration-300 px-2 -mx-2 rounded"
                  >
                    <span className="text-fluid-base text-brand-mainText font-medium transition-colors duration-300 group-hover:text-brand-primary">{schedule.day}</span>
                    <span className={`text-fluid-base ${schedule.hours === "Closed" ? "text-neutral-muted" : "text-brand-mainText"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="btn-primary mt-8 text-fluid-base"
              >
                Make An Appointment
              </a>
            </div>

            {/* Right: Map */}
            <div className="relative rounded-xl overflow-hidden shadow-premium-lg border border-neutral-border h-[400px] group">
              <iframe
                src={location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${location.practiceNameGBP}`}
                className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultations Banner */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 group">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterData.globalPracticeName} office interior`}
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/30" />
        </div>

        <div className="relative z-10 w-full px-fluid py-fluid-16">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="glass p-8 lg:p-12 rounded-xl max-w-xl shadow-premium-lg transform transition-all duration-500 hover:translate-y-[-4px]">
              <h2 className="text-fluid-4xl font-bold text-brand-mainText mb-2">
                Free consultations—
              </h2>
              <h3 className="text-fluid-4xl font-bold text-brand-primary mb-6">
                always.
              </h3>
              <p className="text-fluid-lg text-neutral-muted mb-3">
                On Implants, Dentures, and Invisalign.
              </p>
              <p className="text-fluid-sm text-neutral-muted">
                Call us with any questions or conveniently book your appointment online today!
              </p>
            </div>
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="btn-primary text-fluid-lg px-10 py-5 shadow-premium-lg"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Dark Section */}
      <section className="py-fluid-20 px-fluid bg-slate-800 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-12">
            <p className="text-brand-accent uppercase tracking-widest text-fluid-xs mb-4 font-medium">Our Commitment</p>
            <h2 className="text-fluid-4xl font-bold text-white">
              <span className="font-light italic">Why</span> Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Experienced Team",
                description: `Our ${clientMasterData.globalPracticeName} team brings decades of combined experience to your care.`,
                cta: "Meet the Team",
              },
              {
                title: "Patient-First Care",
                description: "We prioritize your comfort and well-being with personalized treatment plans designed around your needs.",
                cta: "Meet the Doctor",
              },
              {
                title: "Comfortable Office",
                description: "Our modern facility offers amenities including blankets, TVs, headsets, and sedation options for your comfort.",
                cta: "Office Tour",
              },
            ].map((item, index) => (
              <div key={index} className="border-l-2 border-brand-accent/30 pl-6 group hover:border-brand-accent transition-colors duration-500">
                <h3 className="text-fluid-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-brand-accent">{item.title}</h3>
                <p className="text-fluid-sm text-gray-300 leading-relaxed mb-6">{item.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white text-fluid-sm font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300 group/btn"
                >
                  {item.cta}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Practice Difference CTA */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 group">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`${clientMasterData.globalPracticeName} team`}
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40" />
        </div>

        <div className="relative z-10 w-full px-fluid py-fluid-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-brand-accent uppercase tracking-widest text-fluid-xs mb-6 font-medium">Experience Excellence</p>
            <h2 className="text-fluid-5xl font-bold text-white uppercase tracking-wider mb-8">
              The {clientMasterData.globalPracticeName} Difference
            </h2>
            <p className="text-fluid-lg text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto italic">
              At {clientMasterData.globalPracticeName}, we provide a comprehensive range of services to
              ensure the health and beauty of your smile. If you have questions or
              want more information about our services, please contact us today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-brand-mainText text-fluid-base font-semibold hover:bg-gray-100 hover:shadow-premium-lg transition-all duration-300 hover:translate-y-[-2px] group/btn"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
              </a>
              {clientMasterData.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterData.onlineBookingUrl}
                  className="btn-primary text-fluid-base px-8 py-4"
                >
                  Request An Appointment
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <T1Footer />
    </div>
  );
}
