"use client";

import { useEffect, useState } from "react";

interface HoursItem {
  day: string;
  hours: string;
}

const hoursData: HoursItem[] = [
  { day: "Monday", hours: "8:00 AM — 5:00 PM" },
  { day: "Tuesday", hours: "8:00 AM — 5:00 PM" },
  { day: "Wednesday", hours: "8:00 AM — 5:00 PM" },
  { day: "Thursday", hours: "8:00 AM — 5:00 PM" },
  { day: "Friday", hours: "8:00 AM — 3:00 PM" },
  { day: "Saturday", hours: "By Appointment" },
  { day: "Sunday", hours: "Closed" },
];

export default function DynamicHoursList() {
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Map JavaScript day (0-6) to our hoursData array (Monday first)
    const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    setCurrentDayIndex(dayIndex);
  }, []);

  return (
    <div className="space-y-1">
      {hoursData.map((item, index) => {
        const isToday = currentDayIndex === index;

        return (
          <div
            key={index}
            className={`flex justify-between py-3.5 px-4 rounded-xl transition-all duration-500 ${
              isToday
                ? "bg-gradient-to-r from-brand-primary/5 via-brand-primary/[0.03] to-transparent"
                : "hover:bg-slate-50/50"
            }`}
          >
            <span
              className={`font-light tracking-wide transition-colors duration-300 ${
                isToday
                  ? "text-brand-mainText font-medium"
                  : "text-neutral-muted"
              }`}
            >
              {item.day}
            </span>
            <span
              className={`font-light tracking-wide transition-colors duration-300 ${
                isToday ? "text-brand-primary font-medium" : "text-brand-mainText"
              }`}
            >
              {item.hours}
            </span>
          </div>
        );
      })}
    </div>
  );
}
