import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

type SkillsMapProps = {
  skills: string[];
};

export const SkillsMap = ({ skills }: SkillsMapProps) => {
  const reduce = useReducedMotion();

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Reveal>
        <p className="section-tag">Tooling map</p>
        <h2 id="skills-title">Core stack across backend, frontend, cloud, and platform work</h2>
      </Reveal>
      <ul className="skills-grid">
        {skills.map((skill, index) => (
          <motion.li
            key={skill}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduce ? undefined : { duration: 0.42, delay: index * 0.02 }}
            whileHover={{ y: -2 }}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
