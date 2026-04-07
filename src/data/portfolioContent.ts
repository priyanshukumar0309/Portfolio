export interface JourneyItem {
  company: string;
  role: string;
  period: string;
  highlight: string;
  bullets: string[];
  referenceLabel?: string;
  referenceUrl?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const portfolioOwner = {
  name: "Kumar Priyanshu",
  title: "Product Manager",
  heroTitle: "Fintech & Automotive Innovations",
  heroSubtitle: "Bridging the gap between technology and mobility solutions",
};

export const aboutContent = {
  bullets: [
    "Product Manager with expertise in fintech and automotive technologies",
    "Passionate about revolutionizing mobility through financial technology",
    "Experienced in leading cross-functional teams with data-driven execution",
  ],
  summary:
    "I specialize in bridging the gap between automotive innovation and financial technology, creating solutions that make vehicle ownership and mobility more accessible and efficient.",
};

export const journeyItems: JourneyItem[] = [
  {
    company: "Volvo Cars",
    role: "Product Manager",
    period: "2024-Present",
    highlight: "Lead new payment strategies with non-SAP experience",
    bullets: [
      "Digital payments across 40 countries, supplier payments and retailer collections",
      "SAP FICO and Stripe integrations for 150+ regional offices",
    ],
  },
  {
    company: "Paysafe",
    role: "Senior Product Manager",
    period: "2023-2024",
    highlight: "Promoted from execution ownership to global product strategy",
    bullets: [
      "Led strategy for APMs, APIs and Checkout across crypto, iGaming and travel",
      "Scaled solutions supporting 4500+ clients and $20B+ annual volume",
    ],
  },
  {
    company: "Paysafe",
    role: "Product Manager",
    period: "2021-2023",
    highlight: "Built API-first payment products and GTM execution",
    bullets: [
      "Owned Payments API GTM, APM integrations and checkout development",
      "Expanded payment services into scalable API-based global solutions",
    ],
  },
  {
    company: "ICICI Bank",
    role: "Product Manager",
    period: "2019-2021",
    highlight: "Started as analyst and shipped platform-level fintech solutions",
    bullets: [
      "Built API Gateway integrations for 20+ products with 40M+ daily transactions",
      "Managed VKYC, UPI and API portal architecture using APIGEE and Layer 7",
    ],
  },
  {
    company: "IIT Bombay",
    role: "B.Tech, Civil Engineering",
    period: "2015-2019",
    highlight: "Built a strong analytical and engineering foundation.",
    bullets: [
      "Specialized in Remote Sensing and Image Processing.",
      "Completed undergraduate research and leadership responsibilities.",
    ],
    referenceLabel: "Home Reference",
    referenceUrl: "https://www.iitb.ac.in/",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Product Management",
    skills: ["Agile/Scrum", "Product Strategy", "User Research", "Data Analytics", "Roadmapping"],
  },
  {
    title: "Fintech",
    skills: ["Payment Systems", "Financial Analysis", "Risk Management", "Banking APIs", "Blockchain"],
  },
  {
    title: "Automotive",
    skills: ["Fleet Management", "Telematics", "Vehicle Diagnostics", "Connected Car", "EV Technology"],
  },
  {
    title: "Technical",
    skills: ["SQL", "Python", "API Integration", "Data Visualization", "Cloud Platforms"],
  },
  {
    title: "AI",
    skills: ["AI Agents", "Workflow Automation", "Prompt Design", "LLM Integrations", "RAG Basics"],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "finafa-eu",
    title: "Finafa.eu",
    description:
      "Founder of an end-to-end SMB finance management platform with accounting, invoicing, expense tracking and analytics.",
    image: "/Fino.webp",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    liveUrl: "https://finafa.eu",
  },
  {
    id: "automobile-loanhub",
    title: "Automobile LoanHub",
    description:
      "A platform that simplifies car financing by helping users compare and choose the best leasing and loan options.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native", "Node.js", "PostgreSQL"],
    liveUrl: "https://loanhub.kumarpriyanshu.in/",
  },
  {
    id: "ai-enabled-automation",
    title: "AI-Enabled Automation",
    description:
      "Interactive AI assistant demo for global accounting workflows and decision support.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    technologies: ["AI Agent", "Automation", "Finance Ops"],
    liveUrl: "https://ai-agent-mock.kumarpriyanshu.in/",
  },
  {
    id: "socur",
    title: "Socur",
    description: "Sovereign Curiosity initiative focused on curated knowledge experiences.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Content Platform", "Knowledge Design", "Product Strategy"],
    liveUrl: "https://socur.finafa.eu/",
  },
];
