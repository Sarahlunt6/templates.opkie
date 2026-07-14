"use client";

import T4Reveal, { T4RuleDraw } from "./T4Reveal";

interface T4ServicesProps {
  phone: string;
  hasEmergency: boolean;
}

interface PriceLine {
  name: string;
  note: string;
  price: string;
}

const BOOK: { part: string; title: string; lines: PriceLine[] }[] = [
  {
    part: "Part I",
    title: "The essentials",
    lines: [
      {
        name: "New-patient exam & cleaning",
        note: "A full hour. Photographs, imaging, and a written plan you keep.",
        price: "$149",
      },
      {
        name: "Tooth-colored fillings",
        note: "Shade-matched composite, placed and polished in one visit.",
        price: "from $210",
      },
      {
        name: "Same-day porcelain crown",
        note: "Scanned, milled, and seated in a single appointment. No temporary.",
        price: "from $1,250",
      },
    ],
  },
  {
    part: "Part II",
    title: "The cosmetic work",
    lines: [
      {
        name: "Porcelain veneers",
        note: "Designed tooth by tooth, finished over two fittings.",
        price: "from $1,150 / tooth",
      },
      {
        name: "Professional whitening",
        note: "In-chair, with custom trays to take home afterward.",
        price: "from $395",
      },
      {
        name: "Full smile design",
        note: "A complete plan across shape, shade, and proportion.",
        price: "by consultation",
      },
    ],
  },
  {
    part: "Part III",
    title: "The structural work",
    lines: [
      {
        name: "Dental implants",
        note: "Guided placement, restored with a hand-finished crown.",
        price: "from $3,400",
      },
      {
        name: "Invisalign",
        note: "Clear aligners, checked and adjusted every six weeks.",
        price: "from $3,900",
      },
      {
        name: "Implant-supported bridge",
        note: "For several missing teeth — fixed, not removable.",
        price: "by consultation",
      },
    ],
  },
];

export default function T4Services({ phone, hasEmergency }: T4ServicesProps) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section id="services" className="t4-salon relative py-24 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-12">
        {/* header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <T4Reveal className="lg:sticky lg:top-32">
              <p className="t4-label text-[var(--t4-brass-ink)]">The services</p>
              <T4RuleDraw className="mt-5 w-16" />
            </T4Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <T4Reveal>
              <h2 className="t4-display t4-display-lg text-[#241a12]">
                The price book
              </h2>
              <p className="mt-6 max-w-xl font-t4-body text-[1.02rem] font-light leading-relaxed text-[var(--t4-espresso-soft)]">
                Good work should not come with a mystery invoice. These are
                honest starting prices — your written plan states the exact
                figure before anything begins, and it does not change
                mid-treatment.
              </p>
            </T4Reveal>

            {/* the book */}
            <div className="mt-14 space-y-14">
              {BOOK.map((section, si) => (
                <T4Reveal key={section.part} delay={si * 0.08}>
                  <div className="flex items-baseline gap-4">
                    <span className="t4-numeral text-[0.85rem] uppercase tracking-[0.2em] text-[var(--t4-brass-ink)]">
                      {section.part}
                    </span>
                    <h3 className="t4-display t4-display-md text-[#241a12]">
                      {section.title}
                    </h3>
                  </div>

                  <ul className="mt-6 border-t border-[var(--t4-line-light)]">
                    {section.lines.map((line) => (
                      <li
                        key={line.name}
                        className="group border-b border-[var(--t4-line-light)] py-6 transition-colors duration-500 hover:bg-[rgba(138,106,51,0.045)]"
                      >
                        <div className="flex items-baseline">
                          <span className="t4-display shrink-0 text-[1.15rem] text-[#241a12] lg:text-[1.3rem]">
                            {line.name}
                          </span>
                          <span aria-hidden className="t4-leader" />
                          <span className="t4-numeral shrink-0 text-[1.05rem] text-[var(--t4-brass-ink)] lg:text-[1.15rem]">
                            {line.price}
                          </span>
                        </div>
                        <p className="mt-2 max-w-md font-t4-body text-[0.92rem] font-light leading-relaxed text-[var(--t4-espresso-faint)]">
                          {line.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </T4Reveal>
              ))}
            </div>

            {/* the one oxblood moment — urgent care */}
            {hasEmergency && (
              <T4Reveal delay={0.1}>
                <div
                  className="mt-14 flex flex-col justify-between gap-6 p-8 sm:flex-row sm:items-center"
                  style={{ backgroundColor: "var(--t4-oxblood)" }}
                >
                  <div>
                    <p className="t4-label text-[rgba(246,240,230,0.7)]">
                      In pain today?
                    </p>
                    <p className="t4-display mt-3 text-[1.4rem] text-[var(--t4-ivory)]">
                      Chair time is held every morning for emergencies.
                    </p>
                  </div>
                  <a
                    href={telHref}
                    className="t4-btn-solid shrink-0"
                    style={{ backgroundColor: "var(--t4-porcelain)" }}
                  >
                    Call {phone}
                  </a>
                </div>
              </T4Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
