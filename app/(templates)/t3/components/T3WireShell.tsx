import type { ReactNode } from "react";
import { clientMasterData } from "@/data/master";
import WireNotice from "@/components/wireframe/WireNotice";
import T3HavenNav from "./T3HavenNav";
import T3HavenFooter from "./T3HavenFooter";
import T3MobileBar from "./T3MobileBar";

import "../t3-theme.css";
import { t3FontVariables } from "../fonts";

/**
 * Chrome for T3 wireframe interior pages: the real Haven nav, footer, and
 * mobile bar wrap a schematic wireframe body. Self-sufficient on purpose —
 * client sites don't get the hub's (templates)/layout.tsx, so the theme
 * CSS + scope class live here, exactly like the homepage.
 */
export default function T3WireShell({ children }: { children: ReactNode }) {
  const { globalPracticeName, onlineBookingUrl, locations } = clientMasterData;
  const location = locations[0];

  return (
    <div className={`t3-haven font-sanctuary relative min-h-screen overflow-x-clip ${t3FontVariables}`}>
      <T3HavenNav
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        homeHref="/t3"
      />

      {/* The nav is fixed (72px tall) — hold space so the notice and the
          wireframe body start below it. */}
      <div aria-hidden className="h-[72px]" />

      <WireNotice />

      {children}

      <T3HavenFooter
        practiceName={globalPracticeName}
        location={location}
        bookingUrl={onlineBookingUrl}
        homeHref="/t3"
      />

      <T3MobileBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
    </div>
  );
}
