import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { getActionVisual } from "../lib/brandAssets";
import type { Project } from "../types/content";
import { Reveal } from "./Reveal";

type DeepDivesProps = {
  projects: Project[];
};

type DiveCardProps = {
  project: Project;
  index: number;
};

const DiveCard = ({ project, index }: DiveCardProps) => {
  const repositoryVisual = getActionVisual("Repository", project.repoUrl);

  return (
    <Reveal axis="y" distance={24 + index * 10} delay={index * 0.05}>
      <motion.article className="dive-card glass-card" whileHover={{ y: -4 }}>
        <header>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
        </header>
        <h4>Architecture</h4>
        <ul>
          {project.architectureNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Impact</h4>
        <ul>
          {project.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a
          className="ui-action ui-action-chip ui-action-secondary"
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
        >
          <repositoryVisual.Icon
            className="ui-action-symbol"
            aria-hidden="true"
            color={repositoryVisual.color}
          />
          <span>Repository</span>
          <span className="ui-action-icon" aria-hidden="true">
            ↗
          </span>
        </a>
      </motion.article>
    </Reveal>
  );
};

export const DeepDives = ({ projects }: DeepDivesProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.25 });

  return (
    <section
      className="section pinned-case"
      id="deep-dives"
      aria-labelledby="deep-dives-title"
      ref={rootRef}
    >
      <div className="sticky-block glass-card">
        <span className="dive-progress-track" aria-hidden="true">
          <motion.span className="dive-progress-fill" style={{ scaleY: progress }} />
        </span>
        <p className="section-tag">Deep dives</p>
        <h2 id="deep-dives-title">Architecture, tradeoffs, and impact signals</h2>
        <p>
          These are the projects where I owned cross-layer decisions: interface, system design,
          quality strategy, and delivery outcomes.
        </p>
      </div>
      <div className="dive-list">
        {projects.map((project, index) => (
          <DiveCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
