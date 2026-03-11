import { motion, useReducedMotion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import { Reveal } from "./Reveal";

type MoreDetailsProps = {
  expanded: boolean;
  onToggle: () => void;
};

export const MoreDetails = ({ expanded, onToggle }: MoreDetailsProps) => {
  const reduced = useReducedMotion();

  return (
    <section className="section more-details" id="details" aria-labelledby="details-title">
      <Reveal>
        <p className="section-tag">More Details</p>
        <h2 id="details-title">Dive deeper into experience and technical depth</h2>
      </Reveal>
      <p className="details-summary">
        Additional details include volunteering, career timeline, architecture notes, and metrics.
      </p>
      <motion.button
        type="button"
        className="ui-action ui-action-secondary details-toggle-btn"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls="details-content"
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        <span>{expanded ? "Hide details" : "Show more details"}</span>
        <FiChevronDown
          className={`details-chevron${expanded ? " is-open" : ""}`}
          aria-hidden="true"
        />
      </motion.button>
    </section>
  );
};
