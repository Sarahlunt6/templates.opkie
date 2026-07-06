import { Fade } from "./T1Motion";

export interface LetterEntry {
  id: string;
  reviewerName: string;
  reviewText: string;
  procedureCategory: string;
}

interface T1PatientLettersProps {
  letters: LetterEntry[];
  /** formatted average rating, e.g. "5.0" — null when there are no reviews */
  avgRating: string | null;
}

/**
 * T1 PRESS — the testimonial band. One ink-dark rating summary card
 * (big red numeral, star row, mono verification line) alongside quote
 * cards on paper with hairline borders. Reviewer and procedure set in
 * mono, like credits.
 */
export default function T1PatientLetters({
  letters,
  avgRating,
}: T1PatientLettersProps) {
  if (letters.length === 0 || avgRating === null) return null;

  return (
    <div className="grid grid-cols-1 gap-px border border-[rgba(26,23,19,0.15)] bg-[rgba(26,23,19,0.15)] md:grid-cols-2 xl:grid-cols-3">
      {/* Rating summary — the ink card */}
      <div className="bg-[#1A1713] text-[#F3EFE6]">
        <Fade className="h-full">
          <div className="flex h-full flex-col justify-between p-6 md:p-8">
            <p className="t1-mono-label !text-[#F3EFE6]/60">
              [ THE VERDICT ]
            </p>
            <div className="py-10">
              <p className="font-t1-press text-[clamp(5rem,10vw,8rem)] leading-none text-[#D92B21]">
                {avgRating}
              </p>
              <p
                className="mt-3 font-t1-press text-2xl tracking-[0.12em] text-[#D92B21]"
                role="img"
                aria-label={`Rated ${avgRating} out of 5`}
              >
                ★★★★★
              </p>
            </div>
            <p className="t1-mono-label !text-[#F3EFE6]/70">
              FROM {letters.length} VERIFIED PATIENTS
            </p>
          </div>
        </Fade>
      </div>

      {/* Quote cards */}
      {letters.map((letter, i) => (
        <div
          key={letter.id}
          className="bg-[#F3EFE6] transition-colors duration-300 hover:bg-[#E9E3D4]"
        >
          <Fade delay={(i % 3) * 0.06} className="h-full">
            <blockquote className="flex h-full flex-col p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="t1-mono-label t1-mono-label-red">
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <span
                  aria-hidden="true"
                  className="font-t1-press text-3xl leading-none text-[#D92B21]"
                >
                  &ldquo;
                </span>
              </div>
              <p className="mt-4 flex-1 font-sans text-sm leading-[1.7] text-[#1A1713]">
                {letter.reviewText}
              </p>
              <footer className="mt-6 border-t border-[rgba(26,23,19,0.15)] pt-4">
                <p className="t1-mono-label">{letter.reviewerName.toUpperCase()}</p>
                <p className="t1-mono-label t1-mono-label-stone mt-1">
                  {letter.procedureCategory.toUpperCase()}
                </p>
              </footer>
            </blockquote>
          </Fade>
        </div>
      ))}
    </div>
  );
}
