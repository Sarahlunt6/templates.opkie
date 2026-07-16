import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import ContactWire from "@/components/wireframe/pages/ContactWire";

const page = getSitePage("contact");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5ContactWireframePage() {
  return (
    <T5WireShell>
      <ContactWire homeHref="/t5" />
    </T5WireShell>
  );
}
