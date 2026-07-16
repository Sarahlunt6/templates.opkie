import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T4WireShell from "../components/T4WireShell";
import NewPatientsWire from "@/components/wireframe/pages/NewPatientsWire";

const page = getSitePage("new-patients");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T4NewPatientsWireframePage() {
  return (
    <T4WireShell>
      <NewPatientsWire homeHref="/t4" />
    </T4WireShell>
  );
}
