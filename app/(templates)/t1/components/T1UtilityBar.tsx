interface T1UtilityBarProps {
  phone: string;
  bookingUrl: string;
}

/**
 * Sticky mobile bottom bar — Call and Reserve, kept in the template's
 * ink-and-porcelain voice. Hidden on large screens.
 */
export default function T1UtilityBar({ phone, bookingUrl }: T1UtilityBarProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-[#16130F]/15 bg-[#F7F5F0]/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={tel}
        className="flex min-h-[56px] items-center justify-center gap-2 border-r border-[#16130F]/15 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16130F]"
      >
        <span aria-hidden="true" className="font-t1-display italic text-[#9C7E46]">
          ☏
        </span>
        Call
      </a>
      <a
        href={hasBooking ? bookingUrl : tel}
        {...(hasBooking
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="flex min-h-[56px] items-center justify-center gap-2 bg-[#16130F] font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F5F0]"
      >
        Reserve
      </a>
    </div>
  );
}
