import { useReducedMotion } from "motion/react";
import type { Metric } from "../types/content";
import { useCountUp } from "../hooks/useCountUp";

type MetricCardProps = {
  metric: Metric;
  started: boolean;
  delayMs: number;
};

export const MetricCard = ({ metric, started, delayMs }: MetricCardProps) => {
  const reduced = useReducedMotion();
  const count = useCountUp(metric.value, started, Boolean(reduced), 1200, delayMs);

  return (
    <article className="metric-card glass-card">
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
