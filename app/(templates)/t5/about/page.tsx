import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import AboutWire from "@/components/wireframe/pages/AboutWire";

const page = getSitePage("about");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5AboutWireframePage() {
  return (
    <T5WireShell>
      <AboutWire homeHref="/t5" />
    </T5WireShell>
  );
}
