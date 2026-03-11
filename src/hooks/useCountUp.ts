import { useEffect, useState } from "react";

export const useCountUp = (
  target: number,
  started: boolean,
  reducedMotion: boolean,
  duration = 1200,
): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) {
      return;
    }

    const start = performance.now();
    let frame = 0;

    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [duration, started, target]);

  return reducedMotion ? target : value;
};
