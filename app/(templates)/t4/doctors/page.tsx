import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T4WireShell from "../components/T4WireShell";
import DoctorsWire from "@/components/wireframe/pages/DoctorsWire";

const page = getSitePage("doctors");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T4DoctorsWireframePage() {
  return (
    <T4WireShell>
      <DoctorsWire homeHref="/t4" />
    </T4WireShell>
  );
}
