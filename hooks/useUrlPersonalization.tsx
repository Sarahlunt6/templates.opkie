"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface PersonalizationParams {
  dentist: string | null;
  city: string | null;
  brandColor: string | null;
  practice: string | null;
  phone: string | null;
  specialty: string | null;
}

interface PersonalizedContent {
  params: PersonalizationParams;
  isPersonalized: boolean;
  getGreeting: () => string;
  getCityReference: () => string;
  getDentistName: (fallback: string) => string;
  getPracticeName: (fallback: string) => string;
  getPhone: (fallback: string) => string;
  getSpecialty: (fallback: string) => string;
  getCSSVariables: () => Record<string, string>;
}

/**
 * URL Personalization Engine
 *
 * Enables dynamic content customization via URL parameters:
 * - ?dentist=Dr.%20Sarah%20Chen
 * - ?city=San%20Francisco
 * - ?brandcolor=2D5A4A (hex without #)
 * - ?practice=Harmony%20Dental
 * - ?phone=415-555-0100
 * - ?specialty=Cosmetic%20Dentistry
 *
 * Usage:
 * const { getDentistName, getCityReference, getCSSVariables } = useUrlPersonalization();
 * <h1>Welcome to {getDentistName("Our Practice")}</h1>
 */
export function useUrlPersonalization(): PersonalizedContent {
  const searchParams = useSearchParams();

  const params = useMemo<PersonalizationParams>(() => ({
    dentist: searchParams.get("dentist"),
    city: searchParams.get("city"),
    brandColor: searchParams.get("brandcolor"),
    practice: searchParams.get("practice"),
    phone: searchParams.get("phone"),
    specialty: searchParams.get("specialty"),
  }), [searchParams]);

  const isPersonalized = useMemo(() => {
    return Object.values(params).some(value => value !== null);
  }, [params]);

  const getGreeting = (): string => {
    if (params.city) {
      return `Welcome, ${params.city}`;
    }
    return "Welcome";
  };

  const getCityReference = (): string => {
    if (params.city) {
      return `${params.city}'s`;
    }
    return "Your";
  };

  const getDentistName = (fallback: string): string => {
    return params.dentist || fallback;
  };

  const getPracticeName = (fallback: string): string => {
    return params.practice || fallback;
  };

  const getPhone = (fallback: string): string => {
    return params.phone || fallback;
  };

  const getSpecialty = (fallback: string): string => {
    return params.specialty || fallback;
  };

  const getCSSVariables = (): Record<string, string> => {
    const variables: Record<string, string> = {};

    if (params.brandColor) {
      // Validate hex color (with or without #)
      const cleanHex = params.brandColor.replace("#", "");
      if (/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        variables["--primary-brand"] = `#${cleanHex}`;

        // Generate complementary shades
        variables["--primary-brand-light"] = `#${cleanHex}22`;
        variables["--primary-brand-medium"] = `#${cleanHex}66`;
      }
    }

    return variables;
  };

  return {
    params,
    isPersonalized,
    getGreeting,
    getCityReference,
    getDentistName,
    getPracticeName,
    getPhone,
    getSpecialty,
    getCSSVariables,
  };
}

/**
 * Wrapper component that applies URL-based CSS custom properties
 */
export function PersonalizationWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { getCSSVariables, isPersonalized } = useUrlPersonalization();
  const cssVars = getCSSVariables();

  return (
    <div
      className={className}
      style={isPersonalized ? cssVars : undefined}
      data-personalized={isPersonalized ? "true" : undefined}
    >
      {children}
    </div>
  );
}
