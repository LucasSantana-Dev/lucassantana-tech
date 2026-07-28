import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { skillAreas } from "../data/content";
import { SkillsMap } from "./SkillsMap";

describe("SkillsMap", () => {
  it("renders all skill areas with their skills and levels", () => {
    render(<SkillsMap skillAreas={skillAreas} />);

    // Section label (not a heading)
    expect(screen.getByText("# skills")).toBeInTheDocument();

    // All skill areas rendered
    for (const group of skillAreas) {
      expect(screen.getByText(group.area.toLowerCase())).toBeInTheDocument();
      for (const skill of group.skills) {
        expect(screen.getByText(skill.name.toLowerCase())).toBeInTheDocument();
      }
    }
  });

  it("renders level labels for each skill", () => {
    render(<SkillsMap skillAreas={skillAreas} />);

    const allLevels = skillAreas.flatMap((g) => g.skills.map((s) => s.level));
    const uniqueLevels = new Set(allLevels);

    for (const level of uniqueLevels) {
      expect(screen.getAllByText(level).length).toBeGreaterThan(0);
    }
  });

  it("has correct aria-labelledby pointing to skills-title", () => {
    render(<SkillsMap skillAreas={skillAreas} />);

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "skills-title");
    expect(screen.getByText("# skills")).toHaveAttribute("id", "skills-title");
  });
});
