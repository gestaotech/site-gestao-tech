import type { Service } from "./types";

export const services: readonly Service[] = [
  {
    id: "desenvolvimento-web",
    title: "Desenvolvimento Web",
    description:
      "Criamos sites institucionais, sistemas web e aplicações sob medida para as necessidades específicas do seu negócio.",
    benefit: "Presença digital profissional e ferramentas feitas para o seu processo.",
    items: [
      "Sites institucionais",
      "Sistemas web personalizados",
      "E-commerce",
      "APIs e integrações",
    ],
    cta: "Falar sobre desenvolvimento",
  },
  {
    id: "gestao-de-ti",
    title: "Gestão de TI",
    description:
      "Cuidamos da infraestrutura tecnológica da sua empresa para que você possa focar no seu negócio, com planejamento e execução.",
    benefit: "Mais estabilidade e organização para a área de tecnologia.",
    items: [],
    cta: "Falar sobre gestão de TI",
  },
  {
    id: "automacao-de-processos",
    title: "Automação de Processos",
    description:
      "Automatizamos tarefas repetitivas e otimizamos fluxos de trabalho para ganhar produtividade e reduzir custos operacionais.",
    benefit: "Menos retrabalho e informações organizadas para decidir melhor.",
    items: [
      "Automação de workflows",
      "Integração de sistemas",
      "Dashboards e relatórios",
    ],
    cta: "Falar sobre automação",
  },
];
