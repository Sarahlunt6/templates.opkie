"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Sparkles, Smile, Shield, Heart, Clock, Leaf, X, ArrowRight } from "lucide-react";

interface BentoService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  duration?: string;
  price?: string;
  image: string;
  icon: React.ReactNode;
  size: "large" | "tall" | "wide" | "standard";
  accent: string;
}

const services: BentoService[] = [
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    shortDescription: "Artistry meets precision for your perfect smile",
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
    image: "/images/services/cosmetic.jpg",
    icon: <Sparkles className="w-5 h-5" />,
    size: "large",
    accent: "from-amber-100/80 to-amber-50/40",
  },
  {
    id: "preventive",
    title: "Preventive Care",
    shortDescription: "Proactive wellness for lasting oral health",
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
    image: "/images/services/preventive.jpg",
    icon: <Shield className="w-5 h-5" />,
    size: "tall",
    accent: "from-teal-100/80 to-teal-50/40",
  },
  {
    id: "restorative",
    title: "Restorative Excellence",
    shortDescription: "Rebuilding function and beauty",
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
    image: "/images/services/restorative.jpg",
    icon: <Heart className="w-5 h-5" />,
    size: "wide",
    accent: "from-rose-100/80 to-rose-50/40",
  },
  {
    id: "orthodontics",
    title: "Clear Aligners",
    shortDescription: "Invisible transformation",
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
    image: "/images/services/aligners.jpg",
    icon: <Smile className="w-5 h-5" />,
    size: "standard",
    accent: "from-sky-100/80 to-sky-50/40",
  },
  {
    id: "sedation",
    title: "Sedation Dentistry",
    shortDescription: "Complete comfort, zero anxiety",
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
    image: "/images/services/sedation.jpg",
    icon: <Clock className="w-5 h-5" />,
    size: "standard",
    accent: "from-violet-100/80 to-violet-50/40",
  },
  {
    id: "holistic",
    title: "Holistic Approach",
    shortDescription: "Whole-body wellness philosophy",
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
    image: "/images/services/holistic.jpg",
    icon: <Leaf className="w-5 h-5" />,
    size: "tall",
    accent: "from-emerald-100/80 to-emerald-50/40",
  },
];

// Grid layout classes based on size
const sizeClasses: Record<BentoService["size"], string> = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  standard: "",
};

interface BentoCardProps {
  service: BentoService;
  isExpanded: boolean;
  onToggle: () => void;
}

function BentoCard({ service, isExpanded, onToggle }: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      layoutId={service.id}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        ${sizeClasses[service.size]}
        ${isExpanded ? "fixed inset-4 md:inset-8 z-50 m-auto max-w-4xl max-h-[90vh]" : ""}
      `}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        scale: isHovered && !isExpanded ? 1.02 : 1,
      }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
      }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={`
            object-cover transition-transform duration-700 ease-out
            ${isHovered && !isExpanded ? "scale-105" : "scale-100"}
          `}
          sizes={service.size === "large" ? "50vw" : "25vw"}
        />
        <div
          className={`
            absolute inset-0 bg-gradient-to-t ${service.accent}
            transition-opacity duration-500
            ${isExpanded ? "opacity-95" : "opacity-90"}
          `}
        />
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Border Illumination Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered && !isExpanded
            ? "inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 40px -10px rgba(0,0,0,0.15)"
            : "inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-end p-6 ${isExpanded ? "p-8 md:p-12" : ""}`}>
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-brand-primary mb-4 backdrop-blur-sm"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">
                {service.title}
              </h3>

              {/* Short Description */}
              <p className="text-white/80 text-sm font-light tracking-wide leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Hover Indicator */}
              <motion.div
                className="flex items-center gap-2 mt-4 text-white/60 text-xs uppercase tracking-widest"
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onToggle}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Expanded Content */}
              <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                {/* Left Column - Info */}
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-brand-primary backdrop-blur-sm">
                    {service.icon}
                  </div>

                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2">
                      Service
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-white/90 font-light leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Meta Info */}
                  <div className="flex gap-6 pt-2">
                    {service.duration && (
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                          Duration
                        </p>
                        <p className="text-white font-light">{service.duration}</p>
                      </div>
                    )}
                    {service.price && (
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                          Starting
                        </p>
                        <p className="text-white font-light">{service.price}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Benefits */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
                  <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-6">
                    What&apos;s Included
                  </p>

                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                        <span className="font-light tracking-wide">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 w-full py-4 bg-white text-brand-primary text-sm uppercase tracking-[0.2em] font-light rounded-lg hover:bg-white/90 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Schedule Consultation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function T3BentoServices() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-brand-primary/30" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-muted font-medium">
              Our Services
            </p>
            <div className="w-8 h-px bg-brand-primary/30" />
          </div>

          <h2 className="font-sanctuary text-[clamp(1.8rem,4vw,3rem)] font-extralight tracking-[0.02em] mb-6">
            Curated Care Experiences
          </h2>

          <p className="max-w-xl mx-auto text-neutral-muted font-light leading-relaxed tracking-wide">
            Each service is thoughtfully designed around your comfort and well-being.
            Explore our offerings and discover the difference mindful dentistry makes.
          </p>
        </div>

        {/* Bento Grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
            {services.map((service) => (
              <BentoCard
                key={service.id}
                service={service}
                isExpanded={expandedId === service.id}
                onToggle={() => handleToggle(service.id)}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Overlay for expanded state */}
        <AnimatePresence>
          {expandedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
