import { clientMasterData } from "@/data/master";
import { pageHref } from "../site-pages";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireImg,
  WireLines,
  WireBtn,
  WireNote,
  WireStat,
  WireCtaSection,
} from "../primitives";

export default function AboutWire({ homeHref = "" }: { homeHref?: string }) {
  const { globalPracticeName, onlineBookingUrl, doctors, locations } =
    clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const loc = locations[0];
  const city = loc?.cityServed || "";
  const team = doctors.length > 0 ? doctors : [null, null];

  return (
    <WireBody>
      <WirePageHeader
        kicker="About"
        title={`About ${practiceName}`}
        intro={`Who we are, how we practice, and why ${
          city ? `${city} families` : "our patients"
        } trust us with their smiles.`}
      />

      <WireSection label="Our story">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <WireImg label="Practice / team photo" className="aspect-[4/3]" />
          <div>
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-neutral-800">
              How the practice began
            </h2>
            <WireLines lines={5} />
            <WireNote>
              Founding story, years serving {city || "the community"}, and what
              makes the office feel different — written during build-out.
            </WireNote>
          </div>
        </div>
      </WireSection>

      <WireSection label="Mission & values" title="What we stand for">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Comfort first", "Honest recommendations", "Modern technology", "Community roots"].map(
            (value) => (
              <div
                key={value}
                className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
              >
                <div aria-hidden="true" className="mb-3 h-8 w-8 rounded-full bg-neutral-200" />
                <h3 className="mb-2 text-sm font-semibold text-neutral-700">
                  {value}
                </h3>
                <WireLines lines={2} />
              </div>
            )
          )}
        </div>
      </WireSection>

      <WireSection label="Trust strip">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <WireStat label="Google rating" />
          <WireStat label="Patient reviews" />
          <WireStat label="Patients served" />
          <WireStat label="Years of care" />
        </div>
        <WireNote>
          Real numbers (rating, review count, patients served) come from the
          practice&apos;s stats in the intake file.
        </WireNote>
      </WireSection>

      <WireSection label="Team preview" title="The team behind the care">
        <div className="grid gap-4 sm:grid-cols-2">
          {team.map((doctor, i) => (
            <div
              key={doctor?.name || i}
              className="flex items-center gap-4 rounded-lg border border-neutral-300 bg-neutral-50 p-4"
            >
              <WireImg label="Portrait" className="h-20 w-20 shrink-0 rounded-full" />
              <div className="min-w-0">
                {doctor?.name ? (
                  <>
                    <p className="truncate text-sm font-semibold text-neutral-700">
                      {doctor.name}
                    </p>
                    <p className="truncate text-xs text-neutral-500">
                      {doctor.role}
                    </p>
                  </>
                ) : (
                  <WireLines lines={2} className="w-40" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <WireBtn href={pageHref(homeHref, "doctors")} variant="outline">
            Meet the doctors
          </WireBtn>
        </div>
      </WireSection>

      <WireCtaSection
        heading="Ready to visit?"
        sub="New patients are always welcome."
        phone={loc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
