"use client";

import { Fade } from "./T1Motion";

interface T1ComfortProps {
  hasSedation: boolean;
}

/** The comfort measures — template voice, safe defaults. */
const MEASURES = [
  {
    title: "A raised hand stops everything",
    note: "No explanation needed, ever. We pause until you say to carry on — or we finish for the day.",
  },
  {
    title: "Warm blankets & headphones",
    note: "Your playlist, our noise-cancelling headphones, and a blanket if the room runs cool.",
  },
  {
    title: "Breaks whenever you need",
    note: "Stretch, sip water, step outside. Every appointment is built with room to breathe.",
  },
];

/**
 * T1 PRESS — the comfort dossier. A plain-spoken statement that nerves
 * are normal here, a ruled index of the measures we take, and the one
 * red pull quote of the chapter. Sedation leads the list when offered.
 */
export default function T1Comfort({ hasSedation }: T1ComfortProps) {
  const measures = hasSedation
    ? [
        {
          title: "Sedation, at the level you choose",
          note: "From a little something to take the edge off to sleeping through the whole visit — your call, planned around you.",
        },
        ...MEASURES,
      ]
    : MEASURES;

  return (
    <Fade>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Statement */}
        <div className="lg:col-span-5">
          <p className="max-w-prose font-sans text-base leading-[1.8] text-[#1A1713]">
            If your pulse climbs in the parking lot, you are exactly who this
            practice was built for. Nobody asks why it has been a while. Nobody
            starts before you are ready.
          </p>
          <blockquote className="mt-10 border-l-2 border-[#D92B21] pl-6">
            <p className="font-t1-press text-2xl uppercase leading-tight text-[#1A1713] md:text-3xl">
              &ldquo;The bravest thing a nervous patient does is walk in. We
              take it from there.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Measures index */}
        <div className="lg:col-span-7">
          <p className="t1-mono-label t1-mono-label-red">[ THE COMFORT MENU ]</p>
          <ul className="mt-5">
            {measures.map((m, i) => (
              <li
                key={m.title}
                className="border-t border-[rgba(26,23,19,0.15)] py-4 first:border-t-0"
              >
                <p className="flex items-baseline gap-3">
                  <span className="t1-mono-label t1-mono-label-red shrink-0">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <span className="font-t1-press text-lg uppercase leading-none text-[#1A1713] md:text-xl">
                    {m.title}
                  </span>
                </p>
                <p className="mt-2 pl-[2.75rem] font-sans text-sm leading-relaxed text-[#6B675E] md:text-[15px]">
                  {m.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fade>
  );
}
