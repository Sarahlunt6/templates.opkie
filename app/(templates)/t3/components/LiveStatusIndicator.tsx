"use client";

import { useEffect, useState } from "react";

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isByAppointment?: boolean;
  isClosed?: boolean;
}

const businessHours: BusinessHours[] = [
  { day: "Monday", open: "08:00", close: "17:00" },
  { day: "Tuesday", open: "08:00", close: "17:00" },
  { day: "Wednesday", open: "08:00", close: "17:00" },
  { day: "Thursday", open: "08:00", close: "17:00" },
  { day: "Friday", open: "08:00", close: "15:00" },
  { day: "Saturday", open: "", close: "", isByAppointment: true },
  { day: "Sunday", open: "", close: "", isClosed: true },
];

export default function LiveStatusIndicator() {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "Checking status..." });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight

      // Map JavaScript day (0-6) to our businessHours array (Monday first)
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const todayHours = businessHours[dayIndex];

      if (todayHours.isClosed) {
        setStatus({
          isOpen: false,
          message: "Closed Today",
        });
        return;
      }

      if (todayHours.isByAppointment) {
        setStatus({
          isOpen: false,
          message: "By Appointment Only",
        });
        return;
      }

      // Parse open and close times
      const [openHour, openMinute] = todayHours.open.split(":").map(Number);
      const [closeHour, closeMinute] = todayHours.close.split(":").map(Number);
      const openTime = openHour * 60 + openMinute;
      const closeTime = closeHour * 60 + closeMinute;

      if (currentTime >= openTime && currentTime < closeTime) {
        // Calculate closing time
        const minutesUntilClose = closeTime - currentTime;
        const hoursUntilClose = Math.floor(minutesUntilClose / 60);
        const minsUntilClose = minutesUntilClose % 60;

        let closingMessage = "Open Now";
        if (minutesUntilClose <= 60) {
          closingMessage = `Open — Closing in ${minutesUntilClose} min`;
        } else if (hoursUntilClose >= 1) {
          closingMessage = `Open — Closes at ${formatTime(closeHour, closeMinute)}`;
        }

        setStatus({
          isOpen: true,
          message: closingMessage,
        });
      } else if (currentTime < openTime) {
        setStatus({
          isOpen: false,
          message: `Opens at ${formatTime(openHour, openMinute)}`,
        });
      } else {
        // After closing, show next day's opening
        const nextDayIndex = (dayIndex + 1) % 7;
        const nextDay = businessHours[nextDayIndex];

        if (nextDay.isClosed || nextDay.isByAppointment) {
          setStatus({
            isOpen: false,
            message: "Closed — Reopens Soon",
          });
        } else {
          const [nextOpenHour, nextOpenMinute] = nextDay.open.split(":").map(Number);
          setStatus({
            isOpen: false,
            message: `Closed — Opens ${nextDay.day} at ${formatTime(nextOpenHour, nextOpenMinute)}`,
          });
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayMinute = minute.toString().padStart(2, "0");
    return `${displayHour}:${displayMinute} ${period}`;
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200/60 rounded-full shadow-sm">
      {/* Pulsing Status Indicator */}
      <div className="relative flex items-center justify-center">
        {status.isOpen ? (
          <>
            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
            <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
          </>
        ) : (
          <div className="w-2 h-2 bg-slate-400 rounded-full border border-slate-300" />
        )}
      </div>

      {/* Status Text */}
      <span
        className={`text-[10px] font-medium tracking-[0.08em] ${
          status.isOpen ? "text-emerald-700" : "text-slate-600"
        }`}
      >
        {status.message}
      </span>
    </div>
  );
}
