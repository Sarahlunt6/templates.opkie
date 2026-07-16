import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T3WireShell from "../components/T3WireShell";
import AboutWire from "@/components/wireframe/pages/AboutWire";

const page = getSitePage("about");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T3AboutWireframePage() {
  return (
    <T3WireShell>
      <AboutWire homeHref="/t3" />
    </T3WireShell>
  );
}
