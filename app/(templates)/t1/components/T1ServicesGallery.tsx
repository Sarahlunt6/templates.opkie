import Image from "next/image";
import { Fade } from "./T1Motion";

export interface ServiceEntry {
  title: string;
  description: string;
  image: string;
}

interface T1ServicesGalleryProps {
  services: ServiceEntry[];
  alsoPracticed: string[];
}

/** Catalog status tags — template voice, one per shelf position */
const STATUS_TAGS = [
  "MOST REQUESTED",
  "HAND-FINISHED",
  "GUIDED SURGERY",
  "ONE PLAN",
];

/**
 * T1 PRESS — the services as a catalog grid. Sharp-cornered cards on
 * deep paper, separated by hairline rules (the grid lines ARE the
 * borders), mono status tags, duotone photography, Anton titles and a
 * circled arrow chip that fills red on hover.
 */
export default function T1ServicesGallery({
  services,
  alsoPracticed,
}: T1ServicesGalleryProps) {
  return (
    <div>
      <ol
        className="grid grid-cols-1 gap-px border border-[rgba(26,23,19,0.15)] bg-[rgba(26,23,19,0.15)] md:grid-cols-2 xl:grid-cols-4"
        aria-label="Services catalog"
      >
        {services.map((service, i) => (
          <li key={service.title} className="bg-[#E9E3D4]">
            <Fade delay={(i % 4) * 0.06} className="h-full">
              <article className="group flex h-full flex-col p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="t1-mono-label t1-mono-label-red">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="t1-mono-label border border-[#1A1713] px-2 py-1 !text-[10px]">
                    {STATUS_TAGS[i % STATUS_TAGS.length]}
                  </span>
                </div>

                <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden border border-[#1A1713] bg-[#F3EFE6]">
                  <Image
                    src={service.image}
                    alt={`${service.title} — photographed for the practice catalog`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    loading="lazy"
                    className="t1-duotone object-cover"
                  />
                  {/* one red-tinted accent plate per row */}
                  {i === 1 && (
                    <div aria-hidden="true" className="t1-tint-red" />
                  )}
                </div>

                <h3 className="mt-5 font-t1-press text-2xl uppercase leading-[0.95] text-[#1A1713] md:text-[1.6rem]">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-[#6B675E]">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[rgba(26,23,19,0.15)] pt-4">
                  <span className="t1-mono-label t1-mono-label-stone">
                    BY CONSULTATION
                  </span>
                  <span aria-hidden="true" className="t1-arrow-chip">
                    →
                  </span>
                </div>
              </article>
            </Fade>
          </li>
        ))}
      </ol>

      {/* Also practiced — ruled closing line (hidden until categories exist) */}
      {alsoPracticed.length > 0 && (
        <div className="mt-8 flex flex-col gap-2 border-t border-[rgba(26,23,19,0.15)] pt-4 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="t1-mono-label t1-mono-label-red shrink-0">
            [ ALSO PRACTICED ]
          </p>
          <p className="t1-mono-label t1-mono-label-stone !normal-case !tracking-[0.08em]">
            {alsoPracticed.join("  /  ")}
          </p>
        </div>
      )}
    </div>
  );
}
