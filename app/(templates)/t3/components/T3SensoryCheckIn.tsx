"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ComfortOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface CheckInStep {
  id: string;
  title: string;
  subtitle: string;
  options: ComfortOption[];
  multiSelect?: boolean;
}

const checkInSteps: CheckInStep[] = [
  {
    id: "aromatherapy",
    title: "Aromatherapy Preference",
    subtitle: "Select your preferred calming scent",
    options: [
      { id: "lavender", label: "Lavender", description: "Classic relaxation", icon: "🌿" },
      { id: "eucalyptus", label: "Eucalyptus", description: "Fresh & clarifying", icon: "🌱" },
      { id: "peppermint", label: "Peppermint", description: "Energizing & clean", icon: "🍃" },
      { id: "none", label: "No Scent", description: "Fragrance-free", icon: "⭕" },
    ],
  },
  {
    id: "audio",
    title: "Audio Environment",
    subtitle: "How would you like to experience your visit?",
    options: [
      { id: "nature", label: "Nature Sounds", description: "Ocean waves, rain", icon: "🌊" },
      { id: "music", label: "Spa Music", description: "Gentle instrumental", icon: "🎵" },
      { id: "guided", label: "Guided Meditation", description: "Breathing exercises", icon: "🧘" },
      { id: "silence", label: "Quiet Space", description: "Peaceful silence", icon: "🤫" },
    ],
  },
  {
    id: "comfort",
    title: "Physical Comfort",
    subtitle: "Select all that would help you feel at ease",
    multiSelect: true,
    options: [
      { id: "blanket", label: "Weighted Blanket", description: "Gentle pressure", icon: "🛏️" },
      { id: "pillow", label: "Neck Pillow", description: "Extra support", icon: "💤" },
      { id: "headphones", label: "Noise-Canceling", description: "Block external sounds", icon: "🎧" },
      { id: "temperature", label: "Temperature Control", description: "Adjust room temp", icon: "🌡️" },
    ],
  },
  {
    id: "pace",
    title: "Visit Pace",
    subtitle: "How would you like us to proceed?",
    options: [
      { id: "slow", label: "Extra Slow", description: "Frequent breaks", icon: "🐢" },
      { id: "moderate", label: "Moderate", description: "Standard pace with check-ins", icon: "🚶" },
      { id: "efficient", label: "Efficient", description: "Steady, focused", icon: "⚡" },
    ],
  },
];

interface T3SensoryCheckInProps {
  onComplete?: (selections: Record<string, string[]>) => void;
}

/**
 * T3 Sensory Check-In Component
 *
 * Interactive, multi-step comfort preference selector.
 * Features:
 * - Liquid cross-fade transitions between steps
 * - Ultra-smooth state changes (no jarring shifts)
 * - Soft spring physics for all animations
 * - Zero layout shift design
 * - Accessible keyboard navigation
 * - Respects prefers-reduced-motion
 *
 * Creates therapeutic, patient-centered onboarding experience.
 */
export default function T3SensoryCheckIn({ onComplete }: T3SensoryCheckInProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentStepData = checkInSteps[currentStep];
  const progress = ((currentStep + 1) / checkInSteps.length) * 100;

  const handleSelection = (stepId: string, optionId: string) => {
    const step = checkInSteps[currentStep];

    if (step.multiSelect) {
      // Toggle selection for multi-select
      const current = selections[stepId] || [];
      const newSelections = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      setSelections({ ...selections, [stepId]: newSelections });
    } else {
      // Single selection
      setSelections({ ...selections, [stepId]: [optionId] });
    }
  };

  const handleNext = () => {
    if (currentStep < checkInSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete
      onComplete?.(selections);
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const stepSelections = selections[currentStepData.id];
    return stepSelections && stepSelections.length > 0;
  };

  // Transition configuration
  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 50,
        damping: 25,
        mass: 1.5,
      };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary/10 text-brand-primary border border-brand-primary/30 rounded-sm text-sm uppercase tracking-[0.2em] font-light hover:bg-brand-primary/20 transition-colors duration-500"
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        <span>Customize Your Visit</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md z-[200]"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={transitionConfig}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-brand-canvas rounded-2xl shadow-2xl z-[201] overflow-hidden"
            >
              {/* Progress Bar */}
              <div className="h-1 bg-neutral-border/30">
                <motion.div
                  className="h-full bg-brand-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Content Container */}
              <div className="p-8 md:p-12 h-[calc(100%-4rem)] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-brand-primary/10 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Step Content with Liquid Transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={transitionConfig}
                    className="min-h-[400px]"
                  >
                    {/* Step Header */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-muted mb-4">
                        Step {currentStep + 1} of {checkInSteps.length}
                      </p>
                      <h2 className="text-3xl font-light tracking-tight mb-2">
                        {currentStepData.title}
                      </h2>
                      <p className="text-sm text-neutral-muted font-light">
                        {currentStepData.subtitle}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {currentStepData.options.map((option) => {
                        const isSelected = selections[currentStepData.id]?.includes(option.id);

                        return (
                          <motion.button
                            key={option.id}
                            onClick={() => handleSelection(currentStepData.id, option.id)}
                            className={`p-6 text-left rounded-xl border-2 transition-all duration-500 ${
                              isSelected
                                ? "border-brand-primary bg-brand-primary/5"
                                : "border-neutral-border/30 hover:border-brand-primary/50 bg-white/50"
                            }`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                          >
                            <div className="flex items-start gap-4">
                              <span className="text-3xl">{option.icon}</span>
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{option.label}</h3>
                                <p className="text-xs text-neutral-muted">{option.description}</p>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center"
                                >
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-neutral-border/30 p-6 flex items-center justify-between bg-white/50">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-6 py-3 text-sm text-neutral-muted hover:text-brand-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-8 py-3 bg-brand-primary text-white text-sm uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {currentStep === checkInSteps.length - 1 ? "Complete" : "Continue"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
