import { useEffect, useState, useRef } from "react";
import type { AgeBand, ModalityKey } from "../data/schedule";
import {
  AGE_OPTIONS,
  modalitiesForAge,
  schedulesFor,
} from "../data/schedule";
import type { LeadRecord } from "../lib/leads";
import { persistLead } from "../lib/leads";
import { buildWhatsAppUrl, openWhatsAppUrl } from "../lib/whatsapp";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: React.ReactNode;
};

type Step =
  | { type: "age" }
  | { type: "modality"; band: AgeBand; ageLabel: string }
  | { type: "schedule"; band: AgeBand; ageLabel: string; modalityKey: ModalityKey; modalityLabel: string }
  | { type: "contact"; ageLabel: string; modalityLabel: string; turma: string }
  | { type: "location"; ageLabel: string; modalityLabel: string; turma: string; nome: string; telefone: string }
  | { type: "done"; title: string; body: string; whatsappUrl?: string };

export type EnrollmentChatProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EnrollmentChat({ isOpen, onClose }: EnrollmentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>({ type: "age" });
  const [nomeDraft, setNomeDraft] = useState("");
  const [telefoneDraft, setTelefoneDraft] = useState("");
  const [contactError, setContactError] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    
    // Reset chat
    setMessages([]);
    setStep({ type: "age" });
    setNomeDraft("");
    setTelefoneDraft("");
    setContactError("");
    
    // Initial bot message
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{
        id: "m1",
        sender: "bot",
        text: "Olá! Sou o assistente virtual da EDJV. Vamos encontrar a turma ideal para você ou seu filho(a)?"
      }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: "m2",
          sender: "bot",
          text: "Para começar, qual a idade do aluno(a)?"
        }]);
        setIsTyping(false);
      }, 1000);
    }, 800);
  }, [isOpen]);

  const addBotMessage = (text: React.ReactNode) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        sender: "bot",
        text
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      sender: "user",
      text
    }]);
  };

  const handleAgeSelect = (o: typeof AGE_OPTIONS[0]) => {
    addUserMessage(o.label);
    setStep({ type: "modality", band: o.id, ageLabel: o.label });
    addBotMessage(`Legal! Para a faixa de ${o.label}, temos essas modalidades. Qual você tem interesse?`);
  };

  const handleModalitySelect = (m: { key: ModalityKey; label: string }, currentStep: any) => {
    addUserMessage(m.label);
    setStep({ 
      type: "schedule", 
      band: currentStep.band, 
      ageLabel: currentStep.ageLabel, 
      modalityKey: m.key, 
      modalityLabel: m.label 
    });
    addBotMessage(`Ótima escolha! Agora, escolha um horário para ${m.label}:`);
  };

  const handleScheduleSelect = (label: string, currentStep: any) => {
    addUserMessage(label);
    setStep({
      type: "contact",
      ageLabel: currentStep.ageLabel,
      modalityLabel: currentStep.modalityLabel,
      turma: label,
    });
    addBotMessage("Quase lá! Como podemos te chamar? E qual o seu WhatsApp?");
  };

  const handleContactSubmit = (currentStep: any) => {
    const n = nomeDraft.trim();
    if (n.length < 2) {
      setContactError("Informe seu nome.");
      return;
    }
    if (telefoneDraft.length < 8) {
      setContactError("Informe um telefone válido.");
      return;
    }
    
    addUserMessage(`${n} - ${telefoneDraft}`);
    setStep({
      type: "location",
      ageLabel: currentStep.ageLabel,
      modalityLabel: currentStep.modalityLabel,
      turma: currentStep.turma,
      nome: n,
      telefone: telefoneDraft,
    });
    addBotMessage("Uma última pergunta: as nossas aulas acontecem no bairro José Américo. Esse trajeto é tranquilo para você?");
  };

  const handleLocationSelect = (choice: "sim" | "depende" | "nao", currentStep: any) => {
    const locLabel = choice === "sim" ? "Sim" : choice === "depende" ? "Depende" : "Não";
    addUserMessage(locLabel);
    
    const lead: LeadRecord = {
      nome: currentStep.nome,
      telefone: currentStep.telefone,
      idadeLabel: currentStep.ageLabel,
      modalidade: currentStep.modalityLabel,
      turma: currentStep.turma,
      localizacao: choice,
      outcome: choice === "sim" ? "whatsapp" : "encerrado",
    };

    persistLead(lead);

    if (choice === "sim") {
      const url = buildWhatsAppUrl(
        currentStep.nome,
        currentStep.modalityLabel,
        currentStep.turma,
        currentStep.telefone,
        currentStep.ageLabel,
        locLabel,
      );
      addBotMessage("Perfeito! Clique no botão abaixo para abrir o WhatsApp e finalizar seu agendamento.");
      setStep({ 
        type: "done", 
        title: "Tudo pronto!", 
        body: "Clique abaixo para falar conosco.",
        whatsappUrl: url 
      });
    } else {
      addBotMessage("Entendido! Recebemos suas informações e entraremos em contato em breve para tirar suas dúvidas.");
      setStep({ 
        type: "done", 
        title: "Obrigado!", 
        body: "Nossa equipe entrará em contato em breve." 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edjv-chat-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="edjv-chat-window">
        <header className="edjv-chat-header">
          <div className="edjv-chat-header-avatar">
             <img src="/brand/mark-purple.png" alt="EDJV Logo" />
          </div>
          <div className="edjv-chat-header-info">
            <h3>Atendimento EDJV</h3>
            <span>Online agora</span>
          </div>
          <button className="edjv-chat-close" onClick={onClose}>&times;</button>
        </header>

        <div className="edjv-chat-messages">
          {messages.map(m => (
            <div key={m.id} className={`edjv-msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
          {isTyping && (
            <div className="edjv-msg bot">
              <div className="typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="edjv-chat-footer">
          {step.type === "age" && !isTyping && (
            <div className="edjv-chat-options-grid">
              {AGE_OPTIONS.map(o => (
                <button key={o.id} className="edjv-chat-btn-option" onClick={() => handleAgeSelect(o)}>
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {step.type === "modality" && !isTyping && (
            <div className="edjv-chat-options-grid">
              {modalitiesForAge(step.band).map(m => (
                <button key={m.key} className="edjv-chat-btn-option" onClick={() => handleModalitySelect(m, step)}>
                  {m.label}
                </button>
              ))}
            </div>
          )}

          {step.type === "schedule" && !isTyping && (
            <div className="edjv-chat-options-grid">
              {schedulesFor(step.band, step.modalityKey).map(label => (
                <button key={label} className="edjv-chat-btn-option" onClick={() => handleScheduleSelect(label, step)}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {step.type === "contact" && !isTyping && (
            <div className="edjv-chat-input-group">
              <input 
                className="edjv-chat-field" 
                placeholder="Seu nome" 
                value={nomeDraft} 
                onChange={e => setNomeDraft(e.target.value)} 
              />
              <input 
                className="edjv-chat-field" 
                placeholder="WhatsApp (DDD + número)" 
                value={telefoneDraft} 
                onChange={e => setTelefoneDraft(e.target.value)} 
                type="tel"
              />
              {contactError && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', margin: 0 }}>{contactError}</p>}
              <button className="edjv-chat-btn-send" onClick={() => handleContactSubmit(step)}>
                Enviar Contato
              </button>
            </div>
          )}

          {step.type === "location" && !isTyping && (
            <div className="edjv-chat-options-grid">
              <button className="edjv-chat-btn-option" onClick={() => handleLocationSelect("sim", step)}>Sim, com certeza!</button>
              <button className="edjv-chat-btn-option" onClick={() => handleLocationSelect("depende", step)}>Depende do horário</button>
              <button className="edjv-chat-btn-option" onClick={() => handleLocationSelect("nao", step)}>É um pouco longe</button>
            </div>
          )}

          {step.type === "done" && !isTyping && (
            <div className="edjv-chat-input-group">
              {step.whatsappUrl && (
                <button 
                  className="edjv-chat-btn-send" 
                  onClick={() => openWhatsAppUrl(step.whatsappUrl!)}
                >
                  Abrir WhatsApp
                </button>
              )}
              <button className="edjv-chat-btn-option" onClick={onClose}>Fechar Chat</button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
