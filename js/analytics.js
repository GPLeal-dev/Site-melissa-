// ==================================================
// ESTATÍSTICAS OPCIONAIS VIA SUPABASE
// ==================================================
// Este recurso é secundário. Erros são registrados apenas no console e jamais
// interrompem menu, tradução ou WhatsApp.
(function () {
  "use strict";

  function isConfigured() {
    const supabase = SITE_CONFIG.supabase;
    return Boolean(supabase.projectUrl && supabase.anonKey && !supabase.projectUrl.includes("abcxyz"));
  }

  function createFallbackId() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  function getVisitorId() {
    try {
      let visitorId = localStorage.getItem(SITE_CONFIG.visitorStorageKey);
      if (!visitorId) {
        visitorId = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : createFallbackId();
        localStorage.setItem(SITE_CONFIG.visitorStorageKey, visitorId);
      }
      return visitorId;
    } catch (error) {
      console.warn("Não foi possível manter o identificador anônimo de visitante.", error);
      return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : createFallbackId();
    }
  }

  async function callRpc(functionName, payload, keepalive = false) {
    const baseUrl = SITE_CONFIG.supabase.projectUrl.replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: { apikey: SITE_CONFIG.supabase.anonKey, Authorization: `Bearer ${SITE_CONFIG.supabase.anonKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload), keepalive
    });
    if (!response.ok) throw new Error(`Supabase respondeu com status ${response.status}.`);
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  function showCounter(stats) {
    if (!SITE_CONFIG.showVisitorCounter || !stats) return;
    const total = Number(stats.total_views ?? stats.views ?? 0);
    if (!Number.isFinite(total)) return;
    document.getElementById("visitor-count").textContent = new Intl.NumberFormat("pt-BR").format(total);
    document.querySelector(".visitor-counter").hidden = false;
  }

  async function trackPageView() {
    if (!isConfigured()) {
      return;
    }
    try {
      const stats = await callRpc("record_page_view", { p_visitor_id: getVisitorId(), p_page: location.pathname || "/" });
      showCounter(stats);
    } catch (error) {
      console.warn("Não foi possível registrar a visualização. O restante do site continua normal.", error);
    }
  }

  function trackWhatsAppClick(source, service) {
    if (!isConfigured()) return;
    // Fire-and-forget: não usamos await para não atrasar a abertura do WhatsApp.
    void callRpc("record_whatsapp_click", {
      p_visitor_id: getVisitorId(), p_page: location.pathname || "/",
      p_source: String(source || "desconhecido").slice(0, 80), p_service: service ? String(service).slice(0, 80) : null
    }, true).catch((error) => console.warn("Não foi possível registrar o clique no WhatsApp.", error));
  }

  window.SiteAnalytics = { trackPageView, trackWhatsAppClick };
  document.addEventListener("DOMContentLoaded", trackPageView);
})();
