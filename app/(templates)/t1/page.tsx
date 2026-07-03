import type { Metadata } from "next";
import { clientMasterData, sampleReviews, sampleBeforeAfterCases } from "@/data/master";

import "./t1-theme.css";

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
import T1CursorProvider from "./components/T1Cursor";
import { Fade, Magnetic, Drift } from "./components/T1Motion";

const location = clientMasterData.locations[0];

export const metadata: Metadata = {
  title: `${clientMasterData.globalPracticeName} — ${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed}`,
  description: `${clientMasterData.globalPracticeName}: considered ${location.primaryCategoryGBP.toLowerCase()} care in ${location.cityServed}, ${location.stateServed}. Consultation, smile design, and same-day emergency care by reservation.`,
};

/** The editorial services index — copy is template voice; facts stay in data */
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

  const avgRating =
    sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length;
  const avgRatingText = avgRating.toFixed(1);
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

  return (
    <div className="t1-root font-sans antialiased overflow-x-clip">
      <T1CursorProvider>
      <a
        href="#consultation"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#16130F] focus:px-4 focus:py-2 focus:text-[#F7F5F0]"
      >
        Skip to content
      </a>

      {/* Near-invisible paper grain across the whole issue */}
      <div aria-hidden="true" className="t1-grain" />

      <T1Masthead
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />

      {/* Cover */}
      <T1Hero
        practiceName={globalPracticeName}
        city={location.cityServed}
        state={location.stateServed}
        address={location.addressGBP}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        avgRating={avgRatingText}
        reviewCount={sampleReviews.length}
        hasSameDayEmergency={trustSignals.hasSameDayEmergency}
      />

      <main id="main">
        {/* Chapter I — The Consultation */}
        <section
          id="consultation"
          aria-label="Chapter one: the consultation"
          className="scroll-mt-24 px-6 pt-28 md:px-10 md:pt-36 xl:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <T1ChapterHeading
              numeral="I"
              kicker="Chapter one"
              title="The consultation"
              deck="An hour of questions, photographs and honest answers. Nothing is sold, and nothing is drilled."
            />
            <T1DoctorFeature
              doctors={doctorEntries}
              city={location.cityServed}
            />
          </div>
        </section>

        {/* Chapter II — The Design */}
        <section
          id="design"
          aria-label="Chapter two: the design"
          className="scroll-mt-24 pt-28 md:pt-36"
        >
          <div className="px-6 md:px-10 xl:px-16">
            <div className="mx-auto max-w-[1400px]">
              <T1ChapterHeading
                numeral="II"
                kicker="Chapter two"
                title="The design"
                deck="Every smile here is drawn before it is done — planned on screen, previewed in the mirror, and agreed upon before an instrument is lifted."
              />
            </div>
          </div>
          {/* Full-bleed horizontal portfolio — pinned and scrubbed by scroll */}
          <div className="mt-14 lg:mt-4">
            <T1ServicesGallery
              services={SERVICES}
              alsoPracticed={location.secondaryCategoriesGBP}
            />
          </div>
        </section>

        {/* Chapter III — The Craft */}
        <section
          id="craft"
          aria-label="Chapter three: the craft"
          className="scroll-mt-24 px-6 pt-28 md:px-10 md:pt-36 xl:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <T1ChapterHeading
              numeral="III"
              kicker="Chapter three"
              title="The craft"
              deck="The room, the instruments, and the hands that hold them — the part of dentistry patients rarely see and always feel."
            />
            <T1Craft
              practiceName={globalPracticeName}
              city={location.cityServed}
              avgRating={avgRating}
              reviewCount={sampleReviews.length}
              clinicianCount={doctors.length}
              neighborhoodCount={location.localizedNeighborhoods.length}
              hasSedation={trustSignals.hasSedationAnxietyCare}
            />
          </div>
        </section>

        {/* Chapter IV — The Reveal */}
        <section
          id="reveal"
          aria-label="Chapter four: the reveal"
          className="scroll-mt-24 pt-28 md:pt-36"
        >
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 xl:px-16">
            <T1ChapterHeading
              numeral="IV"
              kicker="Chapter four"
              title="The reveal"
              deck="The moment the mirror comes up — documented before and after, exactly as it happened."
            />
          </div>

          {/* Signature moment — the page-turn before/after, matted like a plate in a fine book */}
          <div className="mt-14 lg:mt-20">
            <div className="mx-auto max-w-5xl px-6 md:px-10">
              <T1PageTurnReveal
                beforeUrl={featuredCase.beforeUrl}
                afterUrl={featuredCase.afterUrl}
                altTag={featuredCase.altTag}
                procedureType={featuredCase.procedureType}
              />
            </div>
          </div>

          {/* Letters from patients */}
          <div className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32 xl:px-16">
            <div className="mx-auto max-w-3xl">
              <Fade>
                <p className="t1-eyebrow text-center">
                  Letters from patients — verified stories
                </p>
              </Fade>
              <div className="mt-14">
                <T1PatientLetters letters={letters} />
              </div>
            </div>
          </div>
        </section>

        {/* Practicalities — the back of the book */}
        <section
          id="practicalities"
          aria-label="Practicalities: hours, insurance and directions"
          className="scroll-mt-24 px-6 pt-28 md:px-10 md:pt-36 xl:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <T1ChapterHeading
              numeral="¶"
              kicker="The back of the book"
              title="Practicalities"
              deck="Hours, insurance, directions and the other details that make a first visit simple."
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

        {/* Chapter V — yours to write: closing invitation */}
        <section
          aria-label="Reserve a consultation"
          className="mt-28 bg-[#16130F] px-6 py-28 md:mt-36 md:px-10 md:py-36 xl:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end gap-6 md:gap-10">
              <Drift range={20}>
                <span
                  aria-hidden="true"
                  className="t1-numeral-outline block text-[4.5rem] leading-[0.8] md:text-[7rem]"
                >
                  V
                </span>
              </Drift>
              <div className="h-px flex-1 bg-[#F7F5F0]/20" />
              <p className="t1-eyebrow pb-1 text-right">
                Chapter five — yours to write
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <Fade>
                  <h2 className="font-t1-display text-[clamp(2.6rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.015em] text-[#F7F5F0]">
                    The next case begins with{" "}
                    <em className="text-[#9C7E46]">a conversation.</em>
                  </h2>
                </Fade>
              </div>
              <div className="flex flex-col justify-end lg:col-span-4">
                <Fade delay={0.15}>
                  <p className="max-w-sm font-sans text-base leading-relaxed text-[#F7F5F0]/65">
                    Consultations are unhurried and private. Bring your
                    questions — and, if you like, your skepticism. Both are
                    welcome at {location.addressGBP}, {location.cityServed}.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Magnetic>
                      <a
                        href={
                          onlineBookingUrl !== "none"
                            ? onlineBookingUrl
                            : `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`
                        }
                        {...(onlineBookingUrl !== "none"
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="t1-btn t1-btn-porcelain"
                      >
                        Reserve a consultation
                      </a>
                    </Magnetic>
                    <a
                      href={`tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="font-sans text-sm text-[#F7F5F0] underline decoration-[#9C7E46] decoration-1 underline-offset-4 transition-colors duration-500 hover:text-[#9C7E46]"
                    >
                      or call {location.phoneGBP}
                    </a>
                  </div>
                </Fade>
              </div>
            </div>
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

      <T1UtilityBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
      </T1CursorProvider>
    </div>
  );
}
