import { describe, expect, it } from "vitest";
import { revealPreset } from "./animation";

describe("revealPreset", () => {
  it("returns static animation in reduced-motion mode", () => {
    const preset = revealPreset(true, "x", 24);

    expect(preset.initial).toEqual({ opacity: 1 });
    expect(preset.animate).toEqual({ opacity: 1 });
    expect(preset.transition.duration).toBe(0);
  });

  it("returns directional animation when motion is allowed", () => {
    const xPreset = revealPreset(false, "x", 20);
    const yPreset = revealPreset(false, "y", 14);

    expect(xPreset.initial.x).toBe(20);
    expect(yPreset.initial.y).toBe(14);
    expect(xPreset.animate.opacity).toBe(1);
    expect(xPreset.transition.duration).toBeGreaterThan(0);
  });
});
