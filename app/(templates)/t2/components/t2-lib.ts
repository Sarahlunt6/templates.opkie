import { clientMasterData } from "@/data/master";

export const practice = clientMasterData;
export const location = clientMasterData.locations[0];

export const telHref = `tel:${location.phoneGBP.replace(/[^0-9+]/g, "")}`;

export const bookingHref =
  clientMasterData.onlineBookingUrl !== "none"
    ? clientMasterData.onlineBookingUrl
    : telHref;

/** Fast-out, precise. The one easing curve used across T2. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface DaySchedule {
  day: string;
  hours: string;
  openMin: number | null; // minutes since midnight, null = closed/unparsed
  closeMin: number | null;
}

function parseTime(raw: string): number | null {
  const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + (m[2] ? parseInt(m[2], 10) : 0);
}

/**
 * Expand hoursOfOperation dayRange entries ("Monday - Thursday") into a
 * 7-day schedule. Defensive: anything unparseable renders but never
 * claims the office is open.
 */
export function expandHours(
  hoursOfOperation: { dayRange: string; structuralHours: string }[],
): DaySchedule[] {
  const week: DaySchedule[] = DAYS.map((day) => ({
    day,
    hours: "Closed",
    openMin: null,
    closeMin: null,
  }));

  for (const entry of hoursOfOperation) {
    const parts = entry.dayRange.split(/\s*[-–]\s*/).map((p) => p.trim());
    const startIdx = DAYS.findIndex((d) =>
      d.toLowerCase().startsWith(parts[0].slice(0, 3).toLowerCase()),
    );
    if (startIdx === -1) continue;
    const endIdx =
      parts.length > 1
        ? DAYS.findIndex((d) =>
            d.toLowerCase().startsWith(parts[1].slice(0, 3).toLowerCase()),
          )
        : startIdx;
    if (endIdx === -1) continue;

    const closed = /closed/i.test(entry.structuralHours);
    const timeParts = entry.structuralHours.split(/\s*[-–—]\s*/);
    const openMin = closed ? null : parseTime(timeParts[0] ?? "");
    const closeMin = closed ? null : parseTime(timeParts[1] ?? "");

    let i = startIdx;
    while (true) {
      week[i] = {
        day: DAYS[i],
        hours: entry.structuralHours,
        openMin,
        closeMin,
      };
      if (i === endIdx) break;
      i = (i + 1) % 7;
    }
  }

  // Order Monday-first for display
  return [...week.slice(1), week[0]];
}

export function isOpenNow(week: DaySchedule[], now: Date): boolean {
  const dayName = DAYS[now.getDay()];
  const today = week.find((d) => d.day === dayName);
  if (!today || today.openMin === null || today.closeMin === null) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= today.openMin && mins < today.closeMin;
}
