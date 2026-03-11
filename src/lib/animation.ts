export type Axis = "x" | "y";

export type RevealPreset = {
  initial: { opacity: number; x?: number; y?: number };
  animate: { opacity: number; x?: number; y?: number };
  transition: { duration: number; ease: "easeOut" | "linear" };
};

const hidden = (axis: Axis, distance: number) => {
  return axis === "x" ? { opacity: 0, x: distance } : { opacity: 0, y: distance };
};

export const revealPreset = (
  reducedMotion: boolean,
  axis: Axis,
  distance: number,
): RevealPreset => {
  if (reducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0, ease: "linear" },
    };
  }

  return {
    initial: hidden(axis, distance),
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };
};
