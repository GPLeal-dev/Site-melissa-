// ==================================================
// CONFIGURAÇÕES GERAIS DO SITE
// ==================================================
// Edite este arquivo para alterar WhatsApp, horários, Instagram ou Supabase.
// O número interno usa: código do país + DDD + telefone, sem símbolos.
const SITE_CONFIG = Object.freeze({
  whatsapp: "554196841738",
  whatsappDisplay: "(41) 9684-1738",

  schedule: Object.freeze({
    start: "08:30",
    end: "20:30",
    saturdayStart: "09:00",
    saturdayEnd: "18:00",
    pt: Object.freeze({
      days: "Segunda a sexta",
      timeRange: "08:30 às 20:30",
      saturdayInline: "Sábado • 09:00 às 18:00",
      inline: "Segunda a sexta • 08:30 às 20:30 | Sábado • 09:00 às 18:00",
      sentence: "Atendimento de segunda a sexta, das 08:30 às 20:30, e aos sábados, das 09:00 às 18:00.",
      faq: "O atendimento acontece de segunda a sexta, das 08:30 às 20:30, e aos sábados, das 09:00 às 18:00, sempre mediante agendamento."
    }),
    ja: Object.freeze({
      days: "月曜日〜金曜日",
      timeRange: "08:30〜20:30",
      saturdayInline: "土曜日 • 09:00〜18:00",
      inline: "月曜日〜金曜日 • 08:30〜20:30 | 土曜日 • 09:00〜18:00",
      sentence: "月曜日から金曜日は08:30〜20:30、土曜日は09:00〜18:00まで対応しています。",
      faq: "営業時間は月曜日から金曜日が08:30〜20:30、土曜日が09:00〜18:00です。完全予約制となります。"
    })
  }),

  instagram: "",
  instagramEnabled: false,

  // O contador só aparece depois que o Supabase estiver configurado e responder.
  showVisitorCounter: true,
  supabase: Object.freeze({
    projectUrl: "", // Exemplo: https://abcxyz.supabase.co
    anonKey: ""     // Use somente a chave pública anon/publishable. Nunca use service_role.
  }),

  visitorStorageKey: "melissa_visitor_id"
});
