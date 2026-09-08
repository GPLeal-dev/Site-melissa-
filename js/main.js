// ==================================================
// FUNCIONALIDADES PRINCIPAIS DO SITE
// ==================================================
(function () {
  "use strict";

  const state = { language: "pt", theme: "light", activeService: null, modal: null };
  const THEME_STORAGE_KEY = "melissa_theme";
  const serviceImages = {
    relaxing: "assets/images/massagem-relaxante.webp",
    drainage: "assets/images/drenagem-linfatica.webp",
    shaping: "assets/images/massagem-modeladora.webp",
    sports: "assets/images/massagem-desportiva.webp",
    therapies: "assets/images/massagem-terapeutica.webp",
    cone: "assets/images/cone-hindu.webp",
    candle: "assets/images/massagem-velas.webp"
  };

  /** Lê uma chave como "hero.title" dentro do idioma atual. */
  function translate(key, language = state.language) {
    return key.split(".").reduce((value, part) => value && value[part], window.TRANSLATIONS[language]);
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem("language");
      if (saved === "pt" || saved === "ja") return saved;
    } catch (error) {
      console.warn("Não foi possível ler o idioma salvo.", error);
    }
    return navigator.language.toLowerCase().startsWith("ja") ? "ja" : "pt";
  }

  // ==================================================
  // TEMA CLARO E ESCURO
  // ==================================================
  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {
      console.warn("Não foi possível ler o tema salvo.", error);
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateMetaThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = state.theme === "dark" ? "#1b171d" : "#fff7f1";
  }

  function updateThemeButton() {
    const label = translate(state.theme === "dark" ? "theme.activateLight" : "theme.activateDark");
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("aria-pressed", String(state.theme === "dark"));
    });
  }

  function applyTheme(theme, persist = false) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme = state.theme;
    updateThemeButton();
    updateMetaThemeColor();

    if (persist) {
      try { localStorage.setItem(THEME_STORAGE_KEY, state.theme); }
      catch (error) { console.warn("Não foi possível salvar o tema escolhido.", error); }
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark", true);
  }

  function setupSystemThemeSync() {
    const preference = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!preference) return;
    const sync = (event) => {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === "light" || saved === "dark") return;
      } catch (error) {
        console.warn("Não foi possível verificar a preferência de tema.", error);
      }
      applyTheme(event.matches ? "dark" : "light", false);
    };
    preference.addEventListener?.("change", sync);
  }

  // ==================================================
  // CONFIGURAÇÃO DO WHATSAPP
  // ==================================================
  function buildWhatsAppMessage(serviceId) {
    const template = serviceId ? translate("whatsapp.service") : translate("whatsapp.general");
    if (!serviceId) return template;
    const service = translate(`services.${serviceId}`);
    return template.replace("{service}", service.whatsappName || service.name);
  }

  function getWhatsAppUrl(serviceId) {
    return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage(serviceId))}`;
  }

  /** Função única usada por todos os botões gerais e de procedimentos. */
  function openWhatsApp(serviceId, source) {
    // A métrica é disparada sem espera; uma falha nunca impede a abertura do WhatsApp.
    if (window.SiteAnalytics) window.SiteAnalytics.trackWhatsAppClick(source, serviceId || null);
    const newWindow = window.open(getWhatsAppUrl(serviceId), "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  function updateWhatsAppLinks() {
    document.querySelectorAll(".js-whatsapp").forEach((link) => {
      link.href = getWhatsAppUrl(link.dataset.service || null);
    });
  }

  // ==================================================
  // SISTEMA DE TRADUÇÃO
  // ==================================================
  function applySchedule(language) {
    const schedule = SITE_CONFIG.schedule[language];
    document.querySelectorAll(".js-schedule-inline").forEach((element) => { element.textContent = schedule.inline; });
    document.querySelectorAll(".js-schedule-days").forEach((element) => { element.textContent = schedule.days; });
    document.querySelectorAll(".js-schedule-range").forEach((element) => { element.textContent = schedule.timeRange; });
    document.querySelectorAll(".js-schedule-saturday").forEach((element) => { element.textContent = schedule.saturdayInline; });
    document.querySelectorAll(".js-schedule-sentence").forEach((element) => { element.textContent = schedule.sentence; });
    document.querySelectorAll(".js-schedule-faq").forEach((element) => { element.textContent = schedule.faq; });
  }

  function setLanguage(language, persist = true) {
    if (!window.TRANSLATIONS[language]) return;
    state.language = language;
    document.documentElement.lang = language === "ja" ? "ja" : "pt-BR";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = translate(element.dataset.i18n);
      if (typeof value === "string") element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const value = translate(element.dataset.i18nAlt);
      if (typeof value === "string") element.alt = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = translate(element.dataset.i18nAria);
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const value = translate(element.dataset.i18nTitle);
      if (typeof value === "string") element.title = value;
    });

    document.querySelectorAll(".language-button").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.title = translate("meta.title");
    document.querySelector('meta[name="description"]').content = translate("meta.description");
    document.querySelector('meta[property="og:locale"]').content = language === "ja" ? "ja_JP" : "pt_BR";
    applySchedule(language);
    updateThemeButton();
    updateWhatsAppLinks();
    if (state.activeService && state.modal.open) renderServiceModal(state.activeService);

    if (persist) {
      try { localStorage.setItem("language", language); }
      catch (error) { console.warn("Não foi possível salvar o idioma escolhido.", error); }
    }
  }

  // ==================================================
  // MENU MOBILE
  // ==================================================
  function setupMobileMenu() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const backdrop = document.querySelector(".menu-backdrop");

    function setMenu(open) {
      header.classList.toggle("menu-is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", translate(open ? "accessibility.closeMenu" : "accessibility.openMenu"));
      menu.setAttribute("aria-hidden", String(!open));
      menu.inert = !open;
      if (open) menu.querySelector("a, button")?.focus();
    }

    menu.inert = true;
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    backdrop.addEventListener("click", () => setMenu(false));
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  function setupHeader() {
    const header = document.querySelector(".site-header");
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // ==================================================
  // FAQ
  // ==================================================
  function setupFaq() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item) => {
      const button = item.querySelector("button");
      const answer = item.querySelector(".faq-answer");
      button.addEventListener("click", () => {
        const willOpen = button.getAttribute("aria-expanded") !== "true";
        items.forEach((other) => {
          other.querySelector("button").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").hidden = true;
        });
        button.setAttribute("aria-expanded", String(willOpen));
        answer.hidden = !willOpen;
      });
    });
  }

  // ==================================================
  // MODAL DOS PROCEDIMENTOS
  // ==================================================
  function renderServiceModal(serviceId) {
    const service = translate(`services.${serviceId}`);
    const dialog = state.modal;
    const image = dialog.querySelector("#service-modal-image");
    image.src = serviceImages[serviceId];
    image.alt = service.alt;
    dialog.querySelector("#service-modal-category").textContent = service.category;
    dialog.querySelector("#service-modal-title").textContent = service.name;
    dialog.querySelector("[data-close-modal]").setAttribute("aria-label", translate("accessibility.closeModal"));

    const body = dialog.querySelector("#service-modal-copy");
    body.replaceChildren();
    service.details.body.forEach((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      body.appendChild(element);
    });
    if (service.details.list.length) {
      const title = document.createElement("p");
      title.textContent = service.details.listTitle;
      const list = document.createElement("ul");
      service.details.list.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
      body.append(title, list);
    }
    if (service.details.note) {
      const note = document.createElement("p");
      note.className = "service-modal__note";
      note.textContent = service.details.note;
      body.appendChild(note);
    }
    const cta = dialog.querySelector("#service-modal-whatsapp");
    cta.textContent = translate("buttons.talkAboutService");
    cta.dataset.service = serviceId;
    cta.dataset.source = `modal_${serviceId}`;
    cta.href = getWhatsAppUrl(serviceId);
  }

  function setupServiceModal() {
    state.modal = document.getElementById("service-modal");
    state.modal.querySelector("[data-close-modal]").addEventListener("click", () => state.modal.close());
    state.modal.addEventListener("click", (event) => { if (event.target === state.modal) state.modal.close(); });
    state.modal.addEventListener("close", () => { state.activeService = null; });
    document.querySelectorAll(".js-open-service").forEach((button) => button.addEventListener("click", () => {
      state.activeService = button.dataset.service;
      renderServiceModal(state.activeService);
      state.modal.showModal();
    }));
  }

  // ==================================================
  // ANIMAÇÕES
  // ==================================================
  function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    elements.forEach((element) => observer.observe(element));
  }

  function setupSchema() {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "ProfessionalService",
      name: "Melissa Yumi Okuno — Método Massoterapia", telephone: `+${SITE_CONFIG.whatsapp}`,
      description: window.TRANSLATIONS.pt.meta.description,
      openingHours: [
        `Mo-Fr ${SITE_CONFIG.schedule.start}-${SITE_CONFIG.schedule.end}`,
        `Sa ${SITE_CONFIG.schedule.saturdayStart}-${SITE_CONFIG.schedule.saturdayEnd}`
      ],
      serviceType: ["Massagem Relaxante", "Drenagem Linfática", "Massagem Modeladora", "Massagem Desportiva", "Terapias Corporais de Bem-Estar"],
      sameAs: SITE_CONFIG.instagramEnabled && SITE_CONFIG.instagram ? [SITE_CONFIG.instagram] : []
    });
    document.head.appendChild(script);
  }

  function setupConfigValues() {
    document.querySelectorAll(".js-whatsapp-display").forEach((element) => { element.textContent = SITE_CONFIG.whatsappDisplay; });
    const instagram = document.querySelector(".instagram-link");
    if (instagram && SITE_CONFIG.instagramEnabled && SITE_CONFIG.instagram) {
      instagram.href = SITE_CONFIG.instagram;
      instagram.hidden = false;
    }
    document.getElementById("current-year").textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme(), false);
    setupConfigValues();
    setupServiceModal();
    setLanguage(getInitialLanguage(), false);
    setupHeader();
    setupSystemThemeSync();
    setupMobileMenu();
    setupFaq();
    setupRevealAnimations();
    setupSchema();

    document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
    document.querySelectorAll(".theme-toggle").forEach((button) => button.addEventListener("click", toggleTheme));
    document.querySelectorAll(".js-whatsapp").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      openWhatsApp(link.dataset.service || null, link.dataset.source || "desconhecido");
    }));
  });

  window.SiteI18n = { setLanguage, getLanguage: () => state.language, translate };
  window.SiteTheme = { applyTheme, toggleTheme, getTheme: () => state.theme };
  window.openWhatsApp = openWhatsApp;
})();
