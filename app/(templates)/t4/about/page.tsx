import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T4WireShell from "../components/T4WireShell";
import AboutWire from "@/components/wireframe/pages/AboutWire";

const page = getSitePage("about");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T4AboutWireframePage() {
  return (
    <T4WireShell>
      <AboutWire homeHref="/t4" />
    </T4WireShell>
  );
}
