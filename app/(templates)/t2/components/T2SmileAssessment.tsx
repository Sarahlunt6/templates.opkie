"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clientMasterData } from "@/data/master";

interface SmileConcern {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const SMILE_CONCERNS: SmileConcern[] = [
  {
    id: "alignment",
    label: "Crooked or Misaligned",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    description: "Teeth that are crowded, spaced, or not straight",
  },
  {
    id: "color",
    label: "Stained or Discolored",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    description: "Yellow, brown, or uneven tooth coloring",
  },
  {
    id: "missing",
    label: "Missing Teeth",
    icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    description: "One or more teeth that need replacement",
  },
  {
    id: "shape",
    label: "Chipped or Worn",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    description: "Damaged, uneven, or worn down teeth",
  },
  {
    id: "gums",
    label: "Gum Issues",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    description: "Gummy smile, receding, or uneven gumline",
  },
  {
    id: "other",
    label: "Other Concerns",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    description: "Something else bothering you about your smile",
  },
];

const STEPS = ["concerns", "photo", "contact", "complete"] as const;
type Step = (typeof STEPS)[number];

export default function T2SmileAssessment() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("concerns");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "email" as "email" | "phone",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const location = clientMasterData.locations[0];

  const handleConcernToggle = (id: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setCurrentStep("complete");
  };

