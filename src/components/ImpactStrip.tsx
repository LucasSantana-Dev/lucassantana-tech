import { useInView } from "motion/react";
import { useRef } from "react";
import type { Metric } from "../types/content";
import { MetricCard } from "./MetricCard";
import { Reveal } from "./Reveal";

type ImpactStripProps = {
  metrics: Metric[];
};

export const ImpactStrip = ({ metrics }: ImpactStripProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const metricStarted = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="section" id="impact" aria-labelledby="impact-title" ref={sectionRef}>
      <Reveal>
        <p className="section-tag">Measured impact</p>
        <h2 id="impact-title">Metrics from shipped systems, not mock projects</h2>
      </Reveal>
      <div className="metric-grid">
        {metrics.map((metric, index) => (
          <Reveal
            key={metric.label}
            axis="x"
            distance={index % 2 === 0 ? -20 : 20}
            delay={index * 0.05}
          >
            <MetricCard metric={metric} started={metricStarted} delayMs={index * 90} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};
