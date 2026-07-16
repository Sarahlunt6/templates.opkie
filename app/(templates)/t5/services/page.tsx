import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import ServicesWire from "@/components/wireframe/pages/ServicesWire";

const page = getSitePage("services");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5ServicesWireframePage() {
  return (
    <T5WireShell>
      <ServicesWire homeHref="/t5" />
    </T5WireShell>
  );
}
