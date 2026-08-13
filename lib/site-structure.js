export const services = [
  { label: "Services", href: "/services" },
  { label: "Marketing Strategy & Consultancy", href: "/services/marketing-strategy-consultancy" },
  { label: "Organic Social", href: "/services/organic-social" },
  { label: "Paid Social", href: "/services/paid-social" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "Account-Based Marketing", href: "/services/account-based-marketing" },
  { label: "SEO", href: "/services/seo" },
  { label: "GEO", href: "/services/geo" },
  { label: "Go-to-Market & Launch", href: "/services/go-to-market-and-launch" },
  { label: "Founder-Led Marketing", href: "/services/founder-led-marketing" },
  { label: "Creator Partnerships", href: "/services/creator-partnerships" },
];

export const industries = [
  { label: "Industries", href: "/industries" },
  { label: "SaaS", href: "/industries/saas" },
  { label: "AI", href: "/industries/ai" },
  { label: "Tech", href: "/industries/tech" },
  { label: "Professional Services", href: "/industries/professional-services" },
  { label: "Investors", href: "/investors" },
];

export const whyRegen = [
  { label: "About Regen", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "How We Work", href: "/how-we-work" },
];

export const footerColumns = [
  { title: "Services", links: services.slice(1) },
  { title: "Industries", links: industries.slice(1) },
  {
    title: "Menus",
    links: [
      ...whyRegen,
      { label: "Our Work", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: "Free Marketing Audit", href: "/audit" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/regenerationsocial" },
      { label: "Instagram", href: "https://www.instagram.com/regen.digital/" },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const phaseOnePages = [
  ...services,
  ...industries,
  { label: "Investor Partnership Call", href: "/investors/partnership-call", section: "Investors" },
  { label: "Our Work", href: "/work", section: "Work" },
  ...whyRegen,
  { label: "The Audit", href: "/audit", section: "Free Audit" },
  { label: "Contact", href: "/contact", section: "Contact" },
  { label: "Privacy Policy", href: "/privacy-policy", section: "Legal" },
  { label: "Cookie Policy", href: "/cookie-policy", section: "Legal" },
].map((page) => ({
  ...page,
  section:
    page.section ||
    (page.href.startsWith("/services")
      ? "Services"
      : page.href.startsWith("/industries") || page.href === "/investors"
        ? "Industries"
        : "Why Regen"),
}));
