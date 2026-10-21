export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type ImageAsset = {
  src: `/${string}`;
  alt: string;
  width: number;
  height: number;
};

export type ServiceIcon = "code" | "server" | "workflow";

export type Service = {
  id: string;
  title: string;
  description: string;
  benefit: string;
  items: readonly string[];
  cta: string;
  icon: ServiceIcon;
  image: ImageAsset;
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
  image?: ImageAsset;
};
