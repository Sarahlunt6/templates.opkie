interface T1UtilityBarProps {
  phone: string;
  bookingUrl: string;
  /** optional newspaper-dateline details for the top strip */
  city?: string;
  state?: string;
  hoursNote?: string;
}

/**
 * T1 PRESS — thin utility strip above the masthead. Phone, hours and
 * city set in mono, like the dateline row of a broadsheet.
 */
export default function T1UtilityBar({
  phone,
  bookingUrl,
  city,
  state,
  hoursNote,
}: T1UtilityBarProps) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const hasBooking = bookingUrl !== "none";

  return (
    <div className="border-b border-[rgba(26,23,19,0.15)] bg-[#F3EFE6]">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-2 md:px-8 xl:px-12">
        <a href={tel} className="t1-mono-label t1-link whitespace-nowrap">
          T. {phone}
        </a>
        {hoursNote && (
          <p className="t1-mono-label t1-mono-label-stone hidden text-center md:block">
            {hoursNote}
          </p>
        )}
        <div className="flex items-center gap-6">
          {city && (
            <p className="t1-mono-label t1-mono-label-stone hidden whitespace-nowrap sm:block">
              {city}
              {state ? `, ${state}` : ""}
            </p>
          )}
          <a
            href={hasBooking ? bookingUrl : tel}
            {...(hasBooking
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="t1-mono-label t1-mono-label-red whitespace-nowrap hover:underline"
          >
            [ BOOK ]
          </a>
        </div>
      </div>
    </div>
  );
}
