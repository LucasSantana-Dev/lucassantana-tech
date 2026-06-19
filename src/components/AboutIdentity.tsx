import { motion } from "motion/react";
import type { Profile } from "../types/content";

type AboutIdentityProps = {
  profile: Profile;
};

export const AboutIdentity = ({ profile }: AboutIdentityProps) => {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="term-section-head">
        <span className="term-section-label" id="about-title"># about</span>
        <span className="term-section-sep" aria-hidden="true" />
      </div>

      <div className="about-grid">
        {/* Identity KV */}
        <div className="about-kv-block">
          <div className="term-kv">
            <span className="term-key">ROLE</span>
            <span className="term-val">Senior Full-Stack Engineer</span>
          </div>
          <div className="term-kv">
            <span className="term-key">LOCATION</span>
            <span className="term-val">{profile.location}</span>
          </div>
          <div className="term-kv">
            <span className="term-key">TIMEZONE</span>
            <span className="term-val">UTC-3 · Remote collaboration</span>
          </div>
          <div className="term-kv">
            <span className="term-key">STACK</span>
            <span className="term-val">{profile.stack.join(" · ")}</span>
          </div>
          <div className="term-kv">
            <span className="term-key">SUMMARY</span>
            <span className="term-val term-val-block">{profile.summary}</span>
          </div>
          <div className="term-kv">
            <span className="term-key">STATUS</span>
            <span className="term-val term-val-green">● {profile.availability}</span>
          </div>
        </div>

        {/* Metrics table */}
        <div className="about-metrics">
          <p className="term-comment"># impact highlights</p>
          <div className="about-metric-head">
            <span>METRIC</span>
            <span>VALUE</span>
          </div>
          <div className="about-metric-divider" aria-hidden="true">{"─".repeat(48)}</div>
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="about-metric-row"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span className="about-metric-label">{stat.label}</span>
              <span className="about-metric-val term-val-green">
                +{stat.value}{stat.suffix}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
