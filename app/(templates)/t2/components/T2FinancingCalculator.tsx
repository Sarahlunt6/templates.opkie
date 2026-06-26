"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientMasterData } from "@/data/master";

interface FinancingOption {
  id: string;
  name: string;
  apr: number;
  minMonths: number;
  maxMonths: number;
  description: string;
}

const FINANCING_OPTIONS: FinancingOption[] = [
  {
    id: "0-apr",
    name: "0% APR Financing",
    apr: 0,
    minMonths: 6,
    maxMonths: 24,
    description: "No interest if paid in full within promotional period",
  },
  {
    id: "low-apr",
    name: "Low APR Extended",
    apr: 9.99,
    minMonths: 24,
    maxMonths: 60,
    description: "Lower monthly payments with competitive interest rate",
  },
];

const TREATMENT_PRESETS = [
  { label: "Invisalign", minPrice: 3500, maxPrice: 7000, avgPrice: 5000 },
  { label: "Single Implant", minPrice: 3000, maxPrice: 5000, avgPrice: 4000 },
  { label: "Full Mouth Implants", minPrice: 20000, maxPrice: 40000, avgPrice: 28000 },
  { label: "Veneers (6)", minPrice: 6000, maxPrice: 12000, avgPrice: 9000 },
  { label: "Custom Amount", minPrice: 500, maxPrice: 50000, avgPrice: 5000 },
];

