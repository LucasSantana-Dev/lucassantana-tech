import { motion } from "motion/react";
import type { Profile } from "../types/content";
import { Reveal } from "./Reveal";

type ContactCtaProps = {
  profile: Profile;
};

export const ContactCta = ({ profile }: ContactCtaProps) => {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <Reveal>
        <p className="section-tag">Contact</p>
        <h2 id="contact-title">Building serious products with measurable outcomes</h2>
        <p>
          I am open to Senior Software Engineer and Full Stack roles with high technical ownership
          and real delivery impact.
        </p>
      </Reveal>
      <div className="contact-links">
        <Reveal axis="x" distance={16} delay={0.02}>
          <motion.a href={`mailto:${profile.email}`} whileHover={{ y: -2 }}>
            Email
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.06}>
          <motion.a href={profile.linkedin} target="_blank" rel="noreferrer" whileHover={{ y: -2 }}>
            LinkedIn
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.1}>
          <motion.a href={profile.github} target="_blank" rel="noreferrer" whileHover={{ y: -2 }}>
            GitHub
          </motion.a>
        </Reveal>
        <Reveal axis="x" distance={16} delay={0.14}>
          <motion.a
            href="/CV_LucasSantana_Dev(EN).pdf"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
          >
            Resume
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
};
