import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { ExperienceItem } from "../types/content";
import { Reveal } from "./Reveal";

type ExperienceTimelineProps = {
  experiences: ExperienceItem[];
};

type ExperienceCardProps = {
  experience: ExperienceItem;
  index: number;
};

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  return (
    <li>
      <Reveal axis="x" distance={index % 2 === 0 ? -26 : 26} delay={index * 0.04}>
        <p className="timeline-period">{experience.period}</p>
        <h3>{experience.company}</h3>
        <h4>{experience.role}</h4>
        <ul>
          {experience.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
};

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start 0.8", "end 0.2"] });
  const rail = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.28 });

  return (
    <section className="section timeline-wrap" id="experience" aria-labelledby="experience-title" ref={rootRef}>
      <Reveal>
        <p className="section-tag">Experience</p>
        <h2 id="experience-title">From local product builds to global consulting</h2>
      </Reveal>
      <div className="timeline-progress" aria-hidden="true">
        <motion.span style={{ scaleY: rail }} />
      </div>
      <ol className="timeline">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </ol>
    </section>
  );
};
