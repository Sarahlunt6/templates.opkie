import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T5WireShell from "../components/T5WireShell";
import SmileGalleryWire from "@/components/wireframe/pages/SmileGalleryWire";

const page = getSitePage("smile-gallery");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T5SmileGalleryWireframePage() {
  return (
    <T5WireShell>
      <SmileGalleryWire homeHref="/t5" />
    </T5WireShell>
  );
}
