import type { NavItem } from "./types";

export const siteName = "Gestão Tech";

export const tagline = "Tecnologia que gera resultados.";

export const siteDescription =
  "A Gestão Tech desenvolve sites, sistemas web e soluções de gestão que ajudam empresas a organizar processos, automatizar tarefas e crescer com tecnologia.";

export const navItems: readonly NavItem[] = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Contato", href: "#contato" },
];

export const contact = {
  whatsappNumber: "5561998361296",
  whatsappDisplay: "(61) 99836-1296",
  hoursLabel: "Seg — Sex",
  hoursTime: "09:00 — 18:00",
} as const;

export const institutional = {
  about: [
    "A Gestão Tech nasceu com o propósito de transformar a maneira como as empresas utilizam a tecnologia. Oferecemos soluções que vão do desenvolvimento de software à gestão da infraestrutura tecnológica.",
    "Trabalhamos com foco em entregar soluções úteis, sustentáveis e alinhadas às necessidades de cada cliente.",
  ],
  values: [
    {
      id: "missao",
      title: "Missão",
      text: "Entregar soluções tecnológicas que geram valor real e sustentável para nossos clientes.",
    },
    {
      id: "visao",
      title: "Visão",
      text: "Ser referência em gestão de TI e desenvolvimento de software no Brasil.",
    },
    {
      id: "valores",
      title: "Valores",
      text: "Inovação, transparência, excelência e compromisso com o sucesso do cliente.",
    },
  ],
} as const;
