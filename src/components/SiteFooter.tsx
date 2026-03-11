import type { Profile } from "../types/content";

type SiteFooterProps = {
  profile: Profile;
};

export const SiteFooter = ({ profile }: SiteFooterProps) => {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built for lucassantana.tech.
      </p>
      <a href={profile.github} target="_blank" rel="noreferrer">
        Source profile
      </a>
    </footer>
  );
};
