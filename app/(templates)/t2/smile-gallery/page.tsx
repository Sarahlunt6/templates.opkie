import type { Metadata } from "next";
import { clientMasterData } from "@/data/master";
import { getSitePage } from "@/components/wireframe/site-pages";
import T2WireShell from "../components/T2WireShell";
import SmileGalleryWire from "@/components/wireframe/pages/SmileGalleryWire";

const page = getSitePage("smile-gallery");

export const metadata: Metadata = {
  title: `${page.title} — ${clientMasterData.globalPracticeName}`,
  description: page.description,
  robots: { index: false, follow: false },
};

export default function T2SmileGalleryWireframePage() {
  return (
    <T2WireShell>
      <SmileGalleryWire homeHref="/t2" />
    </T2WireShell>
  );
}
