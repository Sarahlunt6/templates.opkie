import { clientMasterData, sampleBeforeAfterCases } from "@/data/master";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireImg,
  WireLines,
  WireChip,
  WireNote,
  WireCtaSection,
} from "../primitives";

export default function SmileGalleryWire({ homeHref = "" }: { homeHref?: string }) {
  void homeHref;
  const { globalPracticeName, onlineBookingUrl, locations } = clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const loc = locations[0];

  const cases =
    sampleBeforeAfterCases.length > 0
      ? sampleBeforeAfterCases
      : [
          { id: "wire-1", procedureType: "Procedure" },
          { id: "wire-2", procedureType: "Procedure" },
          { id: "wire-3", procedureType: "Procedure" },
        ];
  const procedureChips = Array.from(
    new Set(cases.map((c) => c.procedureType).filter(Boolean))
  );

  return (
    <WireBody>
      <WirePageHeader
        kicker="Smile gallery"
        title="Smile gallery"
        intro={`Real patients of ${practiceName} — real results. Every case here was treated in our office.`}
      />

      <WireSection label="Filters">
        <div className="flex flex-wrap gap-2">
          <WireChip>All smiles</WireChip>
          {procedureChips.map((chip) => (
            <WireChip key={chip}>{chip}</WireChip>
          ))}
        </div>
        <WireNote>
          Filter chips are illustrative — whether filtering is interactive is
          decided during build-out.
        </WireNote>
      </WireSection>

      <WireSection label="Before & after grid" title="Before & after">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((galleryCase) => (
            <figure key={galleryCase.id}>
              <div className="grid grid-cols-2 gap-1.5">
                <WireImg label="Before" className="aspect-square" />
                <WireImg label="After" className="aspect-square" />
              </div>
              <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {galleryCase.procedureType}
              </figcaption>
            </figure>
          ))}
        </div>
      </WireSection>

      <WireSection label="Featured case" title="A transformation, up close">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="grid grid-cols-2 gap-1.5">
            <WireImg label="Before" className="aspect-[3/4]" />
            <WireImg label="After" className="aspect-[3/4]" />
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-neutral-800">
              The patient&apos;s story
            </h3>
            <WireLines lines={5} />
            <WireNote>
              One case told in depth — what the patient wanted, the treatment
              chosen, and how it changed things for them.
            </WireNote>
          </div>
        </div>
      </WireSection>

      <WireSection label="Disclaimer">
        <p className="max-w-2xl text-xs leading-relaxed text-neutral-500">
          Every smile is different — individual results vary. All photos are
          shared with written patient consent. This disclaimer stays on the
          final page.
        </p>
      </WireSection>

      <WireCtaSection
        heading="Want to see what's possible for your smile?"
        sub="Book a consultation and we'll walk through options together."
        phone={loc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
