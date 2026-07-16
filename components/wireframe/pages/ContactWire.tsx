import { clientMasterData } from "@/data/master";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireImg,
  WireLines,
  WireBtn,
  WireField,
  WireNote,
  WireCtaSection,
} from "../primitives";

export default function ContactWire({ homeHref = "" }: { homeHref?: string }) {
  void homeHref;
  const { globalPracticeName, onlineBookingUrl, trustSignals, locations } =
    clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const primaryLoc = locations[0];

  return (
    <WireBody>
      <WirePageHeader
        kicker="Contact"
        title={`Contact ${practiceName}`}
        intro="Where to find us, when we're open, and the fastest ways to reach the office."
      />

      <WireSection label="Locations & hours" title="Visit the office">
        <div className="grid gap-4 md:grid-cols-2">
          {(locations.length > 0 ? locations : [null]).map((loc, i) => (
            <div
              key={loc?.id || i}
              className="rounded-lg border border-neutral-300 bg-neutral-50 p-5"
            >
              {loc ? (
                <>
                  {locations.length > 1 && loc.officeLabel ? (
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                      {loc.officeLabel}
                    </p>
                  ) : null}
                  <address className="text-sm not-italic leading-relaxed text-neutral-600">
                    {loc.addressGBP || "Street address"}
                    <br />
                    {[loc.cityServed, loc.stateServed]
                      .filter(Boolean)
                      .join(", ") || "City, State"}
                  </address>
                  {loc.phoneGBP ? (
                    <a
                      href={`tel:${loc.phoneGBP.replace(/[^0-9+]/g, "")}`}
                      className="mt-2 inline-block text-sm font-semibold text-neutral-700 underline decoration-dashed underline-offset-4"
                    >
                      {loc.phoneGBP}
                    </a>
                  ) : null}
                  {loc.hoursOfOperation.length > 0 ? (
                    <table className="mt-4 w-full text-sm text-neutral-600">
                      <tbody>
                        {loc.hoursOfOperation.map((hours) => (
                          <tr
                            key={hours.dayRange}
                            className="border-t border-neutral-200"
                          >
                            <td className="py-1.5 pr-3 font-medium">
                              {hours.dayRange}
                            </td>
                            <td className="py-1.5 text-right">
                              {hours.structuralHours}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <WireLines lines={3} className="mt-4" />
                  )}
                </>
              ) : (
                <WireLines lines={5} />
              )}
            </div>
          ))}
        </div>
      </WireSection>

      <WireSection label="Map" title="Find us">
        <WireImg label="Google Map embed" className="aspect-[16/7] w-full" />
        <WireNote>
          The map embed URL already exists in the practice data
          (googleMapsEmbedUrl) — the shared GoogleMapEmbed component wires it
          up during build-out.
        </WireNote>
      </WireSection>

      <WireSection label="Contact form" title="Send us a message">
        <div className="grid max-w-2xl gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <WireField label="Full name" />
            <WireField label="Phone" />
          </div>
          <WireField label="Email" />
          <WireField label="How can we help?" textarea />
          <div>
            <WireBtn>Send message</WireBtn>
          </div>
        </div>
        <WireNote>
          Form handling (provider, spam protection, where submissions go) is
          decided during build-out. Never imply the form is monitored for
          emergencies.
        </WireNote>
      </WireSection>

      <WireSection label="Directions & parking" title="Directions & parking">
        <WireLines lines={3} className="max-w-2xl" />
        <WireNote>
          Landmarks, parking instructions, and transit notes — written with
          the practice during build-out.
        </WireNote>
      </WireSection>

      {trustSignals.hasSameDayEmergency ? (
        <WireSection label="Emergency callout" title="In pain right now?">
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
            We hold time each day for urgent problems. Call as early as you
            can — in many cases we can see you the same day.
          </p>
        </WireSection>
      ) : null}

      <WireCtaSection
        heading="Prefer to just book?"
        sub="Skip the form — grab a time online or give us a call."
        phone={primaryLoc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
