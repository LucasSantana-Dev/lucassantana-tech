import "./App.css";
import { ContactCta } from "./components/ContactCta";
import { DeepDives } from "./components/DeepDives";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Hero } from "./components/Hero";
import { ImpactStrip } from "./components/ImpactStrip";
import { NavBar } from "./components/NavBar";
import { Seo } from "./components/Seo";
import { SiteFooter } from "./components/SiteFooter";
import { SkillsMap } from "./components/SkillsMap";
import { experiences, profile, projects, skills } from "./data/content";

const deepDiveProjects = projects.filter((project) => project.deepDive);
const featuredProjects = projects.filter((project) => project.featured);

function App() {
  return (
    <>
      <Seo profile={profile} projects={projects} />
      <div className="app-shell">
        <div className="bg-mesh" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <NavBar profile={profile} />
        <main>
          <Hero profile={profile} />
          <ImpactStrip metrics={profile.stats} />
          <FeaturedProjects projects={featuredProjects} />
          <DeepDives projects={deepDiveProjects} />
          <ExperienceTimeline experiences={experiences} />
          <SkillsMap skills={skills} />
          <ContactCta profile={profile} />
        </main>
        <SiteFooter profile={profile} />
      </div>
    </>
  );
}

export default App;
