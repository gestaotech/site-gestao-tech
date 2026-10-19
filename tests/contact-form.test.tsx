import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "@/components/sections/ContactForm";

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nome"), "Maria Silva");
  await user.type(screen.getByLabelText("Telefone com DDD"), "61998361296");
  await user.selectOptions(screen.getByLabelText("Serviço de interesse"), "web");
  await user.type(
    screen.getByLabelText("Mensagem"),
    "Preciso de um site institucional para minha empresa.",
  );
}

describe("ContactForm", () => {
  let openSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    openSpy = vi.fn();
    vi.stubGlobal("open", openSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("mostra erros acessíveis e foca o primeiro campo inválido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar pelo WhatsApp" }));

    const nome = screen.getByLabelText("Nome");
    expect(nome).toHaveAttribute("aria-invalid", "true");
    expect(nome).toHaveAccessibleDescription("Informe seu nome.");
    expect(screen.getByLabelText("Telefone com DDD")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Mensagem")).toHaveAttribute("aria-invalid", "true");
    expect(nome).toHaveFocus();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("abre o WhatsApp com a mensagem codificada ao enviar dados válidos", async () => {
    const user = userEvent.setup();
    const popup = { opener: {} as unknown };
    openSpy.mockReturnValue(popup);
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Enviar pelo WhatsApp" }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target] = openSpy.mock.calls[0] as [string, string];
    const parsed = new URL(url);

    expect(parsed.origin + parsed.pathname).toBe("https://wa.me/5561998361296");
    expect(target).toBe("_blank");
    expect(parsed.searchParams.get("text")).toBe(
      [
        "Olá! sou o(a) *Maria Silva*.",
        "Telefone: (61) 99836-1296",
        "Serviço de interesse: Desenvolvimento Web",
        "",
        "Preciso de um site institucional para minha empresa.",
      ].join("\n"),
    );
    expect(popup.opener).toBeNull();
    expect(
      await screen.findByText(/confirme o envio no aplicativo/i),
    ).toBeInTheDocument();
  });

  it("oferece um link manual quando o navegador bloqueia a janela", async () => {
    const user = userEvent.setup();
    openSpy.mockReturnValue(null);
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Enviar pelo WhatsApp" }));

    const fallback = await screen.findByRole("link", {
      name: "Abrir o WhatsApp manualmente",
    });
    expect(fallback.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/5561998361296\?text=/);
    expect(fallback).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("remove o erro de um campo assim que ele é corrigido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar pelo WhatsApp" }));
    expect(screen.getByLabelText("Nome")).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText("Nome"), "Ana");
    await waitFor(() =>
      expect(screen.getByLabelText("Nome")).toHaveAttribute("aria-invalid", "false"),
    );
  });

  it("informa que os dados não são armazenados pela página", () => {
    render(<ContactForm />);
    expect(
      screen.getByText(/Esta página não armazena os dados informados/i),
    ).toBeInTheDocument();
  });
});
