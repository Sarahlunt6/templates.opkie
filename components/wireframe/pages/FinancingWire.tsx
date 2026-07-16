import { clientMasterData, sampleFaqs } from "@/data/master";
import {
  WireBody,
  WirePageHeader,
  WireSection,
  WireImg,
  WireLines,
  WireNote,
  WireCtaSection,
} from "../primitives";

const PAYMENT_OPTIONS = [
  "Cash & check",
  "All major credit cards",
  "HSA / FSA accounts",
  "Monthly financing",
];

const COST_FAQ_IDS = ["faq-insurance", "faq-no-insurance", "faq-payment"];

export default function FinancingWire({ homeHref = "" }: { homeHref?: string }) {
  void homeHref;
  const { globalPracticeName, onlineBookingUrl, trustSignals, locations } =
    clientMasterData;
  const practiceName = globalPracticeName || "Our Practice";
  const loc = locations[0];
  const costFaqs = sampleFaqs.filter((faq) => COST_FAQ_IDS.includes(faq.id));

  return (
    <WireBody>
      <WirePageHeader
        kicker="Financing & insurance"
        title="Financing & insurance"
        intro={`How paying for care works at ${practiceName} — insurance, membership savings, and payment plans, all in plain language.`}
      />

      <WireSection label="Insurance" title="Insurance we accept">
        {trustSignals.insuranceAcceptedText ? (
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
            {trustSignals.insuranceAcceptedText}
          </p>
        ) : (
          <WireLines lines={2} className="max-w-2xl" />
        )}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Carrier logo", "Carrier logo", "Carrier logo", "Carrier logo"].map(
            (label, i) => (
              <WireImg key={i} label={label} className="aspect-[3/2]" />
            )
          )}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Not sure about your coverage? Call with your plan details and
          we&apos;ll verify your benefits before your visit.
        </p>
      </WireSection>

      <WireSection label="Membership plan" title="No insurance? Join the membership plan">
        <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-5">
          {trustSignals.membershipPlanSummary ? (
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
              {trustSignals.membershipPlanSummary}
            </p>
          ) : (
            <WireLines lines={3} className="max-w-2xl" />
          )}
          <WireNote>
            Membership pricing (individual / couple / family) comes from the
            intake file and is displayed as a pricing card here.
          </WireNote>
        </div>
      </WireSection>

      <WireSection label="Payment options" title="Ways to pay">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PAYMENT_OPTIONS.map((option) => (
            <div
              key={option}
              className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
            >
              <div aria-hidden="true" className="mb-3 h-8 w-8 rounded-full bg-neutral-200" />
              <h3 className="text-sm font-semibold text-neutral-700">{option}</h3>
            </div>
          ))}
        </div>
      </WireSection>

      <WireSection label="Third-party financing" title="Monthly payment plans">
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-300 bg-neutral-50 p-4"
            >
              <WireImg label="Financing partner logo" className="mb-3 h-12 max-w-40" />
              <WireLines lines={2} />
            </div>
          ))}
        </div>
        <WireNote>
          Confirm the practice&apos;s actual financing partners (e.g.
          CareCredit, Sunbit) before launch — never list a partner they
          don&apos;t use.
        </WireNote>
      </WireSection>

      <WireSection label="Cost FAQ" title="Common questions about cost">
        <div className="space-y-4">
          {costFaqs.length > 0
            ? costFaqs.map((faq) => (
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
        heading="Questions about cost?"
        sub="Call us — we'll walk through the numbers before anything begins."
        phone={loc?.phoneGBP}
        bookingUrl={onlineBookingUrl}
      />
    </WireBody>
  );
}
