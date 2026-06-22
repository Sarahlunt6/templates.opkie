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
    },
    {
      id: "t2",
      title: "The Clinical Innovator",
      subtitle: "Precision Grid // Modern Charcoal",
      blueprint: "dashboard",
      bestFor: ["Digital-First Practice", "Tech-Forward Specialists", "Modern Urban Clinics"],
    },
    {
      id: "t3",
      title: "The Spatial Sanctuary",
      subtitle: "Zen Minimalist // Luxury Airy",
      blueprint: "centered",
      bestFor: ["Boutique Practices", "Spa-Like Experiences", "Premium Patient Care"],
    },
  ],
  ortho: [
    {
      id: "t1-ortho",
      title: "The Prestige Leader",
      subtitle: "Classic Editorial // Heritage Grid",
      blueprint: "split",
      bestFor: ["Established Orthodontics", "Family-Focused Practice", "Multi-Generation Care"],
    },
    {
      id: "t2-ortho",
      title: "The Clinical Innovator",
      subtitle: "Precision Grid // Modern Charcoal",
      blueprint: "dashboard",
      bestFor: ["Digital Orthodontics", "Invisalign Specialists", "Teen & Adult Focus"],
    },
    {
      id: "t3-ortho",
      title: "The Spatial Sanctuary",
      subtitle: "Zen Minimalist // Luxury Airy",
      blueprint: "centered",
      bestFor: ["Boutique Orthodontics", "Luxury Patient Experience", "Concierge Care"],
    },
  ],
};

// Refined Minimalist Preview Components
function PreviewSplit() {
  return (
    <div className="w-full h-full p-6 flex gap-4">
      {/* Left Column - Text Blocks */}
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        <div className="h-2 w-12 bg-slate-200/70 rounded-full" />
        <div className="h-3.5 w-4/5 bg-slate-300/60 rounded" />
        <div className="h-3.5 w-3/5 bg-slate-300/60 rounded" />
        <div className="h-1.5 w-full bg-slate-200/50 rounded-full mt-1" />
        <div className="h-1.5 w-11/12 bg-slate-200/50 rounded-full" />
        <div className="h-1.5 w-4/5 bg-slate-200/50 rounded-full" />
        <div className="mt-3 h-7 w-20 bg-slate-300/50 rounded" />
      </div>
      {/* Right Column - Image Frame */}
      <div className="w-[42%] bg-slate-200/40 rounded flex items-center justify-center">
        <div className="w-12 h-14 bg-slate-300/50 rounded" />
      </div>
    </div>
  );
}

function PreviewDashboard() {
  return (
    <div className="w-full h-full p-5 flex flex-col gap-3">
      {/* Top Nav */}
      <div className="h-3 w-full flex items-center gap-2">
        <div className="h-full w-14 bg-slate-300/60 rounded" />
        <div className="flex-1" />
        <div className="h-2 w-6 bg-slate-200/50 rounded-full" />
        <div className="h-2 w-6 bg-slate-200/50 rounded-full" />
        <div className="h-2 w-6 bg-slate-200/50 rounded-full" />
      </div>
      {/* Hero Stats Row */}
      <div className="flex gap-2 mt-1">
        <div className="flex-1 h-10 bg-slate-200/40 rounded flex items-center justify-center">
          <div className="w-6 h-3 bg-slate-300/50 rounded" />
        </div>
        <div className="flex-1 h-10 bg-slate-200/40 rounded flex items-center justify-center">
          <div className="w-6 h-3 bg-slate-300/50 rounded" />
        </div>
        <div className="flex-1 h-10 bg-slate-200/40 rounded flex items-center justify-center">
          <div className="w-6 h-3 bg-slate-300/50 rounded" />
        </div>
      </div>
      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-4 gap-1.5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`rounded ${
              i === 0 || i === 3 || i === 5
                ? "bg-slate-300/40"
                : "bg-slate-200/30"
            }`}
          />
        ))}
      </div>
      {/* Bottom Bar */}
      <div className="h-2.5 w-full flex gap-4">
        <div className="h-full w-16 bg-slate-300/40 rounded-full" />
        <div className="h-full w-16 bg-slate-200/40 rounded-full" />
        <div className="h-full w-16 bg-slate-200/40 rounded-full" />
      </div>
    </div>
  );
}

