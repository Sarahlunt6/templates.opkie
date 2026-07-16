import type { ReactNode } from "react";
import WireNotice from "@/components/wireframe/WireNotice";
import T2Nav from "./T2Nav";
import T2Footer from "./T2Footer";
import T2MobileBar from "./T2MobileBar";

import "../t2-theme.css";
import { t2FontVariables } from "../fonts";

/**
 * Chrome for T2 wireframe interior pages: the real Precision nav, footer,
 * and mobile bar wrap a schematic wireframe body. Self-sufficient on
 * purpose — client sites don't get the hub's (templates)/layout.tsx, so
 * the theme CSS + scope class live here, exactly like the homepage.
 * T2's chrome self-feeds practice data from t2-lib.
 */
export default function T2WireShell({ children }: { children: ReactNode }) {
  return (
    <div className={`t2p font-sans antialiased relative overflow-x-hidden ${t2FontVariables}`}>
      <T2Nav homeHref="/t2" />

      {/* The nav is fixed (4.5rem tall on desktop) — hold space so the
          notice and the wireframe body start below it. */}
      <div aria-hidden className="h-16 md:h-[4.5rem]" />

      <WireNotice />

      {children}

      <T2Footer homeHref="/t2" />
      <T2MobileBar />
    </div>
  );
}
