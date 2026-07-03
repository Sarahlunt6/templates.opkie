import { LineReveal, Fade, Drift } from "./T1Motion";

interface T1ChapterHeadingProps {
  numeral: string;
  kicker: string;
  title: string;
  deck?: string;
  /** invert colors for dark (ink) sections */
  dark?: boolean;
}

/**
 * Chapter opener — outlined roman numeral, small-caps kicker,
 * oversized Fraunces title with a line-mask reveal, hairline rule.
 */
export default function T1ChapterHeading({
  numeral,
  kicker,
  title,
  deck,
  dark = false,
}: T1ChapterHeadingProps) {
  return (
    <header className="relative">
      <div className="flex items-end gap-6 md:gap-10">
        <Drift range={20}>
          <span
            aria-hidden="true"
            className="t1-numeral-outline block text-[4.5rem] leading-[0.8] md:text-[7rem]"
          >
            {numeral}
          </span>
        </Drift>
        <div className={`h-px flex-1 ${dark ? "bg-[#F7F5F0]/20" : "bg-[#16130F]/15"}`} />
        <p className="t1-eyebrow pb-1 text-right">{kicker}</p>
      </div>

      <LineReveal
        as="h2"
        className={`mt-8 max-w-3xl font-t1-display text-[clamp(2.4rem,6vw,4.75rem)] font-light leading-[1.02] tracking-[-0.015em] ${
          dark ? "text-[#F7F5F0]" : "text-[#16130F]"
        }`}
      >
        {title}
      </LineReveal>

      {deck && (
        <Fade delay={0.15}>
          <p
            className={`mt-6 max-w-xl font-sans text-base leading-relaxed md:text-lg ${
              dark ? "text-[#F7F5F0]/65" : "text-[#6B675E]"
            }`}
          >
            {deck}
          </p>
        </Fade>
      )}
    </header>
  );
}
