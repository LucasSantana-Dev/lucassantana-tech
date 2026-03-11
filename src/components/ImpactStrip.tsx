import type { Metric } from "../types/content";
import { MetricCard } from "./MetricCard";
import { Reveal } from "./Reveal";

type ImpactStripProps = {
  metrics: Metric[];
};

export const ImpactStrip = ({ metrics }: ImpactStripProps) => {
  return (
    <section className="section" id="impact" aria-labelledby="impact-title">
      <Reveal>
        <p className="section-tag">Measured impact</p>
        <h2 id="impact-title">Metrics from shipped systems, not mock projects</h2>
      </Reveal>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <Reveal key={metric.label} axis="x" distance={18}>
            <MetricCard metric={metric} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};
