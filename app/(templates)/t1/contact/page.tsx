import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T1WireShell from "../components/T1WireShell";
import ContactWire from "@/components/wireframe/pages/ContactWire";

const page = getSitePage("contact");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T1ContactWireframePage() {
  return (
    <T1WireShell>
      <ContactWire homeHref="/t1" />
    </T1WireShell>
  );
}
