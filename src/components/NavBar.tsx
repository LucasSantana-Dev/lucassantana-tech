import { motion } from "motion/react";
import type { Profile } from "../types/content";

type NavBarProps = {
  profile: Profile;
};

const items = [
  { href: "#projects", label: "Projects" },
  { href: "#deep-dives", label: "Deep Dives" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const NavBar = ({ profile }: NavBarProps) => {
  return (
    <nav className="top-nav" aria-label="Primary">
      <a href="#top" className="brand">
        {profile.name}
      </a>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <motion.a href={item.href} whileHover={{ y: -2 }}>
              {item.label}
            </motion.a>
          </li>
        ))}
      </ul>
      <motion.a
        href={`mailto:${profile.email}`}
        className="nav-cta"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        Start a conversation
      </motion.a>
    </nav>
  );
};
