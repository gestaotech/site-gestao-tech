/**
 * Site institucional Gestão Tech (estático)
 * Comportamentos: ano do rodapé, cabeçalho ao rolar, menu móvel acessível,
 * indicação de seção ativa, revelação ao rolar e formulário com WhatsApp.
 * Stack: JavaScript puro (sem dependências). Respeita prefers-reduced-motion.
 */
(function () {
  "use strict";

  // Número oficial do WhatsApp (DDI + DDD + número)
  var WHATSAPP_NUMBER = "5561998361296";

  /* --------------------------------------------------------------------------
   * Rodapé: ano atual automático
   * -------------------------------------------------------------------------- */
  var yearEl = document.getElementById("ano-atual");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* --------------------------------------------------------------------------
   * Cabeçalho: aplica estilo visual após pequena rolagem
   * -------------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* --------------------------------------------------------------------------
   * Menu móvel acessível
   * - Alterna abertura pelo botão
   * - Fecha ao navegar (mobile)
   * - Fecha com Escape e restaura foco no botão
   * - Recolhe ao voltar para layout desktop
   * -------------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeMenu(focusToggle) {
    if (!toggle || !nav) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    if (focusToggle && typeof toggle.focus === "function") {
      toggle.focus();
    }
  }

  function openMenu() {
    if (!toggle || !nav) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) closeMenu(false);
      else openMenu();
    });

    // Fecha o menu após clique em links no contexto mobile
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 1023px)").matches) {
          closeMenu(false);
        }
      });
    });

    // Suporte a teclado: Escape fecha o menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu(true);
      }
    });

    // Evita menu "aberto" ao mudar para desktop
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        closeMenu(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * Navegação: indica a seção ativa conforme a rolagem
   * Usa IntersectionObserver quando disponível; fallback marca "Início".
   * -------------------------------------------------------------------------- */
  var navLinks = document.querySelectorAll(".site-nav__link[data-section]");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("data-section");
    var section = id ? document.getElementById(id) : null;
    // "Início" aponta para a área do hero/topo
    if (!section && id === "inicio") {
      section = document.querySelector(".hero");
    }
    if (section) sections.push({ id: id, el: section, link: link });
  });

  function setActiveSection(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute("data-section") === id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var activeId = "inicio";
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var match = sections.find(function (s) { return s.el === entry.target; });
            if (match) activeId = match.id;
          }
        });
        setActiveSection(activeId);
      },
      // Margens ajustam o "ponto" de ativação considerando o cabeçalho fixo
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.5] }
    );
    sections.forEach(function (s) { observer.observe(s.el); });
    setActiveSection("inicio");
  } else if (navLinks.length) {
    setActiveSection("inicio");
  }

  /* --------------------------------------------------------------------------
   * Revelação de elementos ao entrar na viewport
   * - Adiciona .is-visible em elementos .reveal
   * - Desativada quando o usuário prefere movimento reduzido
   * -------------------------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function showAllReveals() {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    showAllReveals();
  } else if (reveals.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  // Se a preferência mudar em tempo real, garante conteúdo visível
  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", function (e) {
      if (e.matches) showAllReveals();
    });
  }

  /* --------------------------------------------------------------------------
   * Formulário de contato
   * - Validação acessível (mensagens e aria-invalid)
   * - Máscara de telefone BR
   * - Monta mensagem e abre WhatsApp em nova aba
   * - Exibe fallback manual se o pop-up for bloqueado
   * - Não armazena dados no site
   * -------------------------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  var fallback = document.getElementById("whatsapp-fallback");
  var fallbackLink = document.getElementById("whatsapp-fallback-link");

  /** Remove caracteres não numéricos. */
  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  /** Formata telefone brasileiro com DDD (10 ou 11 dígitos). */
  function formatPhone(value) {
    var d = digits(value).slice(0, 11);
    if (d.length <= 2) return d ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  function setError(id, message) {
    var el = document.getElementById(id);
    if (el) el.textContent = message || "";
  }

  function setInvalid(input, invalid) {
    if (!input) return;
    if (invalid) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  if (form) {
    var nome = form.querySelector("#nome");
    var telefone = form.querySelector("#telefone");
    var servico = form.querySelector("#servico");
    var mensagem = form.querySelector("#mensagem");

    // Máscara durante a digitação
    if (telefone) {
      telefone.addEventListener("input", function (e) {
        e.target.value = formatPhone(e.target.value);
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      // Nome: mínimo 2 caracteres
      var nomeVal = nome ? nome.value.trim() : "";
      if (nomeVal.length < 2) {
        setError("erro-nome", "Informe seu nome.");
        setInvalid(nome, true);
        valid = false;
      } else {
        setError("erro-nome", "");
        setInvalid(nome, false);
      }

      // Telefone: DDD + número (10 ou 11 dígitos)
      var telDigits = telefone ? digits(telefone.value) : "";
      if (telDigits.length < 10 || telDigits.length > 11) {
        setError("erro-telefone", "Informe um telefone válido com DDD.");
        setInvalid(telefone, true);
        valid = false;
      } else {
        setError("erro-telefone", "");
        setInvalid(telefone, false);
      }

      // Mensagem: mínimo 10 caracteres
      var msgVal = mensagem ? mensagem.value.trim() : "";
      if (msgVal.length < 10) {
        setError("erro-mensagem", "Descreva sua necessidade com pelo menos 10 caracteres.");
        setInvalid(mensagem, true);
        valid = false;
      } else {
        setError("erro-mensagem", "");
        setInvalid(mensagem, false);
      }

      if (!valid) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          firstInvalid.focus();
        }
        return;
      }

      // Monta o texto enviado ao WhatsApp (somente no ato do envio)
      var servicoVal = servico ? servico.value.trim() : "";
      var text = "Olá, Gestão Tech!\n\n";
      text += "Nome: " + nomeVal + "\n";
      text += "Telefone: " + (telefone ? telefone.value.trim() : "") + "\n";
      if (servicoVal) text += "Serviço de interesse: " + servicoVal + "\n";
      text += "\nMensagem:\n" + msgVal;

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
      if (fallbackLink) fallbackLink.href = url;
      if (fallback) fallback.hidden = true;

      // Tenta abrir o WhatsApp; se bloqueado, mostra link manual
      var popup = window.open(url, "_blank", "noopener,noreferrer");
      if (!popup) {
        if (fallback) fallback.hidden = false;
      }
    });
  }
})();
