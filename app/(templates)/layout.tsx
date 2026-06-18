"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientMasterData } from "@/data/master";
import { useState } from "react";

const templates = [
  { id: "t1", name: "Clinical Authority" },
  { id: "t2", name: "Tech Innovator" },
  { id: "t3", name: "Family Hub" },
  { id: "t4", name: "Cosmetic Showcase" },
  { id: "t5", name: "Boutique Concierge" },
];

export default function TemplateShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentTemplate = pathname.split("/")[1] || "t1";
  const [isSelecting, setIsSelecting] = useState(false);

  const { theme } = clientMasterData;

  const handleSelectTemplate = async () => {
    setIsSelecting(true);
    try {
      const response = await fetch("/api/select-layout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practiceId: "demo-practice",
          templateId: currentTemplate,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert(`Template ${currentTemplate.toUpperCase()} selected successfully!`);
      }
    } catch (error) {
      console.error("Selection failed:", error);
    } finally {
      setIsSelecting(false);
    }
  };

  return (
    <div
      style={{
        ["--primary-brand" as string]: theme.primaryBrandHex,
        ["--secondary-accent" as string]: theme.secondaryAccentHex,
        ["--text-main" as string]: theme.textMainHex,
        ["--bg-canvas" as string]: theme.bgCanvasHex,
      }}
    >
      {/* Fixed Selection Dashboard Controller */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] border-b shadow-sm"
        style={{
          backgroundColor: "#1e293b",
          borderColor: "#334155",
        }}
      >
        {/* Review Mode Banner */}
        <div
          className="text-center py-2 text-xs px-4"
          style={{ backgroundColor: "#0f766e", color: "#ffffff" }}
        >
          <strong>Review Mode Enabled:</strong> You are evaluating layout structure,
          information hierarchy, and conversion pathways. Corporate brand styles, custom
          practice photography assets, and localized logo typography will adjust natively
          to match your clinic parameters post-selection.
        </div>

        {/* Template Switcher */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo / Back Link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-brand-accent transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-semibold">Template Hub</span>
          </Link>

          {/* Template Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {templates.map((template) => (
              <Link
                key={template.id}
                href={`/${template.id}`}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  currentTemplate === template.id
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {template.id.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Mobile Template Selector */}
          <div className="md:hidden">
            <select
              value={currentTemplate}
              onChange={(e) => {
                window.location.href = `/${e.target.value}`;
              }}
              className="bg-white/10 text-white text-sm rounded-md px-3 py-1.5 border border-white/20"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id} className="text-gray-900">
                  {template.id.toUpperCase()} - {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Confirm Selection Button */}
          <button
            onClick={handleSelectTemplate}
            disabled={isSelecting}
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-all disabled:opacity-50"
            style={{
              backgroundColor: "#0f766e",
              color: "#ffffff",
            }}
          >
            {isSelecting ? "Selecting..." : "Confirm & Select This Structure"}
          </button>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[88px]" />

      {/* Template Content */}
      <main>{children}</main>
    </div>
  );
}
