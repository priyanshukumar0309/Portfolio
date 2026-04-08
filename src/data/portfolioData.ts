import type { NodeData } from "@/data/types";
import { aboutContent, featuredProjects, portfolioOwner, skillCategories } from "@/data/portfolioContent";

export const PORTFOLIO_OWNER = {
  name: portfolioOwner.name,
  title: portfolioOwner.title,
};

const DEFAULT_PORTFOLIO_TREE: NodeData = {
  id: "nexus",
  label: "ORIGIN",
  position: [0, 0, 0],
  level: 0,
  subtitle: portfolioOwner.title,
  image: "/aboutMe.png",
  attributes: {
    problem: aboutContent.bullets[0],
    solution: aboutContent.summary,
    impact: "Portfolio links: https://github.com/priyanshukumar0309 | https://linkedin.com/in/kpriyanshu",
    technologies: [
      "Global payments & checkout",
      "Finance ERP & treasury",
      "API banking / Open Banking",
      "AI agents (ops automation)",
      "SAFe · AWS · APIGEE",
    ],
  },
  detailPanel: {
    headingName: "Origin Profile",
    imageAccentIcon: "sparkles",
    technologiesHeadingIcon: "cpu",
    technologyChipIcon: "satellite",
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
      label: "Skills & Expertise",
      position: [0, 2.2, 0],
      level: 1,
      subtitle: "Strategy & Execution",
      children: skillCategories.map((category, index) => ({
        id: `skill-${index}`,
        label: category.title,
        position: [-3 + index * 1.5, 3.6, 0],
        level: 2,
        subtitle: "Core Strength",
        attributes: {
          problem: `Focus area in ${category.title}`,
          solution: `Capabilities include ${category.skills.join(", ")}.`,
          impact: "Applied across shipping products and decisions.",
          technologies: category.skills,
        },
        detailPanel: {
          headingName: category.title,
          technologiesHeadingIcon: "cpu",
          technologyChipIcon: "layers",
          sections: [
            { key: "skill_focus", title: "Focus", body: `Focus area in ${category.title}`, headingIcon: "orbit" },
            { key: "skill_capabilities", title: "Capabilities", body: `Capabilities include ${category.skills.join(", ")}.`, headingIcon: "layers" },
            {
              key: "skill_outcome",
              title: "Impact",
              body: "Shipped across **$B+ payment volume**, **enterprise** rollouts, and **AI-in-finance** initiatives — see career and venture nodes for concrete outcomes.",
              headingIcon: "rocket",
            },
          ],
        },
      })),
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
              attributes: {
                problem: project.description,
                solution: `Built using ${project.technologies.join(", ")} with product-led execution.`,
                impact: `Available at ${project.liveUrl}`,
                technologies: project.technologies,
              },
              detailPanel: {
                headingName: "Platform Overview",
                imageAccentIcon: "rocket",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: "satellite",
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
              attributes: {
                problem: project.description,
                solution: `Built using ${project.technologies.join(", ")} with product-led execution.`,
                impact: `Available at ${project.liveUrl}`,
                technologies: project.technologies,
              },
              detailPanel: {
                headingName: "Demo Overview",
                imageAccentIcon: project.id === "ai-enabled-automation" ? "bot" : "flaskConical",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: project.id === "ai-enabled-automation" ? "bot" : "flaskConical",
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
      label: "Career History",
      position: [-2.5, -1.3, 0],
      level: 1,
      subtitle: "The Journey",
      children: [
        {
          id: "career-volvo",
          label: "Volvo Cars",
          position: [-3.8, 0.3, 0],
          level: 2,
          subtitle: "Digital Payments & Cash / ERP",
          period: "Jun 2024 – Present",
          attributes: {
            problem: "Lead PM for payments, in-house cash, and finance ERP; enterprise AI automation for Finance & Ops.",
            solution: "Automation-first strategy; Stripe vs SAP build vs buy; bottlenecks across 100+ global ops staff.",
            impact: "85% auto-posting/clearing target; 20% YoY volume growth without headcount add; 700B+ monthly volume, 320K+ txs, 200+ accounts, 60+ banks, 40+ countries; Treasury partnership gains.",
            technologies: ["SAP FICO", "Stripe", "Finance ERP", "AI agents", "Treasury", "Automation"],
          },
          detailPanel: {
            headingName: "Career Snapshot",
            imageAccentIcon: "car",
            technologiesHeadingIcon: "cpu",
            technologyChipIcon: "orbit",
            sections: [
              {
                key: "career_volvo_role",
                title: "Role",
                body: "Product Manager — **Digital Payments & In-House Cash Management** (Jun 2024 – Present).\nLead PM for **payments**, **cash management**, and **finance ERP** solutions.",
                headingIcon: "orbit",
              },
              {
                key: "career_volvo_capability",
                title: "Scope",
                body: "**AI transformation:** enterprise-wide **AI agent** automation for Finance & Operations.\nDiagnosed bottlenecks (manual postings, fragmented integrations) for **100+** global ops staff.\n**Automation-first** ops and **ROI-driven** Stripe vs SAP **build vs buy**.",
                headingIcon: "layers",
              },
              {
                key: "career_volvo_impact",
                title: "Impact",
                body: "Path to **85%** auto-posting/clearing; **20% YoY** payment volume growth **without** added workload.\nScale: **700B+** monthly volume, **320K+** transactions, **200+** accounts, **60+** banks, **40+** countries.\nTreasury: supply-chain financing unlocking **50+ MSEK** forex and **100+ MSEK** interest / WACC-style gains.",
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
              position: [-7.2, -0.05, 0],
              level: 3,
              subtitle: "Paysafe",
              period: "2021-2023",
              attributes: {
                problem: "Lead for Payments API, Checkout, SDK/JS — new Checkout from ideation through post-launch.",
                solution: "API-first Checkout and APMs; enterprise clients across USA, CA, MENA, LATAM, EU.",
                impact: "~200% YoY volume; 80 new clients; $1.2B TPV Y1 and $5B Y2 after Checkout GTM.",
                technologies: ["Payments API", "Checkout", "SDK/JS", "APM", "GTM"],
              },
              detailPanel: {
                headingName: "Paysafe Role",
                imageAccentIcon: "wallet",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: "satellite",
                sections: [
                  {
                    key: "paysafe_pm_role",
                    title: "Role",
                    body: "Product Manager (**Jul 2021 – Mar 2023**).\nLead for **Payments API**, **Checkout**, and **SDK/JS** — owned latest **Checkout** from ideation through post-release.",
                    headingIcon: "orbit",
                  },
                  {
                    key: "paysafe_pm_capability",
                    title: "Scope",
                    body: "Transformed legacy services into **API-first** Checkout and APM products.\nPartnered with **enterprise** clients and providers across **USA, CA, MENA, LATAM, EU**.",
                    headingIcon: "layers",
                  },
                  {
                    key: "paysafe_pm_impact",
                    title: "Impact",
                    body: "**~200% YoY** volume growth; **80** new clients.\n**$1.2B** TPV in year one and **$5B** in year two after Checkout GTM.",
                    headingIcon: "rocket",
                  },
                  {
                    key: "paysafe_pm_links",
                    title: "Links",
                    body: "Corporate site and **developer portal** (only role nodes that expose dev docs).",
                    headingIcon: "building2",
                    buttons: [
                      { label: "Product & corporate", url: "https://www.paysafe.com/", icon: "wallet" },
                      { label: "Developer portal", url: "https://developer.paysafe.com/en/", icon: "code" },
                    ],
                  },
                ],
              },
            },
            {
              id: "career-paysafe-spm",
              label: "Senior Product Manager",
              position: [-7.3, -2.9, 0],
              level: 3,
              subtitle: "Paysafe",
              period: "2023-2024",
              attributes: {
                problem: "Led team of 3 PMs for Payments API, Checkout, SDK, and APMs.",
                solution: "Single enterprise-grade platform across Checkout, APMs, and Payments API; crypto, iGaming, travel, insurance.",
                impact: "~$5M annual savings; 4500+ clients; $25B+ volume; expansion NA, LATAM, MENA.",
                technologies: ["Platform strategy", "Payments API", "Checkout", "APM", "Leadership"],
              },
              detailPanel: {
                headingName: "Paysafe Role",
                imageAccentIcon: "wallet",
                technologiesHeadingIcon: "cpu",
                technologyChipIcon: "satellite",
                sections: [
                  {
                    key: "paysafe_spm_role",
                    title: "Role",
                    body: "Senior Product Manager (**Mar 2023 – Jun 2024**).\nLed **3** Product Managers for **Payments API**, **Checkout**, **SDK**, and **Alternative Payments**.",
                    headingIcon: "orbit",
                  },
                  {
                    key: "paysafe_spm_capability",
                    title: "Scope",
                    body: "Directed **global strategy** to consolidate Checkout, APMs, and Payments API into one **enterprise-grade** platform.\nExpanded into **crypto, iGaming, travel, insurance** with unified APIs, flows, and onboarding for Paysafe wallet ecosystem (**Skrill, Neteller, PaysafeCard, PaysafeCash**).",
                    headingIcon: "layers",
                  },
                  {
                    key: "paysafe_spm_impact",
                    title: "Impact",
                    body: "**~$5M** annual savings across the group.\n**4500+** clients and **$25B+** volume across segments.\nGeographic expansion **NA, LATAM, MENA** via unified integrations and onboarding.",
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
                body: "**Paysafe Group** — two progression chapters: **Checkout / API** execution, then **platform-wide** senior leadership.",
                headingIcon: "orbit",
              },
              {
                key: "paysafe_parent_capability",
                title: "Impact lens",
                body: "Open **PM** or **Senior PM** child nodes for **volume**, **savings**, and **geographic** expansion detail.",
                headingIcon: "layers",
              },
            ],
          },
        },
        {
          id: "career-icici",
          label: "ICICI Bank",
          position: [-4.1, -2.7, 0],
          level: 2,
          subtitle: "Product Manager",
          period: "Jul 2019 – Aug 2020",
          attributes: {
            problem: "Headed 30-developer API gateway for API Banking and Open Banking.",
            solution: "20+ banking products for fintech integrations; API Banking portal; Appathon; VKYC, UPI, EKYC.",
            impact: "40M+ transactions/day; 300+ startups in Appathon; 1M INR in prizes.",
            technologies: ["API Gateway", "Open Banking", "APIGEE", "VKYC", "UPI"],
          },
          detailPanel: {
            headingName: "Career Snapshot",
            imageAccentIcon: "landmark",
            technologiesHeadingIcon: "cpu",
            technologyChipIcon: "satellite",
            sections: [
              {
                key: "icici_role",
                title: "Role",
                body: "Product Manager (**Jul 2019 – Aug 2020**).\nHeaded team of **30** developers on **API gateway** for **API Banking** and **Open Banking**.",
                headingIcon: "orbit",
              },
              {
                key: "icici_capability",
                title: "Scope",
                body: "Streamlined **20+** banking products for fintech integrations.\nLaunched **ICICI Bank API Banking portal** for client onboarding automation.\nLed **Appathon** execution — **300+** startups, **1M INR** in awards.\nShipped **VKYC, EKYC, instant accounts, UPI**, and Aadhaar-based flows.",
                headingIcon: "layers",
              },
              {
                key: "icici_impact",
                title: "Impact",
                body: "**40M+** transactions/day across integrated products.\nPortal and automation **accelerated** fintech adoption of core banking APIs.\nNationwide **startup** engagement at scale via Appathon.",
                headingIcon: "rocket",
              },
              {
                key: "icici_links",
                title: "Links",
                body: "Corporate site and **API Banking developer** entry points.",
                headingIcon: "landmark",
                buttons: [
                  { label: "Corporate & products", url: "https://www.icicibank.com/", icon: "landmark" },
                  { label: "API Banking developer portal", url: "https://www.icicibank.com/corporate/api-banking/api-connect.page", icon: "code" },
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
          attributes: {
            problem: "B.Tech Civil Engineering; remote sensing & image processing; research and institute leadership.",
            solution: "Purdue research (hydrology optimization); ISMP mentorship; web & org roles.",
            impact: "85% faster simulations; institute awards; measurable NGO outreach uplift.",
            technologies: ["Remote Sensing", "Python", "Research", "Leadership", "Mentorship"],
          },
          detailPanel: {
            headingName: "Career Snapshot",
            imageAccentIcon: "graduationCap",
            technologiesHeadingIcon: "book-text",
            technologyChipIcon: "orbit",
            sections: [
              {
                key: "iitb_role",
                title: "Role",
                body: "**B.Tech, Civil Engineering** with focus on **Remote Sensing** and **Image Processing**.",
                headingIcon: "orbit",
              },
              {
                key: "iitb_capability",
                title: "Scope",
                body: "**Purdue** visiting research: hydrological model optimization **~85%** faster; GUI for non-technical users.\n**ISMP** mentor for **12** students; institute web and organizational roles.\n**GIVE ME TREES** NGO: site deployment, integrations, outreach growth.",
                headingIcon: "layers",
              },
              {
                key: "iitb_impact",
                title: "Impact",
                body: "**Undergraduate Research Award** (top **35** of **4000**); **Exemplary Performer** among ISMP mentors; multiple institute honors for research, culture, and organizations.\nNGO web work: **~50% YoY** outreach, **1000+** hits/month, higher volunteers and donations.",
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
