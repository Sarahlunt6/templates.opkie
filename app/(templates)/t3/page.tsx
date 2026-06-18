import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import T3Nav from "./components/T3Nav";
import T3Footer from "./components/T3Footer";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Family-friendly dental care in ${location.cityServed}. Creating stress-free experiences for patients of all ages with gentle, compassionate treatment.`,
};

export default function Template3Page() {
  const { trustSignals, doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

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
      <T3Nav />
      {/* Hero Section - Wide Background with Family Focus */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background Team Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt={`Our caring dental team at ${clientMasterData.globalPracticeName} in ${location.cityServed}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-8 lg:px-16 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              {location.primaryCategoryGBP} in {location.cityServed}
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed mb-8 max-w-xl drop-shadow">
              Where every smile matters and every patient feels like family. Experience
              gentle, compassionate dental care designed for comfort at every age.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-teal-700 font-semibold hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {location.phoneGBP}
              </a>
              {clientMasterData.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterData.onlineBookingUrl}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-teal-700 transition-all"
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
        <div className="bg-slate-800 py-4 px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <svg className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">
                Dental Emergency? Same-Day Appointments Available
              </span>
            </div>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold hover:brightness-110 transition-all"
            >
              Call Now: {location.phoneGBP}
            </a>
          </div>
        </div>
      )}

      {/* Welcome Video - Family Friendly Style */}
      <section className="py-20 px-8 bg-gradient-to-br from-teal-700 to-sky-600">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Take a Tour</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Come Meet Our Family!
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Take a peek inside our practice and hear from the people who make it special—our caring team and happy patients of all ages!
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
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

      {/* Premium Services - Sliding Carousel */}
      <section className="py-20 bg-brand-canvas overflow-hidden">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-mainText mb-4">
              Popular Services for Your Family
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              Trusted treatments delivered with gentle care for patients of all ages.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused] px-8">
            {[
              {
                title: "Invisalign",
                description: "Clear aligners for teens and adults. Straighten teeth comfortably without metal braces.",
                image: "/images/services/invisalign.jpg",
              },
              {
                title: "Dental Implants",
                description: "Permanent tooth replacement that looks and feels natural. Restore your confident smile.",
                image: "/images/services/implant.jpg",
              },
              {
                title: "Full Mouth Restoration",
                description: "Complete smile makeover combining multiple treatments for stunning results.",
                image: "/images/services/full-mouth-smile.jpg",
              },
              {
                title: "Porcelain Veneers",
                description: "Custom-crafted shells for a flawless, natural-looking smile transformation.",
                image: "/images/services/full-mouth-shade.jpg",
              },
              // Duplicate for seamless loop
              {
                title: "Invisalign",
                description: "Clear aligners for teens and adults. Straighten teeth comfortably without metal braces.",
                image: "/images/services/invisalign.jpg",
              },
              {
                title: "Dental Implants",
                description: "Permanent tooth replacement that looks and feels natural. Restore your confident smile.",
                image: "/images/services/implant.jpg",
              },
              {
                title: "Full Mouth Restoration",
                description: "Complete smile makeover combining multiple treatments for stunning results.",
                image: "/images/services/full-mouth-smile.jpg",
              },
              {
                title: "Porcelain Veneers",
                description: "Custom-crafted shells for a flawless, natural-looking smile transformation.",
                image: "/images/services/full-mouth-shade.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group flex-shrink-0 w-80 bg-brand-canvas border border-neutral-border rounded-2xl overflow-hidden hover:border-brand-primary hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="320px"
                  />
                </div>
                <div className="p-6 text-center">
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
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* First Visit Process Map */}
      <section className="py-20 px-8 bg-gradient-to-b from-brand-canvas to-brand-primary/5">
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

      {/* Meet the Dentist - Warm & Inviting Style */}
      <section className="py-20 px-8 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image with elegant border */}
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-primary/20 rounded-3xl rotate-3" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/team/doctor-portrait.png"
                  alt={`${primaryDoctor.name}, your friendly family dentist`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Meet Your Dentist</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-slate-300 text-lg mb-6">{primaryDoctor.role}</p>
              <p className="text-slate-200 leading-relaxed mb-8">
                {primaryDoctor.biography}
              </p>

              {/* Credentials as badges */}
              <div className="flex flex-wrap gap-2">
                {primaryDoctor.credentials.map((credential, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 text-slate-200 text-sm"
                  >
                    <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After - Playful Side by Side */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-4">
              Smile Transformations for the Whole Family
            </h2>
            <p className="text-neutral-muted max-w-2xl mx-auto">
              See the amazing results we achieve with gentle, patient-focused care.
              Every smile tells a story of trust and transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-neutral-border">
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-muted text-white font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Before
                </span>
              </div>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/cases/smile-before.png"
                  alt="Before gentle dental treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* After Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-brand-primary">
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary text-white font-semibold text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  After
                </span>
              </div>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/cases/smile-after.png"
                  alt="After gentle dental treatment - beautiful smile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-neutral-muted mt-8">
            Actual patient results. Your results may vary based on individual treatment needs.
          </p>
        </div>
      </section>

      {/* Comfort Amenities - Elevated Design */}
      <section className="py-20 px-8 bg-gradient-to-br from-slate-50 to-teal-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image with floating cards */}
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/office-interior.jpg"
                  alt="Our comfortable, modern dental office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
              </div>

              {/* Floating accent cards */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-teal-100">
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">100%</p>
                  <p className="text-xs text-slate-500">Comfort Focused</p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-teal-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">😌</span>
                  <span className="text-sm font-medium text-slate-700">Relax & Unwind</span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>Your Comfort Matters</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Comfort is Our Priority
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We've thoughtfully designed every aspect of your visit to feel more like a spa than a dental office. From the moment you arrive, you'll experience care that puts your comfort first.
              </p>

              {/* Amenity grid with hover effects */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
                    label: "TVs in Every Room",
                    description: "Stream your favorites"
                  },
                  {
                    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
                    label: "Calming Music",
                    description: "Curated playlists"
                  },
                  {
                    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                    label: "Aromatherapy",
                    description: "Soothing scents"
                  },
                  {
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    label: "Comfort Menu",
                    description: "Blankets & pillows"
                  },
                ].map((amenity, index) => (
                  <div
                    key={index}
                    className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">{amenity.label}</h4>
                    <p className="text-sm text-slate-500">{amenity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sedation Dentistry - Premium callout */}
          {trustSignals.hasSedationAnxietyCare && (
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-sky-600 rounded-3xl transform rotate-1" />
              <div className="relative bg-gradient-to-r from-teal-600 to-sky-600 rounded-3xl p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Anxiety-Free Sedation Dentistry
                    </h3>
                    <p className="text-teal-100 text-lg leading-relaxed max-w-2xl">
                      Dental anxiety? We understand. Our gentle sedation options help you relax completely, so you can get the care you need without the stress. Wake up with your treatment complete!
                    </p>
                  </div>
                  <a
                    href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-teal-700 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
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

      {/* Come Visit Us Section - Hours + Map */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hours */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-8">
                Come Visit Us
              </h2>
              <div className="space-y-4">
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
                    className="flex justify-between items-center py-2 border-b border-neutral-border last:border-0"
                  >
                    <span className="text-brand-mainText font-medium">{schedule.day}</span>
                    <span className={schedule.hours === "Closed" ? "text-neutral-muted" : "text-brand-mainText"}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-brand-primary text-white font-semibold hover:brightness-110 transition-all"
              >
                Make An Appointment
              </a>
            </div>

            {/* Right: Map */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-border h-[400px]">
              <iframe
                src={location.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${location.practiceNameGBP}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kind Words From Our Patients - Styled Testimonials */}
      <section className="py-20 px-8 bg-brand-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left: Title + Stars Badge */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText leading-tight mb-6">
                Kind Words From Our Patients
              </h2>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-brand-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-neutral-muted font-medium">5 Star</p>
              <p className="text-sm text-brand-primary font-semibold">reviews</p>
            </div>

            {/* Right: Testimonial Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleReviews.slice(0, 3).map((review, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-neutral-border/20 border border-neutral-border"
                >
                  <p className="text-brand-mainText leading-relaxed mb-6">
                    {review.reviewText}
                  </p>
                  <div className="border-t border-neutral-border pt-4">
                    <p className="text-sm font-semibold text-brand-mainText">
                      - {review.reviewerName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultations Banner - Office Interior Background */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt={`${clientMasterData.globalPracticeName} office interior`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-8 py-16">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="bg-white/95 backdrop-blur-sm p-8 lg:p-12 rounded-2xl max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-2">
                Free consultations—
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-4">
                always.
              </h3>
              <p className="text-xl text-neutral-muted mb-2">
                On Implants, Dentures, and Invisalign.
              </p>
              <p className="text-sm text-neutral-muted">
                Call us with any questions or conveniently book your appointment online today!
              </p>
            </div>
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-brand-primary text-white font-semibold text-lg hover:brightness-110 transition-all shadow-lg"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Family Friendly Style */}
      <section className="py-20 px-8 bg-gradient-to-br from-teal-700 to-sky-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Families Choose Us
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Trusted by families throughout {location.cityServed} for compassionate, quality care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Experienced Team",
                description: `Our ${clientMasterData.globalPracticeName} team brings decades of combined experience to your care.`,
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
              {
                title: "Patient-First Care",
                description: "We prioritize your comfort and well-being with personalized treatment plans designed around your needs.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              },
              {
                title: "Comfortable Office",
                description: "Our modern facility offers amenities including blankets, TVs, headsets, and sedation options for your comfort.",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-100 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <T3Footer />
    </div>
  );
}
