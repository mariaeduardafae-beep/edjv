const WHATSAPP_E164 = "5583991885843";

export function buildWhatsAppUrl(
  nome: string,
  modalidade: string,
  turma: string,
  telefone: string,
  idadeLabel: string,
  localizacaoLabel: string,
): string {
  const text = `Olá! Me chamo ${nome},

Preenchi o formulário e tenho interesse na modalidade ${modalidade}, na turma de ${turma}.

Idade: ${idadeLabel}

Gostaria de saber mais detalhes e, se possível, agendar uma aula experimental 😊`;

  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}

export function openWhatsAppUrl(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}
