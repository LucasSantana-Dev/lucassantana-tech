import "./App.css";
import { lazy, Suspense, useState } from "react";
import { AboutIdentity } from "./components/AboutIdentity";
import { DeferredSection } from "./components/DeferredSection";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Hero } from "./components/Hero";
import { MoreDetails } from "./components/MoreDetails";
import { NavBar } from "./components/NavBar";
import { NowFocus } from "./components/NowFocus";
import { ScrollProgress } from "./components/ScrollProgress";
import { Seo } from "./components/Seo";
import { SiteFooter } from "./components/SiteFooter";
import { nowItems, profile, projects } from "./data/coreContent";

const featuredProjects = projects.filter((project) => project.featured);
const LazySkillsSection = lazy(async () => {
  const section = await import("./sections/SkillsSection");
  return { default: section.SkillsSection };
});
const LazyContactSection = lazy(async () => {
  const section = await import("./sections/ContactSection");
  return { default: section.ContactSection };
});
const LazyMoreDetailsContent = lazy(async () => {
  const section = await import("./sections/MoreDetailsContent");
  return { default: section.MoreDetailsContent };
});

function App() {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <>
      <Seo profile={profile} projects={projects} />
      <div className="app-shell">
        <ScrollProgress />
        <div className="bg-mesh" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <NavBar profile={profile} />
        <main>
          <Hero profile={profile} />
          <AboutIdentity profile={profile} />
          <NowFocus items={nowItems} />
          <FeaturedProjects projects={featuredProjects} />
          <DeferredSection id="skills" rootMargin="320px 0px" placeholderHeight={1200}>
            <Suspense fallback={<div className="deferred-section-loader" aria-hidden="true" />}>
              <LazySkillsSection sectionId={undefined} className="deferred-section-inner" as="div" />
            </Suspense>
          </DeferredSection>
          <DeferredSection id="contact" rootMargin="280px 0px" placeholderHeight={420}>
            <Suspense fallback={<div className="deferred-section-loader" aria-hidden="true" />}>
              <LazyContactSection sectionId={undefined} className="deferred-section-inner" as="div" />
            </Suspense>
          </DeferredSection>
          <MoreDetails
            expanded={showMoreDetails}
            onToggle={() => {
              setShowMoreDetails((current) => !current);
            }}
          />
          {showMoreDetails ? (
            <Suspense fallback={<div id="details-content" className="details-content-loader" aria-hidden="true" />}>
              <LazyMoreDetailsContent />
            </Suspense>
          ) : null}
        </main>
        <SiteFooter profile={profile} />
      </div>
    </>
  );
}

export default App;