function PreviewCentered() {
  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center gap-2.5">
      {/* Label */}
      <div className="h-1.5 w-14 bg-slate-200/60 rounded-full" />
      {/* Headline */}
      <div className="h-4 w-36 bg-slate-300/60 rounded mt-1" />
      <div className="h-4 w-28 bg-slate-300/60 rounded" />
      {/* Divider */}
      <div className="h-px w-10 bg-slate-300/70 my-2" />
      {/* Body Text */}
      <div className="h-1.5 w-44 bg-slate-200/50 rounded-full" />
      <div className="h-1.5 w-40 bg-slate-200/50 rounded-full" />
      <div className="h-1.5 w-36 bg-slate-200/50 rounded-full" />
      {/* CTA */}
      <div className="h-6 w-24 bg-slate-300/50 rounded mt-3" />
    </div>
  );
}

function PreviewRenderer({ type }: { type: string }) {
  switch (type) {
    case "split":
      return <PreviewSplit />;
    case "dashboard":
      return <PreviewDashboard />;
    case "centered":
      return <PreviewCentered />;
    default:
      return <PreviewSplit />;
  }
}

export default function HomePage() {
  const [practiceType, setPracticeType] = useState<"dental" | "ortho">("dental");

  const templates = templateArchitectures[practiceType];

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Premium Header */}
      <header className="bg-white border-b border-slate-100">
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
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50/80 border border-emerald-100 rounded-full">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-700/80">
                  {templates.length} Architectures Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Elegant Typographic Toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative inline-flex items-center bg-white rounded-full p-1 ring-1 ring-slate-200/80 shadow-sm">
            {/* Animated Background Slider */}
            <motion.div
              className="absolute h-[calc(100%-8px)] top-1 bg-slate-900 rounded-full"
              initial={false}
              animate={{
                x: practiceType === "dental" ? 4 : "calc(100% + 4px)",
                width: practiceType === "dental" ? "calc(50% - 6px)" : "calc(50% - 6px)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            <button
              onClick={() => setPracticeType("dental")}
              className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-medium tracking-[-0.01em] transition-colors duration-200 ${
                practiceType === "dental"
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Dental Practice
            </button>
            <button
              onClick={() => setPracticeType("ortho")}
              className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-medium tracking-[-0.01em] transition-colors duration-200 ${
                practiceType === "ortho"
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Orthodontic Practice
            </button>
          </div>
        </div>

        {/* Template Architecture Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={practiceType}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          >
            {templates.map((template, index) => (
              <motion.a
                key={template.id}
                href={`/${template.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200/60 hover:ring-slate-300/80 hover:shadow-lg transition-all duration-400"
              >
                {/* Minimalist Preview Container */}
                <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                  {/* Preview Wireframe */}
                  <div className="relative z-10 w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <PreviewRenderer type={template.blueprint} />
                  </div>

                  {/* Hover Overlay with CTA */}
                  <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-900 shadow-lg">
                      <span>Preview Template</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Subtle Index Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="text-[10px] font-medium text-slate-300 tracking-wide">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Template Info Panel */}
                <div className="px-5 py-5">
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h2 className="text-base font-semibold text-slate-800 tracking-[-0.01em] mb-0.5">
                      {template.title}
                    </h2>
                    <p className="text-[11px] font-medium text-slate-400 tracking-wide">
                      {template.subtitle}
                    </p>
                  </div>

                  {/* Best For Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {template.bestFor.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-medium text-slate-500/80 bg-slate-100/80 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500/70" />
                    <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
                      Ready
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span className="text-[11px] font-medium">View</span>
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer Attribution */}
        <div className="mt-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-300 font-medium">
            Opkie Design Systems
          </p>
        </div>
      </div>
    </main>
  );
}
