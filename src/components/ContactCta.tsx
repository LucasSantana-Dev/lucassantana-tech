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
      <Reveal axis="x" distance={18}>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="/CV_LucasSantana_Dev(EN).pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </Reveal>
    </section>
  );
};
