import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Profile } from "../types/content";

type HeroProps = {
  profile: Profile;
};

const heroMotion = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" as const },
  }),
};

export const Hero = ({ profile }: HeroProps) => {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const imageY = reduced ? 0 : plateY;

  return (
    <header className="hero" id="top" ref={rootRef}>
      <motion.div initial="hidden" animate={reduced ? undefined : "show"} className="hero-copy">
        <motion.p className="kicker" variants={heroMotion} custom={0.05}>
          Senior Engineer • Full Stack • Platform & Product
        </motion.p>
        <motion.h1 variants={heroMotion} custom={0.1}>
          <span>{profile.name.split(" ")[0]}</span> {profile.name.split(" ").slice(1).join(" ")}
        </motion.h1>
        <motion.h2 variants={heroMotion} custom={0.15}>
          {profile.role}
        </motion.h2>
        <motion.p className="hero-summary" variants={heroMotion} custom={0.2}>
          {profile.summary}
        </motion.p>
        <motion.div className="hero-actions" variants={heroMotion} custom={0.25}>
          <a href="/CV_LucasSantana_Dev(EN).pdf" target="_blank" rel="noreferrer">
            Download resume
          </a>
          <a href="#projects">View projects</a>
        </motion.div>
        <motion.ul className="hero-stack" variants={heroMotion} custom={0.3}>
          {profile.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </motion.div>
      <motion.figure className="hero-image" style={{ y: imageY }}>
        <motion.div className="hero-glow" style={{ scale: reduced ? 1 : glowScale }} />
        <img src={profile.heroImage} alt="Lucas Santana portrait" loading="eager" />
      </motion.figure>
    </header>
  );
};
