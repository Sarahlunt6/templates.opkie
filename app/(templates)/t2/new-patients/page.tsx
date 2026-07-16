import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T2WireShell from "../components/T2WireShell";
import NewPatientsWire from "@/components/wireframe/pages/NewPatientsWire";

const page = getSitePage("new-patients");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T2NewPatientsWireframePage() {
  return (
    <T2WireShell>
      <NewPatientsWire homeHref="/t2" />
    </T2WireShell>
  );
}
