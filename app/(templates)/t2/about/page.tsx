import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T2WireShell from "../components/T2WireShell";
import AboutWire from "@/components/wireframe/pages/AboutWire";

const page = getSitePage("about");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T2AboutWireframePage() {
  return (
    <T2WireShell>
      <AboutWire homeHref="/t2" />
    </T2WireShell>
  );
}
