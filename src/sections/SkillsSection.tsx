import { SkillsMap } from "../components/SkillsMap";
import { skillAreas } from "../data/extendedContent";

type SkillsSectionProps = {
  sectionId?: string;
  className?: string;
  as?: "section" | "div";
};

export const SkillsSection = ({ sectionId = "skills", className = "section", as }: SkillsSectionProps) => {
  return <SkillsMap skillAreas={skillAreas} sectionId={sectionId} className={className} as={as} />;
};
