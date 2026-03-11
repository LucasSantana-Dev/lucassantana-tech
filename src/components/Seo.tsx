import { Helmet } from "react-helmet-async";
import type { Profile, Project } from "../types/content";

type SeoProps = {
  profile: Profile;
  projects: Project[];
};

const description =
  "Digital business card of Lucas Santana: senior full-stack engineer focused on platform " +
  "architecture, product delivery, community, and measurable outcomes.";

const twitterDescription =
  "Business-card hub for Lucas Santana with relevant projects, current focus, volunteering, and " +
  "direct contact via email, LinkedIn, GitHub, and Discord.";

const asSourceCode = (project: Project) => {
  return {
    "@type": "SoftwareSourceCode",
    name: `${project.organization}/${project.name}`,
    codeRepository: project.repoUrl,
    programmingLanguage: project.stack,
    description: project.summary,
  };
};

export const Seo = ({ profile, projects }: SeoProps) => {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.role,
        url: profile.website,
        sameAs: [profile.linkedin, profile.github, profile.discord],
        email: profile.email,
        image: `${profile.website}${profile.heroImage}`,
      },
      {
        "@type": "WebSite",
        name: `${profile.name} Digital Business Card`,
        url: profile.website,
      },
      ...projects.slice(0, 3).map(asSourceCode),
    ],
  };

  return (
    <Helmet>
      <title>Lucas Santana | Digital Business Card</title>
      <meta name="description" content={description} />
      <meta property="og:title" content="Lucas Santana | Digital Business Card" />
      <meta
        property="og:description"
        content="Senior full-stack engineer digital hub with relevant projects, current focus, and contact channels."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={profile.website} />
      <meta property="og:image" content={`${profile.website}${profile.heroImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Lucas Santana | Digital Business Card" />
      <meta name="twitter:description" content={twitterDescription} />
      <link rel="canonical" href={profile.website} />
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
};