export default function T2FinancingCalculator() {
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENT_PRESETS[0]);
  const [treatmentCost, setTreatmentCost] = useState(5000);
  const [downPayment, setDownPayment] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<FinancingOption>(FINANCING_OPTIONS[0]);
  const [termMonths, setTermMonths] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);

  const location = clientMasterData.locations[0];

  // Calculate financing details
  const financingDetails = useMemo(() => {
    const amountFinanced = treatmentCost - downPayment;
    const monthlyRate = selectedPlan.apr / 100 / 12;

    let monthlyPayment: number;
    let totalInterest: number;
    let totalCost: number;

    if (selectedPlan.apr === 0) {
      monthlyPayment = amountFinanced / termMonths;
      totalInterest = 0;
      totalCost = treatmentCost;
    } else {
      // Standard loan calculation with interest
      if (monthlyRate === 0) {
        monthlyPayment = amountFinanced / termMonths;
      } else {
        monthlyPayment =
          (amountFinanced * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
          (Math.pow(1 + monthlyRate, termMonths) - 1);
      }
      totalCost = monthlyPayment * termMonths + downPayment;
      totalInterest = totalCost - treatmentCost;
    }

    return {
      amountFinanced,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
    };
  }, [treatmentCost, downPayment, selectedPlan, termMonths]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-t2-micro text-brand-primary uppercase tracking-widest block mb-1">
              Payment Calculator
            </span>
            <h3 className="text-t2-headline font-t2-display text-white">
              Flexible Financing Options
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-brand-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-white/50">
          Estimate your monthly payments with our flexible payment plans.
          Subject to credit approval.
        </p>
      </div>

      {/* Calculator Body */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Treatment Selection */}
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-widest mb-3">
            Select Treatment
          </label>
          <div className="flex flex-wrap gap-2">
            {TREATMENT_PRESETS.map((treatment) => (
              <button
                key={treatment.label}
                onClick={() => {
                  setSelectedTreatment(treatment);
                  setTreatmentCost(treatment.avgPrice);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTreatment.label === treatment.label
                    ? "bg-brand-primary/20 border border-brand-primary/50 text-white"
                    : "bg-white/5 border border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {treatment.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Cost Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-white/40 uppercase tracking-widest">
              Treatment Cost
            </label>
            <span className="text-2xl font-semibold text-white">
              {formatCurrency(treatmentCost)}
            </span>
          </div>
          <input
            type="range"
            min={selectedTreatment.minPrice}
            max={selectedTreatment.maxPrice}
            step={100}
            value={treatmentCost}
            onChange={(e) => setTreatmentCost(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/30 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
          />
          <div className="flex justify-between mt-2 text-xs text-white/30">
            <span>{formatCurrency(selectedTreatment.minPrice)}</span>
            <span>{formatCurrency(selectedTreatment.maxPrice)}</span>
          </div>
        </div>

        {/* Down Payment Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-white/40 uppercase tracking-widest">
              Down Payment
            </label>
            <span className="text-lg font-medium text-white/70">
              {formatCurrency(downPayment)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={treatmentCost * 0.5}
            step={100}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/30 [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-xs text-white/30">
            <span>$0</span>
            <span>{formatCurrency(treatmentCost * 0.5)}</span>
          </div>
        </div>

        {/* Financing Plan Selection */}
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-widest mb-3">
            Financing Plan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FINANCING_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedPlan(option);
                  setTermMonths(
                    Math.min(
                      Math.max(termMonths, option.minMonths),
                      option.maxMonths
                    )
                  );
                }}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedPlan.id === option.id
                    ? "bg-brand-primary/10 border-2 border-brand-primary/50"
                    : "bg-white/[0.03] border border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">
                    {option.name}
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      option.apr === 0 ? "text-emerald-400" : "text-brand-primary"
                    }`}
                  >
                    {option.apr}% APR
                  </span>
                </div>
                <p className="text-xs text-white/40">{option.description}</p>
                <p className="text-xs text-white/30 mt-1">
                  {option.minMonths}-{option.maxMonths} months
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Term Months Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-white/40 uppercase tracking-widest">
              Payment Term
            </label>
            <span className="text-lg font-medium text-white/70">
              {termMonths} months
            </span>
          </div>
          <input
            type="range"
            min={selectedPlan.minMonths}
            max={selectedPlan.maxMonths}
            step={6}
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/30 [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-xs text-white/30">
            <span>{selectedPlan.minMonths} mo</span>
            <span>{selectedPlan.maxMonths} mo</span>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="bg-brand-primary/5 border-t border-white/[0.06] p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Monthly Payment - Highlighted */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
              Monthly Payment
            </span>
            <motion.span
              key={financingDetails.monthlyPayment}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-3xl md:text-4xl font-bold text-brand-primary block"
            >
              {formatCurrency(financingDetails.monthlyPayment)}
            </motion.span>
          </div>

          {/* Amount Financed */}
          <div>
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
              Amount Financed
            </span>
            <span className="text-xl font-semibold text-white">
              {formatCurrency(financingDetails.amountFinanced)}
            </span>
          </div>

          {/* Total Interest */}
          <div>
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
              Total Interest
            </span>
            <span
              className={`text-xl font-semibold ${
                financingDetails.totalInterest === 0
                  ? "text-emerald-400"
                  : "text-white/70"
              }`}
            >
              {financingDetails.totalInterest === 0
                ? "$0"
                : formatCurrency(financingDetails.totalInterest)}
            </span>
          </div>

          {/* Total Cost */}
          <div>
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-1">
              Total Cost
            </span>
            <span className="text-xl font-semibold text-white">
              {formatCurrency(financingDetails.totalCost)}
            </span>
          </div>
        </div>

        {/* Expandable Details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-3 text-sm text-white/50 hover:text-white/70 transition-colors"
        >
          <span>View payment schedule</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                {[...Array(Math.min(6, termMonths))].map((_, i) => {
                  const remaining =
                    financingDetails.amountFinanced -
                    financingDetails.monthlyPayment * i;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white/40">Month {i + 1}</span>
                      <div className="flex items-center gap-8">
                        <span className="text-white/60">
                          Payment: {formatCurrency(financingDetails.monthlyPayment)}
                        </span>
                        <span className="text-white/40">
                          Balance: {formatCurrency(Math.max(0, remaining))}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {termMonths > 6 && (
                  <div className="text-center text-xs text-white/30 pt-2">
                    ... and {termMonths - 6} more payments
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={
              clientMasterData.onlineBookingUrl !== "none"
                ? clientMasterData.onlineBookingUrl
                : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
            }
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-brand-primary/90 transition-all"
          >
            <span>Apply Now</span>
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
          <a
            href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-semibold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-white/10 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Call to Discuss</span>
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-white/30 mt-4 text-center">
          *Estimated payment amounts are for illustrative purposes only. Actual
          rates and terms may vary based on credit approval. Contact our office
          for personalized financing options.
        </p>
      </div>
    </motion.div>
  );
}
