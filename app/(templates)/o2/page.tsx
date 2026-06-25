import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import O2Nav from "./components/O2Nav";
import O2Footer from "./components/O2Footer";
import {
  HeadlineReveal,
  CursorGlow,
  AnimatedCounter,
  MagneticElement,
} from "@/components/premium";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `Digital Orthodontics in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Advanced digital orthodontics in ${location.cityServed}. iTero scanning, virtual monitoring, and accelerated treatment with Invisalign.`,
};

export default function OrthoTemplate2Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-innovator bg-zinc-950 text-white relative">
      <CursorGlow color="var(--primary-brand)" size={500} blur={120} opacity={0.12} />

      <O2Nav />

      {/* Hero Section - Tech Forward */}
      <section className="min-h-screen relative overflow-hidden bg-zinc-950">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/office-interior.jpg"
            alt="Modern orthodontic office"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-zinc-950/70" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column - Text */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-brand-primary/80 rotate-45" />
                  <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
                    Digital-First Orthodontics
                  </span>
                </div>

                <HeadlineReveal className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-tight leading-[1.02] mb-8">
                  <span className="block">iTero Scanning.</span>
                  <span className="block">AI Treatment Planning.</span>
                  <span className="block text-brand-primary">Precision Results.</span>
                </HeadlineReveal>

                <p className="text-base md:text-lg text-white/50 max-w-md mb-10 leading-relaxed">
                  No more gooey impressions. Our iTero scanner creates a precise 3D model of your teeth in minutes.
                  See your smile transformation before treatment even begins.
                </p>

                <div className="flex flex-wrap gap-4">
                  <MagneticElement strength={0.15}>
                    <a
                      href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-300"
                    >
                      <span>Start Your Scan</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </MagneticElement>
                  <MagneticElement strength={0.15}>
                    <a
                      href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-white/15 hover:bg-white/[0.03] hover:border-white/25 transition-all duration-300"
                    >
                      <span>{location.phoneGBP}</span>
                    </a>
                  </MagneticElement>
                </div>
              </div>

              {/* Right Column - Team Photo */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <div className="relative aspect-[4/3] max-w-lg ml-auto rounded-2xl border border-white/[0.05] bg-zinc-900/40 overflow-hidden shadow-2xl">
                  <Image
                    src="/images/team/staff-photo.jpg"
                    alt="Orthodontic team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 border-t border-white/[0.05] bg-zinc-950/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 5000, suffix: "+", label: "Smiles Created" },
                { value: 98, suffix: "%", label: "Patient Satisfaction" },
                { value: 50, suffix: "%", label: "Faster Treatment" },
                { value: 15, suffix: "+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 px-8 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-medium">
              Our Technology
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold text-white mt-4">
              Digital Precision at Every Step
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "iTero Scanner",
                description: "Digital impressions in minutes. No goop, no discomfort. See your new smile instantly with Outcome Simulator.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "3D Treatment Planning",
                description: "AI-powered software maps your entire treatment journey. Every movement calculated for optimal efficiency.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ),
              },
              {
                title: "Virtual Monitoring",
                description: "Track your progress from home. Fewer office visits, same amazing results. Perfect for busy schedules.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
            ].map((tech, index) => (
              <div
                key={index}
                className="group p-8 bg-zinc-800/50 border border-white/[0.05] rounded-2xl hover:border-brand-primary/30 hover:bg-zinc-800 transition-all duration-500"
              >
                <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{tech.title}</h3>
                <p className="text-white/50 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-8 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-medium">
              Treatment Options
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold text-white mt-4">
              Solutions for Every Smile
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Invisalign", desc: "Clear aligners for invisible treatment" },
              { title: "Invisalign Teen", desc: "Designed specifically for teenage lifestyles" },
              { title: "Clear Braces", desc: "Ceramic brackets that blend naturally" },
              { title: "Accelerated Treatment", desc: "Get results up to 50% faster" },
            ].map((service, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-6 border border-white/[0.05] rounded-xl hover:border-brand-primary/30 hover:bg-zinc-900/50 transition-all duration-300"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm mt-1">{service.desc}</p>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 px-8 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-medium">
              Patient Stories
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold text-white mt-4">
              Real Results, Real People
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleReviews.slice(0, 3).map((review, index) => (
              <div key={index} className="p-8 bg-zinc-800/50 border border-white/[0.05] rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">"{review.reviewText}"</p>
                <p className="font-semibold text-white">{review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-brand-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready for Your Digital Smile Scan?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Book your free consultation and see your new smile in minutes with our iTero scanner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-brand-primary font-bold text-lg rounded-xl shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              Book Free Scan
            </a>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold border-2 border-white text-white rounded-xl hover:bg-white hover:text-brand-primary transition-all duration-500"
            >
              {location.phoneGBP}
            </a>
          </div>
        </div>
      </section>

      <O2Footer />
    </div>
  );
}
