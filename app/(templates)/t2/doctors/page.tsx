import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T2WireShell from "../components/T2WireShell";
import DoctorsWire from "@/components/wireframe/pages/DoctorsWire";

const page = getSitePage("doctors");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T2DoctorsWireframePage() {
  return (
    <T2WireShell>
      <DoctorsWire homeHref="/t2" />
    </T2WireShell>
  );
}
