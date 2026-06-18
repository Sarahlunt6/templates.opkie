import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterDataOrtho, sampleReviewsOrtho, sampleBeforeAfterCasesOrtho } from "@/data/master-ortho";
import { BeforeAfterSlider } from "@/components/dental";
import T4OrthoNav from "./components/T4OrthoNav";
import T4OrthoFooter from "./components/T4OrthoFooter";

const location = clientMasterDataOrtho.locations[0];

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Premium orthodontic care and smile transformations in ${location.cityServed}. View stunning before and after results from our expert team.`,
};

export default function Template4OrthoPage() {
  const { doctors } = clientMasterDataOrtho;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sans">
      <T4OrthoNav />
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
            Transforming smiles in {location.cityServed} with precision orthodontics
            and personalized treatment plans.
          </p>
        </div>

        {/* Before/After Slider Hero */}
        <div className="flex-1 px-4 md:px-8 pb-8">
          <div className="h-full max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <BeforeAfterSlider
                beforeUrl="/images/cases/smile-before.png"
                afterUrl="/images/cases/smile-after.png"
                altTag="Orthodontic smile transformation at Summit Orthodontics in Salt Lake City"
                aspectRatio="16/9"
              />
            </div>
            <p className="text-center text-sm text-neutral-muted mt-4">
              Drag the slider to see the transformation
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Video - Cosmetic/Luxury Style */}
      <section className="py-20 px-8 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Exclusive Access
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Inside Our Studio
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Step behind the scenes and discover the artistry, passion, and personal attention that define every transformation at our practice.
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/team/staff-photo.jpg"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Elegant Play Overlay Accent */}
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/90 backdrop-blur rounded-full">
              <span className="text-sm font-semibold text-brand-mainText">Practice Tour & Patient Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services - Image Boxes with Overlay */}
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
              Each treatment is artfully crafted to enhance your natural beauty with stunning, lasting results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Invisalign",
                tag: "Most Popular",
                image: "/images/services/invisalign.jpg",
              },
              {
                title: "Traditional Braces",
                tag: "Time-Tested",
                image: "/images/services/braces.jpg",
              },
              {
                title: "Ceramic Braces",
                tag: "Discreet Option",
                image: "/images/services/full-mouth-smile.jpg",
              },
              {
                title: "Early Treatment",
                tag: "Phase 1 Care",
                image: "/images/services/full-mouth-shade.jpg",
              },
            ].map((service, index) => (
              <a
                key={index}
                href="#"
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm mb-3">
                    {service.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>

                  {/* Learn More - appears on hover */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators - Cosmetic/Luxury Style */}
      <section className="py-12 px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5,000+", label: "Smile", detail: "Transformations" },
              { value: "15+", label: "Years of", detail: "Excellence" },
              { value: "98%", label: "Patient", detail: "Satisfaction" },
              { value: "Award", label: "Winning", detail: "Results" },
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
                    alt={`${primaryDoctor.name}, Board-Certified Orthodontist`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-brand-primary text-brand-canvas rounded-xl shadow-lg">
                  <p className="text-sm font-semibold">Board-Certified Orthodontist</p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-7">
              <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-4">
                The Expert Behind Your Smile
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
            Orthodontic Treatments in {location.cityServed}
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Each treatment is customized to create your perfect smile while maintaining
            optimal oral health and comfort.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Invisalign", tag: "Clear Aligners", image: "/images/services/invisalign.jpg" },
              { title: "Metal Braces", tag: "Traditional", image: "/images/services/veneers.jpg" },
              { title: "Ceramic Braces", tag: "Tooth-Colored", image: "/images/services/whitening.jpg" },
              { title: "Teen Braces", tag: "Youth Focused", image: "/images/services/bonding.jpg" },
            ].map((treatment, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Service Image */}
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

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
            Real results from real patients. Explore our gallery of orthodontic transformations.
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
                  alt="Before orthodontic treatment"
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
                  alt="After orthodontic treatment - stunning smile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <p className="text-center text-sm text-neutral-muted mt-4">
              Complete smile transformation with Invisalign
            </p>
          </div>

          {/* Additional Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleBeforeAfterCasesOrtho.map((caseItem) => (
              <div key={caseItem.id} className="space-y-4">
                <BeforeAfterSlider
                  beforeUrl={caseItem.beforeUrl}
                  afterUrl={caseItem.afterUrl}
                  altTag={`${caseItem.altTag} at ${clientMasterDataOrtho.globalPracticeName} in ${location.cityServed}`}
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
                  clinical precision. Every treatment is tailored to achieve the stunning
                  results you deserve.
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

      {/* Consultation CTA */}
      <section className="py-20 px-8 bg-teal-700 relative overflow-hidden">
        {/* Background Team Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/team-ortho.jpeg"
            alt={`Our orthodontic team at ${clientMasterDataOrtho.globalPracticeName}`}
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
            {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterDataOrtho.onlineBookingUrl}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-teal-700 transition-all"
              >
                Book Consultation
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Visit Our Studio - Luxury Style */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hours */}
            <div>
              <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Visit Our Studio
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-mainText mb-8">
                Experience Excellence
              </h2>
              <div className="space-y-4">
                {[
                  { day: "Monday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
                  { day: "Friday", hours: "8:00 AM - 2:00 PM" },
                  { day: "Saturday", hours: "Closed" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-neutral-border last:border-0"
                  >
                    <span className="text-brand-mainText font-medium">{schedule.day}</span>
                    <span className={schedule.hours === "Closed" ? "text-neutral-muted" : "text-brand-mainText"}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={clientMasterDataOrtho.onlineBookingUrl !== "none" ? clientMasterDataOrtho.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-brand-primary text-white font-semibold hover:brightness-110 transition-all"
              >
                Schedule Your Consultation
              </a>
            </div>

            {/* Right: Map */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border h-[400px]">
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

      {/* Patient Stories - Luxury Style */}
      <section className="py-20 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-1">
              <p className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Patient Stories
              </p>
              <h2 className="text-3xl font-bold text-brand-mainText leading-tight mb-6">
                Transformation Testimonials
              </h2>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-neutral-muted">5-Star Reviews</p>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleReviewsOrtho.slice(0, 3).map((review, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-transparent border border-neutral-border">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-brand-mainText leading-relaxed mb-6 italic">&ldquo;{review.reviewText}&rdquo;</p>
                  <p className="text-sm font-semibold text-brand-primary">— {review.reviewerName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Practice Difference CTA */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team-ortho.jpeg"
            alt={`${clientMasterDataOrtho.globalPracticeName} team`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 w-full px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider mb-8">
              The {clientMasterDataOrtho.globalPracticeName} Difference
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto italic">
              Where artistry meets precision. Experience transformative orthodontic care
              that enhances your natural beauty and elevates your confidence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-mainText font-semibold hover:shadow-lg transition-all"
              >
                Call Us
              </a>
              {clientMasterDataOrtho.onlineBookingUrl !== "none" && (
                <a
                  href={clientMasterDataOrtho.onlineBookingUrl}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-mainText transition-all"
                >
                  Book Your Transformation
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <T4OrthoFooter />
    </div>
  );
}
