"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Smile, Shield, Heart, Clock, Leaf, ArrowRight } from "lucide-react";

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  fullDescription: string;
  benefits: string[];
  duration?: string;
  price?: string;
  image: string;
  accentColor: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Artistry meets precision",
    fullDescription:
      "Transform your smile with our comprehensive cosmetic services. From subtle enhancements to complete makeovers, we craft natural, luminous results that enhance your unique features.",
    benefits: [
      "Digital smile design preview",
      "Same-day veneers available",
      "Natural-looking materials",
      "Complimentary consultation",
    ],
    duration: "60-90 min",
    price: "From $450",
    image: "/images/services/full-mouth-smile.jpg",
    accentColor: "#0f5a53",
  },
  {
    id: "preventive",
    title: "Preventive Care",
    icon: <Shield className="w-4 h-4" />,
    description: "Proactive wellness",
    fullDescription:
      "Experience gentle, thorough preventive care designed to maintain your oral health and catch concerns early. Extended appointments ensure we never rush your comfort.",
    benefits: [
      "60-minute cleanings standard",
      "Advanced early detection",
      "Personalized care plans",
      "Comfort amenities included",
    ],
    duration: "60 min",
    price: "From $185",
    image: "/images/office-interior.jpg",
    accentColor: "#0f5a53",
  },
  {
    id: "restorative",
    title: "Restorative Excellence",
    icon: <Heart className="w-4 h-4" />,
    description: "Rebuilding function & beauty",
    fullDescription:
      "From minor repairs to full reconstructions, our restorative services blend the latest technology with artistic precision. Every restoration is designed to look, feel, and function naturally.",
    benefits: [
      "Same-day crowns available",
      "Biocompatible materials",
      "Minimal-prep techniques",
      "Long-term warranties",
    ],
    duration: "Varies",
    price: "Custom quote",
    image: "/images/services/implant.jpg",
    accentColor: "#0f5a53",
  },
  {
    id: "orthodontics",
    title: "Clear Aligners",
    icon: <Smile className="w-4 h-4" />,
    description: "Invisible transformation",
    fullDescription:
      "Achieve your ideal smile discreetly with our clear aligner treatments. Advanced 3D planning ensures predictable results while you maintain your natural appearance throughout treatment.",
    benefits: [
      "Virtually invisible treatment",
      "Removable for comfort",
      "Faster than traditional braces",
      "No dietary restrictions",
    ],
    duration: "6-18 months",
    price: "From $3,500",
    image: "/images/services/invisalign.jpg",
    accentColor: "#0f5a53",
  },
  {
    id: "sedation",
    title: "Sedation Dentistry",
    icon: <Clock className="w-4 h-4" />,
    description: "Complete comfort, zero anxiety",
    fullDescription:
      "For those who experience dental anxiety, our sedation options create a calm, worry-free experience. From mild relaxation to deeper sedation, we customize comfort to your needs.",
    benefits: [
      "Multiple sedation levels",
      "Certified sedation team",
      "Pre-visit consultation",
      "Post-care support",
    ],
    duration: "Consultation first",
    price: "From $200",
    image: "/images/team/staff-photo.jpg",
    accentColor: "#0f5a53",
  },
  {
    id: "holistic",
    title: "Holistic Approach",
    icon: <Leaf className="w-4 h-4" />,
    description: "Whole-body wellness philosophy",
    fullDescription:
      "Our holistic approach considers your complete well-being. We use biocompatible materials, mercury-free practices, and integrate with your overall health goals.",
    benefits: [
      "Mercury-free practice",
      "Biocompatible materials",
      "Nutrition counseling",
      "Systemic health focus",
    ],
    duration: "90 min initial",
    price: "Included",
    image: "/images/services/full-mouth-shade.jpg",
    accentColor: "#0f5a53",
  },
];

