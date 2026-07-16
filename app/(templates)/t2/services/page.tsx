import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T2WireShell from "../components/T2WireShell";
import ServicesWire from "@/components/wireframe/pages/ServicesWire";

const page = getSitePage("services");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T2ServicesWireframePage() {
  return (
    <T2WireShell>
      <ServicesWire homeHref="/t2" />
    </T2WireShell>
  );
}
