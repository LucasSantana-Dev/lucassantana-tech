import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";

class IntersectionObserverMock {
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    const entry = [{ isIntersecting: true, target }] as IntersectionObserverEntry[];
    this.callback(entry, this as unknown as IntersectionObserver);
  }
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => null,
  writable: true,
});
