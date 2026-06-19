import { motion, useReducedMotion } from "motion/react";
import { getTechIconMeta } from "../lib/techIcons";
import type { SkillArea, SkillLevel } from "../types/content";

type SkillsMapProps = {
  skillAreas: SkillArea[];
  sectionId?: string;
  className?: string;
  as?: "section" | "div";
};

const LEVEL_LABEL: Record<SkillLevel, string> = {
  core:     "core",
  strong:   "strong",
  working:  "working",
  familiar: "familiar",
};

const LEVEL_CLS: Record<SkillLevel, string> = {
  core:     "sk-level-core",
  strong:   "sk-level-strong",
  working:  "sk-level-working",
  familiar: "sk-level-familiar",
};

export const SkillsMap = ({
  skillAreas,
  sectionId = "skills",
  className = "section",
  as = "section",
}: SkillsMapProps) => {
  const reduced = useReducedMotion();
  const Container = as;

  return (
    <Container className={className} id={sectionId} aria-labelledby="skills-title">
      <div className="term-section-head">
        <span className="term-section-label" id="skills-title"># skills</span>
        <span className="term-section-sep" aria-hidden="true" />
      </div>

      <div className="sk-grid">
        {skillAreas.map((group, gi) => (
          <motion.div
            key={group.area}
            className="sk-area"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={reduced ? undefined : { duration: 0.35, delay: gi * 0.06 }}
          >
            <p className="sk-area-head">
              <span className="term-val-dim">#</span>{" "}
              {group.area.toLowerCase()}
            </p>
            <ul className="sk-rows">
              {group.skills.map((skill) => {
                const { Icon, color } = getTechIconMeta(skill.name, skill.iconKey);
                return (
                  <li key={skill.name} className="sk-row">
                    <span className="sk-name">
                      <Icon aria-hidden="true" className="sk-icon" style={{ color }} />
                      {skill.name.toLowerCase()}
                    </span>
                    <span className={`sk-level ${LEVEL_CLS[skill.level]}`}>
                      {LEVEL_LABEL[skill.level]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
