"use client";

import { Fade } from "./T1Motion";

/** The instruments — reuses the same three systems the practice runs. */
const SYSTEMS = [
  {
    ref: "SYS-01",
    name: "3D cone-beam imaging",
    claim:
      "A full three-dimensional map of the jaw — bone, nerve paths, sinus floors — read before a single plan is drawn.",
    specs: [
      ["Resolution", "0.1 mm voxel"],
      ["Capture", "One 14-second pass"],
      ["Read for", "Implants · airway · roots"],
    ],
  },
  {
    ref: "SYS-02",
    name: "Same-day ceramic crowns",
    claim:
      "Crowns milled from solid porcelain while you wait. No impressions, no temporary, no second appointment.",
    specs: [
      ["Scan", "Digital, no goop"],
      ["Mill time", "~12 minutes"],
      ["Appointments", "One, start to seat"],
    ],
  },
  {
    ref: "SYS-03",
    name: "Guided implant surgery",
    claim:
      "Implant position planned on the 3D scan, then placed through a printed surgical guide — never by eye.",
    specs: [
      ["Planning", "On the CBCT scan"],
      ["Placement", "Guide-directed"],
      ["Typical surgery", "Under one hour"],
    ],
  },
];

/**
 * T1 PRESS — the instruments, catalogued. A ruled three-column plate:
 * mono system reference, Anton name, a plain claim, and a spec ledger.
 * The lab equipment treated like editorial exhibits.
 */
export default function T1Technology() {
  return (
    <Fade>
      <div className="grid grid-cols-1 gap-px border border-[var(--t1-hairline)] bg-[var(--t1-hairline)] md:grid-cols-3">
        {SYSTEMS.map((sys, i) => (
          <div key={sys.ref} className="flex flex-col bg-[var(--t1-paper)] p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <span className="t1-mono-label t1-mono-label-red">
                [ {String(i + 1).padStart(2, "0")} ]
              </span>
              <span className="t1-mono-label t1-mono-label-stone">{sys.ref}</span>
            </div>

            <h3 className="mt-5 font-t1-press text-2xl uppercase leading-[0.95] text-[var(--t1-ink)]">
              {sys.name}
            </h3>
            <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-[var(--t1-stone)] md:text-[15px]">
              {sys.claim}
            </p>

            <ul className="mt-6 border-t border-[var(--t1-hairline)]">
              {sys.specs.map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--t1-hairline)] py-2.5 last:border-b-0"
                >
                  <span className="t1-mono-label t1-mono-label-stone">{k}</span>
                  <span className="t1-mono-label text-right">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Fade>
  );
}
