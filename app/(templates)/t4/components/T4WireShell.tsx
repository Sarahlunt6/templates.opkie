import type { ReactNode } from "react";
import { clientMasterData } from "@/data/master";
import WireNotice from "@/components/wireframe/WireNotice";
import T4Nav from "./T4Nav";
import T4Footer from "./T4Footer";
import T4MobileBar from "./T4MobileBar";

import "../t4-theme.css";
import { t4FontVariables } from "../fonts";

/**
 * Chrome for T4 wireframe interior pages: the real Atelier nav, footer,
 * and mobile bar wrap a schematic wireframe body. Self-sufficient on
 * purpose — client sites don't get the hub's (templates)/layout.tsx, so
 * the theme CSS + scope class live here, exactly like the homepage.
 */
export default function T4WireShell({ children }: { children: ReactNode }) {
  const { globalPracticeName, onlineBookingUrl, locations } = clientMasterData;
  const location = locations[0];

  return (
    <div className={`t4-atelier font-t4-body relative min-h-screen overflow-x-clip ${t4FontVariables}`}>
      <T4Nav
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        city={location.cityServed}
        state={location.stateServed}
        bookingUrl={onlineBookingUrl}
        homeHref="/t4"
      />

      {/* The nav is fixed and transparent until scroll — hold a band of
          noir beneath it so the ivory lockup stays legible over the light
          wireframe body. */}
      <div aria-hidden className="h-24" style={{ backgroundColor: "var(--t4-noir)" }} />

      <WireNotice />

      {children}

      <T4Footer
        practiceName={globalPracticeName}
        locations={locations}
        bookingUrl={onlineBookingUrl}
        homeHref="/t4"
      />

      <T4MobileBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
    </div>
  );
}
