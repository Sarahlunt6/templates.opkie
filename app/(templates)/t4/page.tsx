import type { Metadata } from "next";
import {
  clientMasterData,
  sampleReviews,
  sampleBeforeAfterCases,
  sampleFaqs,
} from "@/data/master";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

import "./t4-theme.css";
import { t4FontVariables } from "./fonts";

/**
 * T4 ATELIER — after-dark cosmetic couture.
 * Warm espresso darkness (never tech-black), champagne brass fittings,
 * porcelain type in a high-contrast Didone. Showcase acts play in dark
 * rooms; practical acts step into porcelain "salon" light. The signature
 * is the vitrine — before/after cases presented as lit display cases
 * with engraved plaques. All rendered facts come from @/data/master.
 */

import T4Nav from "./components/T4Nav";
import T4Hero from "./components/T4Hero";
import T4Philosophy from "./components/T4Philosophy";
import T4Services from "./components/T4Services";
import T4Craft from "./components/T4Craft";
import T4Vitrine from "./components/T4Vitrine";
import T4Doctors from "./components/T4Doctors";
import T4Comfort from "./components/T4Comfort";
import T4FirstVisit from "./components/T4FirstVisit";
import T4Financing from "./components/T4Financing";
import T4Reviews from "./components/T4Reviews";
import T4Faq from "./components/T4Faq";
import T4Visit from "./components/T4Visit";
import T4Finale from "./components/T4Finale";
import T4Footer from "./components/T4Footer";
import T4MobileBar from "./components/T4MobileBar";

const location = clientMasterData.locations[0];
const { trustSignals, doctors, globalPracticeName, onlineBookingUrl } =
  clientMasterData;

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Cosmetic and general dentistry in ${location.cityServed}, practiced like couture — veneers, same-day crowns, and implants, measured and finished by hand. Book a consultation at ${globalPracticeName}.`,
};

export default function Template4Page() {
  return (
    <div
      id="top"
      className={`t4-atelier font-t4-body relative min-h-screen overflow-x-clip ${t4FontVariables}`}
    >
      <SchemaMarkup
        practiceData={clientMasterData}
        faqs={sampleFaqs}
        reviews={sampleReviews}
      />

      {/* 1 · nav + NAP */}
      <T4Nav
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        city={location.cityServed}
        state={location.stateServed}
        bookingUrl={onlineBookingUrl}
        homeHref="/t4"
      />

      {/* 2 · hero */}
      <T4Hero
        practiceName={globalPracticeName}
        city={location.cityServed}
        state={location.stateServed}
        address={location.addressGBP}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />

      {/* 3 · about / philosophy of the house */}
      <T4Philosophy
        practiceName={globalPracticeName}
        locationsCount={clientMasterData.locations.length}
        city={location.cityServed}
      />

      {/* 4 · services — the price book */}
      <T4Services
        phone={location.phoneGBP}
        hasEmergency={trustSignals.hasSameDayEmergency}
      />

      {/* 5 · technology — the workroom */}
      <T4Craft />

      {/* 6 · before / after — the vitrine */}
      <T4Vitrine cases={sampleBeforeAfterCases} />

      {/* 7 · doctors */}
      <T4Doctors doctors={doctors} />

      {/* 8 · comfort & sedation */}
      <T4Comfort hasSedation={trustSignals.hasSedationAnxietyCare} />

      {/* 9 · first visit — the first fitting */}
      <T4FirstVisit />

      {/* 10 · financing & insurance — the terms */}
      <T4Financing
        insuranceText={trustSignals.insuranceAcceptedText}
        membershipSummary={trustSignals.membershipPlanSummary}
      />

      {/* 11 · reviews — in their words */}
      <T4Reviews reviews={sampleReviews} />

      {/* 12 · faq */}
      <T4Faq faqs={sampleFaqs} />

      {/* 13 · visit / locations / hours */}
      <T4Visit
        locations={clientMasterData.locations}
        practiceName={globalPracticeName}
      />

      {/* 14 · final invitation + footer */}
      <T4Finale
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        hasEmergency={trustSignals.hasSameDayEmergency}
      />
      <T4Footer
        practiceName={globalPracticeName}
        locations={clientMasterData.locations}
        bookingUrl={onlineBookingUrl}
        homeHref="/t4"
      />

      <T4MobileBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
    </div>
  );
}
