import type { ReactNode } from "react";
import { clientMasterData } from "@/data/master";
import WireNotice from "@/components/wireframe/WireNotice";
import T1UtilityBar from "./T1UtilityBar";
import T1Masthead from "./T1Masthead";
import T1Footer from "./T1Footer";

import "../t1-theme.css";

/**
 * Chrome for T1 wireframe interior pages: the real Press utility bar,
 * masthead, and footer wrap a schematic wireframe body. Self-sufficient
 * on purpose — client sites don't get the hub's (templates)/layout.tsx,
 * so the theme CSS + scope class live here, exactly like the homepage.
 * T1 has no mobile bar.
 */
export default function T1WireShell({ children }: { children: ReactNode }) {
  const { globalPracticeName, onlineBookingUrl, locations } = clientMasterData;
  const location = locations[0];
  const firstHours = location.hoursOfOperation[0];

  return (
    <div className="t1-root font-sans antialiased overflow-x-clip">
      <T1UtilityBar
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        city={location.cityServed}
        state={location.stateServed}
        hoursNote={
          firstHours
            ? `${firstHours.dayRange.toUpperCase()} — ${firstHours.structuralHours.toUpperCase()}`
            : ""
        }
      />
      <T1Masthead
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        homeHref="/t1"
      />

      <WireNotice />

      {children}

      <T1Footer
        practiceName={globalPracticeName}
        address={location.addressGBP}
        city={location.cityServed}
        state={location.stateServed}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        hours={location.hoursOfOperation}
        homeHref="/t1"
      />
    </div>
  );
}
