import { Fade, ParallaxImage } from "./T1Motion";

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

export default function T1DoctorFeature({
  doctors,
  city,
}: T1DoctorFeatureProps) {
  const [principal, ...rest] = doctors;

  return (
    <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8">
      {/* Long-form narrative */}
      <div className="lg:col-span-6 xl:col-span-6">
        <Fade>
          <p className="t1-dropcap max-w-prose font-sans text-base leading-[1.85] text-[#16130F] md:text-lg">
            Every case in this practice begins the same way: not with an
            instrument, but with a chair turned to face yours. The first
            appointment is a conversation — about what you notice in the
            mirror, what you avoid in photographs, what you have been told
            before and whether any of it made sense. Nothing is decided in
            that hour except what matters to you.
          </p>
        </Fade>
        <Fade delay={0.1}>
          <p className="mt-6 max-w-prose font-sans text-base leading-[1.85] text-[#6B675E] md:text-lg">
            {principal.biography}
          </p>
        </Fade>
        <Fade delay={0.15}>
          <p className="mt-6 max-w-prose font-sans text-base leading-[1.85] text-[#6B675E] md:text-lg">
            Patients arrive from across {city} with photographs, questions,
            and occasionally decades of putting this off. They leave the
            first hour with something rarer than a treatment plan: an honest
            account of what is possible, what is necessary, and what is
            neither.
          </p>
        </Fade>

        {/* Pull quote */}
        <Fade delay={0.2}>
          <blockquote className="mt-12 border-l border-[#9C7E46] pl-6 md:pl-8">
            <p className="font-t1-display text-2xl font-light italic leading-snug text-[#5E2A2B] md:text-3xl">
              &ldquo;The best dentistry is the kind you eventually stop
              thinking about.&rdquo;
            </p>
            <footer className="mt-4 font-sans text-xs uppercase tracking-[0.24em] text-[#6B675E]">
              — {principal.name}
            </footer>
          </blockquote>
        </Fade>
      </div>

      {/* Portrait + credentials */}
      <div className="lg:col-span-5 lg:col-start-8">
        <Fade>
          <figure>
            <ParallaxImage
              src={PORTRAITS[0]}
              alt={`Portrait of ${principal.name}, ${principal.role}`}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[3/4] w-full"
            />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-t1-display text-xl text-[#16130F] md:text-2xl">
                  {principal.name}
                </p>
                <p className="mt-1 font-sans text-sm text-[#6B675E]">
                  {principal.role}
                </p>
              </div>
              <span className="t1-eyebrow hidden shrink-0 sm:block">
                Fig. 02
              </span>
            </figcaption>
          </figure>
        </Fade>

        <Fade delay={0.1}>
          <ul className="mt-8" aria-label={`Credentials of ${principal.name}`}>
            {principal.credentials.map((credential, i) => (
              <li
                key={credential}
                className="flex items-baseline gap-4 border-t border-[#16130F]/15 py-3"
              >
                <span className="font-t1-display text-sm italic text-[#9C7E46]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm leading-relaxed text-[#16130F]">
                  {credential}
                </span>
              </li>
            ))}
            <li className="border-t border-[#16130F]/15" aria-hidden="true" />
          </ul>
        </Fade>

        {/* Also in residence */}
        {rest.length > 0 && (
          <Fade delay={0.15}>
            <aside className="mt-12 bg-[#EFEAE0] p-6 md:p-8">
              <p className="t1-eyebrow">Also in residence</p>
              {rest.map((doctor, i) => (
                <div key={doctor.name} className={i > 0 ? "mt-6" : "mt-4"}>
                  <p className="font-t1-display text-lg text-[#16130F]">
                    {doctor.name}
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-[#6B675E]">
                    {doctor.role}
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
