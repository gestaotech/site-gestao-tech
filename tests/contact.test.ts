import { describe, expect, it } from "vitest";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhone,
  onlyDigits,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/contact";

const valid: ContactFormValues = {
  nome: "Maria Silva",
  telefone: "(61) 99836-1296",
  servico: "web",
  mensagem: "Preciso de um site institucional para minha empresa.",
};

describe("validateContactForm", () => {
  it("aceita um formulário completo", () => {
    expect(validateContactForm(valid)).toEqual({});
  });

  it("exige nome, telefone e mensagem", () => {
    const errors = validateContactForm({
      nome: " ",
      telefone: "",
      servico: "",
      mensagem: "curta",
    });

    expect(Object.keys(errors).sort()).toEqual(["mensagem", "nome", "telefone"]);
  });

  it("trata o serviço como opcional, mas rejeita valores fora da lista", () => {
    expect(validateContactForm({ ...valid, servico: "" })).toEqual({});
    expect(validateContactForm({ ...valid, servico: "inexistente" }).servico).toBeDefined();
  });

  it.each([
    ["(61) 99836-1296", true],
    ["(61) 3333-4444", true],
    ["61998361296", true],
    ["(00) 99999-9999", false],
    ["(61) 1999-99999", false],
    ["123", false],
  ])("valida telefone %s -> %s", (telefone, ok) => {
    const errors = validateContactForm({ ...valid, telefone });
    expect(Boolean(errors.telefone)).toBe(!ok);
  });
});

describe("formatPhone", () => {
  it("formata progressivamente como na máscara original", () => {
    expect(formatPhone("")).toBe("");
    expect(formatPhone("6")).toBe("(6");
    expect(formatPhone("61")).toBe("(61");
    expect(formatPhone("619")).toBe("(61) 9");
    expect(formatPhone("61998361296")).toBe("(61) 99836-1296");
  });

  it("ignora caracteres não numéricos e limita a 11 dígitos", () => {
    expect(onlyDigits("(61) 99836-1296999")).toBe("61998361296");
  });
});

describe("buildWhatsAppMessage", () => {
  it("monta a mensagem no mesmo formato do formulário original", () => {
    expect(buildWhatsAppMessage(valid)).toBe(
      [
        "Olá! sou o(a) *Maria Silva*.",
        "Telefone: (61) 99836-1296",
        "Serviço de interesse: Desenvolvimento Web",
        "",
        "Preciso de um site institucional para minha empresa.",
      ].join("\n"),
    );
  });

  it("omite a linha de serviço quando nenhum serviço é escolhido", () => {
    expect(buildWhatsAppMessage({ ...valid, servico: "" })).not.toContain("Serviço de interesse");
  });
});

describe("buildWhatsAppUrl", () => {
  it("aponta para o número oficial e codifica a mensagem com segurança", () => {
    const message = buildWhatsAppMessage({
      ...valid,
      mensagem: "Quero integrar & automatizar: 100% do fluxo\nobrigado",
    });
    const url = new URL(buildWhatsAppUrl(message));

    expect(url.origin + url.pathname).toBe("https://wa.me/5561998361296");
    expect(url.searchParams.get("text")).toBe(message);
  });
});
