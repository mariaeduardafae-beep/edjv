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
  | { type: "name" }
  | { type: "age"; nome: string }
  | { type: "modality"; nome: string; band: AgeBand; ageLabel: string }
  | { type: "schedule"; nome: string; band: AgeBand; ageLabel: string; modalityKey: ModalityKey; modalityLabel: string }
  | { type: "location"; nome: string; band: AgeBand; ageLabel: string; modalityKey: ModalityKey; modalityLabel: string; turma: string }
  | { type: "done"; title: string; body: string; whatsappUrl?: string; lastStep?: Step };

export type EnrollmentChatProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EnrollmentChat({ isOpen, onClose }: EnrollmentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>({ type: "name" });
  const [nomeDraft, setNomeDraft] = useState("");
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
    setStep({ type: "name" });
    setNomeDraft("");
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
          text: "Para começar, como podemos te chamar?"
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

  const handleNameSubmit = () => {
    const n = nomeDraft.trim();
    if (n.length < 2) {
      setContactError("Informe seu nome.");
      return;
    }
    addUserMessage(n);
    setStep({ type: "age", nome: n });
    setContactError("");
    addBotMessage(`Prazer, ${n}! Qual a idade do aluno(a)?`);
  };

  const handleAgeSelect = (o: typeof AGE_OPTIONS[0], currentStep: any) => {
    addUserMessage(o.label);
    setStep({ type: "modality", nome: currentStep.nome, band: o.id, ageLabel: o.label });
    addBotMessage(`Legal! Para a faixa de ${o.label}, temos essas modalidades. Qual você tem interesse?`);
  };

  const handleModalitySelect = (m: { key: ModalityKey; label: string }, currentStep: any) => {
    addUserMessage(m.label);
    setStep({ 
      type: "schedule", 
      nome: currentStep.nome,
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
      type: "location",
      nome: currentStep.nome,
      band: currentStep.band,
      ageLabel: currentStep.ageLabel,
      modalityKey: currentStep.modalityKey,
      modalityLabel: currentStep.modalityLabel,
      turma: label,
    });
    addBotMessage("Uma última pergunta: as nossas aulas acontecem no bairro José Américo. Esse trajeto é tranquilo para você?");
  };

  const handleBack = (currentStep: Step) => {
    if (currentStep.type === "age") {
      setStep({ type: "name" });
      addBotMessage("Sem problemas! Como podemos te chamar?");
    } else if (currentStep.type === "modality") {
      setStep({ type: "age", nome: currentStep.nome });
      addBotMessage(`Certo, ${currentStep.nome}! Qual a idade do aluno(a)?`);
    } else if (currentStep.type === "schedule") {
      setStep({ type: "modality", nome: currentStep.nome, band: currentStep.band, ageLabel: currentStep.ageLabel });
      addBotMessage(`Voltamos para as modalidades de ${currentStep.ageLabel}. Qual você prefere?`);
    } else if (currentStep.type === "location") {
      setStep({ 
        type: "schedule", 
        nome: currentStep.nome,
        band: currentStep.band, 
        ageLabel: currentStep.ageLabel, 
        modalityKey: currentStep.modalityKey, 
        modalityLabel: currentStep.modalityLabel 
      });
      addBotMessage(`Escolha um horário para ${currentStep.modalityLabel}:`);
    } else if (currentStep.type === "done" && currentStep.lastStep) {
      setStep(currentStep.lastStep);
      if (currentStep.lastStep.type === "location") {
        addBotMessage("Voltamos! Sobre o trajeto para o bairro José Américo, ele é tranquilo para você?");
      }
    }
  };

  const handleLocationSelect = (choice: "sim" | "nao", currentStep: any) => {
    const locLabel = choice === "sim" ? "Sim, com certeza!" : "Infelizmente não consigo";
    addUserMessage(locLabel);
    
    const lead: LeadRecord = {
      nome: currentStep.nome,
      telefone: "Não solicitado",
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
        "Não informado",
        currentStep.ageLabel,
        locLabel,
      );

      addBotMessage("Perfeito! Seus dados foram registrados. Clique no botão abaixo para nos enviar as informações pelo WhatsApp e finalizar seu agendamento.");
      
      setStep({ 
        type: "done", 
        title: "Tudo pronto!", 
        body: "Clique abaixo para falar conosco.",
        whatsappUrl: url,
        lastStep: currentStep
      });
    } else {
      addBotMessage("Que pena! Talvez no futuro seja possível? Ficaremos na torcida para você conseguir vir dançar conosco.");
      setStep({ 
        type: "done", 
        title: "Ficamos à disposição!", 
        body: "Caso mude de ideia, estaremos aqui!",
        lastStep: currentStep
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
          {step.type === "name" && !isTyping && (
            <div className="edjv-chat-input-group">
              <input 
                className="edjv-chat-field" 
                placeholder="Seu nome" 
                value={nomeDraft} 
                onChange={e => setNomeDraft(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleNameSubmit()}
              />
              {contactError && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', margin: 0 }}>{contactError}</p>}
              <button className="edjv-chat-btn-send" onClick={handleNameSubmit}>
                Continuar
              </button>
            </div>
          )}

          {step.type === "age" && !isTyping && (
            <div className="edjv-chat-options-grid">
              {AGE_OPTIONS.map(o => (
                <button key={o.id} className="edjv-chat-btn-option" onClick={() => handleAgeSelect(o, step)}>
                  {o.label}
                </button>
              ))}
              <button className="edjv-chat-btn-back" onClick={() => handleBack(step)}>
                &larr; Voltar
              </button>
            </div>
          )}

          {step.type === "modality" && !isTyping && (
            <div className="edjv-chat-options-grid">
              {modalitiesForAge(step.band).map(m => (
                <button key={m.key} className="edjv-chat-btn-option" onClick={() => handleModalitySelect(m, step)}>
                  {m.label}
                </button>
              ))}
              <button className="edjv-chat-btn-back" onClick={() => handleBack(step)}>
                &larr; Voltar
              </button>
            </div>
          )}

          {step.type === "schedule" && !isTyping && (
            <div className="edjv-chat-options-grid">
              {schedulesFor(step.band, step.modalityKey).map(label => (
                <button key={label} className="edjv-chat-btn-option" onClick={() => handleScheduleSelect(label, step)}>
                  {label}
                </button>
              ))}
              <button className="edjv-chat-btn-back" onClick={() => handleBack(step)}>
                &larr; Voltar
              </button>
            </div>
          )}



          {step.type === "location" && !isTyping && (
            <div className="edjv-chat-options-grid">
              <button className="edjv-chat-btn-option" onClick={() => handleLocationSelect("sim", step)}>Sim, com certeza!</button>
              <button className="edjv-chat-btn-option" onClick={() => handleLocationSelect("nao", step)}>Infelizmente não consigo</button>
              <button className="edjv-chat-btn-back" onClick={() => handleBack(step)}>
                &larr; Voltar
              </button>
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
              <button className="edjv-chat-btn-back" onClick={() => handleBack(step)}>
                &larr; Voltar
              </button>
              <button className="edjv-chat-btn-option" onClick={onClose}>Fechar Chat</button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
