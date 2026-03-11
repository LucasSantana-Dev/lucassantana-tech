import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { getActionVisual } from "../lib/brandAssets";
import type { Profile } from "../types/content";

type NavBarProps = {
  profile: Profile;
};

const items = [
  { href: "#about", label: "About" },
  { href: "#now", label: "Now" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Reach Me" },
];

export const NavBar = ({ profile }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? "#about");
  const discordVisual = getActionVisual("Discord", profile.discord);

  useEffect(() => {
    const ids = items.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { threshold: [0.2, 0.45, 0.75], rootMargin: "-42% 0px -48% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const closeOnDesktop = () => {
      if (window.innerWidth > 760) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <nav className="top-nav" aria-label="Primary">
      <a href="#top" className="brand">
        <span className="brand-mark" aria-hidden="true">
          LS
        </span>
        <span>{profile.name}</span>
      </a>
      <button
        type="button"
        className="nav-menu-toggle"
        aria-expanded={mobileMenuOpen}
        aria-controls="primary-nav-items"
        onClick={() => {
          setMobileMenuOpen((current) => !current);
        }}
      >
        {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
      </button>
      <ul id="primary-nav-items" className={`nav-items${mobileMenuOpen ? " is-open" : ""}`}>
        {items.map((item) => (
          <li key={item.href}>
            <motion.a
              href={item.href}
              className={`nav-link${activeHref === item.href ? " is-active" : ""}`}
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveHref(item.href);
              }}
            >
              <span>{item.label}</span>
            </motion.a>
          </li>
        ))}
      </ul>
      <motion.a
        href={profile.discord}
        target="_blank"
        rel="noreferrer"
        className="nav-cta"
        whileTap={{ scale: 0.995 }}
      >
        <discordVisual.Icon
          className="ui-action-symbol"
          aria-hidden="true"
          color={discordVisual.color}
        />
        <span>Join Discord</span>
        <span className="ui-action-icon" aria-hidden="true">
          ↗
        </span>
      </motion.a>
    </nav>
  );
};
