"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Template metadata with premium designations
const templateArchitectures = {
  dental: [
    {
      id: "t1",
      title: "The Prestige Leader",
      subtitle: "Classic Editorial // Heritage Grid",
      blueprint: "split",
      bestFor: ["High-End Cosmetic", "Legacy Multi-Doctor", "Reconstructive Authority"],
      accentColor: "brand-primary",
    },
    {
      id: "t2",
      title: "The Clinical Innovator",
      subtitle: "Precision Grid // Modern Charcoal",
      blueprint: "dashboard",
      bestFor: ["Digital-First Practice", "Tech-Forward Specialists", "Modern Urban Clinics"],
      accentColor: "teal",
    },
    {
      id: "t3",
      title: "The Spatial Sanctuary",
      subtitle: "Zen Minimalist // Luxury Airy",
      blueprint: "centered",
      bestFor: ["Boutique Practices", "Spa-Like Experiences", "Premium Patient Care"],
      accentColor: "amber",
    },
  ],
  ortho: [
    {
      id: "t1-ortho",
      title: "The Prestige Leader",
      subtitle: "Classic Editorial // Heritage Grid",
      blueprint: "split",
      bestFor: ["Established Orthodontics", "Family-Focused Practice", "Multi-Generation Care"],
      accentColor: "brand-primary",
    },
    {
      id: "t2-ortho",
      title: "The Clinical Innovator",
      subtitle: "Precision Grid // Modern Charcoal",
      blueprint: "dashboard",
      bestFor: ["Digital Orthodontics", "Invisalign Specialists", "Teen & Adult Focus"],
      accentColor: "teal",
    },
    {
      id: "t3-ortho",
      title: "The Spatial Sanctuary",
      subtitle: "Zen Minimalist // Luxury Airy",
      blueprint: "centered",
      bestFor: ["Boutique Orthodontics", "Luxury Patient Experience", "Concierge Care"],
      accentColor: "amber",
    },
  ],
};

