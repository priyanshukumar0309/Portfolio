import type { NodeData } from "@/data/types";
import { aboutContent, featuredProjects, portfolioOwner, skillCategories } from "@/data/portfolioContent";

export const PORTFOLIO_OWNER = {
  name: portfolioOwner.name,
  title: portfolioOwner.title,
};

/**
 * Leaf node for one `skillCategories` entry. Ids stay `skill-0`… so any `localStorage`
 * overrides that reference them keep working; depth is now L3 under Business / Technology groups.
 */
function skillCategoryLeaf(index: number, position: [number, number, number]): NodeData {
  const category = skillCategories[index];
  return {
    id: `skill-${index}`,
    label: category.title,
    position,
    level: 3,
    subtitle: "Core Strength",
    detailPanel: {
      headingName: category.title,
      technologiesHeadingIcon: "cpu",
      technologyChipIcon: "layers",
      technologies: category.skills,
      sections: [
        { key: "skill_focus", title: "Focus", body: `Focus area in ${category.title}`, headingIcon: "orbit" },
        { key: "skill_capabilities", title: "Capabilities", body: `Capabilities include ${category.skills.join(", ")}.`, headingIcon: "layers" },
        {
          key: "skill_outcome",
          title: "Impact",
          body: "Shipped across $B+ payment volume, enterprise rollouts, and AI-in-finance initiatives — see career and venture nodes for concrete outcomes.",
          headingIcon: "rocket",
        },
      ],
    },
  };
}

