import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
