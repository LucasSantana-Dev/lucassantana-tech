import type { Project } from "../types/content";
import { Reveal } from "./Reveal";

type FeaturedProjectsProps = {
  projects: Project[];
};

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <Reveal>
        <p className="section-tag">Featured work</p>
        <h2 id="projects-title">Six projects that represent product + platform depth</h2>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} axis="x" distance={index % 2 === 0 ? -26 : 26}>
            <article className="project-card">
              <p className="project-org">{project.organization}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <ul className="pill-list">
                {project.stack.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={project.repoUrl} target="_blank" rel="noreferrer">
                  Repository
                </a>
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