  const resetForm = () => {
    setCurrentStep("concerns");
    setSelectedConcerns([]);
    setUploadedImage(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredContact: "email",
      notes: "",
    });
    setIsOpen(false);
  };

  const getStepNumber = () => STEPS.indexOf(currentStep);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl border border-brand-primary hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Start Smile Assessment</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--t2-bg-secondary)] border border-white/[0.08] rounded-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              >
                <svg
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Progress Bar */}
              {currentStep !== "complete" && (
                <div className="px-8 pt-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-t2-micro text-white/40 uppercase tracking-widest">
                      Step {getStepNumber() + 1} of 3
                    </span>
                    <span className="text-t2-micro text-brand-primary uppercase tracking-widest">
                      {Math.round(((getStepNumber() + 1) / 3) * 100)}% Complete
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((getStepNumber() + 1) / 3) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-brand-primary rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait" custom={1}>
                  {/* Step 1: Concerns */}
                  {currentStep === "concerns" && (
                    <motion.div
                      key="concerns"
                      variants={slideVariants}
                      custom={1}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-t2-headline font-t2-display text-white mb-2">
                        What bothers you about your smile?
                      </h3>
                      <p className="text-t2-body-lg text-white/50 mb-8">
                        Select all that apply. This helps us understand your
                        goals.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {SMILE_CONCERNS.map((concern) => (
                          <motion.button
                            key={concern.id}
                            onClick={() => handleConcernToggle(concern.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                              selectedConcerns.includes(concern.id)
                                ? "bg-brand-primary/10 border-brand-primary/50"
                                : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  selectedConcerns.includes(concern.id)
                                    ? "bg-brand-primary/20"
                                    : "bg-white/5"
                                }`}
                              >
                                <svg
                                  className={`w-5 h-5 ${
                                    selectedConcerns.includes(concern.id)
                                      ? "text-brand-primary"
                                      : "text-white/40"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d={concern.icon}
                                  />
                                </svg>
                              </div>
                              <div>
                                <span
                                  className={`block text-sm font-medium ${
                                    selectedConcerns.includes(concern.id)
                                      ? "text-white"
                                      : "text-white/70"
                                  }`}
                                >
                                  {concern.label}
                                </span>
                                <span className="block text-xs text-white/40 mt-0.5">
                                  {concern.description}
                                </span>
                              </div>
                            </div>

                            {/* Checkmark */}
                            <AnimatePresence>
                              {selectedConcerns.includes(concern.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center"
                                >
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentStep("photo")}
                        disabled={selectedConcerns.length === 0}
                        className="w-full py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition-all"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Photo Upload */}
                  {currentStep === "photo" && (
                    <motion.div
                      key="photo"
                      variants={slideVariants}
                      custom={1}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-t2-headline font-t2-display text-white mb-2">
                        Upload a photo of your smile
                      </h3>
                      <p className="text-t2-body-lg text-white/50 mb-8">
                        Optional but helps us provide personalized
                        recommendations.
                      </p>

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                          uploadedImage
                            ? "border-brand-primary/50 bg-brand-primary/5"
                            : "border-white/20 hover:border-white/40 bg-white/[0.02]"
                        }`}
                      >
                        {uploadedImage ? (
                          <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden">
                            <Image
                              src={uploadedImage}
                              alt="Uploaded smile"
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadedImage(null);
                              }}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                            >
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-white/40"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                            <p className="text-white/70 mb-2">
                              Tap to upload a photo
                            </p>
                            <p className="text-xs text-white/40">
                              JPG, PNG up to 10MB
                            </p>
                          </>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      <div className="flex gap-3 mt-8">
                        <button
                          onClick={() => setCurrentStep("concerns")}
                          className="flex-1 py-4 bg-white/5 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-white/10 transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setCurrentStep("contact")}
                          className="flex-1 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-brand-primary/90 transition-all"
                        >
                          {uploadedImage ? "Continue" : "Skip"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {currentStep === "contact" && (
                    <motion.div
                      key="contact"
                      variants={slideVariants}
                      custom={1}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-t2-headline font-t2-display text-white mb-2">
                        Get your personalized assessment
                      </h3>
                      <p className="text-t2-body-lg text-white/50 mb-8">
                        Our team will review your information and contact you
                        within 24 hours.
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  firstName: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/50 transition-colors"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastName: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/50 transition-colors"
                              placeholder="Smith"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/50 transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/50 transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                            Preferred Contact Method
                          </label>
                          <div className="flex gap-3">
                            <button
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  preferredContact: "email",
                                })
                              }
                              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                                formData.preferredContact === "email"
                                  ? "bg-brand-primary/20 border border-brand-primary/50 text-white"
                                  : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                              }`}
                            >
                              Email
                            </button>
                            <button
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  preferredContact: "phone",
                                })
                              }
                              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                                formData.preferredContact === "phone"
                                  ? "bg-brand-primary/20 border border-brand-primary/50 text-white"
                                  : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                              }`}
                            >
                              Phone
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">
                            Additional Notes (Optional)
                          </label>
                          <textarea
                            value={formData.notes}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                notes: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary/50 transition-colors resize-none"
                            placeholder="Any additional details about your smile goals..."
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-8">
                        <button
                          onClick={() => setCurrentStep("photo")}
                          className="flex-1 py-4 bg-white/5 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-white/10 transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={
                            !formData.firstName ||
                            !formData.email ||
                            isSubmitting
                          }
                          className="flex-1 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="w-5 h-5 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            "Submit Assessment"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Complete */}
                  {currentStep === "complete" && (
                    <motion.div
                      key="complete"
                      variants={slideVariants}
                      custom={1}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"
                      >
                        <svg
                          className="w-10 h-10 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>

                      <h3 className="text-t2-headline font-t2-display text-white mb-2">
                        Assessment Submitted!
                      </h3>
                      <p className="text-t2-body-lg text-white/50 mb-8 max-w-md mx-auto">
                        Thank you, {formData.firstName}! Our team will review
                        your smile assessment and contact you within 24 hours.
                      </p>

                      <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 mb-8">
                        <p className="text-sm text-white/40 mb-3">
                          Want to schedule now instead of waiting?
                        </p>
                        <a
                          href={
                            clientMasterData.onlineBookingUrl !== "none"
                              ? clientMasterData.onlineBookingUrl
                              : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                          }
                          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                        >
                          <span>Book a consultation now</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </div>

                      <button
                        onClick={resetForm}
                        className="text-white/40 hover:text-white/70 transition-colors text-sm"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
