(function () {
  const yearEl = document.getElementById("ano-atual");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const header = document.querySelector(".header");
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 8) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const toggle = document.querySelector(".header__toggle");
  const nav = document.querySelector(".header__nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll(".header__link, .header__cta-mobile").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        toggle.focus();
      }
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    const nome = document.getElementById("nome");
    const telefone = document.getElementById("telefone");
    const servico = document.getElementById("servico");
    const mensagem = document.getElementById("mensagem");
    const erroNome = document.getElementById("erro-nome");
    const erroTelefone = document.getElementById("erro-telefone");
    const erroMensagem = document.getElementById("erro-mensagem");
    const fallback = document.getElementById("whatsapp-fallback");
    const fallbackLink = document.getElementById("whatsapp-fallback-link");

    const whatsappNumber = "5561998361296";

    function onlyDigits(value) {
      return value.replace(/\D/g, "");
    }

    if (telefone) {
      telefone.addEventListener("input", () => {
        const digits = onlyDigits(telefone.value);
        if (digits.length === 0) {
          telefone.value = "";
          return;
        }
        if (digits.length <= 2) {
          telefone.value = `(${digits}`;
          return;
        }
        if (digits.length <= 6) {
          telefone.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
          return;
        }
        if (digits.length <= 10) {
          telefone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
          return;
        }
        telefone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!nome || !telefone || !mensagem) return;

      let valid = true;
      if (erroNome) erroNome.textContent = "";
      if (erroTelefone) erroTelefone.textContent = "";
      if (erroMensagem) erroMensagem.textContent = "";
      if (fallback) fallback.hidden = true;
      nome.setAttribute("aria-invalid", "false");
      telefone.setAttribute("aria-invalid", "false");
      mensagem.setAttribute("aria-invalid", "false");

      if (nome.value.trim().length < 2) {
        if (erroNome) erroNome.textContent = "Informe seu nome com pelo menos dois caracteres.";
        nome.setAttribute("aria-invalid", "true");
        valid = false;
      }

      const telDigits = onlyDigits(telefone.value);
      if (telDigits.length < 10 || telDigits.length > 11) {
        if (erroTelefone) erroTelefone.textContent = "Informe um telefone com DDD válido (10 ou 11 dígitos).";
        telefone.setAttribute("aria-invalid", "true");
        valid = false;
      }

      if (mensagem.value.trim().length < 10) {
        if (erroMensagem) erroMensagem.textContent = "Escreva uma mensagem com pelo menos dez caracteres.";
        mensagem.setAttribute("aria-invalid", "true");
        valid = false;
      }

      if (!valid) {
        const firstError = form.querySelector(".form__error:not(:empty)");
        if (firstError) {
          const fieldId = firstError.id.replace("erro-", "");
          const field = document.getElementById(fieldId);
          if (field) field.focus();
        }
        return;
      }

      let text = `Olá, Gestão Tech.\n\nNome: ${nome.value.trim()}\nTelefone: ${telefone.value.trim()}\n`;
      if (servico && servico.value) {
        text += `Serviço de interesse: ${servico.value}\n`;
      }
      text += `\nMensagem:\n${mensagem.value.trim()}`;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      if (fallbackLink) fallbackLink.href = url;

      try {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win) {
          if (fallback) fallback.hidden = false;
        } else {
          try {
            win.opener = null;
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        if (fallback) fallback.hidden = false;
      }
    });
  }
})();
