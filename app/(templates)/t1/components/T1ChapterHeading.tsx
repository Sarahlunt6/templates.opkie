import { LineReveal, Fade } from "./T1Motion";

interface T1ChapterHeadingProps {
  numeral: string;
  kicker: string;
  title: string;
  deck?: string;
  /** invert colors for dark (ink) sections */
  dark?: boolean;
}

/**
 * T1 PRESS — indexed chapter divider. "[ 01 ]" mono red index and a
 * mono kicker on a ruled row, Anton uppercase title, one-line stone
 * lede, hairline rules above and below.
 */
export default function T1ChapterHeading({
  numeral,
  kicker,
  title,
  deck,
  dark = false,
}: T1ChapterHeadingProps) {
  const rule = dark ? "border-[rgba(243,239,230,0.22)]" : "border-[rgba(26,23,19,0.15)]";
  return (
    <header className={`border-y ${rule} py-6 md:py-8`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="t1-mono-label t1-mono-label-red">[ {numeral} ]</p>
        <p
          className={`t1-mono-label text-right ${
            dark ? "!text-[#F3EFE6]/60" : "t1-mono-label-stone"
          }`}
        >
          [ {kicker.toUpperCase()} ]
        </p>
      </div>

      <LineReveal
        as="h2"
        className={`t1-display mt-5 max-w-4xl ${
          dark ? "text-[#F3EFE6]" : "text-[#1A1713]"
        }`}
      >
        {title}
      </LineReveal>

      {deck && (
        <Fade delay={0.1}>
          <p
            className={`mt-4 max-w-xl font-sans text-base leading-relaxed ${
              dark ? "text-[#F3EFE6]/65" : "text-[#6B675E]"
            }`}
          >
            {deck}
          </p>
        </Fade>
      )}
    </header>
  );
}
