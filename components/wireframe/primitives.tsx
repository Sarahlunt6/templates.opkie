import type { ReactNode } from "react";

/**
 * Wireframe primitives — deliberately schematic building blocks for the
 * interior-page wireframes. Fixed neutral grayscale + font-sans so a
 * wireframe body reads identically inside every template palette (including
 * the dark T2/T4 scopes) and is unmistakably "planned, not designed."
 *
 * Server-component friendly: no state, no motion, no browser APIs.
 */

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Page-level container: forces the light schematic canvas + Inter. */
export function WireBody({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-50 font-sans text-neutral-900 antialiased">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-5 py-12 sm:px-8 lg:py-16">
        {children}
      </div>
    </div>
  );
}

/** Page header: kicker chip, real H1, real intro sentence. */
export function WirePageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="space-y-3 border-b-2 border-dashed border-neutral-300 pb-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
        {kicker}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-500">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** Labeled dashed section box — the core wireframe unit. */
export function WireSection({
  label,
  title,
  children,
  className,
}: {
  /** Chip naming the section's purpose, e.g. "Our story". */
  label: string;
  /** Optional real heading rendered inside the section. */
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "relative rounded-xl border-2 border-dashed border-neutral-300 bg-white p-5 pt-7 sm:p-7 sm:pt-8",
        className
      )}
    >
      <span className="absolute -top-3 left-4 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </span>
      {title ? (
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-neutral-800 sm:text-2xl">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

/** Image placeholder: gray box with a corner-to-corner cross + label. */
export function WireImg({
  label = "Image",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cx(
        "relative flex min-h-28 items-center justify-center overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-neutral-300"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="relative rounded bg-neutral-50/90 px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </span>
    </div>
  );
}

/** Stack of gray bars suggesting body copy. */
export function WireLines({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-11/12", "w-full", "w-9/12", "w-10/12", "w-7/12"];
  return (
    <div aria-hidden="true" className={cx("space-y-2.5", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cx(
            "h-3 rounded bg-neutral-200",
            widths[i % widths.length],
            i === lines - 1 && "w-7/12"
          )}
        />
      ))}
    </div>
  );
}

/** Ghost button. Renders a real link when href is provided. */
export function WireBtn({
  children,
  href,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const styles = cx(
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold",
    variant === "solid"
      ? "bg-neutral-800 text-white"
      : "border-2 border-dashed border-neutral-400 bg-transparent text-neutral-600",
    className
  );
  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }
  return (
    <span aria-disabled="true" className={cx(styles, "cursor-default select-none opacity-80")}>
      {children}
    </span>
  );
}

/** Small pill, e.g. non-functional filter chips. */
export function WireChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-neutral-400 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
      {children}
    </span>
  );
}

/** Disabled form-field placeholder. */
export function WireField({
  label,
  textarea = false,
}: {
  label: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </span>
      <div
        aria-hidden="true"
        className={cx(
          "rounded-md border border-neutral-300 bg-neutral-100",
          textarea ? "h-24" : "h-10"
        )}
      />
    </div>
  );
}

/** Builder/client annotation — decisions still to be made. */
export function WireNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 flex gap-2 text-xs italic leading-relaxed text-neutral-500">
      <span className="font-bold not-italic text-neutral-400" aria-hidden="true">
        ✎
      </span>
      <span>{children}</span>
    </p>
  );
}

/** Stat tile for trust strips. Shows the real value when available. */
export function WireStat({
  value,
  label,
}: {
  value?: string | number | null;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-3 text-center">
      {value !== null && value !== undefined && value !== "" ? (
        <p className="text-2xl font-bold text-neutral-700">{value}</p>
      ) : (
        <div aria-hidden="true" className="mx-auto my-1.5 h-6 w-14 rounded bg-neutral-200" />
      )}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}

/** Standard closing CTA section shared by every wireframe page. */
export function WireCtaSection({
  heading,
  sub,
  phone,
  bookingUrl,
}: {
  heading: string;
  sub?: string;
  phone?: string;
  bookingUrl?: string;
}) {
  const canBook = Boolean(bookingUrl) && bookingUrl !== "none";
  const telHref = phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : undefined;
  return (
    <WireSection label="Call to action" className="text-center">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-800 sm:text-2xl">
        {heading}
      </h2>
      {sub ? (
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-500">{sub}</p>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <WireBtn href={canBook ? bookingUrl : telHref}>Book an appointment</WireBtn>
        <WireBtn href={telHref} variant="outline">
          {phone ? `Call ${phone}` : "Call the office"}
        </WireBtn>
      </div>
    </WireSection>
  );
}
