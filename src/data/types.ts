export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  benefit: string;
  items: readonly string[];
  cta: string;
};

export type SolutionPrice = {
  label: string;
  value: string;
  confirmed: boolean;
};

export type SolutionLink = {
  href: string;
  label: string;
};

export type Solution = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: readonly string[];
  accent: string;
  published: boolean;
  price?: SolutionPrice;
  link?: SolutionLink;
};
