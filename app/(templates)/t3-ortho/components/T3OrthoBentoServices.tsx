"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Sparkles, Smile, Zap, Heart, Clock, Wind, X, ArrowRight } from "lucide-react";

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
  gridArea: string;
  accentFrom: string;
  accentTo: string;
}

const services: BentoService[] = [
  {
    id: "invisalign",
    title: "Invisalign® Clear Aligners",
    shortDescription: "Invisible transformation for the modern smile",
    fullDescription:
      "Experience the gold standard in clear aligner therapy. Our advanced 3D SmileView technology lets you preview your finished smile before treatment begins. Virtually invisible, completely removable, and designed for your lifestyle.",
    benefits: [
      "3D digital smile preview",
      "Virtually invisible treatment",
      "Removable for meals & events",
      "Faster than traditional braces",
    ],
    duration: "12-18 months",
    price: "From $4,200",
    image: "/images/services/invisalign.jpg",
    icon: <Sparkles className="w-5 h-5" />,
    gridArea: "invisalign",
    accentFrom: "from-slate-900/80",
    accentTo: "to-slate-800/50",
  },
  {
    id: "braces",
    title: "Self-Ligating Braces",
    shortDescription: "Advanced metal & ceramic bracket systems",
    fullDescription:
      "Experience next-generation orthodontics with our self-ligating bracket systems. Choose from low-profile metal or tooth-colored ceramic options—both designed for accelerated treatment and unmatched comfort.",
    benefits: [
      "Damon® & Iconix® systems",
      "30% faster treatment times",
      "Fewer adjustment visits",
      "Ceramic & metal options",
    ],
    duration: "18-24 months",
    price: "From $3,800",
    image: "/images/services/full-mouth-smile.jpg",
    icon: <Smile className="w-5 h-5" />,
    gridArea: "braces",
    accentFrom: "from-slate-900/80",
    accentTo: "to-slate-800/50",
  },
  {
    id: "phase1",
    title: "Early Intervention (Phase 1)",
    shortDescription: "Proactive care for developing smiles",
    fullDescription:
      "Interceptive orthodontics for ages 7-10 addresses critical jaw development issues early. By guiding facial growth during this golden window, we often reduce or eliminate the need for extensive treatment later.",
    benefits: [
      "Guided jaw development",
      "Reduced future treatment needs",
      "Improved airway function",
      "Complimentary screenings",
    ],
    duration: "9-15 months",
    price: "From $2,400",
    image: "/images/office-interior.jpg",
    icon: <Heart className="w-5 h-5" />,
    gridArea: "phase1",
    accentFrom: "from-slate-900/80",
    accentTo: "to-slate-800/50",
  },
  {
    id: "accelerated",
    title: "Accelerated Treatment",
    shortDescription: "Faster results with advanced protocols",
    fullDescription:
      "For patients seeking expedited outcomes, our accelerated orthodontic protocols combine low-level light therapy and micro-osteoperfor ation to safely reduce treatment time by up to 40% without compromising results.",
    benefits: [
      "Propel® micro-perforation",
      "OrthoPulse® light therapy",
      "Up to 40% time reduction",
      "Same exceptional results",
    ],
    duration: "Varies by case",
    price: "Add-on $800",
    image: "/images/services/implant.jpg",
    icon: <Zap className="w-5 h-5" />,
    gridArea: "accelerated",
    accentFrom: "from-slate-900/80",
    accentTo: "to-slate-800/50",
  },
  {
    id: "surgical",
    title: "Surgical Orthodontics",
    shortDescription: "Comprehensive jaw alignment solutions",
    fullDescription:
      "For severe skeletal discrepancies, we coordinate seamlessly with leading oral surgeons. Our comprehensive surgical orthodontic treatment addresses complex bite relationships and facial imbalances for life-changing results.",
    benefits: [
      "Coordinated surgical planning",
      "Board-certified partnerships",
      "3D surgical simulation",
      "Lifetime retention protocols",
    ],
    duration: "24-36 months",
    price: "Custom quote",
    image: "/images/team/staff-photo.jpg",
    icon: <Clock className="w-5 h-5" />,
    gridArea: "surgical",
    accentFrom: "from-slate-900/80",
    accentTo: "to-slate-800/50",
  },
  {
    id: "airway",
    title: "Airway-Focused Orthodontics",
    shortDescription: "Alignment that supports lifelong breathing health",
    fullDescription:
      "We evaluate every patient through an airway lens. By expanding the maxilla and optimizing tongue posture, we create beautiful smiles that also promote healthy nasal breathing, better sleep, and improved overall wellness.",
    benefits: [
      "Sleep apnea screening",
      "Palatal expansion therapy",
      "Myofunctional integration",
      "Whole-body health focus",
    ],
    duration: "Included",
    price: "Comprehensive eval",
    image: "/images/services/full-mouth-shade.jpg",
    icon: <Wind className="w-5 h-5" />,
    gridArea: "airway",
    accentFrom: "from-slate-900/80",
    accentTo: "to-slate-800/50",
  },
];

