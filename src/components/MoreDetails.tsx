import { motion, useReducedMotion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";

type MoreDetailsProps = {
  expanded: boolean;
  onToggle: () => void;
};

export const MoreDetails = ({ expanded, onToggle }: MoreDetailsProps) => {
  const reduced = useReducedMotion();

  return (
    <section className="section more-details" id="details" aria-labelledby="details-title">
      <div className="term-section-head">
        <span className="term-section-label" id="details-title"># more details</span>
        <span className="term-section-sep" aria-hidden="true" />
      </div>
      <p className="details-summary">
        Volunteering, career timeline, architecture notes, and impact metrics.
      </p>
      <motion.button
        type="button"
        className="details-toggle-btn"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls="details-content"
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        <span>{expanded ? "hide details" : "show more details"}</span>
        <FiChevronDown
          className={`details-chevron${expanded ? " is-open" : ""}`}
          aria-hidden="true"
        />
      </motion.button>
    </section>
  );
};
