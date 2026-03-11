import { motion } from "motion/react";
import { FiClock, FiMapPin, FiUserCheck } from "react-icons/fi";
import type { Profile } from "../types/content";
import { Reveal } from "./Reveal";

type AboutIdentityProps = {
  profile: Profile;
};

export const AboutIdentity = ({ profile }: AboutIdentityProps) => {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <Reveal>
        <p className="section-tag">About / Identity</p>
        <h2 id="about-title">Digital business card for collaboration and delivery</h2>
      </Reveal>
      <div className="about-bento">
        <Reveal axis="x" distance={-24}>
          <article className="about-card about-primary glass-card">
            <p className="about-eyebrow">Profile</p>
            <h3>{profile.headlineShort}</h3>
            <p>{profile.summary}</p>
            <ul className="about-meta">
              <li>
                <FiMapPin aria-hidden="true" />
                <span>{profile.location}</span>
              </li>
              <li>
                <FiClock aria-hidden="true" />
                <span>GMT-3 • Remote collaboration</span>
              </li>
              {profile.availability ? (
                <li>
                  <FiUserCheck aria-hidden="true" />
                  <span>{profile.availability}</span>
                </li>
              ) : null}
            </ul>
          </article>
        </Reveal>
        <Reveal axis="x" distance={24} delay={0.04}>
          <article className="about-card about-stats glass-card" aria-label="Impact highlights">
            <p className="about-eyebrow">Highlights</p>
            <h3>Measured delivery outcomes</h3>
            <div className="about-stat-grid">
              {profile.stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="about-stat-chip"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <strong>
                    {item.value}
                    {item.suffix}
                  </strong>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};
