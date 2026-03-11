import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { revealPreset } from "../lib/animation";

type RevealProps = {
  children: ReactNode;
  axis?: "x" | "y";
  distance?: number;
  className?: string;
  delay?: number;
  amount?: number;
};

export const Reveal = ({
  children,
  axis = "y",
  distance = 24,
  className,
  delay = 0,
  amount = 0.18,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const preset = revealPreset(Boolean(reduce), axis, distance);

  return (
    <motion.div
      className={className}
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: true, amount }}
      transition={{ ...preset.transition, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
};
