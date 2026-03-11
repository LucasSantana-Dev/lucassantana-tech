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
  headlineShort: string;
  summary: string;
  availability?: string;
  location: string;
  email: string;
  discord: string;
  linkedin: string;
  github: string;
  website: string;
  heroImage: string;
  stack: string[];
  stats: Metric[];
};

export type ExperienceItem = {
  company: string;
  companyMark: string;
  role: string;
  period: string;
  bullets: string[];
};

export type SkillArea = {
  area: string;
  summary: string;
  skills: SkillItem[];
};

export type SkillLevel = "core" | "strong" | "working" | "familiar";

export type SkillEvidence = "forge-space" | "homelab" | "career";

export type SkillItem = {
  name: string;
  level: SkillLevel;
  iconKey: string;
  evidence: SkillEvidence[];
  featured: boolean;
  context: string;
};

export type NowLink = {
  label: string;
  url: string;
};

export type NowItem = {
  title: string;
  summary: string;
  status: string;
  links: NowLink[];
};

export type VolunteerItem = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
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
