import type { IconType } from "react-icons";
import { BsBell, BsCloudArrowUp, BsCpu, BsFeather, BsShieldLock } from "react-icons/bs";
import { FaAws, FaJava } from "react-icons/fa6";
import {
  FiActivity,
  FiCloud,
  FiCode,
  FiDatabase,
  FiLayers,
  FiMonitor,
  FiServer,
  FiSliders,
  FiTool,
} from "react-icons/fi";
import {
  SiElectron,
  SiCloudflare,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGrafana,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrometheus,
  SiPrisma,
  SiPython,
  SiSentry,
  SiSpring,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVitest,
} from "react-icons/si";

type IconMeta = {
  Icon: IconType;
  color: string;
};

const fallback: IconMeta = { Icon: FiCode, color: "#D4D4E2" };

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

export const getTechIconMeta = (label: string, iconKey?: string): IconMeta => {
  const value = normalize(iconKey ?? label);

  if (value.includes("react")) return { Icon: SiReact, color: "#61DAFB" };
  if (value.includes("next")) return { Icon: SiNextdotjs, color: "#FFFFFF" };
  if (value.includes("tailwind")) return { Icon: SiTailwindcss, color: "#38BDF8" };
  if (value.includes("typescript")) return { Icon: SiTypescript, color: "#3178C6" };
  if (value.includes("node")) return { Icon: SiNodedotjs, color: "#5FA04E" };
  if (value.includes("express")) return { Icon: SiExpress, color: "#FFFFFF" };
  if (value.includes("python")) return { Icon: SiPython, color: "#3776AB" };
  if (value.includes("java")) return { Icon: FaJava, color: "#F89820" };
  if (value.includes("spring")) return { Icon: SiSpring, color: "#6DB33F" };
  if (value.includes("mcp")) return { Icon: BsCpu, color: "#BFA8FF" };
  if (value.includes("jwt")) return { Icon: BsShieldLock, color: "#9DD1FF" };
  if (value.includes("postgres")) return { Icon: SiPostgresql, color: "#699ECC" };
  if (value.includes("supabase")) return { Icon: SiSupabase, color: "#3ECF8E" };
  if (value.includes("redis")) return { Icon: SiRedis, color: "#FF4438" };
  if (value.includes("sqlite")) return { Icon: SiPostgresql, color: "#9CB5CC" };
  if (value.includes("prisma")) return { Icon: SiPrisma, color: "#8BACE6" };
  if (value.includes("aws")) return { Icon: FaAws, color: "#FF9900" };
  if (value.includes("cloudflare")) return { Icon: SiCloudflare, color: "#F38020" };
  if (value.includes("dockercompose")) return { Icon: BsCloudArrowUp, color: "#6FC7FF" };
  if (value.includes("docker")) return { Icon: SiDocker, color: "#2496ED" };
  if (value.includes("k3s")) return { Icon: SiKubernetes, color: "#326CE5" };
  if (value.includes("terraform")) return { Icon: SiTerraform, color: "#7B42BC" };
  if (value.includes("tailscale")) return { Icon: FiActivity, color: "#6DA5FF" };
  if (value.includes("cloudflaretunnel")) return { Icon: FiSliders, color: "#F9A03F" };
  if (value.includes("nginx")) return { Icon: SiNginx, color: "#009639" };
  if (value.includes("grafana")) return { Icon: SiGrafana, color: "#F46800" };
  if (value.includes("prometheus")) return { Icon: SiPrometheus, color: "#E6522C" };
  if (value.includes("loki")) return { Icon: FiLayers, color: "#D7B8FF" };
  if (value.includes("alertmanager")) return { Icon: BsBell, color: "#FFC36D" };
  if (value.includes("netdata")) return { Icon: FiMonitor, color: "#73DDFF" };
  if (value.includes("sentry")) return { Icon: SiSentry, color: "#9071E2" };
  if (value === "n8n" || value.includes("n8n")) return { Icon: FiTool, color: "#F16E43" };
  if (value.includes("githubactions")) return { Icon: SiGithubactions, color: "#2088FF" };
  if (value.includes("github")) return { Icon: SiGithub, color: "#FFFFFF" };
  if (value.includes("playwright")) return { Icon: FiMonitor, color: "#8FD66A" };
  if (value.includes("jest")) return { Icon: SiJest, color: "#C63D14" };
  if (value.includes("vitest")) return { Icon: SiVitest, color: "#BCCB31" };
  if (value.includes("pytest")) return { Icon: SiPython, color: "#FFE873" };
  if (value.includes("ruff")) return { Icon: BsFeather, color: "#A4CCFF" };
  if (value.includes("figma")) return { Icon: SiFigma, color: "#A259FF" };
  if (value.includes("electron")) return { Icon: SiElectron, color: "#47848F" };
  if (value.includes("radix")) return { Icon: FiLayers, color: "#BFC8D8" };
  if (value.includes("shadcn")) return { Icon: FiLayers, color: "#E0E3EB" };

  const fallbackValue = label.toLowerCase();

  if (fallbackValue.includes("typescript")) return { Icon: SiTypescript, color: "#3178C6" };
  if (fallbackValue.includes("javascript")) return { Icon: SiJavascript, color: "#F7DF1E" };
  if (fallbackValue.includes("node")) return { Icon: SiNodedotjs, color: "#5FA04E" };
  if (fallbackValue.includes("react")) return { Icon: SiReact, color: "#61DAFB" };
  if (fallbackValue.includes("next")) return { Icon: SiNextdotjs, color: "#FFFFFF" };
  if (fallbackValue.includes("express")) return { Icon: SiExpress, color: "#FFFFFF" };
  if (fallbackValue.includes("aws")) return { Icon: FaAws, color: "#FF9900" };
  if (fallbackValue.includes("docker")) return { Icon: SiDocker, color: "#2496ED" };
  if (fallbackValue.includes("supabase")) return { Icon: SiSupabase, color: "#3ECF8E" };
  if (fallbackValue.includes("redis")) return { Icon: SiRedis, color: "#FF4438" };
  if (fallbackValue.includes("prisma")) return { Icon: SiPrisma, color: "#8BACE6" };
  if (fallbackValue.includes("postgres")) return { Icon: SiPostgresql, color: "#699ECC" };
  if (fallbackValue.includes("sqlite")) return { Icon: SiPostgresql, color: "#9CB5CC" };
  if (fallbackValue.includes("github actions")) return { Icon: SiGithubactions, color: "#2088FF" };
  if (fallbackValue.includes("github")) return { Icon: SiGithub, color: "#FFFFFF" };
  if (fallbackValue.includes("cloudflare")) return { Icon: SiCloudflare, color: "#F38020" };
  if (fallbackValue.includes("tailwind")) return { Icon: SiTailwindcss, color: "#38BDF8" };
  if (fallbackValue.includes("figma")) return { Icon: SiFigma, color: "#A259FF" };
  if (fallbackValue.includes("playwright")) return { Icon: FiMonitor, color: "#8FD66A" };
  if (fallbackValue.includes("python")) return { Icon: SiPython, color: "#3776AB" };
  if (fallbackValue.includes("mcp")) return { Icon: BsCpu, color: "#BFA8FF" };
  if (value.includes("javascript")) return { Icon: SiJavascript, color: "#F7DF1E" };

  return fallback;
};

export const getAreaIconMeta = (area: string): IconMeta => {
  const value = area.toLowerCase();

  if (value.includes("frontend")) return { Icon: FiMonitor, color: "#9FD8FF" };
  if (value.includes("backend")) return { Icon: FiServer, color: "#9BD2A9" };
  if (value.includes("data")) return { Icon: FiDatabase, color: "#8FBDE8" };
  if (value.includes("cloud")) return { Icon: FiCloud, color: "#F8B56A" };
  if (value.includes("observability")) return { Icon: FiActivity, color: "#F6A85C" };
  if (value.includes("tooling")) return { Icon: FiTool, color: "#D7DDF0" };
  if (value.includes("ci")) return { Icon: FiTool, color: "#9CC5FF" };
  if (value.includes("architecture")) return { Icon: FiLayers, color: "#BFA8FF" };

  return fallback;
};
