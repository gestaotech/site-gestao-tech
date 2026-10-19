import type { Solution } from "./types";

/*
 * Catálogo de soluções SaaS.
 * - published: somente itens com `published: true` aparecem no site.
 * - price.confirmed: enquanto for false, o valor não é exibido ao visitante.
 * - accent: cor de identificação do produto (decorativa; não substitui a marca).
 */
export const solutions: readonly Solution[] = [
  {
    id: "gt-restaurantes",
    name: "GT Restaurantes",
    category: "Sistema completo para restaurantes",
    description:
      "Gerencie mesas, cardápio, estoque, vendas e relatórios em um só lugar.",
    features: [
      "Gestão completa",
      "Pedidos",
      "Cardápio digital",
      "Relatórios em tempo real",
    ],
    accent: "#E87C3B",
    published: true,
    price: { label: "A partir de", value: "R$ 99,00", confirmed: false },
    link: {
      href: "https://gest-o-de-restaurantes.vercel.app/",
      label: "Ver produto",
    },
  },
];

export function getPublishedSolutions(
  items: readonly Solution[] = solutions,
): readonly Solution[] {
  return items.filter((solution) => solution.published);
}
