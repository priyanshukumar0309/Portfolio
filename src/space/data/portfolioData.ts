import { featuredProjects, journeyItems, portfolioOwner, skillCategories } from "@/data/portfolioContent";
import type { NodeData } from "@/space/data/types";

const projectNodes: NodeData[] = featuredProjects.map((project, index) => ({
  id: project.id,
  label: project.title,
  position: [3.6 + index * 0.8, index === 0 ? 0.2 : -1.3, 0],
  level: 2,
  period: "Featured",
  subtitle: project.description,
  attributes: {
    problem: `Problem scope: ${project.description}`,
    solution: `Built and shipped via ${project.technologies.join(", ")} with user-facing product execution.`,
    impact: `Live at ${project.liveUrl}`,
    technologies: project.technologies,
  },
}));

const careerNodes: NodeData[] = journeyItems.map((item, index) => ({
  id: `${item.company.toLowerCase().replace(/\s+/g, "-")}-${index}`,
  label: item.company,
  position: [-3.8 - index * 0.5, 0.3 - index * 0.9, 0],
  level: 2,
  period: item.period,
  subtitle: item.role,
  attributes: {
    problem: item.highlight,
    solution: item.bullets[0],
    impact: item.bullets[1] ?? item.bullets[0],
    technologies: ["Product Strategy", "Execution", "Stakeholder Alignment"],
  },
}));

export const PORTFOLIO_OWNER = {
  name: portfolioOwner.name,
  title: portfolioOwner.title,
};

export const portfolioTree: NodeData = {
  id: "nexus",
  label: "ORIGIN",
  position: [0, 0, 0],
  level: 0,
  children: [
    {
      id: "product-management",
      label: "Product Management",
      position: [0, 2.2, 0],
      level: 1,
      subtitle: "Strategy & Execution",
      children: skillCategories.slice(0, 2).map((category, index) => ({
        id: `skill-${category.title.toLowerCase().replace(/\s+/g, "-")}`,
        label: category.title,
        position: [-1.6 + index * 3.2, 3.6, 0],
        level: 2,
        subtitle: "Core Strength",
        attributes: {
          problem: `Focus area in ${category.title}`,
          solution: `Capabilities include: ${category.skills.slice(0, 3).join(", ")}`,
          impact: `Applied across shipping products and decision-making.`,
          technologies: category.skills,
        },
      })),
    },
    {
      id: "projects",
      label: "Projects",
      position: [2.5, -1.3, 0],
      level: 1,
      subtitle: "Built & Shipped",
      children: projectNodes,
    },
    {
      id: "career-history",
      label: "Career History",
      position: [-2.5, -1.3, 0],
      level: 1,
      subtitle: "The Journey",
      children: careerNodes,
    },
  ],
};

export const contactLinks = [
  { label: "GitHub", url: "https://github.com/priyanshukumar0309", icon: "github" },
  { label: "LinkedIn", url: "https://linkedin.com/in/kpriyanshu", icon: "linkedin" },
  { label: "Email", url: "mailto:contact@kumarpriyanshu.in", icon: "mail" },
];
