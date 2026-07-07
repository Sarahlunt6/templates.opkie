"use client";

import type {
  MasterDentalPracticeSchema,
  FaqItem,
  ReviewData,
} from "@/types/dentist";

interface SchemaMarkupProps {
  practiceData: MasterDentalPracticeSchema;
  /** When provided, emits FAQPage structured data */
  faqs?: FaqItem[];
  /** When provided, emits an AggregateRating on the practice */
  reviews?: ReviewData[];
}

export function SchemaMarkup({ practiceData, faqs, reviews }: SchemaMarkupProps) {
  const location = practiceData.locations[0];

  const aggregateRating =
    reviews && reviews.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1),
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : undefined;

  // Format opening hours for schema
  const openingHours = location.hoursOfOperation.map((day) => {
    if (day.structuralHours.toLowerCase().includes("closed")) {
      return null;
    }
    return `${day.dayRange} ${day.structuralHours}`;
  }).filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `https://${practiceData.globalPracticeName.toLowerCase().replace(/\s+/g, "")}.com`,
    "name": location.practiceNameGBP,
    "image": practiceData.brandingLogoUrl,
    "url": `https://${practiceData.globalPracticeName.toLowerCase().replace(/\s+/g, "")}.com`,
    "telephone": location.phoneGBP,
    "priceRange": "$$-$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.addressGBP,
      "addressLocality": location.cityServed,
      "addressRegion": location.stateServed,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "0", // Will be populated from Google Maps
      "longitude": "0"
    },
    "openingHoursSpecification": location.hoursOfOperation
      .filter(day => !day.structuralHours.toLowerCase().includes("closed"))
      .map(day => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": day.dayRange,
        "opens": day.structuralHours.split("-")[0]?.trim() || "09:00",
        "closes": day.structuralHours.split("-")[1]?.trim() || "17:00"
      })),
    "areaServed": {
      "@type": "City",
      "name": location.cityServed
    },
    "medicalSpecialty": location.secondaryCategoriesGBP,
    "paymentAccepted": ["Cash", "Credit Card", "Insurance"],
    "currenciesAccepted": "USD",
    ...(aggregateRating ? { aggregateRating } : {}),
  };

  // Multi-location practices also get an Organization umbrella entity
  const organizationSchema =
    practiceData.locations.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": practiceData.globalPracticeName,
          "url": `https://${practiceData.globalPracticeName.toLowerCase().replace(/\s+/g, "")}.com`,
          "logo": practiceData.brandingLogoUrl,
          "contactPoint": practiceData.locations.map((loc) => ({
            "@type": "ContactPoint",
            "telephone": loc.phoneGBP,
            "contactType": "customer service",
            "areaServed": loc.cityServed,
          })),
          "location": practiceData.locations.map((loc) => ({
            "@type": "Dentist",
            "name": loc.practiceNameGBP,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": loc.addressGBP,
              "addressLocality": loc.cityServed,
              "addressRegion": loc.stateServed,
              "addressCountry": "US",
            },
            "telephone": loc.phoneGBP,
          })),
        }
      : undefined;

  const schemas = [schema, organizationSchema, faqSchema].filter(Boolean);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
