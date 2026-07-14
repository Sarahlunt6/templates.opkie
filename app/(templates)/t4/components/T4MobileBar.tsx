"use client";

interface T4MobileBarProps {
  phone: string;
  bookingUrl: string;
}

/** Fixed bottom action bar — mobile only. */
export default function T4MobileBar({ phone, bookingUrl }: T4MobileBarProps) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const bookHref = bookingUrl !== "none" ? bookingUrl : telHref;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--t4-line-dark)] lg:hidden"
      style={{
        backgroundColor: "rgba(23, 16, 10, 0.96)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid grid-cols-2">
        <a
          href={telHref}
          className="t4-label flex items-center justify-center gap-2 py-4 text-center text-[var(--t4-ivory)]"
        >
          Call {phone}
        </a>
        <a
          href={bookHref}
          {...(bookingUrl !== "none"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="t4-label flex items-center justify-center bg-[var(--t4-champagne)] py-4 text-center !text-[#241a12]"
        >
          Book now
        </a>
      </div>
    </div>
  );
}
