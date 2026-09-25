"use client";

import { useEffect, useState } from "react";

type TimeDisplayProps = { timeZone: string; locale?: string };

/** Live clock in the given IANA time zone, ticking every second. */
export function TimeDisplay({ timeZone, locale = "en-GB" }: TimeDisplayProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone, locale]);

  return <>{time}</>;
}
