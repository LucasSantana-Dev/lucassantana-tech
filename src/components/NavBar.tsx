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
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
