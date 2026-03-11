import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  getActionVisual,
  getOrganizationLogo,
  getProjectLogo,
  getProjectPreviews,
} from "../lib/brandAssets";
import { getCoreTechIconMeta } from "../lib/coreTechIcons";
import type { Project } from "../types/content";
import { Reveal } from "./Reveal";

type FeaturedProjectsProps = {
  projects: Project[];
};

type ProjectCardProps = {
  project: Project;
  index: number;
  revealPreviews: boolean;
};

const prioritySlugs = ["siza", "mcp-gateway", "lucky"];

const ProjectCard = ({ project, index, revealPreviews }: ProjectCardProps) => {
  const [organizationLogoFailed, setOrganizationLogoFailed] = useState(false);
  const [projectLogoFailed, setProjectLogoFailed] = useState(false);
  const organizationLogo = getOrganizationLogo(project.organization);
  const projectLogo = getProjectLogo(project.slug);
  const projectPreviews = revealPreviews ? getProjectPreviews(project.slug) : [];
  const repositoryVisual = getActionVisual("Repository", project.repoUrl);
  const liveVisual = project.liveUrl ? getActionVisual("Live", project.liveUrl) : null;

  return (
    <Reveal axis="x" distance={index % 2 === 0 ? -30 : 30} delay={index * 0.04}>
      <motion.article className="project-card glass-card" whileHover={{ y: -6 }}>
        <div className="project-brand-top">
          <div className="project-org-wrap">
            {organizationLogo && !organizationLogoFailed ? (
              <img
                className="project-org-logo"
                src={organizationLogo.src}
                alt={organizationLogo.alt}
                width={organizationLogo.width}
                height={organizationLogo.height}
                loading="lazy"
                decoding="async"
                onError={() => setOrganizationLogoFailed(true)}
              />
            ) : null}
            <p className="project-org">{project.organization}</p>
          </div>
          {projectLogo && !projectLogoFailed ? (
            <img
              className={`project-brand-logo${project.slug === "lucky" ? " project-brand-logo-square" : ""}`}
              src={projectLogo.src}
              alt={projectLogo.alt}
              width={projectLogo.width}
              height={projectLogo.height}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                if (
                  projectLogo.fallbackSrc &&
                  event.currentTarget.currentSrc !== projectLogo.fallbackSrc
                ) {
                  event.currentTarget.src = projectLogo.fallbackSrc;
                  return;
                }

                setProjectLogoFailed(true);
              }}
            />
          ) : projectLogo ? (
            <span className="project-brand-fallback">{project.name.slice(0, 3).toUpperCase()}</span>
          ) : null}
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        {projectPreviews.length > 0 ? (
          <div className="project-preview-grid">
            {projectPreviews.map((preview) => (
              <figure key={preview.src} className="project-preview">
                <img src={preview.src} alt={preview.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        ) : null}
        <ul className="pill-list">
          {project.stack.slice(0, 4).map((item) => {
            const iconMeta = getCoreTechIconMeta(item);

            return (
              <li key={item}>
                <iconMeta.Icon aria-hidden="true" color={iconMeta.color} />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        <div className="project-links">
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
          {project.liveUrl ? (
            <a
              className="ui-action ui-action-chip ui-action-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              {liveVisual ? (
                <liveVisual.Icon
                  className="ui-action-symbol"
                  aria-hidden="true"
                  color={liveVisual.color}
                />
              ) : null}
              <span>Live</span>
              <span className="ui-action-icon" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
        </div>
      </motion.article>
    </Reveal>
  );
};

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const orderedProjects = useMemo(() => {
    const primary = prioritySlugs
      .map((slug) => projects.find((project) => project.slug === slug))
      .filter((project): project is Project => Boolean(project));
    const secondary = projects.filter((project) => !prioritySlugs.includes(project.slug));
    return [...primary, ...secondary];
  }, [projects]);
  const primaryProjects = orderedProjects.slice(0, 3);
  const secondaryProjects = orderedProjects.slice(3);
  const visibleProjects = showMoreProjects ? orderedProjects : primaryProjects;

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <Reveal>
        <p className="section-tag">Relevant Projects</p>
        <h2 id="projects-title">Selected builds that show product and systems execution</h2>
      </Reveal>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            revealPreviews={showMoreProjects}
          />
        ))}
      </div>
      {secondaryProjects.length > 0 ? (
        <div className="projects-toggle-wrap">
          <button
            type="button"
            className="ui-action ui-action-secondary projects-toggle-btn"
            aria-expanded={showMoreProjects}
            onClick={() => {
              setShowMoreProjects((current) => !current);
            }}
          >
            <span>{showMoreProjects ? "Show fewer projects" : "Show more projects"}</span>
            <span className="ui-action-icon" aria-hidden="true">
              {showMoreProjects ? "−" : "+"}
            </span>
          </button>
        </div>
      ) : null}
    </section>
  );
};
