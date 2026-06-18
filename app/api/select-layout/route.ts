import { NextRequest, NextResponse } from "next/server";

interface SelectLayoutPayload {
  practiceId: string;
  templateId: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SelectLayoutPayload = await request.json();

    const { practiceId, templateId, timestamp } = body;

    if (!practiceId || !templateId) {
      return NextResponse.json(
        { error: "Missing required fields: practiceId and templateId" },
        { status: 400 }
      );
    }

    const validTemplates = ["t1", "t2", "t3", "t4", "t5"];
    if (!validTemplates.includes(templateId)) {
      return NextResponse.json(
        { error: `Invalid templateId. Must be one of: ${validTemplates.join(", ")}` },
        { status: 400 }
      );
    }

    // Log selection (in production, this would save to a database)
    console.log("[Template Selection]", {
      practiceId,
      templateId,
      timestamp,
      userAgent: request.headers.get("user-agent"),
    });

    // In production, you would:
    // 1. Save to database
    // 2. Trigger webhook to notify team
    // 3. Initialize client onboarding workflow

    return NextResponse.json({
      success: true,
      message: `Template ${templateId.toUpperCase()} selected for practice ${practiceId}`,
      data: {
        practiceId,
        templateId,
        selectedAt: timestamp || new Date().toISOString(),
        nextSteps: [
          "Upload practice logo and brand colors",
          "Provide NAP data for all locations",
          "Submit doctor profiles and headshots",
          "Complete content questionnaire",
        ],
      },
    });
  } catch (error) {
    console.error("[Template Selection Error]", error);
    return NextResponse.json(
      { error: "Failed to process template selection" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Template Selection API",
    availableTemplates: [
      { id: "t1", name: "The Clinical Authority", style: "Prestige Serif" },
      { id: "t2", name: "The Tech Innovator", style: "Modern Sans-Serif" },
      { id: "t3", name: "The Community & Family Hub", style: "Warm Approachable" },
      { id: "t4", name: "The Cosmetic Showcase", style: "Portfolio Driven" },
      { id: "t5", name: "The Boutique Concierge", style: "Zen Minimalist" },
    ],
    usage: {
      method: "POST",
      body: {
        practiceId: "string (required)",
        templateId: "string (required) - one of t1, t2, t3, t4, t5",
        timestamp: "string (optional) - ISO date string",
      },
    },
  });
}
