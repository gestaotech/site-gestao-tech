import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";

const root = process.cwd();

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function publicFileExists(webPath: string): boolean {
  return existsSync(path.join(root, "public", webPath.replace(/^\//, "")));
}

describe("recursos gráficos", () => {
  it("encontra todos os caminhos /images/ referenciados em src/ no diretório public/", () => {
    const sources = walk(path.join(root, "src")).filter((file) => /\.(tsx?|css)$/.test(file));
    const referenced = new Set<string>();

    for (const file of sources) {
      const content = readFileSync(file, "utf8");
      for (const match of content.matchAll(/["'`](\/images\/[^"'`)\s]+)["'`]/g)) {
        referenced.add(match[1]);
      }
    }

    expect(referenced.size).toBeGreaterThan(0);
    for (const webPath of referenced) {
      expect(publicFileExists(webPath), webPath).toBe(true);
    }
  });

  it("encontra as imagens de serviços e soluções nos dados", () => {
    for (const service of services) {
      expect(publicFileExists(service.image.src), service.image.src).toBe(true);
    }
    for (const solution of solutions) {
      if (solution.image) {
        expect(publicFileExists(solution.image.src), solution.image.src).toBe(true);
      }
    }
  });

  it("possui texto alternativo útil em todas as imagens de conteúdo", () => {
    for (const service of services) {
      expect(service.image.alt.trim().length).toBeGreaterThan(10);
    }
    for (const solution of solutions) {
      if (solution.image) {
        expect(solution.image.alt.trim().length).toBeGreaterThan(10);
      }
    }
  });

  it("disponibiliza a logo em variações para fundo claro, escuro e monocromática", () => {
    for (const file of [
      "logo-gestao-tech-dark.svg",
      "logo-gestao-tech-mono.svg",
      "logo-gestao-tech-vertical.svg",
      "logo-gestao-tech-vertical-dark.svg",
      "logo-gestao-tech-icon.svg",
      "logo-gestao-tech-icon-dark.svg",
      "logo-gestao-tech-icon.png",
      "favicon.png",
    ]) {
      expect(existsSync(path.join(root, "public/images/brand", file)), file).toBe(true);
    }
  });

  it("gera os ícones de aplicação usados pelo Next.js", () => {
    expect(existsSync(path.join(root, "src/app/icon.png"))).toBe(true);
    expect(existsSync(path.join(root, "src/app/apple-icon.png"))).toBe(true);
  });

  it("mantém o texto das logos geradas em curvas, sem depender de fontes instaladas", () => {
    // logo-horizontal.svg foi enviada pela Gestão Tech com texto vivo; ver pendência em docs/identidade-visual.md.
    const external = new Set(["logo-horizontal.svg"]);
    for (const file of readdirSync(path.join(root, "public/images/brand")).filter((f) => f.endsWith(".svg") && !external.has(f))) {
      const svg = readFileSync(path.join(root, "public/images/brand", file), "utf8");
      expect(svg, file).not.toMatch(/<text[\s>]/);
      expect(svg, file).not.toMatch(/<image[\s>]/);
    }
  });

  it("mantém a logo escura com o nome da empresa acessível", () => {
    const svg = readFileSync(path.join(root, "public/images/brand/logo-gestao-tech-dark.svg"), "utf8");
    expect(svg).toContain("<title>Gestão Tech</title>");
  });
});
