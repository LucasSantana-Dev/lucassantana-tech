import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Metric } from "../types/content";
import { useCountUp } from "../hooks/useCountUp";

type MetricCardProps = {
  metric: Metric;
};

export const MetricCard = ({ metric }: MetricCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const count = useCountUp(metric.value, inView, Boolean(reduced));

  return (
    <article className="metric-card" ref={ref}>
      <p className="metric-value">
        {count}
        <span>{metric.suffix}</span>
      </p>
      <h3>{metric.label}</h3>
      <p>{metric.context}</p>
      <small>Source: {metric.source}</small>
    </article>
  );
};
