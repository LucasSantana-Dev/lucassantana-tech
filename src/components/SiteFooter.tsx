import { getActionVisual } from "../lib/brandAssets";
import type { Profile } from "../types/content";

type SiteFooterProps = {
  profile: Profile;
};

export const SiteFooter = ({ profile }: SiteFooterProps) => {
  const emailVisual = getActionVisual("Email", `mailto:${profile.email}`);
  const linkedinVisual = getActionVisual("LinkedIn", profile.linkedin);
  const githubVisual = getActionVisual("GitHub", profile.github);
  const discordVisual = getActionVisual("Discord", profile.discord);

  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built for lucassantana.tech.
      </p>
      <div className="footer-actions">
        <a className="ui-action ui-action-chip ui-action-ghost" href={`mailto:${profile.email}`}>
          <emailVisual.Icon className="ui-action-symbol" aria-hidden="true" color={emailVisual.color} />
          <span>Email</span>
          <span className="ui-action-icon" aria-hidden="true">
            ✉
          </span>
        </a>
        <a
          className="ui-action ui-action-chip ui-action-ghost"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
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
        </a>
        <a
          className="ui-action ui-action-chip ui-action-ghost"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <githubVisual.Icon className="ui-action-symbol" aria-hidden="true" color={githubVisual.color} />
          <span>GitHub</span>
          <span className="ui-action-icon" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          className="ui-action ui-action-chip ui-action-primary"
          href={profile.discord}
          target="_blank"
          rel="noreferrer"
        >
          <discordVisual.Icon
            className="ui-action-symbol"
            aria-hidden="true"
            color={discordVisual.color}
          />
          <span>Join Discord Community</span>
          <span className="ui-action-icon" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </footer>
  );
};
