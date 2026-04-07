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
    technologies: ["Product Strategy", "Fintech", "Automotive", "APIs"],
  },
  detailPanel: {
    headingName: "Origin Profile",
    sections: [
      { heading: "Role", content: aboutContent.bullets[0] },
      { heading: "Capability", content: aboutContent.summary },
      {
        heading: "References",
        content: "Explore portfolio references and profiles.",
        buttons: [
          { label: "GitHub", url: "https://github.com/priyanshukumar0309" },
          { label: "LinkedIn", url: "https://linkedin.com/in/kpriyanshu" },
          { label: "Email", url: "mailto:contact@kumarpriyanshu.in" },
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
          sections: [
            { heading: "Focus", content: `Focus area in ${category.title}` },
            { heading: "Capabilities", content: `Capabilities include ${category.skills.join(", ")}.` },
            { heading: "Outcome", content: "Applied across shipping products and decisions." },
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
              position: [5.2, -0.9 - index * 1.3, 0],
              level: 3,
              subtitle: "Running Product",
              period: "Live",
              image: project.image,
              attributes: {
                problem: project.description,
                solution: `Built using ${project.technologies.join(", ")} with product-led execution.`,
                impact: `Available at ${project.liveUrl}`,
                technologies: project.technologies,
              },
              detailPanel: {
                headingName: "Platform Overview",
                sections: [
                  { heading: "Overview", content: project.description },
                  { heading: "Execution", content: `Built using ${project.technologies.join(", ")} with product-led execution.` },
                  {
                    heading: "References",
                    content: "Use the product link to open the live platform.",
                    buttons: [{ label: "Open Platform", url: project.liveUrl }],
                  },
                ],
              },
            })),
          detailPanel: {
            headingName: "Platforms",
            sections: [
              { heading: "Category", content: "Live products with active users and customers." },
            ],
          },
        },
        {
          id: "projects-prototyping-demos",
          label: "Prototyping Demos",
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
              subtitle: "Demo",
              period: "Prototype",
              image: project.image,
              attributes: {
                problem: project.description,
                solution: `Built using ${project.technologies.join(", ")} with product-led execution.`,
                impact: `Available at ${project.liveUrl}`,
                technologies: project.technologies,
              },
              detailPanel: {
                headingName: "Demo Overview",
                sections: [
                  { heading: "Overview", content: project.description },
                  { heading: "Execution", content: `Built using ${project.technologies.join(", ")} with product-led execution.` },
                  {
                    heading: "References",
                    content: "Use the demo link to open the experience.",
                    buttons: [{ label: "Open Demo", url: project.liveUrl }],
                  },
                ],
              },
            })),
          detailPanel: {
            headingName: "Prototyping Demos",
            sections: [
              { heading: "Category", content: "Prototype and demonstration experiences." },
            ],
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
          subtitle: "Product Manager",
          period: "2024-Present",
          attributes: {
            problem: "Lead new payment strategies with non-SAP experience",
            solution: "Digital payments across 40 countries, supplier payments and retailer collections",
            impact: "SAP FICO and Stripe integrations for 150+ regional offices",
            technologies: ["Product Management", "Execution", "Leadership"],
          },
          detailPanel: {
            headingName: "Career Snapshot",
            sections: [
              { heading: "Role", content: "Product Manager" },
              { heading: "Capability", content: "Digital payments across 40 countries, supplier payments and retailer collections" },
              { heading: "Impact", content: "SAP FICO and Stripe integrations for 150+ regional offices" },
              { heading: "References", content: "Explore organization references.", buttons: [{ label: "Home Reference", url: "https://www.volvocars.com/" }] },
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
                problem: "Built API-first payment products and GTM execution",
                solution: "Owned Payments API GTM, APM integrations and checkout development",
                impact: "Expanded payment services into scalable API-based global solutions",
                technologies: ["Product Management", "Execution", "Leadership"],
              },
              detailPanel: {
                headingName: "Paysafe Role",
                sections: [
                  { heading: "Role", content: "Product Manager" },
                  { heading: "Capability", content: "Owned Payments API GTM, APM integrations and checkout development" },
                  { heading: "Impact", content: "Expanded payment services into scalable API-based global solutions" },
                  { heading: "References", content: "Explore organization references.", buttons: [{ label: "Home Reference", url: "https://www.paysafe.com/" }] },
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
                problem: "Promoted from execution ownership to global product strategy",
                solution: "Led strategy for APMs, APIs and Checkout across crypto, iGaming and travel",
                impact: "Scaled solutions supporting 4500+ clients and $20B+ annual volume",
                technologies: ["Product Management", "Execution", "Leadership"],
              },
              detailPanel: {
                headingName: "Paysafe Role",
                sections: [
                  { heading: "Role", content: "Senior Product Manager" },
                  { heading: "Capability", content: "Led strategy for APMs, APIs and Checkout across crypto, iGaming and travel" },
                  { heading: "Impact", content: "Scaled solutions supporting 4500+ clients and $20B+ annual volume" },
                  { heading: "References", content: "Explore organization references.", buttons: [{ label: "Home Reference", url: "https://www.paysafe.com/" }] },
                ],
              },
            },
          ],
          detailPanel: {
            headingName: "Career Node",
            sections: [
              { heading: "Role", content: "Paysafe career journey with two role tracks." },
              { heading: "Capability", content: "Select a child node to see role-specific details." },
            ],
          },
        },
        {
          id: "career-icici",
          label: "ICICI Bank",
          position: [-4.1, -2.7, 0],
          level: 2,
          subtitle: "Product Manager",
          period: "2019-2021",
          attributes: {
            problem: "Started as analyst and shipped platform-level fintech solutions",
            solution: "Built API Gateway integrations for 20+ products with 40M+ daily transactions",
            impact: "Managed VKYC, UPI and API portal architecture using APIGEE and Layer 7",
            technologies: ["Product Management", "Execution", "Leadership"],
          },
          detailPanel: {
            headingName: "Career Snapshot",
            sections: [
              { heading: "Role", content: "Product Manager" },
              { heading: "Capability", content: "Built API Gateway integrations for 20+ products with 40M+ daily transactions" },
              { heading: "Impact", content: "Managed VKYC, UPI and API portal architecture using APIGEE and Layer 7" },
              { heading: "References", content: "Explore organization references.", buttons: [{ label: "Home Reference", url: "https://www.icicibank.com/" }] },
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
            problem: "Built a strong analytical and engineering foundation.",
            solution: "Specialized in Remote Sensing and Image Processing.",
            impact: "Completed undergraduate research and leadership responsibilities.",
            technologies: ["Product Management", "Execution", "Leadership"],
          },
          detailPanel: {
            headingName: "Career Snapshot",
            sections: [
              { heading: "Role", content: "B.Tech, Civil Engineering" },
              { heading: "Capability", content: "Specialized in Remote Sensing and Image Processing." },
              { heading: "Impact", content: "Completed undergraduate research and leadership responsibilities." },
              { heading: "References", content: "Explore organization references.", buttons: [{ label: "Home Reference", url: "https://www.iitb.ac.in/" }] },
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
