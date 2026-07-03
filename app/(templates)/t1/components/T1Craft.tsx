import { Fade, ParallaxImage, BrassCounter } from "./T1Motion";

interface T1CraftProps {
  practiceName: string;
  city: string;
  avgRating: number;
  reviewCount: number;
  clinicianCount: number;
  neighborhoodCount: number;
  hasSedation: boolean;
}

/**
 * Chapter III — the room, the instruments, the hands.
 * Parallax-framed office photography with brass numerals.
 */
export default function T1Craft({
  practiceName,
  city,
  avgRating,
  reviewCount,
  clinicianCount,
  neighborhoodCount,
  hasSedation,
}: T1CraftProps) {
  return (
    <div className="mt-16 lg:mt-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Large plate — breaks left to the viewport edge */}
        <div className="lg:col-span-7">
          <Fade>
            <figure className="lg:-ml-10 xl:-ml-16">
              <ParallaxImage
                src="/images/team/staff-photo.jpg"
                alt={`The ${practiceName} clinical team at work`}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="aspect-[4/3] w-full"
              />
              <figcaption className="mt-3 flex items-baseline justify-between font-sans text-xs text-[#6B675E] lg:pl-10 xl:pl-16">
                <span>The team, between patients.</span>
                <span className="t1-eyebrow hidden sm:block">Fig. 03</span>
              </figcaption>
            </figure>
          </Fade>
        </div>

        {/* Craft narrative */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Fade>
            <p className="max-w-prose font-sans text-base leading-[1.85] text-[#16130F] md:text-lg">
              What patients call an office, the people who work here treat
              as a workshop. Impressions are captured digitally rather than
              in trays of putty. Shades of porcelain are matched by eye,
              against natural light, before anything is sent to the lab.
              Work is checked under magnification because the difference
              between good and invisible lives at that scale.
            </p>
          </Fade>
          <Fade delay={0.1}>
            <p className="mt-6 max-w-prose font-sans text-base leading-[1.85] text-[#6B675E] md:text-lg">
              The schedule is kept deliberately unhurried. Appointments are
              long enough that no one has to choose between doing the work
              well and explaining it properly — a policy that costs the
              practice a few patients a day and earns it the rest.
            </p>
          </Fade>
          {hasSedation && (
            <Fade delay={0.15}>
              <p className="mt-6 max-w-prose border-l border-[#9C7E46] pl-5 font-sans text-sm leading-[1.85] text-[#6B675E] md:text-base">
                For those who find dentistry genuinely difficult — and after
                a bad experience, many do — sedation and anxiety-focused
                care are quietly available. You need only ask once.
              </p>
            </Fade>
          )}

          {/* Second plate, offset */}
          <Fade delay={0.2}>
            <figure className="mt-12 lg:mt-16 lg:pr-10">
              <ParallaxImage
                src="/images/office-exterior.jpg"
                alt={`The ${practiceName} building in ${city}`}
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="aspect-[4/3] w-full"
                drift={4}
              />
              <figcaption className="mt-3 flex items-baseline justify-between font-sans text-xs text-[#6B675E]">
                <span>The practice, {city}.</span>
                <span className="t1-eyebrow hidden sm:block">Fig. 04</span>
              </figcaption>
            </figure>
          </Fade>
        </div>
      </div>

      {/* Numerals in brass */}
      <Fade delay={0.1}>
        <dl className="mt-16 grid grid-cols-1 gap-y-10 border-t border-[#16130F]/15 pt-10 sm:grid-cols-3 sm:gap-x-8 lg:mt-24">
          <div className="flex flex-col-reverse gap-3">
            <dt className="t1-eyebrow max-w-[16rem]">
              Average of {reviewCount} published patient stories
            </dt>
            <dd className="font-t1-display text-6xl font-light text-[#9C7E46] md:text-7xl">
              <BrassCounter value={avgRating} decimals={1} />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-3">
            <dt className="t1-eyebrow">Clinicians in residence</dt>
            <dd className="font-t1-display text-6xl font-light text-[#9C7E46] md:text-7xl">
              <BrassCounter value={clinicianCount} />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-3">
            <dt className="t1-eyebrow">Neighborhoods served</dt>
            <dd className="font-t1-display text-6xl font-light text-[#9C7E46] md:text-7xl">
              <BrassCounter value={neighborhoodCount} />
            </dd>
          </div>
        </dl>
      </Fade>
    </div>
  );
}
