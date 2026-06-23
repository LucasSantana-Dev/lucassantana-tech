import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { getCoreTechIconMeta } from "../lib/coreTechIcons";
import type { Project } from "../types/content";

type FeaturedProjectsProps = {
  projects: Project[];
};

const prioritySlugs = ["sharekit", "hitgate", "forgekit"];

const STATUS: Record<string, { label: string; cls: string; icon: string }> = {
  sharekit:            { label: "LIVE",   cls: "project-status-live",   icon: "●" },
  hitgate:             { label: "LIVE",   cls: "project-status-live",   icon: "●" },
  lucky:               { label: "LIVE",   cls: "project-status-live",   icon: "●" },
  forgekit:            { label: "ACTIVE", cls: "project-status-active", icon: "●" },
  homelab:             { label: "RUNNING",cls: "project-status-live",   icon: "●" },
};

const defaultStatus = { label: "DEV", cls: "project-status-dev", icon: "○" };

type ProjectRowProps = {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

const ProjectRow = ({ project, index, isExpanded, onToggle }: ProjectRowProps) => {
  const reduce = useReducedMotion();
  const status = STATUS[project.slug] ?? defaultStatus;
  const stackPreview = project.stack.slice(0, 3).join(" · ");

  return (
    <li className={`project-item${isExpanded ? " is-expanded" : ""}`}>
      <button
        type="button"
        className="project-row"
        aria-expanded={isExpanded}
        aria-controls={`project-detail-${project.slug}`}
        onClick={onToggle}
      >
        <span className="project-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-name">{project.name}</span>
        <span className="project-category">{project.category}</span>
        <span className="project-stack-preview">{stackPreview}</span>
        <span className={`project-status ${status.cls}`}>
          {status.icon} {status.label}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id={`project-detail-${project.slug}`}
            className="project-detail"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="project-detail-inner">
              <p className="project-summary-text">{project.summary}</p>

              <div className="project-detail-footer">
                <ul className="project-tags-list" aria-label="Tech stack">
                  {project.stack.map((item) => {
                    const iconMeta = getCoreTechIconMeta(item);
                    return (
                      <li key={item}>
                        <iconMeta.Icon aria-hidden="true" color={iconMeta.color} />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>

                <nav className="project-action-links" aria-label={`${project.name} links`}>
                  <a className="project-action-link" href={`/projects/${project.slug}/`}>
                    details →
                  </a>
                  <a
                    className="project-action-link"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    repository ↗
                  </a>
                  {project.liveUrl ? (
                    <a
                      className="project-action-link project-action-link-live"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      live ↗
                    </a>
                  ) : null}
                </nav>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
};

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const orderedProjects = useMemo(() => {
    const primary = prioritySlugs
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p): p is Project => Boolean(p));
    const secondary = projects.filter((p) => !prioritySlugs.includes(p.slug));
    return [...primary, ...secondary];
  }, [projects]);

  const visibleProjects = showAll ? orderedProjects : orderedProjects.slice(0, 5);
  const hiddenCount = orderedProjects.length - 5;

  const handleToggle = (slug: string) => {
    setExpandedSlug((cur) => (cur === slug ? null : slug));
  };

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="projects-list-header">
        <span className="projects-section-label" id="projects-title">
          # selected builds
        </span>
        <span className="projects-count">{orderedProjects.length} processes</span>
      </div>

      {/* Table column headers */}
      <div className="projects-table-head" aria-hidden="true">
        <span>ID</span>
        <span>NAME</span>
        <span>TYPE</span>
        <span>STACK</span>
        <span>STATE</span>
      </div>

      <ol className="projects-list" aria-label="Featured projects">
        {visibleProjects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            isExpanded={expandedSlug === project.slug}
            onToggle={() => handleToggle(project.slug)}
          />
        ))}
      </ol>

      <div className="projects-more">
        {!showAll && hiddenCount > 0 ? (
          <button
            type="button"
            className="projects-more-link"
            onClick={() => setShowAll(true)}
          >
            &gt; load {hiddenCount} more
          </button>
        ) : null}
        <a className="projects-more-link" href="/projects/">
          &gt; full project index
        </a>
      </div>
    </section>
  );
};
