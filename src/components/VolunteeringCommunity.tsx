import { motion } from "motion/react";
import { FiUsers } from "react-icons/fi";
import { getActionVisual } from "../lib/brandAssets";
import type { Profile, VolunteerItem } from "../types/content";
import { Reveal } from "./Reveal";

type VolunteeringCommunityProps = {
  profile: Profile;
  volunteerItems: VolunteerItem[];
};

export const VolunteeringCommunity = ({ profile, volunteerItems }: VolunteeringCommunityProps) => {
  const discordVisual = getActionVisual("Discord", profile.discord);

  return (
    <section className="section volunteering-grid" id="volunteering" aria-labelledby="volunteering-title">
      <Reveal>
        <p className="section-tag">Volunteering & Community</p>
        <h2 id="volunteering-title">Community leadership and mentorship</h2>
      </Reveal>
      <div className="volunteering-layout">
        <Reveal axis="x" distance={-24}>
          <article className="community-card glass-card">
            <p className="about-eyebrow">Community</p>
            <h3>Join my Discord community</h3>
            <p>
              I share project updates, architecture notes, and practical engineering discussions with
              builders working on real products.
            </p>
            <a
              className="ui-action ui-action-primary"
              href={profile.discord}
              target="_blank"
              rel="noreferrer"
            >
              <discordVisual.Icon
                className="ui-action-symbol"
                aria-hidden="true"
                color={discordVisual.color}
              />
              <span>Join Discord Community</span>
              <span className="ui-action-icon" aria-hidden="true">
                ↗
              </span>
            </a>
          </article>
        </Reveal>
        <div className="volunteer-list">
          {volunteerItems.map((item, index) => (
            <Reveal key={item.role + item.organization} axis="y" distance={18 + index * 8} delay={index * 0.04}>
              <motion.article className="volunteer-card glass-card" whileHover={{ y: -3 }}>
                <header>
                  <span className="volunteer-period">{item.period}</span>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </header>
                <p className="volunteer-summary">{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>
                      <FiUsers aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
