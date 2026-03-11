import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { skillAreas } from "../data/content";
import { useIsMobile } from "../hooks/useIsMobile";
import { SkillsMap } from "./SkillsMap";

vi.mock("../hooks/useIsMobile", () => ({
  useIsMobile: vi.fn(),
}));

const mockedUseIsMobile = vi.mocked(useIsMobile);

describe("SkillsMap", () => {
  beforeEach(() => {
    mockedUseIsMobile.mockReturnValue(false);
  });

  it("shows curated skills by default and expands to full list", () => {
    render(<SkillsMap skillAreas={skillAreas} />);

    expect(screen.getByRole("heading", { name: /Skills by area and confidence/i })).toBeInTheDocument();
    expect(screen.queryByText("Electron")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /Show more/i })[0]);
    expect(screen.getByText("Electron")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Show less/i })[0]).toBeInTheDocument();
  });

  it("updates desktop hover details when moving between skills", () => {
    render(<SkillsMap skillAreas={skillAreas} />);

    expect(screen.getByText(/Core UI layer across Forge Space products/i)).toBeInTheDocument();

    const tailwindItem = screen.getByText("Tailwind CSS").closest("li");
    expect(tailwindItem).not.toBeNull();
    if (!tailwindItem) {
      throw new Error("Tailwind row not found");
    }

    fireEvent.mouseEnter(tailwindItem);

    expect(screen.getByText(/Design-system implementation for fast, maintainable UI iteration/i)).toBeInTheDocument();
  });

  it("uses accordion behavior on mobile", () => {
    mockedUseIsMobile.mockReturnValue(true);

    render(<SkillsMap skillAreas={skillAreas} />);

    expect(screen.queryByText("React")).not.toBeInTheDocument();

    const toggleButtons = screen.getAllByRole("button", { name: /Show/i });
    fireEvent.click(toggleButtons[0]);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText(/Core UI layer across Forge Space products/i)).toBeInTheDocument();
  });
});
