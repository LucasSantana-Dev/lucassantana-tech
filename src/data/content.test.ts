import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { experiences, nowItems, profile, projects, skillAreas, volunteerItems } from "./content";

describe("content integrity", () => {
  it("has six featured projects and three deep dives", () => {
    const featured = projects.filter((item) => item.featured);
    const deep = projects.filter((item) => item.deepDive);

    expect(featured).toHaveLength(6);
    expect(deep).toHaveLength(3);
  });

  it("keeps repository links valid for all featured projects", () => {
    const featured = projects.filter((item) => item.featured);

    featured.forEach((project) => {
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/.+/);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.impact.length).toBeGreaterThan(0);
    });
  });

  it("keeps profile metrics complete", () => {
    expect(profile.stats).toHaveLength(4);

    profile.stats.forEach((metric) => {
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.label.length).toBeGreaterThan(3);
      expect(metric.context.length).toBeGreaterThan(8);
    });
  });

  it("keeps discord URL valid in profile", () => {
    expect(profile.discord).toBe("https://discord.gg/qhe6XnanHy");
    expect(profile.discord).toMatch(/^https:\/\/discord\.gg\/[a-zA-Z0-9]+$/);
  });

  it("keeps now section items complete with valid links", () => {
    expect(nowItems.length).toBeGreaterThanOrEqual(3);

    nowItems.forEach((item) => {
      expect(item.title.length).toBeGreaterThan(3);
      expect(item.summary.length).toBeGreaterThan(20);
      expect(item.status.length).toBeGreaterThan(3);
      expect(item.links.length).toBeGreaterThan(0);

      item.links.forEach((link) => {
        expect(link.label.length).toBeGreaterThan(2);
        expect(link.url).toMatch(/^https?:\/\/.+/);
      });
    });
  });

  it("keeps volunteering section with at least two entries", () => {
    expect(volunteerItems.length).toBeGreaterThanOrEqual(2);

    volunteerItems.forEach((item) => {
      expect(item.role.length).toBeGreaterThan(3);
      expect(item.organization.length).toBeGreaterThan(3);
      expect(item.period.length).toBeGreaterThan(3);
      expect(item.summary.length).toBeGreaterThan(20);
      expect(item.highlights.length).toBeGreaterThan(1);
    });
  });

  it("keeps grouped skills complete by area", () => {
    expect(skillAreas.length).toBeGreaterThan(4);

    skillAreas.forEach((group) => {
      expect(group.area.length).toBeGreaterThan(2);
      expect(group.summary.length).toBeGreaterThan(20);
      expect(group.skills.length).toBeGreaterThan(1);
      expect(group.skills.some((skill) => skill.featured)).toBe(true);

      group.skills.forEach((skill) => {
        expect(skill.name.length).toBeGreaterThan(1);
        expect(skill.iconKey.length).toBeGreaterThan(1);
        expect(["core", "strong", "working", "familiar"]).toContain(skill.level);
        expect(skill.evidence.length).toBeGreaterThan(0);
      });
    });
  });

  it("includes Java, Python, and Spring in skills", () => {
    const allSkills = skillAreas.flatMap((group) => group.skills.map((skill) => skill.name));

    expect(allSkills).toContain("Java");
    expect(allSkills).toContain("Python");
    expect(allSkills).toContain("Spring");
  });

  it("keeps company marks available for experience timeline", () => {
    experiences.forEach((experience) => {
      expect(experience.companyMark.startsWith("/images/company-logos/")).toBe(true);
      const absolutePath = resolve(
        process.cwd(),
        "public",
        experience.companyMark.replace(/^\/+/, ""),
      );
      expect(existsSync(absolutePath)).toBe(true);
    });
  });
});
