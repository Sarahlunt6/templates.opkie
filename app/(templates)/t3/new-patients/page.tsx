import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T3WireShell from "../components/T3WireShell";
import NewPatientsWire from "@/components/wireframe/pages/NewPatientsWire";

const page = getSitePage("new-patients");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T3NewPatientsWireframePage() {
  return (
    <T3WireShell>
      <NewPatientsWire homeHref="/t3" />
    </T3WireShell>
  );
}
