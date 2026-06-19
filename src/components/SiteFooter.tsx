import { FiLinkedin, FiMail } from "react-icons/fi";
import { SiDiscord, SiGithub } from "react-icons/si";
import type { Profile } from "../types/content";

type SiteFooterProps = {
  profile: Profile;
};

export const SiteFooter = ({ profile }: SiteFooterProps) => {
  return (
    <footer className="site-footer">
      <span className="footer-copy">
        © {new Date().getFullYear()} {profile.name.toLowerCase()} — lucassantana.tech
      </span>
      <nav className="footer-links" aria-label="Footer links">
        <a href={`mailto:${profile.email}`} className="footer-link" aria-label="Email">
          <FiMail aria-hidden="true" />
          email
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="footer-link" aria-label="LinkedIn">
          <FiLinkedin aria-hidden="true" />
          linkedin
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="footer-link" aria-label="GitHub">
          <SiGithub aria-hidden="true" />
          github
        </a>
        <a href={profile.discord} target="_blank" rel="noreferrer" className="footer-link footer-link-accent" aria-label="Discord">
          <SiDiscord aria-hidden="true" />
          discord
        </a>
      </nav>
    </footer>
  );
};
