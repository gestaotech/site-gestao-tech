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
    icon: "code",
    image: {
      src: "/images/site/desenvolvimento-web.webp",
      alt: "Ilustração de um monitor com uma janela de navegador exibindo blocos de conteúdo",
      width: 1280,
      height: 800,
    },
  },
  {
    id: "gestao-de-ti",
    title: "Gestão de TI",
    description:
      "Cuidamos da infraestrutura tecnológica da sua empresa para que você possa focar no seu negócio, com planejamento e execução.",
    benefit: "Mais estabilidade e organização para a área de tecnologia.",
    items: [],
    cta: "Falar sobre gestão de TI",
    icon: "server",
    image: {
      src: "/images/site/infraestrutura-integracao.webp",
      alt: "Ilustração de servidores em rack conectados a nós de integração",
      width: 1280,
      height: 800,
    },
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
    icon: "workflow",
    image: {
      src: "/images/site/gestao-automacao.webp",
      alt: "Ilustração de painel com gráficos abstratos e um fluxo de etapas automatizadas",
      width: 1280,
      height: 800,
    },
  },
];
