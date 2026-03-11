import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ExperienceItem } from "../types/content";
import { ExperienceTimeline } from "./ExperienceTimeline";

const baseExperience: ExperienceItem = {
  company: "Example Corp",
  companyMark: "/images/company-logos/thoughtworks.svg",
  role: "Senior Software Engineer",
  period: "Jan 2024 — Present",
  bullets: ["Delivered a resilient platform boundary for cross-team integrations."],
};

describe("ExperienceTimeline", () => {
  it("renders timeline logo images when assets resolve", () => {
    const { container } = render(<ExperienceTimeline experiences={[baseExperience]} />);

    expect(screen.getByRole("img", { name: "Example Corp logo" })).toBeInTheDocument();
    expect(container.querySelector(".timeline-logo-fallback")).toBeNull();
  });

  it("falls back to company text when a logo fails to load", () => {
    const { container } = render(
      <ExperienceTimeline
        experiences={[{ ...baseExperience, company: "Fallback Corp", companyMark: "/broken-logo.svg" }]}
      />,
    );

    const logo = screen.getByRole("img", { name: "Fallback Corp logo" });
    fireEvent.error(logo);

    expect(screen.queryByRole("img", { name: "Fallback Corp logo" })).not.toBeInTheDocument();
    expect(container.querySelector(".timeline-logo-fallback")?.textContent).toBe("Fallback Corp");
  });
});
