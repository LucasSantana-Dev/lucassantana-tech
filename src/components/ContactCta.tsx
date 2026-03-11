import { motion } from "motion/react";
import { getActionVisual } from "../lib/brandAssets";
import type { Profile } from "../types/content";
import { Reveal } from "./Reveal";

type ContactCtaProps = {
  profile: Profile;
  sectionId?: string;
  className?: string;
  as?: "section" | "div";
};

export const ContactCta = ({
  profile,
  sectionId = "contact",
  className = "section",
  as = "section",
}: ContactCtaProps) => {
  const emailVisual = getActionVisual("Email", `mailto:${profile.email}`);
  const linkedinVisual = getActionVisual("LinkedIn", profile.linkedin);
  const githubVisual = getActionVisual("GitHub", profile.github);
  const discordVisual = getActionVisual("Discord", profile.discord);
  const resumeVisual = getActionVisual("Resume", "/CV_LucasSantana_Dev(EN).pdf");
  const Container = as;

  return (
    <Container
      className={`${className} contact glass-card`}
      id={sectionId}
      aria-labelledby="contact-title"
    >
      <Reveal>
        <p className="section-tag">Reach Me</p>
        <h2 id="contact-title">Connect quickly through any channel</h2>
        <p className="contact-summary">
          Open to senior engineering roles, architecture consulting, and collaboration on serious
          products. Fastest response channels are Discord, email, and LinkedIn.
        </p>
      </Reveal>
      <div className="contact-links">
        <Reveal axis="x" distance={16} delay={0.02}>
          <motion.a
            className="ui-action ui-action-secondary"
            href={`mailto:${profile.email}`}
            whileTap={{ scale: 0.98 }}
          >
            <emailVisual.Icon className="ui-action-symbol" aria-hidden="true" color={emailVisual.color} />
            <span>Email</span>
            <span className="ui-action-icon" aria-hidden="true">
              ✉
            </span>
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.06}>
          <motion.a
            className="ui-action ui-action-secondary"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.98 }}
          >
            <linkedinVisual.Icon
              className="ui-action-symbol"
              aria-hidden="true"
              color={linkedinVisual.color}
            />
            <span>LinkedIn</span>
            <span className="ui-action-icon" aria-hidden="true">
              ↗
            </span>
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.1}>
          <motion.a
            className="ui-action ui-action-secondary"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.98 }}
          >
            <githubVisual.Icon className="ui-action-symbol" aria-hidden="true" color={githubVisual.color} />
            <span>GitHub</span>
            <span className="ui-action-icon" aria-hidden="true">
              ↗
            </span>
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.14}>
          <motion.a
            className="ui-action ui-action-primary"
            href={profile.discord}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.98 }}
          >
            <discordVisual.Icon className="ui-action-symbol" aria-hidden="true" color={discordVisual.color} />
            <span>Discord Community</span>
            <span className="ui-action-icon" aria-hidden="true">
              ↗
            </span>
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.18}>
          <motion.a
            className="ui-action ui-action-ghost"
            href="/CV_LucasSantana_Dev(EN).pdf"
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.98 }}
          >
            <resumeVisual.Icon className="ui-action-symbol" aria-hidden="true" color={resumeVisual.color} />
            <span>Resume</span>
            <span className="ui-action-icon" aria-hidden="true">
              ↗
            </span>
          </motion.a>
        </Reveal>
      </div>
    </Container>
  );
};