interface BentoCardProps {
  service: BentoService;
  isExpanded: boolean;
  onToggle: () => void;
}

function BentoCard({ service, isExpanded, onToggle }: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      layoutId={service.id}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        ${isExpanded ? "fixed inset-4 md:inset-8 z-50 m-auto max-w-4xl max-h-[90vh]" : "h-full"}
      `}
      style={{ gridArea: isExpanded ? undefined : service.gridArea }}
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
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={`
            object-cover transition-transform duration-700 ease-out
            ${isHovered && !isExpanded ? "scale-110" : "scale-100"}
          `}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={service.id === "invisalign"}
        />
        <div
          className={`
            absolute inset-0 bg-gradient-to-t ${service.accentFrom} ${service.accentTo}
            transition-opacity duration-500
          `}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered && !isExpanded
            ? "inset 0 0 0 2px rgba(255,255,255,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)"
            : "inset 0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px -4px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.4 }}
      />

      <div className={`relative z-10 h-full flex flex-col justify-end p-5 md:p-6 ${isExpanded ? "p-8 md:p-12" : ""}`}>
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-brand-primary mb-3 shadow-lg"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>

              <h3 className="text-lg md:text-xl font-light text-white mb-1.5 tracking-wide drop-shadow-md">
                {service.title}
              </h3>

              <p className="text-white/90 text-sm font-light tracking-wide leading-relaxed drop-shadow-sm">
                {service.shortDescription}
              </p>

              <motion.div
                className="flex items-center gap-2 mt-3 text-white/80 text-xs uppercase tracking-widest"
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
              <button
                onClick={onToggle}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 h-full items-center pt-8 md:pt-0">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-brand-primary shadow-lg">
                    {service.icon}
                  </div>

                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-2">
                      Treatment
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide drop-shadow-lg">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-white/95 font-light leading-relaxed drop-shadow-sm">
                    {service.fullDescription}
                  </p>

                  <div className="flex gap-6 pt-2">
                    {service.duration && (
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          Timeline
                        </p>
                        <p className="text-white font-light drop-shadow-sm">{service.duration}</p>
                      </div>
                    )}
                    {service.price && (
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          Investment
                        </p>
                        <p className="text-white font-light drop-shadow-sm">{service.price}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20">
                  <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-6">
                    What&apos;s Included
                  </p>

                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3 text-white/95"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2 flex-shrink-0" />
                        <span className="font-light tracking-wide">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 w-full py-4 bg-white text-brand-primary text-sm uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-white/90 transition-colors shadow-lg"
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
    </motion.article>
  );
}

export default function T3OrthoBentoServices() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-brand-primary/30" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-muted font-medium">
              Our Treatments
            </p>
            <div className="w-8 h-px bg-brand-primary/30" />
          </div>

          <h2 className="font-sanctuary text-[clamp(1.8rem,4vw,3rem)] font-extralight tracking-[0.02em] mb-6">
            Precision Orthodontic Solutions
          </h2>

          <p className="max-w-xl mx-auto text-neutral-muted font-light leading-relaxed tracking-wide">
            From invisible aligners to advanced surgical coordination, every treatment is engineered
            for your unique facial structure and lifestyle goals.
          </p>
        </div>

        <LayoutGroup>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, minmax(180px, 220px))",
              gridTemplateAreas: `
                "invisalign invisalign braces braces"
                "phase1 phase1 accelerated surgical"
                "phase1 phase1 airway airway"
              `,
            }}
          >
            {services.map((service) => (
              <BentoCard
                key={service.id}
                service={service}
                isExpanded={expandedId === service.id}
                onToggle={() => handleToggle(service.id)}
              />
            ))}
          </div>

          <style jsx>{`
            @media (max-width: 768px) {
              div[style*="gridTemplateAreas"] {
                grid-template-columns: 1fr !important;
                grid-template-rows: repeat(6, 200px) !important;
                grid-template-areas:
                  "invisalign"
                  "braces"
                  "phase1"
                  "accelerated"
                  "surgical"
                  "airway" !important;
              }
            }
          `}</style>
        </LayoutGroup>

        <AnimatePresence>
          {expandedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