export default function T3SplitPaneNavigator() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(serviceCategories[0]);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#FAFAF8]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-stone-300" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium">
              Our Services
            </p>
            <div className="w-8 h-px bg-stone-300" />
          </div>

          <h2 className="font-sanctuary text-[clamp(1.8rem,4vw,3rem)] font-extralight tracking-[0.02em] mb-6 text-stone-800">
            Curated Care Experiences
          </h2>

          <p className="max-w-xl mx-auto text-stone-600 font-light leading-relaxed tracking-wide">
            Each service is thoughtfully designed around your comfort and well-being.
            Explore our offerings and discover the difference mindful dentistry makes.
          </p>
        </div>

        {/* Split-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
          {/* LEFT COLUMN - Minimalist Vertical Index */}
          <div className="space-y-2">
            {serviceCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`
                  w-full text-left px-6 py-5 transition-all duration-500 ease-out
                  border border-transparent
                  ${
                    activeCategory.id === category.id
                      ? "bg-white/90 backdrop-blur-md border-stone-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                      : "hover:bg-white/40 hover:backdrop-blur-sm"
                  }
                `}
                whileHover={{ x: activeCategory.id === category.id ? 0 : 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                      ${
                        activeCategory.id === category.id
                          ? "bg-[#0f5a53] text-white shadow-lg shadow-[#0f5a53]/20"
                          : "bg-stone-100 text-stone-400"
                      }
                    `}
                    animate={{
                      scale: activeCategory.id === category.id ? 1.05 : 1,
                    }}
                  >
                    {category.icon}
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`
                        text-[11px] uppercase tracking-[0.2em] font-medium mb-1.5 transition-colors duration-500
                        ${
                          activeCategory.id === category.id
                            ? "text-stone-800"
                            : "text-stone-600"
                        }
                      `}
                    >
                      {category.title}
                    </h3>
                    <p
                      className={`
                        text-[10px] tracking-wide font-light transition-colors duration-500
                        ${
                          activeCategory.id === category.id
                            ? "text-stone-500"
                            : "text-stone-400"
                        }
                      `}
                    >
                      {category.description}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {activeCategory.id === category.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="flex-shrink-0 w-1 h-full bg-[#0f5a53] rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* RIGHT COLUMN - Massive Content Presentation Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-stone-200/60"
            >
              {/* Hero Image Section */}
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </motion.div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-[#0f5a53] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-700">
                    Available Now
                  </span>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12">
                  {/* Main Content */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-medium"
                    >
                      Service Overview
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-3xl lg:text-4xl font-sanctuary font-extralight text-stone-800 mb-6 tracking-tight"
                    >
                      {activeCategory.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-stone-600 font-light leading-relaxed mb-8 text-base lg:text-lg"
                    >
                      {activeCategory.fullDescription}
                    </motion.p>

                    {/* Benefits List */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="space-y-3 mb-8"
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-medium">
                        What's Included
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeCategory.benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0f5a53]/10 flex items-center justify-center mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#0f5a53]" />
                            </div>
                            <span className="text-sm text-stone-600 font-light tracking-wide">
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      href="#"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#0f5a53] text-white text-[11px] uppercase tracking-[0.18em] font-medium rounded-lg hover:bg-[#0d4f49] transition-all duration-500 shadow-lg shadow-[#0f5a53]/20 group"
                    >
                      <span>Schedule Consultation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>

                  {/* Meta Sidebar */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:w-[200px] space-y-8"
                  >
                    {activeCategory.duration && (
                      <div className="pb-8 border-b border-stone-200">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-3 font-medium">
                          Duration
                        </p>
                        <p className="text-2xl font-light text-stone-800 tracking-tight">
                          {activeCategory.duration}
                        </p>
                      </div>
                    )}

                    {activeCategory.price && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-3 font-medium">
                          Investment
                        </p>
                        <p className="text-2xl font-light text-stone-800 tracking-tight">
                          {activeCategory.price}
                        </p>
                        <p className="text-xs text-stone-500 mt-2 font-light">
                          Flexible financing available
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
