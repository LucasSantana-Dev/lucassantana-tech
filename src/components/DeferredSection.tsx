import { type ReactNode, useEffect, useRef, useState } from "react";

type DeferredSectionProps = {
  id: string;
  rootMargin?: string;
  placeholderHeight?: number;
  children: ReactNode;
};

export const DeferredSection = ({
  id,
  rootMargin = "320px 0px",
  placeholderHeight = 360,
  children,
}: DeferredSectionProps) => {
  const isTestEnv = import.meta.env.MODE === "test" || import.meta.env.VITEST === true;
  const canObserve = typeof window !== "undefined" && typeof IntersectionObserver !== "undefined";
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(() => isTestEnv || !canObserve);

  useEffect(() => {
    if (mounted || !canObserve) {
      return;
    }

    const target = ref.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [canObserve, mounted, rootMargin]);

  return (
    <section
      ref={ref}
      id={id}
      className="section deferred-shell"
      style={mounted ? undefined : { minHeight: `${placeholderHeight}px` }}
    >
      {mounted ? children : <div className="deferred-shell-placeholder" aria-hidden="true" />}
    </section>
  );
};
