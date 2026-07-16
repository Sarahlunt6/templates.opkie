import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T3WireShell from "../components/T3WireShell";
import ContactWire from "@/components/wireframe/pages/ContactWire";

const page = getSitePage("contact");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T3ContactWireframePage() {
  return (
    <T3WireShell>
      <ContactWire homeHref="/t3" />
    </T3WireShell>
  );
}
