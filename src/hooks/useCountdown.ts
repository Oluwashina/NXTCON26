import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target time has passed. */
  elapsed: boolean;
}

function diff(target: number): Countdown {
  const remaining = Math.max(0, target - Date.now());
  const seconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    elapsed: remaining === 0,
  };
}

/** Ticks once a second toward an ISO timestamp. */
export function useCountdown(iso: string): Countdown {
  const target = new Date(iso).getTime();
  const [value, setValue] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setValue(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return value;
}
