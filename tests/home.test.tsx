import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("página inicial", () => {
  it("apresenta a assinatura oficial como título principal", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /tecnologia que gera resultados/i }),
    ).toBeInTheDocument();
  });

  it("oferece os CTAs de contato e de soluções no hero", () => {
    render(<HomePage />);
    const hero = document.getElementById("home") as HTMLElement;

    expect(within(hero).getByRole("link", { name: "Fale com a Gestão Tech" })).toHaveAttribute(
      "href",
      "#contato",
    );
    expect(within(hero).getByRole("link", { name: "Conheça nossas soluções" })).toHaveAttribute(
      "href",
      "#solucoes",
    );
  });

  it("possui as seções institucionais esperadas", () => {
    render(<HomePage />);
    for (const id of ["home", "sobre", "servicos", "solucoes", "contato"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("apresenta os três serviços oferecidos", () => {
    render(<HomePage />);
    const services = document.getElementById("servicos") as HTMLElement;

    expect(within(services).getByRole("heading", { level: 3, name: "Desenvolvimento Web" })).toBeInTheDocument();
    expect(within(services).getByRole("heading", { level: 3, name: "Gestão de TI" })).toBeInTheDocument();
    expect(
      within(services).getByRole("heading", { level: 3, name: "Automação de Processos" }),
    ).toBeInTheDocument();
  });

  it("exibe somente os produtos publicados e oculta preço não confirmado", () => {
    render(<HomePage />);
    const solutions = document.getElementById("solucoes") as HTMLElement;

    expect(within(solutions).getByRole("heading", { level: 3, name: "GT Restaurantes" })).toBeInTheDocument();
    expect(within(solutions).queryByText("GT Gestor")).toBeNull();
    expect(within(solutions).queryByText("GT Commerce")).toBeNull();
    expect(within(solutions).queryByText("GT Agenda")).toBeNull();
    expect(within(solutions).queryByText("R$ 99,00")).toBeNull();
    expect(within(solutions).getByText("Consulte valores")).toBeInTheDocument();
  });

  it("abre o link do produto em nova aba com rel seguro", () => {
    render(<HomePage />);
    const link = screen.getByRole("link", { name: /ver produto/i });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("não exibe métricas de projetos ou clientes sem comprovação", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/projetos ativos/i);
    expect(text).not.toMatch(/\d+\s*%/);
    expect(text).not.toMatch(/\+\s?\d+/);
    expect(text).not.toMatch(/\b(clientes|projetos)\s+(ativos|entregues|conclu[ií]dos)/i);
  });

  it("todo link interno aponta para um elemento existente na página", () => {
    render(<HomePage />);
    const internal = Array.from(document.querySelectorAll('a[href^="#"]'));

    expect(internal.length).toBeGreaterThan(0);
    for (const anchor of internal) {
      const id = anchor.getAttribute("href")!.slice(1);
      expect(document.getElementById(id), `#${id}`).not.toBeNull();
    }
  });

  it("mantém os campos do formulário associados a rótulos", () => {
    render(<HomePage />);
    for (const label of ["Nome", "Telefone com DDD", "Serviço de interesse", "Mensagem"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("não expõe e-mail; o contato é feito somente por telefone/WhatsApp", () => {
    const { container } = render(<HomePage />);

    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.textContent ?? "").not.toMatch(/@|contato@gestaotech/i);
  });

  it("informa contato oficial e horário de atendimento", () => {
    render(<HomePage />);
    const contact = document.getElementById("contato") as HTMLElement;

    expect(within(contact).getByRole("link", { name: "(61) 99836-1296" })).toHaveAttribute(
      "href",
      "https://wa.me/5561998361296",
    );
    expect(within(contact).getByText("Seg — Sex")).toBeInTheDocument();
    expect(within(contact).getByText("09:00 — 18:00")).toBeInTheDocument();
  });
});
