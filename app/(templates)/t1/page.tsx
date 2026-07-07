import type { Metadata } from "next";
import { clientMasterData, sampleReviews, sampleBeforeAfterCases, sampleFaqs } from "@/data/master";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

import "./t1-theme.css";

/**
 * T1 PRESS — big graphic editorial print.
 * Warm cream paper, near-black ink, one editorial red. A giant Anton
 * wordmark opens the page and closes it; sections are indexed with
 * mono bracket labels and structured by hairline rules. All rendered
 * facts come from @/data/master.
 */

import T1Masthead from "./components/T1Masthead";
import T1Hero from "./components/T1Hero";
import T1ChapterHeading from "./components/T1ChapterHeading";
import T1DoctorFeature from "./components/T1DoctorFeature";
import T1ServicesGallery, {
  type ServiceEntry,
} from "./components/T1ServicesGallery";
import T1Craft from "./components/T1Craft";
import T1PageTurnReveal from "./components/T1PageTurnReveal";
import T1PatientLetters from "./components/T1PatientLetters";
import T1Practicalities from "./components/T1Practicalities";
import T1Footer from "./components/T1Footer";
import T1UtilityBar from "./components/T1UtilityBar";
import T1Folio from "./components/T1Folio";
import T1Faq from "./components/T1Faq";
import T1Financing from "./components/T1Financing";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${clientMasterData.globalPracticeName} — ${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed}`,
  description: `${clientMasterData.globalPracticeName}: considered ${location.primaryCategoryGBP.toLowerCase()} care in ${location.cityServed}, ${location.stateServed}. Consultation, smile design, and same-day emergency care by reservation.`,
};

/** The services index — copy is template voice; facts stay in data */
const SERVICES: ServiceEntry[] = [
  {
    title: "Invisalign",
    description:
      "Alignment planned in software and worn in silence. Trays are reviewed against the plan at each visit, so the finish date is a schedule rather than a hope.",
    image: "/images/services/invisalign.jpg",
  },
  {
    title: "Porcelain veneers",
    description:
      "Shades matched against natural light, contours drawn to suit the face they will live in. The aim is a smile that photographs as yours, only kept better.",
    image: "/images/services/full-mouth-shade.jpg",
  },
  {
    title: "Dental implants",
    description:
      "A missing tooth replaced from the root upward — planned on a scan, placed with a guide, restored to be indistinguishable at conversation distance.",
    image: "/images/services/implant.jpg",
  },
  {
    title: "Full-mouth restoration",
    description:
      "For mouths carrying years of patchwork: one considered plan instead of a decade of repairs, sequenced so life continues comfortably in between.",
    image: "/images/services/full-mouth-smile.jpg",
  },
];

export default function Template1Page() {
  const { doctors, trustSignals, globalPracticeName, onlineBookingUrl } =
    clientMasterData;

  const reviewCount = sampleReviews.length;
  const avgRating = reviewCount
    ? sampleReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : null;
  const avgRatingText = avgRating === null ? null : avgRating.toFixed(1);
  const featuredCase = sampleBeforeAfterCases[0];

  const doctorEntries = doctors.map((d) => ({
    name: d.name,
    role: d.role,
    credentials: d.credentials,
    biography: d.biography,
  }));

  const letters = sampleReviews.map((r) => ({
    id: r.id,
    reviewerName: r.reviewerName,
    reviewText: r.reviewText,
    procedureCategory: r.procedureCategory,
  }));

  const firstHours = location.hoursOfOperation[0];

  return (
    <div className="t1-root font-sans antialiased overflow-x-clip">
      <SchemaMarkup
        practiceData={clientMasterData}
        faqs={sampleFaqs}
        reviews={sampleReviews}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#1A1713] focus:px-4 focus:py-2 focus:text-[#F3EFE6]"
      >
        Skip to content
      </a>

      {/* Near-invisible paper grain across the whole issue */}
      <div aria-hidden="true" className="t1-grain" />

      {/* Running folio — vertical page header naming the current chapter */}
      <T1Folio practiceName={globalPracticeName} />

      {/* Utility strip + newspaper masthead */}
      <T1UtilityBar
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        city={location.cityServed}
        state={location.stateServed}
        hoursNote={`${firstHours.dayRange.toUpperCase()} — ${firstHours.structuralHours.toUpperCase()}`}
      />
      <T1Masthead
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />

      {/* Cover — the giant wordmark */}
      <T1Hero
        practiceName={globalPracticeName}
        city={location.cityServed}
        state={location.stateServed}
        address={location.addressGBP}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        avgRating={avgRatingText}
        reviewCount={reviewCount}
        hasSameDayEmergency={trustSignals.hasSameDayEmergency}
      />

      <main id="main">
        {/* [ 01 ] The services */}
        <section
          id="services"
          aria-label="Section one: the services"
          className="scroll-mt-20 px-4 pt-16 md:px-8 md:pt-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1ChapterHeading
              numeral="01"
              kicker="Smile design"
              title="The services"
              deck="Four ways a smile gets rebuilt here — each one planned before it is done, and priced before it is started."
            />
            <div className="mt-10 md:mt-14">
              <T1ServicesGallery
                services={SERVICES}
                alsoPracticed={location.secondaryCategoriesGBP}
              />
            </div>
          </div>
        </section>

        {/* Statement band — why patients stay */}
        <section
          aria-label="The standard of care"
          className="t1-col-rules mt-16 border-y border-[rgba(26,23,19,0.15)] bg-[#E9E3D4] px-4 py-16 md:mt-24 md:px-8 md:py-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1Craft
              practiceName={globalPracticeName}
              city={location.cityServed}
              avgRating={avgRating}
              reviewCount={reviewCount}
              clinicianCount={doctors.length}
              neighborhoodCount={location.localizedNeighborhoods.length}
              hasSedation={trustSignals.hasSedationAnxietyCare}
            />
          </div>
        </section>

        {/* [ 02 ] The doctors */}
        <section
          id="doctors"
          aria-label="Section two: the doctors"
          className="scroll-mt-20 px-4 pt-16 md:px-8 md:pt-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1ChapterHeading
              numeral="02"
              kicker="The profile"
              title="The doctors"
              deck="The people behind the work — credentials on the record, philosophy in plain words."
            />
            <T1DoctorFeature
              doctors={doctorEntries}
              city={location.cityServed}
            />
          </div>
        </section>

        {/* [ 03 ] The cost */}
        <section
          id="financing"
          aria-label="Section three: financing and insurance"
          className="scroll-mt-20 px-4 pt-16 md:px-8 md:pt-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1ChapterHeading
              numeral="03"
              kicker="Cost & coverage"
              title="The cost"
              deck="Financing that fits the month, the insurance we take, and a membership for those without — stated plainly, before you commit."
            />
            <div className="mt-10 md:mt-14">
              <T1Financing
                insuranceText={trustSignals.insuranceAcceptedText}
                membershipSummary={trustSignals.membershipPlanSummary}
                phone={location.phoneGBP}
              />
            </div>
          </div>
        </section>

        {/* [ 04 ] The proof */}
        <section
          id="reviews"
          aria-label="Section four: patient stories and results"
          className="scroll-mt-20 px-4 pt-16 md:px-8 md:pt-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1ChapterHeading
              numeral="04"
              kicker="Verified"
              title="The proof"
              deck="Documented results and the words of the patients who sat in the chair. Nothing here is retouched, including the opinions."
            />

            {/* Before/after plate — the chapter's one full-bleed image moment */}
            <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 md:mt-14">
              <div className="mx-auto max-w-6xl px-4 md:px-0">
                <T1PageTurnReveal
                  beforeUrl={featuredCase.beforeUrl}
                  afterUrl={featuredCase.afterUrl}
                  altTag={featuredCase.altTag}
                  procedureType={featuredCase.procedureType}
                />
              </div>
            </div>

            {/* Testimonial band */}
            <div className="mt-14 md:mt-20">
              <T1PatientLetters letters={letters} avgRating={avgRatingText} />
            </div>
          </div>
        </section>

        {/* [ 05 ] The questions */}
        <section
          id="faq"
          aria-label="Section five: common questions"
          className="scroll-mt-20 px-4 pt-16 md:px-8 md:pt-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1ChapterHeading
              numeral="05"
              kicker="Common questions"
              title="The questions"
              deck="The things patients ask before they book — coverage, comfort, cost, and what a first visit is actually like."
            />
            <div className="mt-10 md:mt-14">
              <T1Faq faqs={sampleFaqs} />
            </div>
          </div>
        </section>

        {/* [ 06 ] The visit */}
        <section
          id="visit"
          aria-label="Section six: plan your visit"
          className="scroll-mt-20 px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24 xl:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <T1ChapterHeading
              numeral="06"
              kicker="Practicalities"
              title="The visit"
              deck="Four steps from a phone call to a plan — then the hours, the address, and the fine print, in full."
            />
            <T1Practicalities
              practiceName={globalPracticeName}
              address={location.addressGBP}
              city={location.cityServed}
              state={location.stateServed}
              phone={location.phoneGBP}
              bookingUrl={onlineBookingUrl}
              mapsEmbedUrl={location.googleMapsEmbedUrl}
              hours={location.hoursOfOperation}
              neighborhoods={location.localizedNeighborhoods}
              insuranceText={trustSignals.insuranceAcceptedText}
              membershipSummary={trustSignals.membershipPlanSummary}
              hasSameDayEmergency={trustSignals.hasSameDayEmergency}
            />
          </div>
        </section>
      </main>

      <T1Footer
        practiceName={globalPracticeName}
        address={location.addressGBP}
        city={location.cityServed}
        state={location.stateServed}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        hours={location.hoursOfOperation}
      />
    </div>
  );
}
