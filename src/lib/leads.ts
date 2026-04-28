export type LeadRecord = {
  nome: string;
  telefone: string;
  idadeLabel: string;
  modalidade: string;
  turma: string;
  localizacao: "sim" | "depende" | "nao" | null;
  outcome: "whatsapp" | "encerrado";
};

const STORAGE_KEY = "edjv_chat_leads";

// Coloque a URL gerada pelo Google Apps Script aqui entre as aspas
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/your-deployed-webapp-id/exec"; // TODO: replace with actual Web App URL after publishing Apps Script

export function persistLead(lead: LeadRecord): void {
  if (typeof window === "undefined") return;

  // Enviar evento para o Google Tag Manager (GTM)
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      'event': 'generate_lead',
      'lead_outcome': lead.outcome,
      'modality': lead.modalidade,
      'age_band': lead.idadeLabel
    });
  } catch (e) {
    console.error("Erro ao disparar evento GTM", e);
  }
  
  const leadData = { ...lead, at: new Date().toLocaleString("pt-BR") };

  // Salvar no navegador como backup
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr: (LeadRecord & { at: string })[] = raw ? JSON.parse(raw) : [];
    arr.push(leadData);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(arr.slice(-50)),
    );
  } catch {
    /* ignore */
  }

  // Enviar para o Google Sheets
  if (GOOGLE_SCRIPT_URL) {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    }).catch(err => console.error("Erro ao enviar para Google Sheets", err));
  }
}
