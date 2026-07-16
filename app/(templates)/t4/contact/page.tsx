import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T4WireShell from "../components/T4WireShell";
import ContactWire from "@/components/wireframe/pages/ContactWire";

const page = getSitePage("contact");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T4ContactWireframePage() {
  return (
    <T4WireShell>
      <ContactWire homeHref="/t4" />
    </T4WireShell>
  );
}
