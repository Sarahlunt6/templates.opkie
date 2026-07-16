import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T2WireShell from "../components/T2WireShell";
import ContactWire from "@/components/wireframe/pages/ContactWire";

const page = getSitePage("contact");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T2ContactWireframePage() {
  return (
    <T2WireShell>
      <ContactWire homeHref="/t2" />
    </T2WireShell>
  );
}
