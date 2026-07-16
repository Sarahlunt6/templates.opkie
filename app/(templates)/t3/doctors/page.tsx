import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T3WireShell from "../components/T3WireShell";
import DoctorsWire from "@/components/wireframe/pages/DoctorsWire";

const page = getSitePage("doctors");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T3DoctorsWireframePage() {
  return (
    <T3WireShell>
      <DoctorsWire homeHref="/t3" />
    </T3WireShell>
  );
}
