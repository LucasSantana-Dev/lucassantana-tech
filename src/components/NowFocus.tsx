import { motion } from "motion/react";
import type { NowItem } from "../types/content";

type NowFocusProps = {
  items: NowItem[];
};

const statusClass: Record<string, string> = {
  Active:      "term-state-active",
  Shipping:    "term-state-live",
  Maintaining: "term-val-dim",
};

const statusIcon: Record<string, string> = {
  Active:      "●",
  Shipping:    "●",
  Maintaining: "○",
};

export const NowFocus = ({ items }: NowFocusProps) => {
  return (
    <section className="section" id="now" aria-labelledby="now-title">
      <div className="term-section-head">
        <span className="term-section-label" id="now-title"># now</span>
        <span className="term-section-sep" aria-hidden="true" />
      </div>

      <div className="now-log">
        {items.map((item, i) => {
          const cls = statusClass[item.status] ?? "term-val-dim";
          const icon = statusIcon[item.status] ?? "○";

          return (
            <motion.div
              key={item.title}
              className="now-entry"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <div className="now-entry-head">
                <span className={`now-status-badge ${cls}`}>
                  {icon} {item.status.toUpperCase()}
                </span>
                <span className="now-entry-title">{item.title}</span>
              </div>
              <p className="now-entry-summary">{item.summary}</p>
              {item.links.length > 0 ? (
                <div className="now-entry-links">
                  {item.links.map((link) => (
                    <a
                      key={link.label + link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`term-action-link${link.label.toLowerCase() === "live" ? " term-action-link-live" : ""}`}
                    >
                      &gt; {link.label.toLowerCase()} ↗
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
