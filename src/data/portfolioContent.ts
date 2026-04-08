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
  title: "Product Manager & Strategist",
  heroTitle: "Global Payments & ERP Platforms",
  heroSubtitle:
    "8+ years building and scaling payments, checkout, and finance systems — with a curiosity lens at the intersection of sociology, digital anthropology, and futurism.",
};

export const aboutContent = {
  bullets: [
    "Product Manager and strategist with **8+ years** scaling **global payments**, **checkout**, and **finance / ERP** platforms.",
    "Payments taught discipline and resilience in complex systems; socio-technical curiosity drives **future-ready**, **culturally adaptive** product design.",
    "Proven systems expertise plus **AI transformation** in finance ops — automation-first, ROI-led **build vs buy**, and enterprise-grade delivery.",
  ],
  summary:
    "I bring both: hands-on ownership of payments APIs, checkout, treasury integrations, and ERP-adjacent finance products, and a lens on how people and institutions adopt technology — so solutions stay **technically robust** and **humanly sensible**.",
};

export const journeyItems: JourneyItem[] = [
  {
    company: "Volvo Cars",
    role: "Product Manager — Digital Payments & In-House Cash Management",
    period: "Jun 2024 – Present",
    highlight:
      "Lead PM for payments, cash management, and finance ERP; enterprise **AI agent** automation for Finance & Ops with targeted **cost savings**.",
    bullets: [
      "Automation-first ops targeting **85%** auto-posting/clearing; **20% YoY** volume growth without added headcount (**700B+** monthly volume, **320K+** transactions, **200+** accounts, **60+** banks, **40+** countries).",
      "Treasury partnership: **50+ MSEK** forex and **100+ MSEK** interest/WACC-style gains; Stripe vs SAP **build vs buy** strategy.",
    ],
  },
  {
    company: "Paysafe Group",
    role: "Senior Product Manager",
    period: "Mar 2023 – Jun 2024",
    highlight: "Led **3** PMs across Payments API, Checkout, SDK, and APMs; single enterprise-grade platform vision.",
    bullets: [
      "Global consolidation of Checkout, APMs, and Payments API — **~$5M** annual savings; **4500+** clients and **$25B+** volume across segments (crypto, iGaming, travel, insurance).",
      "Geographic expansion **NA, LATAM, MENA**; unified APIs, flows, and onboarding for Skrill, Neteller, PaysafeCard, PaysafeCash.",
    ],
  },
  {
    company: "Paysafe Group",
    role: "Product Manager",
    period: "Jul 2021 – Mar 2023",
    highlight: "Lead for Payments API, Checkout, and SDK/JS — new Checkout from ideation through post-launch.",
    bullets: [
      "**~200% YoY** volume growth; **80** new clients; **$1.2B** TPV in Y1 and **$5B** in Y2 after Checkout GTM.",
      "Legacy services rebuilt as **API-first** Checkout and APM products; enterprise solutioning across **USA, CA, MENA, LATAM, EU**.",
    ],
  },
  {
    company: "Wipro Ltd",
    role: "Product Management Consultant",
    period: "Jan 2021 – Jul 2021",
    highlight: "API digital banking and payments; **50+** developers and **5** leads; **450+** services migrated cloud-side.",
    bullets: [
      "Inter- and intra-bank API integrations and product mapping at scale.",
      "Live traffic migration for **3000+** clients from legacy to cloud infrastructure.",
    ],
  },
  {
    company: "ICICI Bank",
    role: "Product Manager",
    period: "Jul 2019 – Aug 2020",
    highlight: "Headed **30**-developer API gateway for API Banking and Open Banking.",
    bullets: [
      "**20+** banking products streamlined for fintech integrations; **40M+** transactions/day across products.",
      "Launched **API Banking portal** for onboarding automation; **ICICI Appathon** — **300+** startups, **1M INR** in awards; VKYC, UPI, EKYC, instant accounts.",
    ],
  },
  {
    company: "IIT Bombay",
    role: "B.Tech, Civil Engineering",
    period: "2015-2019",
    highlight: "Remote sensing & image processing; research, mentorship, and institute leadership.",
    bullets: [
      "Purdue visiting research: hydrological model optimization **~85%** faster; GUI for non-technical users.",
      "ISMP mentor (**12** students); multiple institute awards including **Exemplary Performer** and **Undergraduate Research Award**.",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Product Management",
    skills: [
      "SAFe 6 PO/PM",
      "Enterprise payments strategy",
      "GTM & checkout launches",
      "Roadmapping & prioritization",
      "Cross-functional leadership",
    ],
  },
  {
    title: "Fintech",
    skills: [
      "Payments API & Checkout",
      "Treasury & cash management",
      "Open Banking / API banking",
      "APIGEE & API gateways",
      "Risk-aware scaling ($B+ volume)",
    ],
  },
  {
    title: "Platforms & scale",
    skills: [
      "ERP-adjacent finance products",
      "Cloud migration at scale",
      "Merchant & bank integrations",
      "Global rollout (40+ countries)",
      "Wallet & APM ecosystems",
    ],
  },
  {
    title: "Technical",
    skills: ["SQL & data", "Python", "AWS", "API design & security", "APIGEE specialization"],
  },
  {
    title: "AI",
    skills: [
      "Finance & ops AI agents",
      "Workflow automation",
      "LLM-assisted products",
      "Prompt & evaluation design",
      "RAG basics",
    ],
  },
  {
    title: "Certifications",
    skills: [
      "SAFe 6 PO/PM",
      "AWS Cloud",
      "APIGEE API design",
      "IBM Databases & SQL",
      "API Security Fundamentals",
      "Data Science Boot Camp",
    ],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "finafa-eu",
    title: "Finafa AI",
    description:
      "Founder — **Finafa.eu** (Sep 2025–present). AI-assisted accounting MVP for SMEs: automated ledger entries and reconciliation. Core logic for **AI-driven categorization**, cutting manual accounting effort by an estimated **60%**.",
    image: "/Fino.webp",
    technologies: ["AI accounting", "SME finance", "Ledger automation", "Product zero-to-one"],
    liveUrl: "https://finafa.eu",
  },
  {
    id: "automobile-loanhub",
    title: "Automobile LoanHub",
    description:
      "A platform that simplifies car financing by helping users compare and choose the best leasing and loan options.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native", "Node.js", "PostgreSQL"],
    liveUrl: "https://loanhub.kumarpriyanshu.in/",
  },
  {
    id: "ai-enabled-automation",
    title: "AI-Enabled Automation",
    description:
      "Interactive AI assistant demo for global accounting workflows and decision support.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    technologies: ["AI Agent", "Automation", "Finance Ops"],
    liveUrl: "https://ai-agent-mock.kumarpriyanshu.in/",
  },
  {
    id: "socur",
    title: "Sovereign Curiosity (Socur)",
    description:
      "Founder — **Socur.finafa.eu** (Jan 2026–present). Digital platform at the intersection of **AI and sociology**: explore topics and map knowledge graphs. Beta: AI-enabled synthesis of interests with text/image nudges.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Knowledge graphs", "AI synthesis", "Sociology × product", "Beta platform"],
    liveUrl: "https://socur.finafa.eu/",
  },
];
