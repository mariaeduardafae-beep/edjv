import { useState } from "react";
import { EnrollmentChat } from "./EnrollmentChat";
import "../styles/landing.css";

const SITE = "https://www.escoladedancajv.com/";
const SITE_SOBRE = "https://www.escoladedancajv.com/about-1";
const SITE_GALERIA = "https://www.escoladedancajv.com/galeria";
const SITE_MODALIDADES = "https://www.escoladedancajv.com/modalidades";

const IMG_BALLET = "/gallery/foto_2b9e49ae.jpg";
const IMG_CONTEMP = "/gallery/foto_552be93b.jpg";
const IMG_GROUP = "/gallery/foto_7ca9a47c.jpg";

function SocialIconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.93A3.13 3.13 0 1 1 15.13 12 3.13 3.13 0 0 1 12 15.13zM16.93 6.27a1.12 1.12 0 1 1-1.12 1.12 1.12 1.12 0 0 1 1.12-1.12zM20.4 12a8.36 8.36 0 0 1-.17 1.7 5.57 5.57 0 0 1-1.56 3.1 5.92 5.92 0 0 1-3.1 1.56 8.36 8.36 0 0 1-1.7.17H10.1a8.36 8.36 0 0 1-1.7-.17 5.57 5.57 0 0 1-3.1-1.56 5.92 5.92 0 0 1-1.56-3.1 8.36 8.36 0 0 1-.17-1.7V10.1a8.36 8.36 0 0 1 .17-1.7 5.57 5.57 0 0 1 1.56-3.1 5.92 5.92 0 0 1 3.1-1.56 8.36 8.36 0 0 1 1.7-.17h3.87a8.36 8.36 0 0 1 1.7.17 5.57 5.57 0 0 1 3.1 1.56 5.92 5.92 0 0 1 1.56 3.1 8.36 8.36 0 0 1 .17 1.7zm-1.6-6.63a3.53 3.53 0 0 0-.84-1.27A3.53 3.53 0 0 0 17.7 3.67a5.1 5.1 0 0 0-1.68-.31h-3.87a5.1 5.1 0 0 0-1.68.31 3.53 3.53 0 0 0-1.27.84 3.53 3.53 0 0 0-.84 1.27 5.1 5.1 0 0 0-.31 1.68v3.87a5.1 5.1 0 0 0 .31 1.68 3.53 3.53 0 0 0 .84 1.27 3.53 3.53 0 0 0 1.27.84 5.1 5.1 0 0 0 1.68.31h3.87a5.1 5.1 0 0 0 1.68-.31 3.53 3.53 0 0 0 1.27-.84 3.53 3.53 0 0 0 .84-1.27 5.1 5.1 0 0 0 .31-1.68v-3.87a5.1 5.1 0 0 0-.31-1.68z" />
    </svg>
  );
}

function SocialIconPinterest() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8-.1-.79-.19-2.03.04-2.9.21-.91 1.36-5.72 1.36-5.72s-.35-.7-.35-1.73c0-1.62.94-2.83 2.1-2.83.99 0 1.47.74 1.47 1.63 0 .99-.63 2.47-.96 3.84-.27 1.15.58 2.09 1.71 2.09 2.05 0 3.63-2.16 3.63-5.28 0-2.76-1.98-4.7-4.82-4.7-3.28 0-5.21 2.46-5.21 5 0 .99.38 2.05.86 2.63.09.12.11.22.08.34l-.32 1.29c-.05.2-.16.24-.37.15-1.38-.64-2.24-2.65-2.24-4.27 0-3.47 2.52-6.66 7.28-6.66 3.82 0 6.79 2.72 6.79 6.35 0 3.8-2.39 6.86-5.72 6.86-1.12 0-2.17-.58-2.53-1.27l-.69 2.63c-.25.96-.93 2.16-1.38 2.89 1.04.32 2.15.5 3.31.5 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function SocialIconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2s-.2-1.7-1-2.4c-.9-1-1.9-1-2.4-1.1C17 2.5 12 2.5 12 2.5h0s-5 0-8.1.2c-.5.1-1.5.1-2.4 1.1-.8.7-1 2.4-1 2.4S0 8.1 0 10v1.8c0 1.9.2 3.8.2 3.8s.2 1.7 1 2.4c.9 1 2.1.9 2.6 1 1.9.2 8.2.2 8.2.2s5 0 8.1-.2c.5-.1 1.5-.1 2.4-1.1.8-.7 1-2.4 1-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.5 14.5v-6l6 3-6 3z" />
    </svg>
  );
}

