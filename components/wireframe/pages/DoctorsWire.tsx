import { clientMasterData } from "@/data/master";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireImg,
  WireLines,
  WireNote,
  WireCtaSection,
} from "../primitives";

export default function DoctorsWire({ homeHref = "" }: { homeHref?: string }) {
  void homeHref;
  const { globalPracticeName, onlineBookingUrl, doctors, locations } =
    clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const loc = locations[0];
  const team = doctors.length > 0 ? doctors : [null, null];

  return (
    <WireBody>
      <WirePageHeader
        kicker="Doctors"
        title="Meet the doctors"
        intro={`The dentists behind ${practiceName} — their training, their credentials, and how they care for patients.`}
      />

      {team.map((doctor, i) => (
        <WireSection key={doctor?.name || i} label={`Doctor profile ${i + 1}`}>
          <div className="grid gap-6 md:grid-cols-[240px,1fr]">
            <WireImg label="Doctor portrait" className="aspect-[3/4] w-full max-w-60" />
            <div>
              {doctor?.name ? (
                <>
                  <h2 className="text-xl font-semibold tracking-tight text-neutral-800 sm:text-2xl">
                    {doctor.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-neutral-500">
                    {doctor.role}
                  </p>
                  {doctor.credentials.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
                      {doctor.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="flex gap-2 text-sm text-neutral-600"
                        >
                          <span aria-hidden="true" className="text-neutral-400">
                            ✓
                          </span>
                          {credential}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {doctor.biography ? (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
                      {doctor.biography}
                    </p>
                  ) : (
                    <WireLines lines={4} className="mt-4" />
                  )}
                </>
              ) : (
                <>
                  <WireLines lines={2} className="max-w-xs" />
                  <WireLines lines={5} className="mt-5" />
                  <WireNote>
                    Doctor name, credentials, and biography come from the
                    intake file.
                  </WireNote>
                </>
              )}
            </div>
          </div>
        </WireSection>
      ))}

      <WireSection label="Philosophy of care">
        <blockquote className="mx-auto max-w-2xl text-center">
          <div aria-hidden="true" className="mx-auto mb-4 h-8 w-8 rounded-full bg-neutral-200" />
          <WireLines lines={3} />
          <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Pull-quote from the doctor
          </footer>
        </blockquote>
      </WireSection>

      <WireSection label="Credentials & memberships" title="Training, memberships, and continuing education">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Dental association", "State society", "Specialty academy", "Continuing education"].map(
            (item) => (
              <WireImg key={item} label={item} className="aspect-[3/2]" />
            )
          )}
        </div>
        <WireNote>
          Association logos and certifications build patient trust — confirm
          which the practice actually holds before launch.
        </WireNote>
      </WireSection>

      <WireCtaSection
        heading="Choose your dentist"
        sub="Request a specific doctor when you book — we'll make it happen."
        phone={loc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
