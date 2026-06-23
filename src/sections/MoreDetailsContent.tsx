import { ArchitectureShowcase } from "../components/ArchitectureShowcase";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { VolunteeringCommunity } from "../components/VolunteeringCommunity";
import { experiences, volunteerItems } from "../data/extendedContent";
import { profile, projects } from "../data/coreContent";

const deepDiveProjects = projects.filter((project) => project.deepDive);

export const MoreDetailsContent = () => {
  return (
    <div id="details-content">
      <VolunteeringCommunity profile={profile} volunteerItems={volunteerItems} />
      <ExperienceTimeline experiences={experiences} />
      <ArchitectureShowcase projects={deepDiveProjects} />
    </div>
  );
};
