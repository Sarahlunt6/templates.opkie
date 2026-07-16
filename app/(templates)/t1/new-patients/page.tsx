import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T1WireShell from "../components/T1WireShell";
import NewPatientsWire from "@/components/wireframe/pages/NewPatientsWire";

const page = getSitePage("new-patients");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T1NewPatientsWireframePage() {
  return (
    <T1WireShell>
      <NewPatientsWire homeHref="/t1" />
    </T1WireShell>
  );
}
