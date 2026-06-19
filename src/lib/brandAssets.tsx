import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import { FiExternalLink, FiGlobe, FiMail } from "react-icons/fi";
import { SiDiscord, SiGithub } from "react-icons/si";

type LogoAsset = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width: number;
  height: number;
};

type ProjectPreview = {
  src: string;
  alt: string;
};

export type ActionVisual = {
  Icon: IconType;
  color: string;
};

export const getActionVisual = (label: string, url: string): ActionVisual => {
  const source = `${label} ${url}`.toLowerCase();

  if (source.includes("mailto:")) return { Icon: FiMail, color: "#f0b874" };
  if (source.includes("discord")) return { Icon: SiDiscord, color: "#ffffff" };
  if (source.includes("linkedin")) return { Icon: FaLinkedin, color: "#ffffff" };
  if (source.includes("github")) return { Icon: SiGithub, color: "#ffffff" };
  if (source.includes("live") || source.includes("http")) return { Icon: FiGlobe, color: "#66d9ff" };

  return { Icon: FiExternalLink, color: "#d9e7ff" };
};

export const getNowTitleLogo = (title: string): LogoAsset | null => {
  const value = title.toLowerCase();

  if (value.includes("lucky")) {
    return {
      src: "/images/project-logos/lucky-outline-v4-neon-icon.webp",
      fallbackSrc: "/images/project-logos/lucky-outline-v4-neon.jpeg",
      alt: "Lucky neon cat logo",
      width: 64,
      height: 64,
    };
  }

  return null;
};

export const getOrganizationLogo = (): LogoAsset | null => {
  return null;
};

export const getProjectLogo = (slug: string): LogoAsset | null => {
  if (slug === "lucky") {
    return {
      src: "/images/project-logos/lucky-outline-v4-neon-icon.webp",
      fallbackSrc: "/images/project-logos/lucky-outline-v4-neon.jpeg",
      alt: "Lucky neon cat logo",
      width: 64,
      height: 64,
    };
  }

  if (slug === "linkedin-engage") {
    return {
      src: "/images/project-logos/linkedin-engage-icon.png",
      alt: "LinkedIn Engage icon",
      width: 64,
      height: 64,
    };
  }

  return null;
};

export const getProjectPreviews = (slug: string): ProjectPreview[] => {
  if (slug !== "linkedin-engage") return [];

  return [
    {
      src: "/images/project-previews/linkedin-engage-store-440x280.png",
      alt: "LinkedIn Engage store promo image",
    },
    {
      src: "/images/project-previews/linkedin-engage-dashboard.png",
      alt: "LinkedIn Engage dashboard screenshot",
    },
  ];
};
