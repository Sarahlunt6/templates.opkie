import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import FinancingWire from "@/components/wireframe/pages/FinancingWire";

const page = getSitePage("financing");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5FinancingWireframePage() {
  return (
    <T5WireShell>
      <FinancingWire homeHref="/t5" />
    </T5WireShell>
  );
}
