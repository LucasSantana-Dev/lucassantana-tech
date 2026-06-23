import { useRef, useState } from "react";
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
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <li className="timeline-entry glass-card">
      <Reveal axis="x" distance={index % 2 === 0 ? -26 : 26} delay={index * 0.04}>
        <div className="timeline-head">
          <div className="timeline-logo-box">
            {logoFailed ? (
              <span className="timeline-logo-fallback">{experience.company}</span>
            ) : (
              <img
                src={experience.companyMark}
                alt={`${experience.company} logo`}
                loading="lazy"
                onError={() => setLogoFailed(true)}
              />
            )}
          </div>
          <div>
            <p className="timeline-period">{experience.period}</p>
            <h3>{experience.company}</h3>
            <h4>{experience.role}</h4>
          </div>
        </div>
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

  return (
    <section
      className="section timeline-wrap"
      id="experience"
      aria-labelledby="experience-title"
      ref={rootRef}
    >
      <Reveal>
        <div className="projects-list-header">
          <span className="projects-section-label" id="experience-title">
            # experience
          </span>
          <span className="projects-count">{experiences.length} roles</span>
        </div>
      </Reveal>
      <ol className="timeline">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </ol>
    </section>
  );
};
