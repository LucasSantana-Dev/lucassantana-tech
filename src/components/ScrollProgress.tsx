import { motion, useScroll, useSpring } from "motion/react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.2,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
};
