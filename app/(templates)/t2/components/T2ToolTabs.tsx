"use client";

import { useId, useRef, useState } from "react";
import T2FinancingCalculator from "./T2FinancingCalculator";
import T2SmileAssessment from "./T2SmileAssessment";
import { practice } from "./t2-lib";

/* ────────────────────────────────────────────────────────────────
   Tool tabs — one instrument panel, two instruments. The financing
   configurator and the smile-check intake used to stack; now a mono
   tab strip switches between them so only one reads out at a time.
   Full tablist semantics: arrow keys move and activate, Home/End
   jump, inactive tabs leave the tab order.
   ──────────────────────────────────────────────────────────────── */

const TABS = [
  { id: "financing", label: "Financing" },
  { id: "smile-check", label: "Smile check" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function T2ToolTabs() {
  const [active, setActive] = useState<TabId>("financing");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activate = (idx: number) => {
    setActive(TABS[idx].id);
    tabRefs.current[idx]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (idx + 1) % TABS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (idx - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = TABS.length - 1;
    }
    if (next !== null) {
      e.preventDefault();
      activate(next);
    }
  };

  return (
    <div>
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Planning tools"
        className="flex items-end gap-7 border-b border-[var(--t2p-line)]"
      >
        {TABS.map((tab, i) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`t2p-mono relative pb-3.5 text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                selected
                  ? "text-[var(--t2p-volt)]"
                  : "text-[var(--t2p-text-50)] hover:text-[var(--t2p-text-70)]"
              }`}
            >
              <span aria-hidden="true">[ </span>
              {tab.label}
              <span aria-hidden="true"> ]</span>
              {/* Active indicator — the scan light lands on the live tab */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-[2px] transition-opacity duration-300 ${
                  selected ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: "var(--t2p-volt)",
                  boxShadow: "0 0 8px rgba(126, 224, 75, 0.6)",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Panels — one instrument at a time */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-financing`}
        aria-labelledby={`${baseId}-tab-financing`}
        tabIndex={0}
        hidden={active !== "financing"}
        className="pt-6"
      >
        <T2FinancingCalculator />
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-smile-check`}
        aria-labelledby={`${baseId}-tab-smile-check`}
        tabIndex={0}
        hidden={active !== "smile-check"}
        className="pt-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl border border-[var(--t2p-line)] bg-[var(--t2p-surface)] px-7 md:px-9 py-7">
          <div className="max-w-xl">
            <p className="t2p-label mb-2.5">Intake scan</p>
            <h3 className="font-innovator text-xl md:text-2xl font-medium tracking-tight text-[var(--t2p-text)]">
              Not sure where to start?
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--t2p-text-70)]">
              Three questions and an optional photo. A coordinator at{" "}
              {practice.globalPracticeName} reads every submission and replies
              within one business day.
            </p>
          </div>
          <div className="shrink-0">
            <T2SmileAssessment />
          </div>
        </div>
      </div>
    </div>
  );
}
