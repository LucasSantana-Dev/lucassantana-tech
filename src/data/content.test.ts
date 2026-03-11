import { describe, expect, it } from "vitest";
import { profile, projects } from "./content";

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
});
