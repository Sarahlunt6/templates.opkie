"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  availableSlots?: TimeSlot[];
}

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface ConciergeBookingSuiteProps {
  doctors: Doctor[];
  practiceName: string;
  phoneNumber: string;
  theme?: "prestige" | "innovator" | "sanctuary";
  onBookingComplete?: (booking: BookingData) => void;
}

interface BookingData {
  doctor: Doctor;
  slot: TimeSlot;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
}

type BookingStep = "doctor" | "datetime" | "details" | "confirmation";

export default function ConciergeBookingSuite({
  doctors,
  practiceName,
  phoneNumber,
  theme = "prestige",
  onBookingComplete,
}: ConciergeBookingSuiteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<BookingStep>("doctor");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    reason: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  // Mouse tracking for magnetic cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Animate step transitions
  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current.querySelector(".step-content"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [currentStep]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep("datetime");
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep("details");
  };

  const handleSubmit = () => {
    if (selectedDoctor && selectedSlot) {
      const booking: BookingData = {
        doctor: selectedDoctor,
        slot: selectedSlot,
        ...formData,
      };
      onBookingComplete?.(booking);
      setCurrentStep("confirmation");
    }
  };

  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setFormData({ patientName: "", patientEmail: "", patientPhone: "", reason: "" });
    setCurrentStep("doctor");
    setIsOpen(false);
  };

  // Theme-based styling
  const getThemeStyles = () => {
    switch (theme) {
      case "innovator":
        return {
          font: "font-innovator",
          accent: "bg-brand-primary",
          border: "border-brand-primary/20",
          text: "text-brand-primary",
        };
      case "sanctuary":
        return {
          font: "font-sanctuary",
          accent: "bg-brand-primary",
          border: "border-brand-primary/10",
          text: "text-brand-primary",
        };
      default:
        return {
          font: "font-prestige",
          accent: "bg-brand-primary",
          border: "border-brand-primary/15",
          text: "text-brand-primary",
        };
    }
  };

  const styles = getThemeStyles();

  // Generate mock time slots
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const times = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

    days.forEach((day, dayIndex) => {
      times.forEach((time) => {
        slots.push({
          date: day,
          time,
          available: Math.random() > 0.3,
        });
      });
    });

    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <>
      {/* Floating Booking Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 ${styles.font}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative group">
          {/* Magnetic glow effect */}
          <motion.div
            className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl"
            style={{
              width: 80,
              height: 80,
              x: -16,
              y: -16,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Main button */}
          <div className="relative flex items-center gap-3 px-6 py-4 bg-brand-primary text-white rounded-full shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm tracking-wide">Book Now</span>
          </div>
        </div>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden ${styles.font}`}
            >
              {/* Progress Bar */}
              <div className="h-1 bg-neutral-100">
                <motion.div
                  className={`h-full ${styles.accent}`}
                  initial={{ width: "25%" }}
                  animate={{
                    width:
                      currentStep === "doctor"
                        ? "25%"
                        : currentStep === "datetime"
                        ? "50%"
                        : currentStep === "details"
                        ? "75%"
                        : "100%",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Header */}
              <div className="px-8 pt-8 pb-4 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-light tracking-wide">Schedule Your Visit</h2>
                    <p className="text-sm text-neutral-500 mt-1">{practiceName}</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center gap-2 mt-6">
                  {["doctor", "datetime", "details", "confirmation"].map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                          currentStep === step
                            ? `${styles.accent} text-white`
                            : index <
                              ["doctor", "datetime", "details", "confirmation"].indexOf(currentStep)
                            ? `${styles.accent} text-white`
                            : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < 3 && <div className="w-8 h-px bg-neutral-200" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="step-content p-8 min-h-[400px]">
                {/* Step 1: Doctor Selection */}
                {currentStep === "doctor" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-light mb-6">Choose Your Provider</h3>
                    <div className="grid gap-4">
                      {doctors.map((doctor) => (
                        <motion.button
                          key={doctor.id}
                          onClick={() => handleDoctorSelect(doctor)}
                          className={`group flex items-center gap-4 p-4 rounded-xl border ${styles.border} hover:border-brand-primary/40 transition-all text-left`}
                          whileHover={{ x: 4 }}
                        >
                          <div className="w-16 h-16 rounded-full bg-neutral-100 overflow-hidden flex-shrink-0">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-neutral-500">{doctor.title}</p>
                            <p className={`text-xs ${styles.text} mt-1`}>{doctor.specialty}</p>
                          </div>
                          <svg
                            className="w-5 h-5 text-neutral-300 group-hover:text-brand-primary transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date/Time Selection */}
                {currentStep === "datetime" && selectedDoctor && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => setCurrentStep("doctor")}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div>
                        <h3 className="text-lg font-light">Select a Time</h3>
                        <p className="text-sm text-neutral-500">With {selectedDoctor.name}</p>
                      </div>
                    </div>

                    {/* Time Grid */}
                    <div className="grid grid-cols-5 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                        <div key={day} className="text-center">
                          <p className="text-xs text-neutral-500 mb-2 font-medium">{day}</p>
                          <div className="space-y-2">
                            {timeSlots
                              .filter((slot) => slot.date === day)
                              .map((slot, idx) => (
                                <motion.button
                                  key={idx}
                                  disabled={!slot.available}
                                  onClick={() => handleSlotSelect(slot)}
                                  className={`w-full py-2 px-1 text-xs rounded-lg transition-all ${
                                    slot.available
                                      ? `border ${styles.border} hover:border-brand-primary hover:bg-brand-primary/5`
                                      : "bg-neutral-50 text-neutral-300 cursor-not-allowed"
                                  } ${
                                    selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                                      ? `${styles.accent} text-white border-transparent`
                                      : ""
                                  }`}
                                  whileHover={slot.available ? { scale: 1.02 } : {}}
                                  whileTap={slot.available ? { scale: 0.98 } : {}}
                                >
                                  {slot.time}
                                </motion.button>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Patient Details */}
                {currentStep === "details" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => setCurrentStep("datetime")}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-light">Your Information</h3>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm text-neutral-500 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg border ${styles.border} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all`}
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-neutral-500 mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.patientEmail}
                            onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${styles.border} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all`}
                            placeholder="jane@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-neutral-500 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={formData.patientPhone}
                            onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${styles.border} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all`}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-500 mb-2">Reason for Visit</label>
                        <textarea
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg border ${styles.border} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all resize-none`}
                          rows={3}
                          placeholder="Describe your dental concern..."
                        />
                      </div>
                    </div>

                    <motion.button
                      onClick={handleSubmit}
                      disabled={!formData.patientName || !formData.patientEmail}
                      className={`w-full py-4 ${styles.accent} text-white rounded-lg font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Confirm Appointment
                    </motion.button>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === "confirmation" && selectedDoctor && selectedSlot && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-20 h-20 ${styles.accent} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>

                    <h3 className="text-2xl font-light mb-2">You're All Set!</h3>
                    <p className="text-neutral-500 mb-8">
                      Your appointment has been scheduled with {selectedDoctor.name}
                    </p>

                    <div className={`inline-block px-6 py-4 rounded-xl border ${styles.border} text-left`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${styles.accent}/10 flex items-center justify-center`}>
                          <svg className={`w-6 h-6 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{selectedSlot.date}, {selectedSlot.time}</p>
                          <p className="text-sm text-neutral-500">{practiceName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-4">
                      <button
                        onClick={resetBooking}
                        className={`px-6 py-3 border ${styles.border} rounded-lg hover:bg-neutral-50 transition-colors`}
                      >
                        Close
                      </button>
                      <a
                        href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
                        className={`px-6 py-3 ${styles.accent} text-white rounded-lg`}
                      >
                        Call Us: {phoneNumber}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