const DEFAULT_PORTFOLIO_TREE: NodeData = {
  id: "nexus",
  label: "ORIGIN",
  position: [0, 0, 0],
  level: 0,
  subtitle: portfolioOwner.title,
  image: "/aboutMe.png",
  detailPanel: {
    headingName: "Origin Profile",
    imageAccentIcon: "sparkles",
    technologiesHeadingIcon: "cpu",
    technologyChipIcon: "satellite",
    technologies: [
      "Global payments & checkout",
      "Finance ERP & treasury",
      "API banking / Open Banking",
      "AI agents (ops automation)",
      "SAFe · AWS · APIGEE",
    ],
    sections: [
      { key: "origin_role", title: "Role", body: aboutContent.bullets[0], headingIcon: "orbit" },
      { key: "origin_capability", title: "Capability", body: aboutContent.summary, headingIcon: "layers" },
      {
        key: "origin_links",
        title: "Links",
        body: "Code, profile, and contact — edit labels and URLs in portfolio data as needed.",
        headingIcon: "send",
        buttons: [
          { label: "GitHub", url: "https://github.com/priyanshukumar0309", icon: "github" },
          { label: "LinkedIn", url: "https://linkedin.com/in/kpriyanshu", icon: "linkedin" },
          { label: "Email", url: "mailto:contact@kumarpriyanshu.in", icon: "mail" },
        ],
      },
    ],
  },
  children: [
    {
      id: "product-management",
      label: "Skills",
      position: [0, 2.2, 0],
      level: 1,
      subtitle: "Strategy & Execution",
      // L2 groups consolidate six categories into Business vs Technology; L3 leaves map to `skillCategories` indices.
      children: [
        {
          id: "skill-group-business",
          label: "Business",
          position: [-1.8, 3.5, 0],
          level: 2,
          subtitle: "Product, scale & credentials",
          detailPanel: {
            headingName: "Business skills",
            sections: [
              {
                key: "skill_biz_overview",
                title: "Overview",
                body: "Product leadership, platforms at scale, and formal certifications — expand the nodes for specifics.",
                headingIcon: "layers",
              },
            ],
          },
          children: [
            skillCategoryLeaf(0, [-4.0, 4.6, 0]),
            skillCategoryLeaf(2, [-4.0, 3.5, 0]),
            skillCategoryLeaf(5, [-4.0, 2.4, 0]),
          ],
        },
        {
          id: "skill-group-technology",
          label: "Technology",
          position: [1.8, 3.5, 0],
          level: 2,
          subtitle: "Fintech, stack & AI",
          detailPanel: {
            headingName: "Technology skills",
            sections: [
              {
                key: "skill_tech_overview",
                title: "Overview",
                body: "Domain depth in fintech, engineering-adjacent execution, and AI product patterns.",
                headingIcon: "cpu",
              },
            ],
          },
          children: [
            skillCategoryLeaf(1, [4.0, 4.6, 0]),
            skillCategoryLeaf(3, [4.0, 3.5, 0]),
            skillCategoryLeaf(4, [4.0, 2.4, 0]),
          ],
        },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      position: [2.5, -1.3, 0],
      level: 1,
      subtitle: "Built & Shipped",
      children: [
        {
          id: "projects-platforms",
          label: "Platforms",
          position: [3.9, -0.3, 0],
          level: 2,
          subtitle: "Live Products",
          children: featuredProjects
            .filter((project) => project.id === "finafa-eu" || project.id === "socur")
            .map((project, index) => ({
              id: project.id,
              label: project.title,
              position: [5.2, 0.5 - index * 1.3, 0],
              level: 3,
              // subtitle: "Running Product",
              // period: "Live",
              image: project.image,
              detailPanel: {
                headingName: "Platform Overview",
                imageAccentIcon: "rocket",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: "satellite",
                technologies: project.technologies,
                sections: [
                  { key: "platform_overview", title: "Overview", body: project.description, headingIcon: "orbit" },
                  {
                    key: "platform_execution",
                    title: "Execution",
                    body: `Built using ${project.technologies.join(", ")} with product-led execution.`,
                    headingIcon: "layers",
                  },
                  {
                    key: "platform_links",
                    title: "Links",
                    body: "Product launch / live app — label comes from data.",
                    headingIcon: "externalLink",
                    buttons: [{ label: "Open product", url: project.liveUrl, icon: "rocket" }],
                  },
                ],
              },
            })),
          detailPanel: {
            headingName: "Platforms",
            sections: [{ key: "platforms_category", title: "Category", body: "Live products with active users and customers.", headingIcon: "factory" }],
          },
        },
        {
          id: "projects-prototyping-demos",
          label: "Vibe Coded",
          position: [3.6, -2.2, 0],
          level: 2,
          subtitle: "Demos & Experiments",
          children: featuredProjects
            .filter((project) => project.id === "automobile-loanhub" || project.id === "ai-enabled-automation")
            .map((project, index) => ({
              id: project.id,
              label: project.title,
              position: [5.0, -1.6 - index * 1.5, 0],
              level: 3,
              subtitle: "Prototype",
              // period: "",
              image: project.image,
              detailPanel: {
                headingName: "Demo Overview",
                imageAccentIcon: project.id === "ai-enabled-automation" ? "bot" : "flaskConical",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: project.id === "ai-enabled-automation" ? "bot" : "flaskConical",
                technologies: project.technologies,
                sections: [
                  { key: "demo_overview", title: "Overview", body: project.description, headingIcon: "orbit" },
                  {
                    key: "demo_execution",
                    title: "Execution",
                    body: `Built using ${project.technologies.join(", ")} with product-led execution.`,
                    headingIcon: "layers",
                  },
                  {
                    key: "demo_links",
                    title: "Links",
                    body: "Demo or prototype — label comes from data.",
                    headingIcon: "externalLink",
                    buttons: [{ label: "Open demo", url: project.liveUrl, icon: "flaskConical" }],
                  },
                ],
              },
            })),
          detailPanel: {
            headingName: "Prototyping Demos",
            sections: [{ key: "demos_category", title: "Category", body: "Prototype and demonstration experiences.", headingIcon: "flaskConical" }],
          },
        },
      ],
    },
    {
      id: "career-history",
      label: "History",
      position: [-2.5, -1.3, 0],
      level: 1,
      subtitle: "The Journey",
      children: [
        {
          id: "career-volvo",
          label: "Volvo Cars",
          position: [-3.8, 0.3, 0],
          level: 2,
          subtitle: "Payments, Treasury, ERP",
          period: "2024 – Present",
          detailPanel: {
            headingName: "Career Snapshot",
            imageAccentIcon: "car",
            technologiesHeadingIcon: "car",
            technologyChipIcon: "swatch-book",
            technologies: ["SAP FICO", "Stripe", "Finance ERP", "AI agents", "Treasury", "Automation"],
            sections: [
              {
                key: "career_volvo_role",
                title: "Role",
                body: "Lead PM for payments, cash management, and finance ERP solutions.",
                headingIcon: "orbit",
              },
              {
                key: "career_volvo_capability",
                title: "Scope",
                body: "AI transformation: enterprise-wide AI agent automation for Finance & Operations.\nDiagnosed bottlenecks (manual postings, fragmented integrations) for 100+ global ops staff.\nAutomation-first ops and ROI-driven build vs buy strategy.",
                headingIcon: "layers",
              },
              {
                key: "career_volvo_impact",
                title: "Impact",
                body: "Path to 85% auto-posting/clearing; 20% YoY payment volume growth without added workload.\nScale: 700B+ monthly volume, 320K+ transactions, 200+ accounts, 60+ banks, 40+ countries.\nTreasury: supply-chain financing unlocking 50+ MSEK forex and 100+ MSEK interest / WACC-style gains.",
                headingIcon: "rocket",
              },
            ],
          },
        },
        {
          id: "career-paysafe",
          label: "Paysafe",
          position: [-4.8, -1.2, 0],
          level: 2,
          subtitle: "Product Management",
          period: "2021-2024",
          children: [
            {
              id: "career-paysafe-pm",
              label: "Product Manager",
              position: [-7.3, -2.9, 0],
              level: 3,
              subtitle: "Paysafe",
              period: "2021-2023",
              detailPanel: {
                headingName: "Paysafe Role",
                imageAccentIcon: "wallet",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: "satellite",
                technologies: ["Payments API", "Checkout", "SDK/JS", "APM", "GTM"],
                sections: [
                  {
                    key: "paysafe_pm_role",
                    title: "Role",
                    body: "Product Manager (Jul 2021 – Mar 2023).\nLead for Payments API, Checkout, and SDK/JS — owned latest Checkout from ideation through post-release.",
                    headingIcon: "orbit",
                  },
                  {
                    key: "paysafe_pm_capability",
                    title: "Scope",
                    body: "Transformed legacy services into API-first Checkout and APM products.\nPartnered with enterprise clients and providers across USA, CA, MENA, LATAM, EU.",
                    headingIcon: "layers",
                  },
                  {
                    key: "paysafe_pm_impact",
                    title: "Impact",
                    body: "~200% YoY volume growth; 80 new clients.\n$1.2B TPV in year one and $5B in year two after Checkout GTM.",
                    headingIcon: "rocket",
                  },
                  {
                    key: "paysafe_pm_links",
                    title: "Links",
                    body: "",
                    headingIcon: "building2",
                    buttons: [
                      { label: "Developer portal", url: "https://developer.paysafe.com/en/", icon: "code" },
                    ],
                  },
                ],
              },
            },
            {
              id: "career-paysafe-spm",
              label: "Senior Product Manager",
              position: [-7.2, -0.05, 0],
              level: 3,
              subtitle: "Paysafe",
              period: "2023-2024",
              detailPanel: {
                headingName: "Paysafe Role",
                imageAccentIcon: "wallet",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: "briefcase-business",
                technologies: ["Platform strategy", "Payments API", "Checkout", "APM", "Leadership"],
                sections: [
                  {
                    key: "paysafe_spm_role",
                    title: "Role",
                    body: "Led 3 Product Teams - Payments API, Checkout SDK, and Local Payments Methods",
                    headingIcon: "orbit",
                  },
                  {
                    key: "paysafe_spm_capability",
                    title: "Scope",
                    body: "Directed global strategy to consolidate Checkout, APMs, and Payments API into one enterprise-grade platform.\nExpanded into crypto, iGaming, travel, insurance with unified APIs, flows, and onboarding for Paysafe wallet ecosystem (Skrill, Neteller, PaysafeCard, PaysafeCash).",
                    headingIcon: "layers",
                  },
                  {
                    key: "paysafe_spm_impact",
                    title: "Impact",
                    body: "~$5M annual savings across the group.\n4500+ clients and $25B+ volume across segments.\nGeographic expansion NA, LATAM, MENA via unified integrations and onboarding.",
                    headingIcon: "rocket",
                  },
                ],
              },
            },
          ],
          detailPanel: {
            headingName: "Career Node",
            sections: [
              {
                key: "paysafe_parent_role",
                title: "Role",
                body: "Two progression chapters: As PM led Payments API,  As Senior PM led Checkout, SDK, and LPMs",
                headingIcon: "orbit",
              }
            ],
          },
        },
        {
          id: "career-icici",
          label: "ICICI Bank",
          position: [-4.1, -2.7, 0],
          level: 2,
          subtitle: "Product Manager",
          period: "2019 – 2020",
          detailPanel: {
            headingName: "Career Snapshot",
            imageAccentIcon: "landmark",
            technologiesHeadingIcon: "cpu",
            technologyChipIcon: "satellite",
            technologies: ["API Gateway", "Open Banking", "APIGEE", "VKYC", "UPI"],
            sections: [
              {
                key: "icici_role",
                title: "Role",
                body: "Lead for API Banking and Open Banking.\nHeaded team of 30 developers on API gateway \n Integrations for Internal Banking and Exposing banking solutions to Fintech partners.",
                headingIcon: "orbit",
              },
              {
                key: "icici_capability",
                title: "Scope",
                body: "Streamlined 20+ banking products for fintech integrations.\nLaunched ICICI Bank API Banking portal for client onboarding automation.\nLed Appathon execution — 300+ startups, 1M INR in awards.\nShipped VKYC, EKYC, instant accounts, UPI, and Aadhaar-based flows.",
                headingIcon: "layers",
              },
              {
                key: "icici_impact",
                title: "Impact",
                body: "40M+ transactions/day across integrated products.\nPortal and automation accelerated fintech adoption of core banking APIs.\nNationwide startup engagement at scale via Appathon.",
                headingIcon: "rocket",
              },
              {
                key: "icici_links",
                title: "Links",
                body: "",
                headingIcon: "landmark",
                buttons: [
                  { label: "Developer portal", url: "https://www.icicibank.com/corporate/api-banking/api-connect.page", icon: "code" },
                ],
              },
            ],
          },
        },
        {
          id: "career-iitb",
          label: "IIT Bombay",
          position: [-3.2, -4.0, 0],
          level: 2,
          subtitle: "B.Tech, Civil Engineering",
          period: "2015-2019",
          detailPanel: {
            headingName: "Career Snapshot",
            imageAccentIcon: "graduationCap",
            technologiesHeadingIcon: "book-text",
            technologyChipIcon: "orbit",
            technologies: ["Remote Sensing", "Python", "Research", "Leadership", "Mentorship"],
            sections: [
              {
                key: "iitb_role",
                title: "Role",
                body: "B.Tech, Civil Engineering with focus on Remote Sensing and Image Processing.",
                headingIcon: "orbit",
              },
              {
                key: "iitb_capability",
                title: "Scope",
                body: "Purdue visiting research: hydrological model optimization ~85% faster; GUI for non-technical users.\nISMP mentor for 12 students; institute web and organizational roles.\nGIVE ME TREES NGO: site deployment, integrations, outreach growth.",
                headingIcon: "layers",
              },
              {
                key: "iitb_impact",
                title: "Impact",
                body: "Undergraduate Research Award (top 35 of 4000); \n Exemplary Performer among ISMP mentors; \n multiple institute honors for research, culture, and organizations.\nNGO web work: ~50% YoY outreach, 1000+ hits/month, higher volunteers and donations.",
                headingIcon: "rocket",
              },
            ],
          },
        },
      ],
    },
  ],
};

function loadPortfolioTreeOverride(): NodeData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("portfolioTreeOverride");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("id" in parsed)) return null;
    return parsed as NodeData;
  } catch {
    return null;
  }
}

function stretchNodePositions(node: NodeData): NodeData {
  const levelFactor = node.level >= 3 ? 1.18 : node.level === 2 ? 1.12 : 1;
  const stretched: NodeData = {
    ...node,
    position: [node.position[0] * levelFactor, node.position[1] * levelFactor, node.position[2]],
    children: node.children?.map(stretchNodePositions),
  };
  return stretched;
}

const STRETCHED_DEFAULT_TREE = stretchNodePositions(DEFAULT_PORTFOLIO_TREE);

export const portfolioTree: NodeData = loadPortfolioTreeOverride() ?? STRETCHED_DEFAULT_TREE;
export const defaultPortfolioTree: NodeData = STRETCHED_DEFAULT_TREE;

export const contactLinks = [
  { label: "GitHub", url: "https://github.com/priyanshukumar0309", icon: "github" },
  { label: "LinkedIn", url: "https://linkedin.com/in/kpriyanshu", icon: "linkedin" },
  { label: "Email", url: "mailto:contact@kumarpriyanshu.in", icon: "mail" },
];
