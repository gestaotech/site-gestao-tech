import { describe, expect, it } from "vitest";
import { getPublishedSolutions, solutions } from "@/data/solutions";

describe("catálogo de soluções", () => {
  it("publica somente o GT Restaurantes", () => {
    expect(getPublishedSolutions(solutions).map((item) => item.name)).toEqual([
      "GT Restaurantes",
    ]);
  });

  it("não mantém produtos sem confirmação no catálogo", () => {
    const names = solutions.map((item) => item.name);
    expect(names).toEqual(["GT Restaurantes"]);
  });

  it("não expõe preço de produto sem confirmação comercial", () => {
    for (const solution of solutions) {
      if (solution.price) {
        expect(solution.price.confirmed).toBe(false);
      }
    }
  });

  it("usa somente links https para produtos publicados", () => {
    for (const solution of getPublishedSolutions(solutions)) {
      if (solution.link) {
        expect(new URL(solution.link.href).protocol).toBe("https:");
      }
    }
  });

  it("define uma cor de identificação válida para cada produto", () => {
    for (const solution of solutions) {
      expect(solution.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});
