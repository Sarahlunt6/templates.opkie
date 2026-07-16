import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T3WireShell from "../components/T3WireShell";
import SmileGalleryWire from "@/components/wireframe/pages/SmileGalleryWire";

const page = getSitePage("smile-gallery");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T3SmileGalleryWireframePage() {
  return (
    <T3WireShell>
      <SmileGalleryWire homeHref="/t3" />
    </T3WireShell>
  );
}
