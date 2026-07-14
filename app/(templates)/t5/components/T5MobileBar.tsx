"use client";

interface T5MobileBarProps {
  phone: string;
  bookingUrl: string;
}

/** Fixed bottom action bar — mobile only. */
export default function T5MobileBar({ phone, bookingUrl }: T5MobileBarProps) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[var(--t5-walnut)] bg-[var(--t5-cream)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        <a
          href={telHref}
          className="t5-btn t5-btn--paper flex-1 !px-4 !py-3 !text-[0.88rem]"
        >
          Call us
        </a>
        <a
          href={bookHref}
          {...(bookingUrl !== "none"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="t5-btn flex-1 !px-4 !py-3 !text-[0.88rem]"
        >
          Book a visit
        </a>
      </div>
    </div>
  );
}
