import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCountUp } from "./useCountUp";

describe("useCountUp", () => {
  it("resolves immediately in reduced-motion mode", async () => {
    const { result } = renderHook(() => useCountUp(40, false, true));

    await waitFor(() => {
      expect(result.current).toBe(40);
    });
  });
});
