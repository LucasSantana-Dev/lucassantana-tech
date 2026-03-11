export type SourceType = "CV" | "LinkedIn" | "GitHub";

export type Metric = {
  label: string;
  value: number;
  suffix: string;
  context: string;
  source: SourceType;
};

export type Profile = {
  name: string;
  role: string;
  summary: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  heroImage: string;
  stack: string[];
  stats: Metric[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type Project = {
  slug: string;
  name: string;
  organization: string;
  category: string;
  summary: string;
  stack: string[];
  architectureNotes: string[];
  impact: string[];
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
  deepDive: boolean;
};
