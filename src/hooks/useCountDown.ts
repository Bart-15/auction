import { useEffect, useState } from 'react';

import { TUseCountDownResult } from '@/types/hooks.types';

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function useCountDown(
  deadline: string,
  interval = SECOND,
): TUseCountDownResult {
  const [timespan, setTimespan] = useState<number>(
    Date.parse(deadline) - Date.now(),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => {
        const newTimespan = _timespan - interval;

        if (newTimespan <= 0) {
          clearInterval(intervalId);
          return 0;
        }

        return newTimespan;
      });
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  /* If the initial deadline value changes */
  useEffect(() => {
    setTimespan(Date.parse(deadline) - Date.now());
  }, [deadline]);

  return {
    days: Math.floor(timespan / DAY),
    hours: Math.floor((timespan / HOUR) % 24),
    minutes: Math.floor((timespan / MINUTE) % 60),
    seconds: Math.floor((timespan / SECOND) % 60),
  };
}
