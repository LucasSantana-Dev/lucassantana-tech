import type { ExperienceItem } from "../types/content";
import { Reveal } from "./Reveal";

type ExperienceTimelineProps = {
  experiences: ExperienceItem[];
};

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <Reveal>
        <p className="section-tag">Experience</p>
        <h2 id="experience-title">From local product builds to global consulting</h2>
      </Reveal>
      <ol className="timeline">
        {experiences.map((item, index) => (
          <li key={item.company}>
            <Reveal axis="x" distance={index % 2 === 0 ? -20 : 20}>
              <p className="timeline-period">{item.period}</p>
              <h3>{item.company}</h3>
              <h4>{item.role}</h4>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
};
