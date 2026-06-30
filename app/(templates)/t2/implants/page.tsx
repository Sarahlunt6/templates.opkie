"use client";

import { motion } from "framer-motion";
import { clientMasterData } from "@/data/master";
import T2Nav from "../components/T2Nav";
import T2Footer from "../components/T2Footer";
import T2ImplantExplodedView from "../components/T2ImplantExplodedView";
import Image from "next/image";

const location = clientMasterData.locations[0];

export default function T2ImplantsPage() {
  return (
    <div className="font-innovator bg-zinc-950 text-white relative overflow-x-hidden">
      <T2Nav />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION — Implant Specialty Focus
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/office-interior.jpg"
            alt="Dental Implant Technology"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-950/90 to-zinc-950" />
        </div>

        {/* Animated Grid Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block text-[11px] tracking-[0.3em] text-teal-400 uppercase font-medium mb-6"
            >
              Advanced Implantology
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-transparent">
                Dental Implants
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              Precision-engineered titanium roots that integrate with your jawbone,
              providing permanent tooth replacement with natural function and aesthetics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.a
                href={
                  clientMasterData.onlineBookingUrl !== "none"
                    ? clientMasterData.onlineBookingUrl
                    : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                }
                className="inline-flex items-center gap-3 px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Free Consultation</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="#learn-more"
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-white/20 hover:border-teal-500/50 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Learn More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-6 md:gap-12 mt-20 max-w-3xl mx-auto"
          >
            {[
              { value: "98%", label: "Success Rate" },
              { value: "1-Day", label: "Placement" },
              { value: "Lifetime", label: "Warranty" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">
              Scroll to Explore
            </span>
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3D EXPLODED VIEW SECTION — Interactive Scroll Animation
      ═══════════════════════════════════════════════════════════════════════ */}
      <T2ImplantExplodedView />

      {/* ═══════════════════════════════════════════════════════════════════════
          TECHNOLOGY BENEFITS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900 relative" id="learn-more">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[11px] tracking-[0.3em] text-teal-400 uppercase font-medium">
              Advanced Technology
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
              Why Choose Our Implants
            </h2>
            <p className="text-base text-neutral-400 max-w-2xl mx-auto">
              State-of-the-art materials and precision placement for superior outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Biocompatible Titanium",
                description: "Grade 5 titanium alloy integrates naturally with bone tissue for permanent stability.",
              },
              {
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                title: "CBCT-Guided Placement",
                description: "3D imaging ensures precise positioning at the optimal angle and depth.",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Immediate Loading",
                description: "Advanced protocols allow same-day temporary crowns in select cases.",
              },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-zinc-950 p-8 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-teal-600/10 border border-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROCESS TIMELINE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[11px] tracking-[0.3em] text-teal-400 uppercase font-medium">
              Treatment Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
              Your Implant Journey
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Consultation & 3D Scan",
                description: "Complete CBCT imaging to map bone density and nerve pathways.",
                duration: "1 hour",
              },
              {
                step: "02",
                title: "Surgical Placement",
                description: "Guided implant placement with sedation options available.",
                duration: "1-2 hours",
              },
              {
                step: "03",
                title: "Healing Period",
                description: "Osseointegration occurs as bone fuses with titanium.",
                duration: "3-6 months",
              },
              {
                step: "04",
                title: "Final Restoration",
                description: "Custom crown fabricated and placed for natural aesthetics.",
                duration: "2 visits",
              },
            ].map((phase, i) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex items-start gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-teal-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-teal-600/10 border border-teal-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-400">{phase.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-sm text-neutral-400 mb-3">{phase.description}</p>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-teal-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {phase.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900 relative" id="consultation">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.3em] text-teal-400 uppercase font-medium">
              Start Your Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6 mb-6">
              Ready for Your Implant?
            </h2>
            <p className="text-base text-neutral-400 mb-10 max-w-xl mx-auto">
              Complimentary consultation includes full 3D imaging and treatment planning.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href={
                  clientMasterData.onlineBookingUrl !== "none"
                    ? clientMasterData.onlineBookingUrl
                    : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                }
                className="inline-flex items-center gap-3 px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Book Free Consultation</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>

              <motion.a
                href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-white/20 hover:border-teal-500/50 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{location.phoneGBP}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <T2Footer />
    </div>
  );
}
