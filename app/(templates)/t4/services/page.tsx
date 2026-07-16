import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T4WireShell from "../components/T4WireShell";
import ServicesWire from "@/components/wireframe/pages/ServicesWire";

const page = getSitePage("services");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T4ServicesWireframePage() {
  return (
    <T4WireShell>
      <ServicesWire homeHref="/t4" />
    </T4WireShell>
  );
}
