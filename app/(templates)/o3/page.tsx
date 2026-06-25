import type { Metadata } from "next";
import Image from "next/image";
import { clientMasterData, sampleReviews } from "@/data/master";
import O3Nav from "./components/O3Nav";
import O3Footer from "./components/O3Footer";
import {
  TextReveal,
  FloatingElement,
} from "@/components/premium";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `Family Orthodontist in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Warm, welcoming orthodontic care for the whole family in ${location.cityServed}. Creating confident smiles for kids, teens, and adults.`,
};

export default function OrthoTemplate3Page() {
  const { doctors } = clientMasterData;
  const primaryDoctor = doctors[0];

  return (
    <div className="font-sanctuary bg-brand-canvas text-brand-mainText relative">
      <O3Nav />

      {/* Hero - Warm & Welcoming */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-brand-primary/30" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-muted font-medium">
              Welcome to Our Practice
            </p>
            <div className="w-8 h-px bg-brand-primary/30" />
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extralight tracking-[0.02em] leading-[1.1] mb-8">
            A Place Where
            <span className="block text-brand-primary italic">Smiles Bloom</span>
          </h1>

          <p className="text-lg text-neutral-muted leading-relaxed max-w-2xl mx-auto mb-12">
            We believe every smile tells a story. Our family-focused practice creates
            personalized orthodontic journeys for patients of all ages—from first visits
            to lifetime smiles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
            >
              Schedule a Visit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-brand-primary font-medium border border-brand-primary/30 rounded-full hover:bg-brand-primary/5 transition-all duration-300"
            >
              {location.phoneGBP}
            </a>
          </div>
        </div>

        {/* Floating Images */}
        <div className="relative max-w-6xl mx-auto mt-16 px-8">
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            <FloatingElement amplitude={10} duration={6}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/team/staff-photo.jpg"
                  alt="Our friendly team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
              </div>
            </FloatingElement>
            <FloatingElement amplitude={15} duration={7} delay={0.5}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="/images/office-interior.jpg"
                  alt="Welcoming office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
              </div>
            </FloatingElement>
            <FloatingElement amplitude={12} duration={8} delay={1}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/office-exterior.jpg"
                  alt="Our location"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="py-24 px-8 bg-brand-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-4">
              Why Families Choose Us
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.02em]">
              Orthodontics with Heart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Whole-Family Care",
                description: "From age 7 to 70, we treat patients at every stage of life. Schedule appointments together for convenience.",
              },
              {
                title: "Flexible Scheduling",
                description: "Early morning, after school, and Saturday appointments available to fit your family's busy schedule.",
              },
              {
                title: "Comfortable Environment",
                description: "A calming, kid-friendly space where even anxious patients feel at ease from the first visit.",
              },
              {
                title: "Affordable Options",
                description: "Flexible payment plans and we work with most insurance providers. No surprise fees.",
              },
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-white rounded-xl border border-neutral-border/50">
                <h3 className="text-xl font-medium text-brand-mainText mb-3">{feature.title}</h3>
                <p className="text-neutral-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-4">
              Treatment Options
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.02em]">
              Personalized for Every Smile
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Invisalign",
                description: "Clear aligners that fit seamlessly into busy lifestyles. Popular with teens and adults.",
                age: "Teens & Adults",
              },
              {
                title: "Traditional Braces",
                description: "Reliable, effective treatment with options for colored bands to express personality.",
                age: "All Ages",
              },
              {
                title: "Early Treatment",
                description: "Phase 1 orthodontics to guide jaw growth and prevent more complex treatment later.",
                age: "Ages 7-10",
              },
              {
                title: "Teen Orthodontics",
                description: "Options designed for teenage lifestyles, including Invisalign Teen with compliance indicators.",
                age: "Ages 11-17",
              },
              {
                title: "Adult Treatment",
                description: "Discreet options for adults who want to improve their smile without drawing attention.",
                age: "18+",
              },
            ].map((treatment, index) => (
              <div
                key={index}
                className="group flex items-start justify-between gap-8 p-6 border-b border-neutral-border hover:bg-brand-primary/5 transition-colors rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-brand-mainText group-hover:text-brand-primary transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-neutral-muted mt-2">{treatment.description}</p>
                </div>
                <span className="text-sm text-brand-primary font-medium whitespace-nowrap">
                  {treatment.age}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After - Minimal Gallery */}
      <section className="py-24 px-8 bg-brand-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-4">
              Transformations
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.02em]">
              Smile Journeys
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <p className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-white/80 font-medium">
                Before
              </p>
              <Image
                src="/images/cases/smile-before-ortho.png"
                alt="Before orthodontic treatment"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden group">
              <p className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-brand-primary font-medium">
                After
              </p>
              <Image
                src="/images/cases/smile-after-ortho.png"
                alt="After orthodontic treatment"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-neutral-muted mt-10">
            A journey to confidence
          </p>
        </div>
      </section>

      {/* Meet Your Orthodontist */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/team/doctor-portrait.jpeg"
                alt={primaryDoctor.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-4">
                Your Orthodontist
              </p>
              <h2 className="text-3xl font-light text-brand-mainText mb-2">
                {primaryDoctor.name}
              </h2>
              <p className="text-brand-primary italic mb-6">Board-Certified Orthodontist</p>

              <div className="space-y-4 text-neutral-muted leading-relaxed">
                <p>
                  Dr. {primaryDoctor.name.split(' ').pop()} believes that orthodontic care should be a positive
                  experience for the whole family. With a gentle approach and genuine warmth, every patient
                  is treated like a member of our extended family.
                </p>
                <p>
                  When not creating beautiful smiles, you might find them coaching youth sports
                  or volunteering at local schools—always giving back to the community we serve.
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 mt-8 text-brand-primary font-medium hover:gap-3 transition-all"
              >
                <span>Meet the team</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-4">
              Family Stories
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extralight tracking-[0.02em]">
              Happy Smiles, Happy Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleReviews.slice(0, 4).map((review, index) => (
              <div key={index} className="p-8 bg-white rounded-xl border border-neutral-border/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-muted leading-relaxed mb-6 italic">"{review.reviewText}"</p>
                <p className="font-medium text-brand-mainText">{review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-brand-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-light mb-6">
            Ready to Start Your
            <span className="block italic">Smile Journey?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Schedule your free consultation and let's discuss the best treatment
            options for you or your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={clientMasterData.onlineBookingUrl !== "none" ? clientMasterData.onlineBookingUrl : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-brand-primary font-medium rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Book Free Consultation
            </a>
            <a
              href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center px-8 py-4 font-medium border-2 border-white rounded-full hover:bg-white hover:text-brand-primary transition-all duration-300"
            >
              {location.phoneGBP}
            </a>
          </div>
        </div>
      </section>

      <O3Footer />
    </div>
  );
}
