import type { Metadata } from "next";
import {
  clientMasterData,
  sampleReviews,
  sampleBeforeAfterCases,
  sampleFaqs,
} from "@/data/master";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

import "./t5-theme.css";
import { t5FontVariables } from "./fonts";

/**
 * T5 MARIGOLD — main-street retro warmth.
 * Sunny cream canvas, saturated marigold and deep retro teal, walnut
 * ink, chunky Young Serif display with one brush-script accent per
 * section. The signature is the scalloped awning under the nav and the
 * diner-style services menu with prices posted on the wall. All
 * rendered facts come from @/data/master.
 */

import T5Nav from "./components/T5Nav";
import T5Hero from "./components/T5Hero";
import T5Story from "./components/T5Story";
import T5Menu from "./components/T5Menu";
import T5Gadgets from "./components/T5Gadgets";
import T5Smiles from "./components/T5Smiles";
import T5Dentists from "./components/T5Dentists";
import T5Comfort from "./components/T5Comfort";
import T5FirstVisit from "./components/T5FirstVisit";
import T5FairSquare from "./components/T5FairSquare";
import T5FridgeDoor from "./components/T5FridgeDoor";
import T5Faq from "./components/T5Faq";
import T5Visit from "./components/T5Visit";
import T5Finale from "./components/T5Finale";
import T5Footer from "./components/T5Footer";
import T5MobileBar from "./components/T5MobileBar";

const location = clientMasterData.locations[0];
const { trustSignals, doctors, globalPracticeName, onlineBookingUrl } =
  clientMasterData;

const allNeighborhoods = clientMasterData.locations.flatMap(
  (loc) => loc.localizedNeighborhoods,
);

export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Your friendly neighborhood dentist in ${location.cityServed} — honest posted prices, on-time appointments, same-day emergencies, and a team your kids will love. New patients welcome at ${globalPracticeName}.`,
};

export default function Template5Page() {
  return (
    <div
      id="top"
      className={`t5-marigold font-t5-body relative min-h-screen overflow-x-clip ${t5FontVariables}`}
    >
      <SchemaMarkup
        practiceData={clientMasterData}
        faqs={sampleFaqs}
        reviews={sampleReviews}
      />

      {/* 1 · nav + NAP (with the awning) */}
      <T5Nav
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        homeHref="/t5"
      />

      {/* 2 · hero — the storefront window */}
      <T5Hero
        practiceName={globalPracticeName}
        city={location.cityServed}
        neighborhoods={allNeighborhoods}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        hasEmergency={trustSignals.hasSameDayEmergency}
      />

      {/* 3 · about — our story & house rules */}
      <T5Story practiceName={globalPracticeName} city={location.cityServed} />

      {/* 4 · services — the menu board */}
      <T5Menu
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        hasEmergency={trustSignals.hasSameDayEmergency}
      />

      {/* 5 · technology — the good gadgets */}
      <T5Gadgets />

      {/* 6 · before / after — show & tell */}
      <T5Smiles cases={sampleBeforeAfterCases} />

      {/* 7 · doctors */}
      <T5Dentists doctors={doctors} />

      {/* 8 · comfort & sedation — the white-knuckle club */}
      <T5Comfort hasSedation={trustSignals.hasSedationAnxietyCare} />

      {/* 9 · first visit — minute by minute */}
      <T5FirstVisit />

      {/* 10 · financing & insurance — fair & square */}
      <T5FairSquare
        insuranceText={trustSignals.insuranceAcceptedText}
        membershipSummary={trustSignals.membershipPlanSummary}
      />

      {/* 11 · reviews — the fridge door */}
      <T5FridgeDoor reviews={sampleReviews} />

      {/* 12 · faq */}
      <T5Faq faqs={sampleFaqs} />

      {/* 13 · visit / locations / hours */}
      <T5Visit
        locations={clientMasterData.locations}
        practiceName={globalPracticeName}
      />

      {/* 14 · final invitation + footer */}
      <T5Finale
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        hasEmergency={trustSignals.hasSameDayEmergency}
      />
      <T5Footer
        practiceName={globalPracticeName}
        locations={clientMasterData.locations}
        bookingUrl={onlineBookingUrl}
        homeHref="/t5"
      />

      <T5MobileBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
    </div>
  );
}
