/**
 * Slim banner rendered between a template's real nav and a wireframe page
 * body. Tells clients (and reminds builders) that the page is a structural
 * preview, not the finished design.
 */
export default function WireNotice() {
  return (
    <div className="relative z-40 border-y border-dashed border-neutral-400 bg-neutral-100 font-sans text-neutral-600">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2.5 sm:px-8">
        <span className="rounded border border-neutral-400 bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          Wireframe
        </span>
        <p className="text-xs leading-snug sm:text-[13px]">
          This page is a structural preview — it shows what the finished page
          will include, not how it will look. The final design follows the
          site&apos;s style guide.
        </p>
      </div>
    </div>
  );
}
