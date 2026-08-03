import { Fade, BrassCounter } from "./T1Motion";

interface T1CraftProps {
  practiceName: string;
  city: string;
  avgRating: number | null;
  reviewCount: number;
  clinicianCount: number;
  neighborhoodCount: number;
  hasSedation: boolean;
}

/**
 * T1 PRESS — centered editorial statement. One big declaration with a
 * single Newsreader-italic phrase, then the supporting facts set as a
 * ruled numbers row.
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
    <div className="mx-auto max-w-5xl py-4 text-center">
      <Fade>
        <p className="t1-mono-label t1-mono-label-red">[ WHY PATIENTS STAY ]</p>
      </Fade>

      <Fade delay={0.08}>
        <h3 className="mx-auto mt-8 max-w-4xl font-t1-press text-[clamp(1.9rem,4.6vw,3.6rem)] uppercase leading-[1.02] text-[var(--t1-ink)]">
          Work is planned on screen, checked under magnification, and
          finished with{" "}
          <em className="t1-italic normal-case">greater care</em> than anyone
          will ever notice.
        </h3>
      </Fade>

      <Fade delay={0.14}>
        <p className="font-t3-serif mx-auto mt-6 max-w-2xl text-[16px] leading-[1.7] text-[var(--t1-stone)]">
          That is the standard at {practiceName} — the difference between good
          and invisible lives at that scale.
          {hasSedation &&
            " And for anyone who finds dentistry genuinely difficult, sedation and anxiety-focused care are available. Ask once."}
        </p>
      </Fade>

      {/* Supporting facts — ruled numbers row */}
      <Fade delay={0.18}>
        <dl
          className={`mt-12 grid grid-cols-2 gap-px border border-[var(--t1-hairline)] bg-[var(--t1-hairline)] text-left ${
            avgRating !== null ? "lg:grid-cols-4" : ""
          }`}
        >
          {avgRating !== null && (
            <div className="flex flex-col-reverse gap-3 bg-[var(--t1-paper)] p-5 md:p-6">
              <dt className="t1-mono-label t1-mono-label-stone">
                AVG. PATIENT RATING
              </dt>
              <dd className="font-t1-press text-5xl leading-none text-[var(--t1-red)] md:text-6xl">
                <BrassCounter value={avgRating} decimals={1} />
              </dd>
            </div>
          )}
          {reviewCount > 0 && (
            <div className="flex flex-col-reverse gap-3 bg-[var(--t1-paper)] p-5 md:p-6">
              <dt className="t1-mono-label t1-mono-label-stone">
                PUBLISHED PATIENT STORIES
              </dt>
              <dd className="font-t1-press text-5xl leading-none text-[var(--t1-ink)] md:text-6xl">
                <BrassCounter value={reviewCount} />
              </dd>
            </div>
          )}
          <div className="flex flex-col-reverse gap-3 bg-[var(--t1-paper)] p-5 md:p-6">
            <dt className="t1-mono-label t1-mono-label-stone">
              CLINICIANS IN PRACTICE
            </dt>
            <dd className="font-t1-press text-5xl leading-none text-[var(--t1-ink)] md:text-6xl">
              <BrassCounter value={clinicianCount} />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-3 bg-[var(--t1-paper)] p-5 md:p-6">
            <dt className="t1-mono-label t1-mono-label-stone">
              {city.toUpperCase()} NEIGHBORHOODS SERVED
            </dt>
            <dd className="font-t1-press text-5xl leading-none text-[var(--t1-ink)] md:text-6xl">
              <BrassCounter value={neighborhoodCount} />
            </dd>
          </div>
        </dl>
      </Fade>
    </div>
  );
}
