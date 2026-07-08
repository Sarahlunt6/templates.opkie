"use client";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * T3 HAVEN — a restorative ritual for people who dread the dentist
 *
 * Sage sanctuary: pale sage-green canvas, immersive photography with
 * floating glassmorphic annotation chips, numbered first-visit process
 * cards, a mission + stats band, and a photo-testimonial masonry.
 * Oversized two-voice typography (Outfit extralight + Newsreader italic);
 * Moss type, Eucalyptus accent, one Clay moment per screen. The signature
 * is still the guided-breath moment right after the hero. All practice
 * facts interpolate from @/data/master.
 * ═══════════════════════════════════════════════════════════════════════
 */

import "./t3-theme.css";

import {
  clientMasterData,
  sampleReviews,
  sampleBeforeAfterCases,
  sampleFaqs,
} from "@/data/master";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

import T3AmbientDrift from "./components/T3AmbientDrift";
import T3HavenNav from "./components/T3HavenNav";
import T3HavenHero from "./components/T3HavenHero";
import T3BreathGuide from "./components/T3BreathGuide";
import T3FirstVisit from "./components/T3FirstVisit";
import T3MissionStats from "./components/T3MissionStats";
import T3HavenServices from "./components/T3HavenServices";
import T3HavenTechnology from "./components/T3HavenTechnology";
import T3HavenDoctors from "./components/T3HavenDoctors";
import T3Transformations from "./components/T3Transformations";
import T3HavenReviews from "./components/T3HavenReviews";
import T3HavenVisit from "./components/T3HavenVisit";
import T3ClosingInvite from "./components/T3ClosingInvite";
import T3HavenFooter from "./components/T3HavenFooter";
import T3HavenFaq from "./components/T3HavenFaq";
import T3HavenFinancing from "./components/T3HavenFinancing";
import T3MobileBar from "./components/T3MobileBar";

const location = clientMasterData.locations[0];
const { trustSignals, doctors, globalPracticeName, onlineBookingUrl } =
  clientMasterData;

export default function Template3Page() {
  return (
    <div className="t3-haven font-sanctuary relative min-h-screen overflow-x-clip">
      <SchemaMarkup
        practiceData={clientMasterData}
        faqs={sampleFaqs}
        reviews={sampleReviews}
      />
      <T3AmbientDrift />

      {/* near-invisible paper grain over everything — non-interactive */}
      <div className="t3-grain" aria-hidden="true" />

      <T3HavenNav
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />

      <div className="relative z-10">
        {/* serene hero — two-voice headline, layered organic imagery */}
        <T3HavenHero
          practiceName={globalPracticeName}
          city={location.cityServed}
          phone={location.phoneGBP}
          bookingUrl={onlineBookingUrl}
          hasSedation={trustSignals.hasSedationAnxietyCare}
        />

        {/* signature: the guided breath, flowing into the comfort story */}
        <T3BreathGuide hasSedation={trustSignals.hasSedationAnxietyCare} />

        {/* mission sentence + calm stats (about / mission) */}
        <T3MissionStats
          insuranceAcceptedText={trustSignals.insuranceAcceptedText}
          locations={clientMasterData.locations}
        />

        {/* services — soft organic bento with expanding detail + clay emergency card */}
        <T3HavenServices
          phone={location.phoneGBP}
          hasEmergency={trustSignals.hasSameDayEmergency}
          hasSedation={trustSignals.hasSedationAnxietyCare}
        />

        {/* gentle technology — advanced tools, plain language */}
        <T3HavenTechnology />

        {/* quiet transformations — soft-framed before/after */}
        <T3Transformations cases={sampleBeforeAfterCases} />

        {/* the people behind the calm */}
        <T3HavenDoctors doctors={doctors} practiceName={globalPracticeName} />

        {/* philosophy — a first visit as four honest steps */}
        <T3FirstVisit />

        {/* financing & insurance — the affordability story, gently */}
        <T3HavenFinancing
          insuranceText={trustSignals.insuranceAcceptedText}
          membershipSummary={trustSignals.membershipPlanSummary}
        />

        {/* reviews drifting slowly, in serif italic */}
        <T3HavenReviews reviews={sampleReviews} />

        {/* questions, answered gently */}
        <T3HavenFaq faqs={sampleFaqs} />

        {/* practicalities — live status, hours, insurance, membership, map */}
        <T3HavenVisit
          location={location}
          practiceName={globalPracticeName}
          trustSignals={trustSignals}
          bookingUrl={onlineBookingUrl}
        />

        {/* one last gentle ask */}
        <T3ClosingInvite
          practiceName={globalPracticeName}
          phone={location.phoneGBP}
          bookingUrl={onlineBookingUrl}
          hasEmergency={trustSignals.hasSameDayEmergency}
        />

        <T3HavenFooter
          practiceName={globalPracticeName}
          location={location}
          bookingUrl={onlineBookingUrl}
        />
      </div>

      <T3MobileBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
    </div>
  );
}
