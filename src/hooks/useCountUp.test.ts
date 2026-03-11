import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCountUp } from "./useCountUp";

describe("useCountUp", () => {
  it("resolves immediately in reduced-motion mode once started", async () => {
    const { result } = renderHook(() => useCountUp(40, true, true));

    await waitFor(() => {
      expect(result.current).toBe(40);
    });
  });

  it("stays at zero before visibility trigger", async () => {
    const { result } = renderHook(() => useCountUp(40, false, false));

    await waitFor(() => {
      expect(result.current).toBe(0);
    });
  });
});
