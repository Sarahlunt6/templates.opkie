import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import DoctorsWire from "@/components/wireframe/pages/DoctorsWire";

const page = getSitePage("doctors");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5DoctorsWireframePage() {
  return (
    <T5WireShell>
      <DoctorsWire homeHref="/t5" />
    </T5WireShell>
  );
}
