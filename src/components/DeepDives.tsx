import type { Project } from "../types/content";
import { Reveal } from "./Reveal";

type DeepDivesProps = {
  projects: Project[];
};

export const DeepDives = ({ projects }: DeepDivesProps) => {
  return (
    <section className="section pinned-case" id="deep-dives" aria-labelledby="deep-dives-title">
      <div>
        <div className="sticky-block">
          <p className="section-tag">Deep dives</p>
          <h2 id="deep-dives-title">Architecture, tradeoffs, and impact signals</h2>
          <p>
            These are the projects where I owned cross-layer decisions: interface, system design,
            quality strategy, and delivery outcomes.
          </p>
        </div>
      </div>
      <div className="dive-list">
        {projects.map((project, index) => (
          <Reveal key={project.slug} axis="y" distance={26 + index * 8}>
            <article className="dive-card">
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
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Open {project.organization}/{project.name}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
