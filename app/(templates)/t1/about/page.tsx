import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T1WireShell from "../components/T1WireShell";
import AboutWire from "@/components/wireframe/pages/AboutWire";

const page = getSitePage("about");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T1AboutWireframePage() {
  return (
    <T1WireShell>
      <AboutWire homeHref="/t1" />
    </T1WireShell>
  );
}
