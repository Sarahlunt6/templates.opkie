import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T4WireShell from "../components/T4WireShell";
import FinancingWire from "@/components/wireframe/pages/FinancingWire";

const page = getSitePage("financing");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T4FinancingWireframePage() {
  return (
    <T4WireShell>
      <FinancingWire homeHref="/t4" />
    </T4WireShell>
  );
}
