/**
 * Maps `DetailPanelIconKey` values from portfolio data to Lucide components.
 * Single place to extend when adding new HUD icons.
 */
import {
  Bot,
  Building2,
  Car,
  Code,
  Cpu,
  ExternalLink,
  Factory,
  FlaskConical,
  Github,
  Globe,
  GraduationCap,
  Landmark,
  Layers,
  Linkedin,
  Mail,
  Orbit,
  Rocket,
  Satellite,
  Send,
  Sparkles,
  BookText,
  Wallet,
  type LucideIcon,
  BriefcaseIcon,
  SwatchBook,
} from "lucide-react";
import type { DetailPanelIconKey } from "./detailPanelIconKeys";

const REGISTRY: Record<DetailPanelIconKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  globe: Globe,
  externalLink: ExternalLink,
  rocket: Rocket,
  building2: Building2,
  graduationCap: GraduationCap,
  car: Car,
  landmark: Landmark,
  factory: Factory,
  flaskConical: FlaskConical,
  orbit: Orbit,
  wallet: Wallet,
  code: Code,
  send: Send,
  cpu: Cpu,
  satellite: Satellite,
  sparkles: Sparkles,
  bot: Bot,
  layers: Layers,
  "book-text": BookText,
  "briefcase-business": BriefcaseIcon,
  "swatch-book": SwatchBook,
};

/** Runtime check for JSON/localStorage overrides that may use unknown keys. */
export function isDetailPanelIconKey(value: string | undefined | null): value is DetailPanelIconKey {
  return value != null && value in REGISTRY;
}

/**
 * Returns the Lucide component for a data key, or infers from url/label when omitted
 * (e.g. legacy nodes, fallback problem/solution/impact panels).
 */
export function getDetailPanelLucideIcon(
  key: DetailPanelIconKey | undefined,
  url: string,
  label: string
): LucideIcon {
  if (key && isDetailPanelIconKey(key)) return REGISTRY[key];
  return REGISTRY[inferDetailPanelIconKey(url, label)];
}

/** Heuristic when `icon` is not set in data — keeps backward compatibility. */
export function inferDetailPanelIconKey(url: string, label: string): DetailPanelIconKey {
  const u = url.toLowerCase();
  const l = label.toLowerCase();
  if (u.includes("github.com") || l.includes("github")) return "github";
  if (u.includes("linkedin.com") || l.includes("linkedin")) return "linkedin";
  if (u.startsWith("mailto:") || l.includes("email") || l.includes("mail")) return "mail";
  if (l.includes("demo") || l.includes("prototype") || l.includes("experiment")) return "flaskConical";
  if (l.includes("platform") || l.includes("open platform")) return "rocket";
  if (l.includes("volvo") || u.includes("volvocars")) return "car";
  if (l.includes("iit") || l.includes("university") || u.includes("iitb")) return "graduationCap";
  if (l.includes("home reference") || l.includes("organization")) return "building2";
  if (l.includes("book")) return "book-text";
  return "globe";
}
