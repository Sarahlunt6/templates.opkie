import Image from "next/image";
import { Fade } from "./T1Motion";

interface DoctorEntry {
  name: string;
  role: string;
  credentials: string[];
  biography: string;
}

interface T1DoctorFeatureProps {
  doctors: DoctorEntry[];
  city: string;
}

/** Local portrait assets — the data placeholders do not ship with the demo */
const PORTRAITS = [
  "/images/team/doctor-portrait.jpeg",
  "/images/team/doctor-portrait.png",
];

/**
 * T1 PRESS — print-profile spread. Large duotone portrait with a
 * halftone edge, the name set in Anton, credentials as a mono index
 * list on hairline rows.
 */
export default function T1DoctorFeature({
  doctors,
  city,
}: T1DoctorFeatureProps) {
  const [principal, ...rest] = doctors;

  return (
    <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
      {/* Portrait — the profile photograph, reproduced in print */}
      <div className="lg:col-span-5">
        <Fade>
          <figure className="group">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#1A1713] bg-[#E9E3D4]">
              <Image
                src={PORTRAITS[0]}
                alt={`Portrait of ${principal.name}, ${principal.role}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                className="t1-duotone object-cover"
              />
              <div
                aria-hidden="true"
                className="t1-halftone pointer-events-none absolute inset-x-0 bottom-0 h-24"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-4 border-x border-b border-[#1A1713] px-3 py-2">
              <span className="t1-mono-label t1-mono-label-stone">
                FIG. 02 — THE DOCTOR
              </span>
              <span className="t1-mono-label t1-mono-label-red hidden sm:block">
                [ {city.toUpperCase()} ]
              </span>
            </figcaption>
          </figure>
        </Fade>
      </div>

      {/* Profile text */}
      <div className="lg:col-span-7">
        <Fade>
          <p className="t1-mono-label t1-mono-label-red">[ THE PROFILE ]</p>
          <h3 className="mt-4 font-t1-press text-[clamp(2rem,4.5vw,3.4rem)] uppercase leading-[0.95] text-[#1A1713]">
            {principal.name}
          </h3>
          <p className="t1-mono-label t1-mono-label-stone mt-3">
            {principal.role.toUpperCase()}
          </p>
        </Fade>

        <Fade delay={0.08}>
          <p className="mt-6 max-w-prose font-sans text-base leading-[1.8] text-[#1A1713]">
            {principal.biography}
          </p>
          <p className="mt-4 max-w-prose font-sans text-base leading-[1.8] text-[#6B675E]">
            Patients arrive from across {city} with photographs, questions,
            and occasionally decades of putting this off. The first hour ends
            with an honest account of what is possible, what is necessary,
            and what is neither.
          </p>
        </Fade>

        {/* Credentials — mono index list */}
        <Fade delay={0.12}>
          <ul className="mt-8" aria-label={`Credentials of ${principal.name}`}>
            {principal.credentials.map((credential, i) => (
              <li
                key={credential}
                className="flex items-baseline gap-5 border-t border-[rgba(26,23,19,0.15)] py-3"
              >
                <span className="t1-mono-label t1-mono-label-red shrink-0">
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <span className="font-sans text-sm leading-relaxed text-[#1A1713]">
                  {credential}
                </span>
              </li>
            ))}
            <li
              className="border-t border-[rgba(26,23,19,0.15)]"
              aria-hidden="true"
            />
          </ul>
        </Fade>

        {/* Pull quote — the one red statement of the spread */}
        <Fade delay={0.16}>
          <blockquote className="mt-10 border-l-2 border-[#D92B21] pl-6">
            <p className="font-t1-press text-xl uppercase leading-tight text-[#1A1713] md:text-2xl">
              &ldquo;The best dentistry is the kind you eventually stop
              thinking about.&rdquo;
            </p>
            <footer className="t1-mono-label t1-mono-label-stone mt-3">
              — {principal.name.toUpperCase()}
            </footer>
          </blockquote>
        </Fade>

        {/* Also in practice */}
        {rest.length > 0 && (
          <Fade delay={0.2}>
            <aside className="mt-10 border border-[rgba(26,23,19,0.15)] bg-[#E9E3D4] p-6">
              <p className="t1-mono-label t1-mono-label-red">
                [ ALSO IN PRACTICE ]
              </p>
              {rest.map((doctor) => (
                <div key={doctor.name} className="mt-5">
                  <p className="font-t1-press text-lg uppercase leading-tight text-[#1A1713]">
                    {doctor.name}
                  </p>
                  <p className="t1-mono-label t1-mono-label-stone mt-1.5">
                    {doctor.role.toUpperCase()}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[#6B675E]">
                    {doctor.biography}
                  </p>
                </div>
              ))}
            </aside>
          </Fade>
        )}
      </div>
    </div>
  );
}