// CSS Blueprint Wireframe Components
function BlueprintSplit() {
  return (
    <div className="w-full h-full p-4 flex gap-3">
      {/* Left Column - Text Blocks */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3 w-3/4 bg-slate-300/50 rounded-sm" />
        <div className="h-2 w-full bg-slate-200/40 rounded-sm" />
        <div className="h-2 w-5/6 bg-slate-200/40 rounded-sm" />
        <div className="flex-1" />
        <div className="h-6 w-20 bg-slate-300/60 rounded-sm" />
      </div>
      {/* Right Column - Portrait Frame */}
      <div className="w-[45%] border border-slate-300/50 rounded-sm bg-gradient-to-br from-slate-100/30 to-slate-200/20 flex items-center justify-center">
        <div className="w-8 h-10 border border-slate-300/40 rounded-sm" />
      </div>
    </div>
  );
}

function BlueprintDashboard() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-2">
      {/* Top Bar */}
      <div className="h-4 w-full flex gap-2">
        <div className="h-full w-16 bg-slate-300/50 rounded-sm" />
        <div className="flex-1" />
        <div className="h-full w-8 bg-slate-200/40 rounded-sm" />
        <div className="h-full w-8 bg-slate-200/40 rounded-sm" />
      </div>
      {/* Grid */}
      <div className="flex-1 grid grid-cols-4 gap-1.5 mt-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`border border-slate-300/40 rounded-sm ${
              i % 3 === 0 ? "bg-slate-200/30" : "bg-transparent"
            }`}
          />
        ))}
      </div>
      {/* Bottom Stats */}
      <div className="h-3 w-full flex gap-3 mt-1">
        <div className="h-full w-12 bg-slate-300/40 rounded-sm" />
        <div className="h-full w-12 bg-slate-300/40 rounded-sm" />
        <div className="h-full w-12 bg-slate-300/40 rounded-sm" />
      </div>
    </div>
  );
}

function BlueprintCentered() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-3">
      {/* Centered Content */}
      <div className="h-2 w-16 bg-slate-200/40 rounded-sm" />
      <div className="h-4 w-32 bg-slate-300/50 rounded-sm" />
      <div className="h-2 w-24 bg-slate-200/40 rounded-sm" />
      <div className="h-px w-12 bg-slate-300/60 my-1" />
      <div className="h-2 w-40 bg-slate-200/30 rounded-sm" />
      <div className="h-2 w-36 bg-slate-200/30 rounded-sm" />
      <div className="h-5 w-20 bg-slate-300/50 rounded-sm mt-2" />
    </div>
  );
}

function BlueprintRenderer({ type }: { type: string }) {
  switch (type) {
    case "split":
      return <BlueprintSplit />;
    case "dashboard":
      return <BlueprintDashboard />;
    case "centered":
      return <BlueprintCentered />;
    default:
      return <BlueprintSplit />;
  }
}

export default function HomePage() {
  const [practiceType, setPracticeType] = useState<"dental" | "ortho">("dental");

  const templates = templateArchitectures[practiceType];

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Premium Header */}
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-medium mb-2">
                Opkie Design Systems
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-[-0.02em]">
                Template Architecture Gallery
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-lg">
                Premium healthcare website frameworks engineered for conversion excellence and brand authority.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/60 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-700">
                  System Status: {templates.length} Core Dynamic Architectures Compiled // Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Premium Segmented Toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative inline-flex items-center bg-white rounded-2xl p-1.5 ring-1 ring-slate-200 shadow-sm">
            {/* Animated Background Slider */}
            <motion.div
              className="absolute h-[calc(100%-12px)] top-1.5 bg-slate-900 rounded-xl shadow-lg"
              initial={false}
              animate={{
                x: practiceType === "dental" ? 6 : "calc(100% + 6px)",
                width: practiceType === "dental" ? "calc(50% - 9px)" : "calc(50% - 9px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setPracticeType("dental")}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                practiceType === "dental"
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Dental Practice
              </span>
            </button>
            <button
              onClick={() => setPracticeType("ortho")}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                practiceType === "ortho"
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Orthodontic Practice
              </span>
            </button>
          </div>
        </div>

        {/* Template Architecture Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={practiceType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {templates.map((template, index) => (
              <motion.a
                key={template.id}
                href={`/${template.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200/80 hover:ring-slate-300 hover:shadow-xl transition-all duration-500"
              >
                {/* Blueprint Wireframe Container */}
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                  {/* Grid Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Blueprint Wireframe */}
                  <div className="relative z-10 w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                    <BlueprintRenderer type={template.blueprint} />
                  </div>

                  {/* Hover Overlay with CTA */}
                  <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-sm font-semibold text-slate-900 shadow-lg"
                    >
                      <span>Launch Interactive Live Preview</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Architecture Index Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 flex items-center justify-center shadow-sm">
                      <span className="text-[11px] font-bold text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Blueprint Type Label */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm">
                      <span className="text-[9px] uppercase tracking-[0.15em] font-semibold text-slate-400">
                        {template.blueprint === "split" && "Editorial Layout"}
                        {template.blueprint === "dashboard" && "Grid System"}
                        {template.blueprint === "centered" && "Centered Flow"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Template Info Panel */}
                <div className="p-6">
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 tracking-tight mb-1">
                      {template.title}
                    </h2>
                    <p className="text-xs font-medium text-slate-400 tracking-wide">
                      {template.subtitle}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-slate-100 mb-4" />

                  {/* Best For Tags */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium mb-2">
                      Best For
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {template.bestFor.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-[10px] font-medium text-slate-500 bg-slate-100 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Production Ready
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span className="text-xs font-medium">View</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer Attribution */}
        <div className="mt-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-medium">
            Engineered by Opkie Design Systems // Zero Layout Shift Architecture
          </p>
        </div>
      </div>
    </main>
  );
}
