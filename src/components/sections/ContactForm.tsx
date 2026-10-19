"use client";

import { useRef, useState, type FormEvent } from "react";
import { buttonClassName } from "@/components/ui/Button";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhone,
  serviceInterestOptions,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact";
import styles from "./ContactForm.module.css";

const initialValues: ContactFormValues = {
  nome: "",
  telefone: "",
  servico: "",
  mensagem: "",
};

const fieldOrder: (keyof ContactFormValues)[] = ["nome", "telefone", "servico", "mensagem"];

type Status =
  | { kind: "idle" }
  | { kind: "opened" }
  | { kind: "blocked"; url: string };

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fieldRefs = useRef<Partial<Record<keyof ContactFormValues, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setStatus({ kind: "idle" });

    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    const url = buildWhatsAppUrl(buildWhatsAppMessage(values));
    const popup = window.open(url, "_blank");

    if (popup) {
      popup.opener = null;
      setStatus({ kind: "opened" });
    } else {
      setStatus({ kind: "blocked", url });
    }
  }

  function describedBy(field: keyof ContactFormValues) {
    return errors[field] ? `${field}-error` : undefined;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-describedby="contato-aviso">
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="nome" className={styles.label}>
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            className={styles.input}
            placeholder="Seu nome completo"
            value={values.nome}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={describedBy("nome")}
            ref={(element) => {
              fieldRefs.current.nome = element;
            }}
            onChange={(event) => updateField("nome", event.target.value)}
          />
          {errors.nome ? (
            <p id="nome-error" className={styles.error}>
              {errors.nome}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="telefone" className={styles.label}>
            Telefone com DDD
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={styles.input}
            placeholder="(00) 00000-0000"
            value={values.telefone}
            aria-invalid={Boolean(errors.telefone)}
            aria-describedby={describedBy("telefone")}
            ref={(element) => {
              fieldRefs.current.telefone = element;
            }}
            onChange={(event) => updateField("telefone", formatPhone(event.target.value))}
          />
          {errors.telefone ? (
            <p id="telefone-error" className={styles.error}>
              {errors.telefone}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="servico" className={styles.label}>
          Serviço de interesse
        </label>
        <select
          id="servico"
          name="servico"
          className={styles.input}
          value={values.servico}
          aria-invalid={Boolean(errors.servico)}
          aria-describedby={describedBy("servico")}
          ref={(element) => {
            fieldRefs.current.servico = element;
          }}
          onChange={(event) => updateField("servico", event.target.value)}
        >
          {serviceInterestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.servico ? (
          <p id="servico-error" className={styles.error}>
            {errors.servico}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="mensagem" className={styles.label}>
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          className={styles.input}
          placeholder="Descreva seu projeto ou necessidade"
          value={values.mensagem}
          aria-invalid={Boolean(errors.mensagem)}
          aria-describedby={describedBy("mensagem")}
          ref={(element) => {
            fieldRefs.current.mensagem = element;
          }}
          onChange={(event) => updateField("mensagem", event.target.value)}
        />
        {errors.mensagem ? (
          <p id="mensagem-error" className={styles.error}>
            {errors.mensagem}
          </p>
        ) : null}
      </div>

      <p id="contato-aviso" className={styles.notice}>
        Ao enviar, o WhatsApp será aberto com a sua mensagem pronta. O envio só é
        concluído quando você confirmar no aplicativo. Esta página não armazena os
        dados informados e eles são usados apenas para responder ao seu contato.
      </p>

      <button type="submit" className={`${buttonClassName("primary")} ${styles.submit}`}>
        Enviar pelo WhatsApp
      </button>

      <div role="status" aria-live="polite" className={styles.status}>
        {status.kind === "opened" ? (
          <p className={styles.success}>
            O WhatsApp foi aberto com a sua mensagem. Confirme o envio no aplicativo.
          </p>
        ) : null}
        {status.kind === "blocked" ? (
          <p className={styles.error}>
            O navegador bloqueou a nova janela.{" "}
            <a href={status.url} target="_blank" rel="noopener noreferrer" className={styles.fallback}>
              Abrir o WhatsApp manualmente
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
