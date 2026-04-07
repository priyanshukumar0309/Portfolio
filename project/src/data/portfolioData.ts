import type { NodeData } from './types';

export const PORTFOLIO_OWNER = {
  name: 'Kumar Priyanshu',
  title: 'Product Manager',
};

export const portfolioTree: NodeData = {
  id: 'nexus',
  label: 'ORIGIN',
  position: [0, 0, 0],
  level: 0,
  children: [
    {
      id: 'product-management',
      label: 'Product Management',
      position: [0, 2.2, 0],
      level: 1,
      subtitle: 'Strategy & Execution',
      children: [
        {
          id: 'fintech-strategy',
          label: 'Fintech Strategy',
          position: [-1.6, 3.6, 0],
          level: 2,
          subtitle: 'API-First Payments',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['API-First', 'Global Payments', 'Compliance'],
          },
        },
        {
          id: 'automotive-tech',
          label: 'Automotive Tech',
          position: [1.6, 3.6, 0],
          level: 2,
          subtitle: 'Mobility & Fleet',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['Fleet Management', 'SAP Integration', 'EV Mobility'],
          },
        },
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      position: [2.5, -1.3, 0],
      level: 1,
      subtitle: 'Built & Shipped',
      children: [
        {
          id: 'volvo-stripe',
          label: 'Volvo Stripe Integration',
          position: [3.8, 0.3, 0],
          level: 2,
          period: '2024',
          subtitle: '40 Countries Payment Infrastructure',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['Stripe', 'SAP FICO', 'Global Payments', 'Scalability'],
          },
        },
        {
          id: 'icici-api-gateway',
          label: 'ICICI API Gateway',
          position: [4.4, -1.3, 0],
          level: 2,
          period: '2019-2021',
          subtitle: '40M+ Daily Transactions',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['APIGEE', 'Layer 7', 'REST APIs', 'Security'],
          },
        },
        {
          id: 'paysafe-checkout',
          label: 'Paysafe Checkout',
          position: [3.5, -2.6, 0],
          level: 2,
          period: '2021-2024',
          subtitle: '$20B+ Annual Volume',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['APMs', 'Crypto', 'iGaming', 'Developer APIs'],
          },
        },
      ],
    },
    {
      id: 'career-history',
      label: 'Career History',
      position: [-2.5, -1.3, 0],
      level: 1,
      subtitle: 'The Journey',
      children: [
        {
          id: 'volvo-cars',
          label: 'Volvo Cars',
          position: [-3.8, 0.3, 0],
          level: 2,
          period: '2024 - Present',
          subtitle: 'Product Manager',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['SAP FICO', 'Stripe', 'Digital Payments'],
          },
        },
        {
          id: 'paysafe-senior',
          label: 'Paysafe (Senior)',
          position: [-4.7, -1, 0],
          level: 2,
          period: '2023 - 2024',
          subtitle: 'Senior Product Manager',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['Global Strategy', 'APMs', 'Checkout'],
          },
        },
        {
          id: 'paysafe-pm',
          label: 'Paysafe',
          position: [-4.1, -2.3, 0],
          level: 2,
          period: '2021 - 2023',
          subtitle: 'Product Manager',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['Payments API', 'GTM', 'APM Integrations'],
          },
        },
        {
          id: 'icici-bank',
          label: 'ICICI Bank',
          position: [-3.2, -3.5, 0],
          level: 2,
          period: '2019 - 2021',
          subtitle: 'Product Manager',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['API Gateway', 'VKYC', 'UPI'],
          },
        },
        {
          id: 'iit-bombay',
          label: 'IIT Bombay',
          position: [-2, -4.5, 0],
          level: 2,
          period: '2015 - 2019',
          subtitle: 'B.Tech, Civil Engineering',
          attributes: {
            problem: '[Content to be provided]',
            solution: '[Content to be provided]',
            impact: '[Content to be provided]',
            technologies: ['Remote Sensing', 'Image Processing', 'Research'],
          },
        },
      ],
    },
  ],
};

export const contactLinks = [
  { label: 'GitHub', url: 'https://github.com/priyanshukumar0309', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/kumarpriyanshu', icon: 'linkedin' },
  { label: 'Email', url: 'mailto:contact@kumarpriyanshu.in', icon: 'mail' },
];
