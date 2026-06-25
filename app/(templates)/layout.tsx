"use client";

import { clientMasterData } from "@/data/master";
import SmoothScrollProvider from "@/components/premium/SmoothScrollProvider";

export default function TemplateShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = clientMasterData;

  return (
    <SmoothScrollProvider>
      <div
        style={{
          ["--primary-brand" as string]: theme.primaryBrandHex,
          ["--secondary-accent" as string]: theme.secondaryAccentHex,
          ["--text-main" as string]: theme.textMainHex,
          ["--bg-canvas" as string]: theme.bgCanvasHex,
        }}
      >
        {/* Template Content */}
        <main>{children}</main>
      </div>
    </SmoothScrollProvider>
  );
}
