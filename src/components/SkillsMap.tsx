import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useIsMobile } from "../hooks/useIsMobile";
import { getAreaIconMeta, getTechIconMeta } from "../lib/techIcons";
import type { SkillArea, SkillEvidence, SkillItem, SkillLevel } from "../types/content";
import { Reveal } from "./Reveal";

type SkillsMapProps = {
  skillAreas: SkillArea[];
  sectionId?: string;
  className?: string;
  as?: "section" | "div";
};

const levelMeta: Record<SkillLevel, { label: string; meter: string }> = {
  core: { label: "Core", meter: "100%" },
  strong: { label: "Strong", meter: "78%" },
  working: { label: "Working", meter: "60%" },
  familiar: { label: "Familiar", meter: "40%" },
};

const evidenceMeta: Record<SkillEvidence, string> = {
  "forge-space": "Forge Space",
  homelab: "Homelab",
  career: "Career",
};

const getDefaultSkills = (skills: SkillItem[]) => {
  const featured = skills.filter((skill) => skill.featured);
  return featured.length > 0 ? featured : skills.slice(0, 6);
};

export const SkillsMap = ({
  skillAreas,
  sectionId = "skills",
  className = "section",
  as = "section",
}: SkillsMapProps) => {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile(900);
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({});
  const [openAreas, setOpenAreas] = useState<Record<string, boolean>>({});
  const [activeSkillByArea, setActiveSkillByArea] = useState<Record<string, string>>({});
  const Container = as;

  return (
    <Container className={className} id={sectionId} aria-labelledby="skills-title">
      <Reveal>
        <p className="section-tag">Capability Map</p>
        <h2 id="skills-title" className="skills-heading">
          Skills by area and confidence
        </h2>
      </Reveal>
      <div className="skills-group-grid">
        {skillAreas.map((group, areaIndex) => {
          const areaIcon = getAreaIconMeta(group.area);
          const defaultSkills = getDefaultSkills(group.skills);
          const expanded = expandedAreas[group.area] ?? false;
          const visibleSkills = expanded ? group.skills : defaultSkills;
          const hiddenCount = group.skills.length - defaultSkills.length;
          const activeName = activeSkillByArea[group.area] ?? visibleSkills[0]?.name ?? "";
          const activeSkill = visibleSkills.find((item) => item.name === activeName) ?? visibleSkills[0];
          const mobileOpen = openAreas[group.area] ?? false;
          const areaOpen = isMobile ? mobileOpen : true;
          const areaBodyId = `skills-area-${group.area.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

          return (
            <motion.article
              key={group.area}
              className="skill-area-card glass-card"
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={reduce ? undefined : { duration: 0.48, delay: areaIndex * 0.05 }}
            >
              <div className="skill-area-head">
                <div className="skill-area-title-wrap">
                  <div className="skill-area-icon">
                    <areaIcon.Icon aria-hidden="true" color={areaIcon.color} />
                  </div>
                  <div>
                    <h3>{group.area}</h3>
                    <p>{group.summary}</p>
                  </div>
                </div>
                {isMobile ? (
                  <button
                    type="button"
                    className="skill-area-toggle"
                    aria-expanded={areaOpen}
                    aria-controls={areaBodyId}
                    onClick={() => {
                      setOpenAreas((current) => ({ ...current, [group.area]: !areaOpen }));
                    }}
                  >
                    <span>{areaOpen ? "Hide" : "Show"}</span>
                    <FiChevronDown
                      aria-hidden="true"
                      style={{ transform: areaOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                ) : null}
              </div>

              <AnimatePresence initial={false}>
                {areaOpen ? (
                  <motion.div
                    id={areaBodyId}
                    className="skill-area-body"
                    initial={reduce ? undefined : { opacity: 0, height: 0 }}
                    animate={reduce ? undefined : { opacity: 1, height: "auto" }}
                    exit={reduce ? undefined : { opacity: 0, height: 0 }}
                    transition={reduce ? undefined : { duration: 0.28, ease: "easeOut" }}
                  >
                    <ul className="skills-list">
                      {visibleSkills.map((skill, skillIndex) => {
                        const iconMeta = getTechIconMeta(skill.name, skill.iconKey);
                        const level = levelMeta[skill.level];

                        return (
                          <motion.li
                            key={skill.name}
                            className={`skill-item skill-level-${skill.level}`}
                            initial={reduce ? undefined : { opacity: 0, x: -10 }}
                            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={
                              reduce ? undefined : { duration: 0.28, delay: skillIndex * 0.02 }
                            }
                            whileHover={reduce ? undefined : { y: -1 }}
                            onMouseEnter={() => {
                              if (!isMobile) {
                                setActiveSkillByArea((current) => ({
                                  ...current,
                                  [group.area]: skill.name,
                                }));
                              }
                            }}
                            onFocusCapture={() => {
                              setActiveSkillByArea((current) => ({ ...current, [group.area]: skill.name }));
                            }}
                            tabIndex={0}
                          >
                            <div className="skill-main">
                              <span className="skill-icon-box" aria-hidden="true">
                                <iconMeta.Icon color={iconMeta.color} />
                              </span>
                              <span className="skill-name">{skill.name}</span>
                            </div>
                            <div className="skill-level-wrap">
                              <span className={`skill-level-badge skill-level-badge-${skill.level}`}>
                                {level.label}
                              </span>
                              <span className="skill-level-meter" aria-hidden="true">
                                <span style={{ width: level.meter }} />
                              </span>
                            </div>
                            {isMobile ? (
                              <p className="skill-mobile-context">{skill.context}</p>
                            ) : null}
                          </motion.li>
                        );
                      })}
                    </ul>

                    {hiddenCount > 0 ? (
                      <button
                        type="button"
                        className="ui-action ui-action-chip ui-action-secondary skills-expand-btn"
                        onClick={() => {
                          setExpandedAreas((current) => ({ ...current, [group.area]: !expanded }));
                        }}
                        aria-expanded={expanded}
                      >
                        <span>{expanded ? "Show less" : `Show more (${hiddenCount})`}</span>
                        <span className="ui-action-icon" aria-hidden="true">
                          {expanded ? "−" : "+"}
                        </span>
                      </button>
                    ) : null}

                    {!isMobile && activeSkill ? (
                      <div className="skill-hover-panel" role="status" aria-live="polite">
                        <p className="skill-hover-title">{activeSkill.name}</p>
                        <div className="skill-hover-evidence">
                          {activeSkill.evidence.map((item) => (
                            <span key={`${activeSkill.name}-${item}`}>{evidenceMeta[item]}</span>
                          ))}
                        </div>
                        <p className="skill-hover-context">{activeSkill.context}</p>
                      </div>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </Container>
  );
};
