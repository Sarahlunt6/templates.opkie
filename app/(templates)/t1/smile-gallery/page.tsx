import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T1WireShell from "../components/T1WireShell";
import SmileGalleryWire from "@/components/wireframe/pages/SmileGalleryWire";

const page = getSitePage("smile-gallery");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T1SmileGalleryWireframePage() {
  return (
    <T1WireShell>
      <SmileGalleryWire homeHref="/t1" />
    </T1WireShell>
  );
}
