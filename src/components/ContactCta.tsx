import { motion } from "motion/react";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { SiDiscord, SiGithub } from "react-icons/si";
import type { IconType } from "react-icons";
import type { Profile } from "../types/content";

type ContactCtaProps = {
  profile: Profile;
  sectionId?: string;
  className?: string;
  as?: "section" | "div";
};

const contacts = (profile: Profile): Array<{
  label: string;
  href: string;
  display: string;
  live: boolean;
  Icon: IconType;
  iconColor: string;
}> => [
  { label: "email",    href: `mailto:${profile.email}`,      display: profile.email,             live: false, Icon: FiMail,      iconColor: "#e2e2dc" },
  { label: "discord",  href: profile.discord,                display: "discord.com/criativaria",  live: true,  Icon: SiDiscord,   iconColor: "#5865F2" },
  { label: "linkedin", href: profile.linkedin,               display: "/in/devlucassantana",      live: false, Icon: FiLinkedin,  iconColor: "#0A66C2" },
  { label: "github",   href: profile.github,                 display: "LucasSantana-Dev",         live: false, Icon: SiGithub,    iconColor: "#e2e2dc" },
];

export const ContactCta = ({
  profile,
  sectionId = "contact",
  className = "section",
  as = "section",
}: ContactCtaProps) => {
  const Container = as;
  const items = contacts(profile);

  return (
    <Container className={className} id={sectionId} aria-labelledby="contact-title">
      <div className="term-section-head">
        <span className="term-section-label" id="contact-title"># reach me</span>
        <span className="term-section-sep" aria-hidden="true" />
      </div>

      <p className="contact-summary">
        Open to senior engineering roles, architecture consulting, and collaboration on serious
        products. Fastest response: Discord and email.
      </p>

      <div className="contact-table">
        {items.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
            className={`contact-row${item.live ? " contact-row-live" : ""}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <span className="contact-cmd">
              <item.Icon aria-hidden="true" className="contact-icon" style={{ color: item.iconColor }} />
              {item.label}
            </span>
            <span className="contact-display">{item.display}</span>
            <span className="contact-arrow" aria-hidden="true">↗</span>
          </motion.a>
        ))}
      </div>
    </Container>
  );
};
