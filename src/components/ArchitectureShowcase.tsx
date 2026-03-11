import { motion, useReducedMotion } from "motion/react";
import { getActionVisual } from "../lib/brandAssets";
import type { Project } from "../types/content";
import { Reveal } from "./Reveal";

type ArchitectureShowcaseProps = {
  projects: Project[];
};

const pillars = [
  {
    title: "Scalability",
    detail: "Service boundaries, async workloads, and traffic-aware design.",
  },
  {
    title: "Reliability",
    detail: "Fail-safe workflows, strong observability, and incident-ready architecture.",
  },
  {
    title: "Governance",
    detail: "Quality gates, release controls, and secure integration boundaries.",
  },
  {
    title: "Delivery",
    detail: "Developer experience patterns that reduce friction from idea to production.",
  },
];

export const ArchitectureShowcase = ({ projects }: ArchitectureShowcaseProps) => {
  const reduce = useReducedMotion();

  return (
    <section className="section architecture-showcase" id="architecture" aria-labelledby="architecture-title">
      <Reveal>
        <p className="section-tag">Systems design</p>
        <h2 id="architecture-title">Architecture thinking behind the shipped products</h2>
      </Reveal>
      <div className="architecture-layout">
        <div className="architecture-pillars">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              className="architecture-pillar glass-card"
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={reduce ? undefined : { duration: 0.38, delay: index * 0.06 }}
            >
              <h3>{pillar.title}</h3>
              <p>{pillar.detail}</p>
            </motion.article>
          ))}
        </div>
        <div className="architecture-cases">
          {projects.map((project, index) => {
            const repositoryVisual = getActionVisual("Repository", project.repoUrl);

            return (
              <motion.article
                key={project.slug}
                className="architecture-case glass-card"
                initial={reduce ? undefined : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={reduce ? undefined : { duration: 0.42, delay: index * 0.05 }}
              >
                <header>
                  <p>{project.category}</p>
                  <h3>{project.name}</h3>
                </header>
                <h4>System design notes</h4>
                <ul>
                  {project.architectureNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <h4>Outcome</h4>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
