import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { revealPreset } from "../lib/animation";

type RevealProps = {
  children: ReactNode;
  axis?: "x" | "y";
  distance?: number;
  className?: string;
};

export const Reveal = ({
  children,
  axis = "y",
  distance = 24,
  className,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const preset = revealPreset(Boolean(reduce), axis, distance);

  return (
    <motion.div
      className={className}
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: true, amount: 0.18 }}
      transition={preset.transition}
    >
      {children}
    </motion.div>
  );
};
