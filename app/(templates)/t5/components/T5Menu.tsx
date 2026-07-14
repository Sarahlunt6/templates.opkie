"use client";

import Image from "next/image";
import T5Reveal from "./T5Reveal";

interface T5MenuProps {
  practiceName: string;
  phone: string;
  hasEmergency: boolean;
}

interface MenuItem {
  name: string;
  price: string;
  loved?: boolean;
}

const MENU: { heading: string; items: MenuItem[] }[] = [
  {
    heading: "Everyday care",
    items: [
      { name: "New-patient checkup, x-rays & cleaning", price: "$149", loved: true },
      { name: "Regular cleaning & exam", price: "$119" },
      { name: "Kids' checkup (12 & under)", price: "$89" },
      { name: "Fluoride & sealants", price: "from $35" },
    ],
  },
  {
    heading: "Fix-it dentistry",
    items: [
      { name: "Tooth-colored filling", price: "from $210" },
      { name: "Same-day porcelain crown", price: "from $1,250" },
      { name: "Root canal (gentler than its reputation)", price: "from $850" },
      { name: "Careful extraction", price: "from $195" },
    ],
  },
  {
    heading: "Smile upgrades",
    items: [
      { name: "In-chair whitening", price: "$395" },
      { name: "Invisalign clear aligners", price: "from $3,900" },
      { name: "Porcelain veneers", price: "from $1,150 / tooth" },
      { name: "Implant with crown", price: "from $3,400" },
    ],
  },
];

const RAIL_PHOTOS = [
  {
    src: "/images/services/invisalign.jpg",
    alt: "A clear Invisalign aligner held up",
    caption: "The invisible braces",
  },
  {
    src: "/images/services/implant.jpg",
    alt: "A dental implant model",
    caption: "Implants that stay put",
  },
  {
    src: "/images/services/full-mouth-smile.jpg",
    alt: "A bright, healthy finished smile",
    caption: "The after photo",
  },
];

export default function T5Menu({
  practiceName,
  phone,
  hasEmergency,
}: T5MenuProps) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section
      id="menu"
      className="relative bg-[var(--t5-butter)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <T5Reveal className="max-w-2xl">
          <p className="t5-kicker text-[var(--t5-marigold-deep)]">
            Services &amp; prices
          </p>
          <h2 className="t5-display t5-display-lg mt-4 text-[var(--t5-walnut)]">
            Priced like a menu, posted on{" "}
            <span className="t5-wave">the wall.</span>
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--t5-walnut-soft)]">
            Starting prices, in the open, before you're in the chair. Your
            written plan shows the exact number — and that's the number you
            pay.
          </p>
        </T5Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── the menu board ── */}
          <T5Reveal className="lg:col-span-8">
            <div className="t5-board px-6 py-8 sm:px-10 sm:py-10">
              {/* board header */}
              <div className="flex flex-col items-center gap-1 border-b-2 border-dotted border-[var(--t5-line)] pb-6 text-center">
                <p className="t5-kicker text-[var(--t5-teal)]">
                  {practiceName}
                </p>
                <p className="t5-display text-[2rem] text-[var(--t5-walnut)]">
                  The Menu
                </p>
                <p className="flex items-center gap-2 text-[var(--t5-marigold-deep)]">
                  <span aria-hidden>★</span>
                  <span className="t5-kicker">est. your neighborhood</span>
                  <span aria-hidden>★</span>
                </p>
              </div>

              {/* board sections */}
              <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-1">
                {MENU.map((section) => (
                  <div key={section.heading}>
                    <h3 className="t5-display text-[1.35rem] text-[var(--t5-teal)]">
                      {section.heading}
                    </h3>
                    <ul className="mt-4 space-y-3.5">
                      {section.items.map((item) => (
                        <li key={item.name} className="flex items-baseline">
                          <span className="flex min-w-0 items-baseline gap-2.5 text-[1rem] font-medium text-[var(--t5-walnut)]">
                            {item.name}
                            {item.loved && (
                              <span className="t5-sticker t5-sticker--marigold relative -top-[2px] hidden !rotate-[-2deg] !px-2.5 !py-1 !text-[0.62rem] sm:inline-flex">
                                most loved
                              </span>
                            )}
                          </span>
                          <span aria-hidden className="t5-dots" />
                          <span className="shrink-0 font-t5-display text-[1.02rem] text-[var(--t5-marigold-deep)]">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-9 border-t-2 border-dotted border-[var(--t5-line)] pt-5 text-center text-[0.85rem] text-[var(--t5-walnut-faint)]">
                Every plan comes with the exact price in writing before we
                begin. Financing available — ask up front.
              </p>
            </div>
          </T5Reveal>

          {/* ── the rail: photos + emergency card ── */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            {hasEmergency && (
              <T5Reveal delay={0.1} rotate={1}>
                <div className="rounded-[18px] border-2 border-[var(--t5-teal-deep)] bg-[var(--t5-teal)] p-7 shadow-[4px_4px_0_var(--t5-teal-deep)]">
                  <p className="t5-kicker text-[rgba(255,246,232,0.75)]">
                    Toothache today?
                  </p>
                  <p className="t5-display mt-3 text-[1.4rem] leading-snug text-[var(--t5-paper)]">
                    Call before 10 am and we'll see you today.
                  </p>
                  <a
                    href={telHref}
                    className="t5-btn t5-btn--paper mt-6 w-full !text-[0.9rem]"
                  >
                    Call {phone}
                  </a>
                </div>
              </T5Reveal>
            )}

            {RAIL_PHOTOS.map((photo, i) => (
              <T5Reveal
                key={photo.src}
                delay={0.15 + i * 0.08}
                rotate={i % 2 === 0 ? -1.5 : 1.5}
              >
                <figure className="t5-polaroid">
                  <span className="t5-tape" aria-hidden />
                  <div className="relative aspect-[5/3] overflow-hidden rounded-[4px]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 28vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="t5-script mt-2.5 pb-1 text-center text-[1.25rem] text-[var(--t5-teal-bright)]">
                    {photo.caption}
                  </figcaption>
                </figure>
              </T5Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
