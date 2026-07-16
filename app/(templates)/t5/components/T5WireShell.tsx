import type { ReactNode } from "react";
import { clientMasterData } from "@/data/master";
import WireNotice from "@/components/wireframe/WireNotice";
import T5Nav from "./T5Nav";
import T5Footer from "./T5Footer";
import T5MobileBar from "./T5MobileBar";

import "../t5-theme.css";

/**
 * Chrome for T5 wireframe interior pages: the real Marigold nav, footer,
 * and mobile bar wrap a schematic wireframe body. Self-sufficient on
 * purpose — client sites don't get the hub's (templates)/layout.tsx, so
 * the theme CSS + scope class live here, exactly like the homepage.
 */
export default function T5WireShell({ children }: { children: ReactNode }) {
  const { globalPracticeName, onlineBookingUrl, locations } = clientMasterData;
  const location = locations[0];

  return (
    <div className="t5-marigold font-t5-body relative min-h-screen overflow-x-clip">
      <T5Nav
        practiceName={globalPracticeName}
        phone={location.phoneGBP}
        bookingUrl={onlineBookingUrl}
        homeHref="/t5"
      />

      <WireNotice />

      {children}

      <T5Footer
        practiceName={globalPracticeName}
        locations={locations}
        bookingUrl={onlineBookingUrl}
        homeHref="/t5"
      />

      <T5MobileBar phone={location.phoneGBP} bookingUrl={onlineBookingUrl} />
    </div>
  );
}
