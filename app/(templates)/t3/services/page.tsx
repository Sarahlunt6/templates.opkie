import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T3WireShell from "../components/T3WireShell";
import ServicesWire from "@/components/wireframe/pages/ServicesWire";

const page = getSitePage("services");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T3ServicesWireframePage() {
  return (
    <T3WireShell>
      <ServicesWire homeHref="/t3" />
    </T3WireShell>
  );
}
