import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import NewPatientsWire from "@/components/wireframe/pages/NewPatientsWire";

const page = getSitePage("new-patients");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5NewPatientsWireframePage() {
  return (
    <T5WireShell>
      <NewPatientsWire homeHref="/t5" />
    </T5WireShell>
  );
}
