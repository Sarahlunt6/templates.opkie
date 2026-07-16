import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T1WireShell from "../components/T1WireShell";
import ServicesWire from "@/components/wireframe/pages/ServicesWire";

const page = getSitePage("services");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T1ServicesWireframePage() {
  return (
    <T1WireShell>
      <ServicesWire homeHref="/t1" />
    </T1WireShell>
  );
}
