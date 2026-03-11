import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import { FiCode, FiDatabase, FiServer } from "react-icons/fi";
import {
  SiDocker,
  SiExpress,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";

type IconMeta = {
  Icon: IconType;
  color: string;
};

const fallback: IconMeta = { Icon: FiCode, color: "#D4D4E2" };

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

export const getCoreTechIconMeta = (label: string): IconMeta => {
  const value = normalize(label);

  if (value.includes("typescript")) return { Icon: SiTypescript, color: "#3178C6" };
  if (value.includes("node")) return { Icon: SiNodedotjs, color: "#5FA04E" };
  if (value.includes("react")) return { Icon: SiReact, color: "#61DAFB" };
  if (value.includes("next")) return { Icon: SiNextdotjs, color: "#FFFFFF" };
  if (value.includes("aws")) return { Icon: FaAws, color: "#FF9900" };
  if (value.includes("docker")) return { Icon: SiDocker, color: "#2496ED" };
  if (value.includes("mcp")) return { Icon: FiServer, color: "#BFA8FF" };
  if (value.includes("python")) return { Icon: SiPython, color: "#3776AB" };
  if (value.includes("supabase")) return { Icon: SiSupabase, color: "#3ECF8E" };
  if (value.includes("sqlite")) return { Icon: FiDatabase, color: "#9CB5CC" };
  if (value.includes("express")) return { Icon: SiExpress, color: "#FFFFFF" };
  if (value.includes("prisma")) return { Icon: SiPrisma, color: "#8BACE6" };

  return fallback;
};
