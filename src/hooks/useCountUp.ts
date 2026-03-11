import { useEffect, useState } from "react";

export const useCountUp = (
  target: number,
  started: boolean,
  reducedMotion: boolean,
  duration = 1200,
  delayMs = 0,
): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) {
      return;
    }

    let frame = 0;
    let cancelled = false;
    let timer = 0;

    const run = () => {
      if (cancelled) {
        return;
      }

      const start = performance.now();

      const step = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        setValue(Math.round(progress * target));
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };

      frame = requestAnimationFrame(step);
    };

    if (delayMs > 0) {
      timer = window.setTimeout(run, delayMs);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [delayMs, duration, started, target]);

  if (!started) {
    return 0;
  }

  return reducedMotion ? target : value;
};
