import { Helmet } from "react-helmet-async";
import type { Profile, Project } from "../types/content";

type SeoProps = {
  profile: Profile;
  projects: Project[];
};

const description =
  "Senior Software Engineer portfolio focused on full-stack delivery, platform architecture, " +
  "and measurable production impact across AI-enabled systems.";

const twitterDescription =
  "Portfolio of Lucas Santana: product delivery, platform architecture, and AI governance " +
  "engineering with quantified outcomes.";

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
        sameAs: [profile.linkedin, profile.github],
        email: profile.email,
        image: `${profile.website}${profile.heroImage}`,
      },
      {
        "@type": "WebSite",
        name: `${profile.name} Portfolio`,
        url: profile.website,
      },
      ...projects.slice(0, 3).map(asSourceCode),
    ],
  };

  return (
    <Helmet>
      <title>Lucas Santana | Senior Software Engineer</title>
      <meta name="description" content={description} />
      <meta property="og:title" content="Lucas Santana | Senior Software Engineer" />
      <meta
        property="og:description"
        content="Full-stack and platform engineering portfolio featuring Forge Space and Lucky."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={profile.website} />
      <meta property="og:image" content={`${profile.website}${profile.heroImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Lucas Santana | Senior Software Engineer" />
      <meta name="twitter:description" content={twitterDescription} />
      <link rel="canonical" href={profile.website} />
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
};
