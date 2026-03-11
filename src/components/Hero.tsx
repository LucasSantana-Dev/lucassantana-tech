import { motion, useReducedMotion } from "framer-motion";
import type { Profile } from "../types/content";

type HeroProps = {
  profile: Profile;
};

const cardMotion = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  }),
};

export const Hero = ({ profile }: HeroProps) => {
  const reduced = useReducedMotion();
  const animate = reduced ? { opacity: 1 } : "show";

  return (
    <header className="hero" id="top">
      <motion.div initial="hidden" animate={animate} className="hero-copy">
        <motion.p className="kicker" variants={cardMotion} custom={0.05}>
          Senior Engineer • Full Stack • Platform & Product
        </motion.p>
        <motion.h1 variants={cardMotion} custom={0.1}>
          {profile.name}
        </motion.h1>
        <motion.h2 variants={cardMotion} custom={0.15}>
          {profile.role}
        </motion.h2>
        <motion.p className="hero-summary" variants={cardMotion} custom={0.2}>
          {profile.summary}
        </motion.p>
        <motion.ul className="hero-stack" variants={cardMotion} custom={0.25}>
          {profile.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </motion.div>
      <motion.figure
        className="hero-image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: "easeOut" }}
      >
        <img src={profile.heroImage} alt="Lucas Santana portrait" loading="eager" />
      </motion.figure>
    </header>
  );
};
