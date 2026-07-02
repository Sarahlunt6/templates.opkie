/**
 * T3 Haven — hours utilities.
 * Parses the master-data hoursOfOperation entries (day ranges + structural
 * hour strings) into a per-day schedule so the live open/closed status is
 * always computed from real client data, never hardcoded.
 */

export interface HoursEntry {
  dayRange: string;
  structuralHours: string;
}

export interface DaySchedule {
  day: string;
  open: number | null; // minutes since midnight, null = closed
  close: number | null;
  label: string; // human label from the data, e.g. "8:00 AM - 5:00 PM"
}

export interface LiveStatus {
  isOpen: boolean;
  message: string;
}

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function normalizeDay(raw: string): string | null {
  const cleaned = raw.trim().toLowerCase();
  const match = DAY_ORDER.find((d) => cleaned.startsWith(d.slice(0, 3).toLowerCase()));
  return match ?? null;
}

function parseTimeToMinutes(raw: string): number | null {
  const match = raw.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10) % 12;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  if (match[3].toLowerCase() === "pm") hours += 12;
  return hours * 60 + minutes;
}

/** Expand "Monday - Thursday" | "Friday" | "Saturday - Sunday" into day names. */
function expandDayRange(range: string): string[] {
  const parts = range.split(/[-–—]/).map((p) => normalizeDay(p));
  if (parts.length === 1) {
    return parts[0] ? [parts[0]] : [];
  }
  const [start, end] = [parts[0], parts[parts.length - 1]];
  if (!start || !end) return [];
  const startIdx = DAY_ORDER.indexOf(start);
  const endIdx = DAY_ORDER.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [];
  const days: string[] = [];
  for (let i = startIdx; i !== (endIdx + 1) % 7; i = (i + 1) % 7) {
    days.push(DAY_ORDER[i]);
    if (days.length > 7) break;
  }
  return days;
}

/** Build a Monday-first weekly schedule from master-data entries. */
export function buildWeekSchedule(entries: HoursEntry[]): DaySchedule[] {
  const map = new Map<string, DaySchedule>();
  DAY_ORDER.forEach((day) =>
    map.set(day, { day, open: null, close: null, label: "Closed" })
  );

  entries.forEach(({ dayRange, structuralHours }) => {
    const isClosed = /closed/i.test(structuralHours);
    const [openRaw, closeRaw] = structuralHours.split(/[-–—]/);
    const open = isClosed ? null : parseTimeToMinutes(openRaw ?? "");
    const close = isClosed ? null : parseTimeToMinutes(closeRaw ?? "");
    expandDayRange(dayRange).forEach((day) => {
      map.set(day, {
        day,
        open,
        close,
        label: isClosed ? "Closed" : structuralHours.trim(),
      });
    });
  });

  return DAY_ORDER.map((day) => map.get(day)!);
}

export function formatMinutes(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

/** Name of today's weekday for a given Date (Monday-first mapping). */
export function todayIndex(now: Date): number {
  const jsDay = now.getDay(); // 0 = Sunday
  return jsDay === 0 ? 6 : jsDay - 1;
}

/** Compute a calm, lowercase live status message from the schedule. */
export function getLiveStatus(schedule: DaySchedule[], now: Date): LiveStatus {
  const idx = todayIndex(now);
  const today = schedule[idx];
  const nowMins = now.getHours() * 60 + now.getMinutes();

  if (today.open !== null && today.close !== null) {
    if (nowMins >= today.open && nowMins < today.close) {
      return {
        isOpen: true,
        message: `open now — until ${formatMinutes(today.close)}`,
      };
    }
    if (nowMins < today.open) {
      return {
        isOpen: false,
        message: `opens today at ${formatMinutes(today.open)}`,
      };
    }
  }

  // Closed for the day — find the next open day.
  for (let offset = 1; offset <= 7; offset++) {
    const next = schedule[(idx + offset) % 7];
    if (next.open !== null) {
      const when = offset === 1 ? "tomorrow" : next.day;
      return {
        isOpen: false,
        message: `closed — opens ${when} at ${formatMinutes(next.open)}`,
      };
    }
  }

  return { isOpen: false, message: "closed for now" };
}

/** Strip a display phone number down to a tel: href value. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