function SocialIconTiktok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function SocialIconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export function LandingExperience() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="edjv-wrap">
      <div className="edjv-topbar">
        <div className="edjv-topbar-inner" style={{ display: "flex", alignItems: "center", position: "relative", padding: "0 1rem", width: "100%", height: "70px", overflow: "hidden" }}>
          <img
            src="/brand/mark-purple.png"
            style={{ height: "70px", width: "auto", flexShrink: 0 }}
            alt="Logomarca EDJV"
          />
          <img
            src="/brand/logo-text.png"
            style={{ 
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) scale(1.2)",
              height: "100%", 
              width: "auto", 
              objectFit: "contain" 
            }}
            alt="Escola de Dança Joseana Vicente"
          />
        </div>
      </div>

    <section id="inicio" className="edjv-hero-wrap-section" aria-label="Topo">
      <div className="edjv-hero-wrap-inner">
        <img src="/hero-dancer.png" className="edjv-hero-dancer-img" alt="Bailarina EDJV" />
        <div className="edjv-hero-wrap-text">
          <h1>Bem vinda(o) a EDJV!</h1>
          <p className="edjv-lead">
            Mais do que passos de dança, aqui cultivamos amizades e coragem.
          </p>
        </div>
        <div className="edjv-hero-cta-center">
          <button
            type="button"
            className="edjv-btn edjv-btn-primary edjv-pulse-btn edjv-btn-lg"
            onClick={() => setChatOpen(true)}
          >
            Quero dar o primeiro passo
          </button>
        </div>
      </div>
    </section>

    <section id="por-que" className="edjv-section">
      <div className="edjv-section-inner">
        <h2>Por que escolher a EDJV?</h2>
        <div className="edjv-grid-features">
          <article className="edjv-feature">
            <h3>Família e escola juntas</h3>
            <p>
              Um ambiente acolhedor, com diálogo e cuidado para que cada aluno
              tenha uma experiência positiva.
            </p>
          </article>
          <article className="edjv-feature">
            <h3>Dança para todos os corpos</h3>
            <p>
              Inclusão e diversidade — do iniciante ao experiente, há um lugar especial para você.
            </p>
          </article>
          <article className="edjv-feature">
            <h3>Equipe dedicada</h3>
            <p>
              Professores comprometidos com a técnica, o desenvolvimento e a alegria em sala de aula.
            </p>
          </article>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <button type="button" className="edjv-btn edjv-btn-primary edjv-pulse-btn edjv-btn-lg" onClick={() => setChatOpen(true)}>
            Encontrar minha turma
          </button>
        </div>
      </div>
    </section>

    <section className="edjv-carousel-section" aria-label="Nossos Alunos">
      <div className="edjv-carousel">
        <div className="edjv-carousel-track">
          <div className="edjv-carousel-slide" style={{ backgroundImage: `url(/gallery/carousel2_3.jpg)` }} />
          <div className="edjv-carousel-slide" style={{ backgroundImage: `url(/gallery/carousel2_2.jpg)` }} />
          <div className="edjv-carousel-slide" style={{ backgroundImage: `url(/gallery/carousel2_7.jpg)` }} />
          <div className="edjv-carousel-slide" style={{ backgroundImage: `url(/gallery/carousel2_6.jpg)` }} />
        </div>
      </div>
    </section>

    <section id="atividades" className="edjv-section alt">
      <div className="edjv-section-inner">
        <h2>Modalidades</h2>

        <div className="edjv-modalities-list">
          <div className="edjv-modality-row">
            <h3 className="edjv-modality-name">Ballet clássico</h3>
            <div className="edjv-modality-photo" style={{ backgroundImage: `url(/gallery/ballet_classico.png)` }} />
          </div>
          <div className="edjv-modality-row reverse">
            <h3 className="edjv-modality-name">Jazz dance</h3>
            <div className="edjv-modality-photo" style={{ backgroundImage: `url(/gallery/jazz_dance.png)` }} />
          </div>
          <div className="edjv-modality-row">
            <h3 className="edjv-modality-name">Dança contemporânea</h3>
            <div className="edjv-modality-photo" style={{ backgroundImage: `url(/gallery/contemporanea.png)` }} />
          </div>
          <div className="edjv-modality-row reverse">
            <h3 className="edjv-modality-name">Breaking</h3>
            <div className="edjv-modality-photo" style={{ backgroundImage: `url(/gallery/breaking.png)` }} />
          </div>
          <div className="edjv-modality-row">
            <h3 className="edjv-modality-name">Jazz funk</h3>
            <div className="edjv-modality-photo" style={{ backgroundImage: `url(/gallery/jazz_funk.png)` }} />
          </div>
        </div>

        <div className="edjv-cta-strip" style={{ marginTop: "3rem" }}>
          <p>Se identificou com alguma?</p>
          <div className="edjv-cta-strip-actions">
            <button
              type="button"
              className="edjv-btn edjv-btn-primary edjv-pulse-btn"
              onClick={() => setChatOpen(true)}
            >
              Agendar aula experimental
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="localizacao" className="edjv-section alt">
      <div className="edjv-section-inner">
        <h2>Onde estamos</h2>
        <p className="edjv-section-intro">
          Duas unidades preparadas com amor no bairro <strong>José Américo</strong>, próximo à <strong>A&amp;C</strong>.
        </p>
          <div className="edjv-addresses">
            <div className="edjv-address">
              <strong>UNIDADE I</strong>
              Rua José Marques de Souza, 289 — José Américo
            </div>
            <div className="edjv-address">
              <strong>UNIDADE II</strong>
              Rua Benício de Oliveira Lima, 799 — José Américo
            </div>
          </div>
        </div>
      </section>

    <section id="galeria" className="edjv-section">
      <div className="edjv-section-inner">
        <h2>Momentos EDJV</h2>
        <p className="edjv-section-intro">
          A magia da dança nos nossos palcos e salas de aula.
        </p>
        <div className="edjv-gallery-grid">
          <div className="edjv-gallery-item" style={{ backgroundImage: `url(/gallery/foto_8b9a6a5c.jpg)` }} />
          <div className="edjv-gallery-item" style={{ backgroundImage: `url(/gallery/foto_d9beabbd.jpg)` }} />
          <div className="edjv-gallery-item" style={{ height: "auto", background: "none", padding: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "18px", overflow: "hidden" }}>
            <img src="/gallery/carousel2_5.jpg" alt="Momentos EDJV" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </div>
    </section>

    <section id="depoimentos" className="edjv-section alt">
      <div className="edjv-section-inner">
        <h2>O que dizem sobre nós</h2>
        <div className="edjv-testimonials">
          <article className="edjv-testimonial">
            <p className="stars">★★★★★</p>
            <p>
              “Acolhimento maravilhoso. Minha filha amou a aula de Ballet, as professoras são muito atenciosas!”
            </p>
            <p className="who">— Mãe de aluna</p>
          </article>
          <article className="edjv-testimonial">
            <p className="stars">★★★★★</p>
            <p>
              “Professores incríveis e um ambiente muito positivo e animado para aprender a dançar.”
            </p>
            <p className="who">— Aluna de Jazz</p>
          </article>
          <article className="edjv-testimonial">
            <p className="stars">★★★★★</p>
            <p>
              “Escola super organizada, encontramos rapidamente uma turma que se encaixou na nossa rotina.”
            </p>
            <p className="who">— Responsável</p>
          </article>
        </div>
      </div>
    </section>

    <section className="edjv-section">
      <div className="edjv-section-inner">
        <h2>Por que dançar na EDJV?</h2>
        <div className="edjv-results">
          <div className="edjv-result">Desenvolvimento motor e bem-estar</div>
          <div className="edjv-result">Aulas dinâmicas e divertidas</div>
          <div className="edjv-result">Novas amizades e comunidade forte</div>
          <div className="edjv-result">Autoconfiança através da arte</div>
        </div>
      </div>
    </section>

    <section className="edjv-final-cta">
      <div className="edjv-final-cta-inner">
        <h2>Venha fazer parte da nossa família</h2>
        <p>
          Não deixe para depois. Agende agora uma aula experimental e sinta 
          na prática a energia da nossa escola de dança.
        </p>
        <button
          type="button"
          className="edjv-btn edjv-btn-primary edjv-pulse-btn"
          onClick={() => setChatOpen(true)}
          style={{ transform: "scale(1.1)", marginTop: "1rem" }}
        >
          Agendar aula experimental
        </button>
      </div>
    </section>

      <footer className="edjv-footer-magenta">
        <div className="edjv-footer-magenta-inner">
          <div>
            <h3>Endereço</h3>
            <address>
              <div className="unit">
                <strong>UNIDADE I</strong>
                Rua José Marques de Souza, 289 — José Américo
              </div>
              <div className="unit">
                <strong>UNIDADE II</strong>
                Rua Benício de Oliveira Lima, 799 — José Américo
              </div>
            </address>
          </div>
          <div>
            <p className="edjv-footer-heading-social">
              Nos acompanhe nas redes sociais
            </p>
            <div className="edjv-social-row">
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="edjv-social-circle"
                aria-label="Instagram — site oficial EDJV"
                title="Redes no site oficial"
              >
                <SocialIconInstagram />
              </a>
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="edjv-social-circle"
                aria-label="Pinterest — site oficial EDJV"
              >
                <SocialIconPinterest />
              </a>
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="edjv-social-circle"
                aria-label="YouTube — site oficial EDJV"
              >
                <SocialIconYoutube />
              </a>
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="edjv-social-circle"
                aria-label="TikTok — site oficial EDJV"
              >
                <SocialIconTiktok />
              </a>
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="edjv-social-circle"
                aria-label="Facebook — site oficial EDJV"
              >
                <SocialIconFacebook />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="edjv-footer-legal">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href={SITE} target="_blank" rel="noreferrer">
            Escola de Dança Joseana Vicente
          </a>
          .
        </p>
      </div>

      <EnrollmentChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
