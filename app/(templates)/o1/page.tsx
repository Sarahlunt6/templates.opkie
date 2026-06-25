import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import O1Nav from "./components/O1Nav";
import O1Footer from "./components/O1Footer";
import {
  HeadlineReveal,
  SubheadReveal,
  MagneticElement,
  AnimatedCounter,
} from "@/components/premium";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `Orthodontist in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Premier orthodontic care in ${location.cityServed}. Invisalign, braces, and smile transformations for patients of all ages.`,
};

export default function OrthoTemplate1Page() {
  const { doctors, trustSignals } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-serif antialiased bg-brand-canvas">
      <O1Nav />

      {/* Hero Section - Orthodontic Focus */}
      <section className="min-h-[90vh] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/team/staff-photo.jpg"
            alt="Orthodontic team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[90vh] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 py-20">
            <div className="max-w-2xl">
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider bg-brand-accent text-brand-mainText shadow-2xl transform -rotate-1">
                  Free Consultations
                </span>
                <span className="px-5 py-2.5 text-sm font-bold uppercase tracking-wider bg-white text-brand-mainText shadow-2xl transform rotate-1 translate-y-2">
                  Invisalign Diamond Provider
                </span>
              </div>

              {/* H1 */}
              <HeadlineReveal className="text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-[0.9] tracking-tight mb-4 -ml-1">
                <span className="block">{location.cityServed}'s Premier</span>
                <span className="block text-brand-accent italic font-light text-[0.6em] ml-2">
                  Orthodontist
                </span>
              </HeadlineReveal>

              {/* Subhead */}
              <SubheadReveal className="text-xl text-white/80 leading-relaxed mb-10 max-w-lg ml-4 border-l-2 border-brand-accent pl-6" delay={0.4}>
                Creating confident smiles for over 15 years. From traditional braces to Invisalign,
                we offer personalized treatment plans for patients of all ages.
              </SubheadReveal>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 ml-4">
                <MagneticElement strength={0.2}>
                  <a
                    href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                    className="group inline-flex items-center gap-3 px-8 py-5 bg-white text-brand-mainText font-bold text-lg shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1"
                  >
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {location.phoneGBP}
                  </a>
                </MagneticElement>
                {clientMasterData.onlineBookingUrl !== "none" && (
                  <MagneticElement strength={0.2}>
                    <a
                      href={clientMasterData.onlineBookingUrl}
                      className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-brand-mainText transition-all duration-500"
                    >
                      Book Consultation
                    </a>
                  </MagneticElement>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-end gap-8 lg:gap-16">
            {[
              { value: 15, suffix: "+", label: "Years Experience" },
              { value: 5.0, suffix: "", label: "Google Rating", isRating: true },
              { value: 10000, suffix: "+", label: "Smiles Created" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-none">
                  {stat.isRating ? stat.value : <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />}
                </p>
                <p className="text-xs font-sans uppercase tracking-[0.35em] text-white/50 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Our Services
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-mainText leading-[0.95]">
              Orthodontic
              <span className="block text-brand-primary italic font-light">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Invisalign",
                description: "Clear aligners for a virtually invisible way to straighten your teeth. Perfect for adults and teens.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Traditional Braces",
                description: "Time-tested metal braces with modern comfort. Effective for all types of orthodontic issues.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ),
              },
              {
                title: "Clear Braces",
                description: "Ceramic brackets that blend with your natural tooth color for a more discreet treatment option.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                title: "Early Treatment",
                description: "Phase 1 orthodontics for children to guide jaw growth and create space for permanent teeth.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Retainers",
                description: "Custom retainers to maintain your beautiful results after treatment completion.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Adult Orthodontics",
                description: "It's never too late for a perfect smile. Discreet options designed for adult lifestyles.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white border border-neutral-border hover:border-brand-primary/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-mainText mb-3">{service.title}</h3>
                <p className="text-neutral-muted leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Orthodontist */}
      <section className="py-32 px-8 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
            {/* Portrait */}
            <div className="relative lg:col-span-5 aspect-[3/4] lg:aspect-auto lg:min-h-[700px]">
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-brand-accent/20 pointer-events-none z-10" />
              <div className="absolute inset-0 group">
                <Image
                  src="/images/team/doctor-portrait.jpeg"
                  alt={primaryDoctor.name}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent lg:hidden" />
              </div>
            </div>

            {/* Bio Content */}
            <div className="relative lg:col-span-7 lg:-ml-16 flex items-center z-10">
              <div className="bg-slate-900/95 backdrop-blur-sm p-10 lg:p-14 w-full lg:mr-8">
                <p className="text-brand-accent uppercase tracking-[0.3em] text-sm mb-4 font-medium">
                  Meet Your Orthodontist
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[0.95] mb-2">
                  {primaryDoctor.name}
                </h2>
                <p className="text-brand-accent text-xl mb-8 italic">Board-Certified Orthodontist</p>

                <div className="space-y-6 text-white/70 leading-relaxed">
                  <p>
                    With over 15 years of experience in orthodontics, Dr. {primaryDoctor.name.split(' ').pop()} has helped
                    thousands of patients achieve their dream smiles. As an Invisalign Diamond Provider, our practice
                    is recognized among the top 1% of Invisalign providers nationwide.
                  </p>
                  <p>
                    Our approach combines the latest technology with personalized care, ensuring every patient
                    receives a treatment plan tailored to their unique needs and lifestyle.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-10">
                  {["Board Certified", "Invisalign Diamond", "AAO Member"].map((credential) => (
                    <span
                      key={credential}
                      className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-full"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 px-8 bg-brand-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4 font-medium">
              Patient Stories
            </p>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-mainText leading-[0.95]">
              Smile
              <span className="block text-brand-primary italic font-light">Transformations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleReviews.slice(0, 3).map((review, index) => (
              <div key={index} className="p-8 bg-white border border-neutral-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-muted leading-relaxed mb-6 italic">"{review.text}"</p>
                <p className="font-bold text-brand-mainText">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-brand-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold leading-[0.95] mb-6">
            Ready to Start Your
            <span className="block italic font-light">Smile Journey?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Schedule your free consultation today and discover how we can transform your smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-brand-primary font-bold text-lg shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {location.phoneGBP}
            </a>
            {clientMasterData.onlineBookingUrl !== "none" && (
              <a
                href={clientMasterData.onlineBookingUrl}
                className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold border-2 border-white hover:bg-white hover:text-brand-primary transition-all duration-500"
              >
                Book Online
              </a>
            )}
          </div>
        </div>
      </section>

      <O1Footer />
    </div>
  );
}
