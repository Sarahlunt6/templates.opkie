import { clientMasterData, sampleFaqs } from "@/data/master";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireLines,
  WireBtn,
  WireNote,
  WireCtaSection,
} from "../primitives";

const FIRST_VISIT_STEPS = [
  {
    title: "Welcome & paperwork",
    detail: "A warm hello, a short tour, and any remaining forms.",
  },
  {
    title: "Exam & imaging",
    detail: "A gentle, complete exam with digital imaging you can see.",
  },
  {
    title: "Conversation with the doctor",
    detail: "Your goals, your concerns, and what we found — in plain language.",
  },
  {
    title: "Your plan & pricing",
    detail: "A clear written plan: what's recommended, what's optional, what it costs.",
  },
];

const POLICIES = [
  "Scheduling & confirmations",
  "Cancellations & rescheduling",
  "Late arrivals",
  "Financial policy",
];

export default function NewPatientsWire({ homeHref = "" }: { homeHref?: string }) {
  void homeHref;
  const { globalPracticeName, onlineBookingUrl, locations } = clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const loc = locations[0];
  const faqPreview = sampleFaqs.slice(0, 3);

  return (
    <WireBody>
      <WirePageHeader
        kicker="New patients"
        title="New patient information"
        intro={`Everything you need before your first visit to ${practiceName} — what happens, what to bring, and how we work.`}
      />

      <WireSection label="First visit" title="Your first visit, step by step">
        <ol className="grid gap-4 sm:grid-cols-2">
          {FIRST_VISIT_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
            >
              <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-sm font-bold text-neutral-600">
                {i + 1}
              </span>
              <h3 className="mb-1 text-sm font-semibold text-neutral-700">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </WireSection>

      <WireSection label="Patient forms" title="Save time — complete forms ahead">
        <div className="flex flex-wrap gap-3">
          <WireBtn variant="outline">New patient forms (download)</WireBtn>
          <WireBtn variant="outline">Online patient portal</WireBtn>
        </div>
        <WireNote>
          Forms provider (PDF download vs. online portal) is decided during
          build-out.
        </WireNote>
      </WireSection>

      <WireSection label="What to bring" title="What to bring with you">
        <ul className="grid gap-2 sm:grid-cols-3">
          {["Photo ID", "Insurance card", "Medication list"].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-600"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Send us your insurance details before your visit and we&apos;ll
          verify your benefits ahead of time — no surprises at checkout.
        </p>
      </WireSection>

      <WireSection label="Office policies" title="Office policies">
        <div className="grid gap-3 sm:grid-cols-2">
          {POLICIES.map((policy) => (
            <div
              key={policy}
              className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
            >
              <h3 className="mb-2 text-sm font-semibold text-neutral-700">
                {policy}
              </h3>
              <WireLines lines={2} />
            </div>
          ))}
        </div>
      </WireSection>

      <WireSection label="FAQ preview" title="Common first-visit questions">
        <div className="space-y-4">
          {faqPreview.length > 0
            ? faqPreview.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
                >
                  <h3 className="mb-2 text-sm font-semibold text-neutral-700">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {faq.answer}
                  </p>
                </div>
              ))
            : [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
                >
                  <WireLines lines={3} />
                </div>
              ))}
        </div>
      </WireSection>

      <WireCtaSection
        heading="Ready for your first visit?"
        sub="Book online in under a minute, or call and a real person will help."
        phone={loc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
