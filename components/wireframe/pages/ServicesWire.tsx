import { clientMasterData } from "@/data/master";
import { pageHref } from "../site-pages";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireLines,
  WireBtn,
  WireNote,
  WireCtaSection,
} from "../primitives";

const SERVICE_GROUPS: Array<{ label: string; title: string; services: string[] }> = [
  {
    label: "Preventive & family",
    title: "Preventive & family dentistry",
    services: [
      "Cleanings & exams",
      "Digital X-rays",
      "Gum health & periodontal care",
      "Sealants & fluoride",
      "Children's dentistry",
    ],
  },
  {
    label: "Cosmetic",
    title: "Cosmetic dentistry",
    services: [
      "Professional whitening",
      "Porcelain veneers",
      "Cosmetic bonding",
      "Clear aligners",
    ],
  },
  {
    label: "Restorative & surgical",
    title: "Restorative & surgical care",
    services: [
      "Crowns & bridges",
      "Dental implants",
      "Root canal therapy",
      "Extractions",
      "Dentures & partials",
    ],
  },
];

export default function ServicesWire({ homeHref = "" }: { homeHref?: string }) {
  const { globalPracticeName, onlineBookingUrl, trustSignals, locations } =
    clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const loc = locations[0];
  const city = loc?.cityServed || "";

  return (
    <WireBody>
      <WirePageHeader
        kicker="Services"
        title={city ? `Dental services in ${city}` : "Dental services"}
        intro={`Everything ${practiceName} offers, from routine checkups to complete smile transformations.`}
      />

      {SERVICE_GROUPS.map((group) => (
        <WireSection key={group.label} label={group.label} title={group.title}>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.services.map((service) => (
              <div
                key={service}
                className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
              >
                <h3 className="mb-2 text-sm font-semibold text-neutral-700">
                  {service}
                </h3>
                <WireLines lines={2} />
              </div>
            ))}
          </div>
        </WireSection>
      ))}

      {trustSignals.hasSameDayEmergency ? (
        <WireSection label="Emergency callout" title="Dental emergencies seen same-day">
          <WireLines lines={2} className="max-w-2xl" />
          <WireNote>
            Emphasized because the practice offers same-day emergency care —
            keep the phone number prominent in the final design.
          </WireNote>
        </WireSection>
      ) : null}

      <WireSection label="Insurance blurb" title="Insurance & payment, in plain language">
        {trustSignals.insuranceAcceptedText ? (
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
            {trustSignals.insuranceAcceptedText}
          </p>
        ) : (
          <WireLines lines={2} className="max-w-2xl" />
        )}
        <div className="mt-4">
          <WireBtn href={pageHref(homeHref, "financing")} variant="outline">
            Financing &amp; insurance details
          </WireBtn>
        </div>
      </WireSection>

      <WireNote>
        The final list of services (and which get their own detail pages) is
        confirmed per practice during build-out.
      </WireNote>

      <WireCtaSection
        heading="Not sure what you need?"
        sub="Book an exam and we'll build a plan together — no pressure, no surprises."
        phone={loc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
