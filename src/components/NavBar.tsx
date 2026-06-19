import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import type { Profile } from "../types/content";

type NavBarProps = {
  profile: Profile;
};

const items = [
  { href: "#about",    label: "about"    },
  { href: "#now",      label: "now"      },
  { href: "#projects", label: "projects" },
  { href: "#skills",   label: "skills"   },
  { href: "#contact",  label: "contact"  },
];

export const NavBar = ({ profile }: NavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#about");

  useEffect(() => {
    const ids = items.map((i) => i.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
      },
      { threshold: [0.2, 0.45, 0.75], rootMargin: "-42% 0px -48% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = () => { if (window.innerWidth > 760) setMobileOpen(false); };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <nav className="top-nav" aria-label="Primary">
      <a href="#top" className="brand" aria-label={`${profile.name} — home`}>
        <span className="brand-mark" aria-hidden="true">LS</span>
        <span className="brand-name">{profile.name.toLowerCase()}</span>
      </a>

      <button
        type="button"
        className="nav-menu-toggle"
        aria-expanded={mobileOpen}
        aria-controls="primary-nav-items"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
      </button>

      <ul id="primary-nav-items" className={`nav-items${mobileOpen ? " is-open" : ""}`} role="list">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`nav-link${activeHref === item.href ? " is-active" : ""}`}
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => { setMobileOpen(false); setActiveHref(item.href); }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <a href={profile.discord} target="_blank" rel="noreferrer" className="nav-cta">
        &gt; discord ↗
      </a>
    </nav>
  );
};
