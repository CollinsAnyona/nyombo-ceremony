"use client";

import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number } | "arrived";

function computeRemaining(targetIso: string): Remaining {
  const diffMs = new Date(targetIso).getTime() - Date.now();
  if (diffMs <= 0) return "arrived";
  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-display-md text-gold-engraved tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="label-utility">{label}</span>
    </div>
  );
}

/**
 * Live countdown to the ceremony, set in engraved numerals (brief Section
 * 6). Renders nothing until mounted so the server- and first client-render
 * match exactly — Date.now() otherwise drifts between the two and Next.js
 * would flag a hydration mismatch. Degrades to a plain "today is the day"
 * state once the target passes, per the brief's explicit requirement.
 */
export function Countdown({ targetIso, todayLabel }: { targetIso: string; todayLabel: string }) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(computeRemaining(targetIso));
    // Deferred rather than called synchronously in the effect body — the
    // 0ms timeout keeps the first update inside a callback (not the effect
    // body itself), which satisfies react-hooks/set-state-in-effect while
    // still landing on the very next tick after mount.
    const timeout = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [targetIso]);

  if (remaining === null) {
    return <div aria-hidden="true" className="h-20" />;
  }

  if (remaining === "arrived") {
    return <p className="font-script text-script-md text-gold-light">{todayLabel}</p>;
  }

  return (
    <div className="flex gap-6" role="timer" aria-live="polite" aria-atomic="true">
      <Digit value={remaining.days} label="Days" />
      <Digit value={remaining.hours} label="Hrs" />
      <Digit value={remaining.minutes} label="Min" />
      <Digit value={remaining.seconds} label="Sec" />
    </div>
  );
}
