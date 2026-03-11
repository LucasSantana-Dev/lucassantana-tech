import { Reveal } from "./Reveal";

type SkillsMapProps = {
  skills: string[];
};

export const SkillsMap = ({ skills }: SkillsMapProps) => {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Reveal>
        <p className="section-tag">Tooling map</p>
        <h2 id="skills-title">Core stack across backend, frontend, cloud, and platform work</h2>
      </Reveal>
      <Reveal>
        <ul className="skills-grid">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};
