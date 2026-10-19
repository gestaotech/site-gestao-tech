import { contact } from "@/data/site";

export const serviceInterestOptions = [
  { value: "", label: "Selecione um serviço" },
  { value: "web", label: "Desenvolvimento Web" },
  { value: "ti", label: "Gestão de T.I" },
  { value: "automacao", label: "Automação de Processos" },
  {
    value: "desenvolvimento",
    label: "Desenvolvimento de Sistemas Personalizados",
  },
] as const;

export type ContactFormValues = {
  nome: string;
  telefone: string;
  servico: string;
  mensagem: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const BRAZILIAN_PHONE = /^[1-9]{2}(9\d{8}|\d{8})$/;

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function formatPhone(value: string): string {
  const digits = onlyDigits(value);

  if (digits.length > 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length > 2) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length > 0) {
    return `(${digits}`;
  }
  return "";
}

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.nome.trim().length < 2) {
    errors.nome = "Informe seu nome.";
  }

  if (!BRAZILIAN_PHONE.test(onlyDigits(values.telefone))) {
    errors.telefone = "Informe um telefone com DDD, por exemplo (61) 99999-9999.";
  }

  const serviceValues: string[] = serviceInterestOptions.map(
    (option) => option.value,
  );
  if (!serviceValues.includes(values.servico)) {
    errors.servico = "Selecione um serviço válido.";
  }

  if (values.mensagem.trim().length < 10) {
    errors.mensagem = "Descreva sua necessidade com pelo menos 10 caracteres.";
  }

  return errors;
}

export function buildWhatsAppMessage(values: ContactFormValues): string {
  const serviceLabel = serviceInterestOptions.find(
    (option) => option.value === values.servico,
  )?.label;

  let texto = `Olá! sou o(a) *${values.nome.trim()}*.\n`;
  texto += `Telefone: ${formatPhone(values.telefone)}\n`;
  if (values.servico && serviceLabel) {
    texto += `Serviço de interesse: ${serviceLabel}\n`;
  }
  texto += `\n${values.mensagem.trim()}`;
  return texto;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
