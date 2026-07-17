"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Segment = "imobiliarias" | "escritorios";
type IconName =
  | "building"
  | "briefcase"
  | "clock"
  | "shield"
  | "coins"
  | "file"
  | "check"
  | "arrow"
  | "scale"
  | "users"
  | "laptop"
  | "spark";

const segmentContent: Record<
  Segment,
  {
    eyebrow: string;
    title: string;
    description: string;
    icon: IconName;
    cases: { icon: IconName; title: string; text: string }[];
  }
> = {
  imobiliarias: {
    eyebrow: "Para imobiliárias",
    title: "Menos tempo com conflitos. Mais energia para administrar imóveis.",
    description:
      "Defina nos contratos uma forma mais previsível de resolver disputas entre locadores, locatários e administradoras.",
    icon: "building",
    cases: [
      {
        icon: "coins",
        title: "Inadimplência e cobrança",
        text: "Organize a resolução de valores em atraso sem depender de um processo que pode levar anos.",
      },
      {
        icon: "file",
        title: "Distratos e contratos",
        text: "Resolva desacordos de locação, compra e venda com um procedimento definido desde o contrato.",
      },
      {
        icon: "shield",
        title: "Relação locador–locatário",
        text: "Reduza desgaste e preserve a relação comercial com uma condução imparcial e digital.",
      },
    ],
  },
  escritorios: {
    eyebrow: "Para escritórios de advocacia",
    title: "Uma via mais ágil para ampliar as soluções oferecidas aos clientes.",
    description:
      "Conduza disputas contratuais com prazos e custos mais previsíveis, mantendo o cliente acompanhado em cada etapa.",
    icon: "briefcase",
    cases: [
      {
        icon: "spark",
        title: "Nova frente de atuação",
        text: "Inclua a arbitragem digital no portfólio e ofereça uma alternativa adicional para conflitos contratuais.",
      },
      {
        icon: "laptop",
        title: "Operação digital",
        text: "Centralize documentos e acompanhe os procedimentos sem deslocamentos ou processos físicos.",
      },
      {
        icon: "clock",
        title: "Prazos mais previsíveis",
        text: "Planeje a estratégia jurídica com um fluxo definido e comunicação clara entre as partes.",
      },
    ],
  },
};

const faqs = [
  {
    question: "O que é uma câmara de arbitragem digital?",
    answer:
      "É uma instituição privada que administra procedimentos arbitrais. A Arbitralis oferece a plataforma, a secretaria e os regulamentos; a decisão é tomada por um árbitro independente e imparcial.",
  },
  {
    question: "Como incluir a arbitragem nos contratos?",
    answer:
      "A cláusula arbitral deve ser prevista no contrato e aceita pelas partes. Contratos existentes também podem receber um aditivo. A redação e a aplicação devem ser avaliadas conforme cada relação contratual.",
  },
  {
    question: "Preciso de advogado para iniciar um procedimento?",
    answer:
      "A necessidade pode variar conforme o caso e o regulamento aplicável. Mesmo quando não é obrigatória, a orientação jurídica pode ajudar as partes a apresentar documentos e argumentos com mais segurança.",
  },
  {
    question: "A decisão arbitral tem validade jurídica?",
    answer:
      "A arbitragem é reconhecida pela Lei nº 9.307/1996. A sentença arbitral é vinculante para as partes e pode ser executada judicialmente quando não houver cumprimento voluntário.",
  },
  {
    question: "Todo conflito pode ser resolvido por arbitragem?",
    answer:
      "Não. A arbitragem é destinada a conflitos relacionados a direitos patrimoniais disponíveis e depende de convenção arbitral válida entre as partes. Cada situação deve ser analisada individualmente.",
  },
];

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    building: (
      <>
        <path d="M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
        <path d="M16 9h3a1 1 0 0 1 1 1v11M8 7h4M8 11h4M8 15h4M9 21v-2h2v2M2 21h20" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    scale: (
      <>
        <path d="M12 3v18M6 6h12M5 6l-3 7h6L5 6ZM19 6l-3 7h6l-3-7ZM8 21h8" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
      </>
    ),
    laptop: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="1" />
        <path d="M2 19h20M9 19h6" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 3l.7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7L5 3Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`logo ${inverse ? "logo-inverse" : ""}`} href="#top" aria-label="Arbitralis — início">
      <Image
        className="brand-logo"
        src="/logo-arbitralis.svg"
        alt="Arbitralis — Câmara de Arbitragem"
        width={353}
        height={90}
        priority
      />
    </a>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [segment, setSegment] = useState<Segment>("imobiliarias");
  const [claimValue, setClaimValue] = useState(80000);
  const [stateFee, setStateFee] = useState(1500);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const estimate = useMemo(() => {
    const traditional = Math.round(stateFee + claimValue * 0.18);
    const arbitration = Math.round(1100 + claimValue * 0.04);
    const saved = Math.max(0, traditional - arbitration);
    const percentage = traditional ? Math.round((saved / traditional) * 100) : 0;
    return { traditional, arbitration, saved, percentage };
  }, [claimValue, stateFee]);

  const activeSegment = segmentContent[segment];

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#solucoes">Soluções</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#simulador">Simulador</a>
            <a href="#faq">Perguntas frequentes</a>
          </nav>
          <a className="button button-small" href="#contato">
            Falar com especialista <Icon name="arrow" size={17} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy hero-enter hero-enter-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> Para imobiliárias e escritórios de advocacia</span>
              <h1 id="hero-title">
                Resolva conflitos imobiliários e contratuais com mais <em>rapidez e previsibilidade.</em>
              </h1>
              <p className="hero-subtitle">
                Uma câmara de arbitragem 100% digital para imobiliárias e escritórios que buscam reduzir burocracia, custos e tempo de resolução.
              </p>
              <div className="hero-actions">
                <a className="button" href="#contato">Falar com um especialista <Icon name="arrow" size={18} /></a>
                <a className="button button-secondary" href="#simulador">Simular minha economia</a>
              </div>
              <ul className="hero-checks" aria-label="Diferenciais">
                <li><Icon name="check" size={16} /> Processo 100% online</li>
                <li><Icon name="check" size={16} /> Custos mais previsíveis</li>
              </ul>
            </div>

            <div className="hero-visual hero-enter hero-enter-visual" aria-label="Representação da plataforma Arbitralis">
              <div className="dashboard-card">
                <div className="dashboard-top">
                  <div>
                    <span className="micro-label">ACOMPANHAMENTO DO CASO</span>
                    <strong>Procedimento arbitral</strong>
                  </div>
                  <span className="status-pill"><span /> Em andamento</span>
                </div>
                <div className="progress-line"><span /></div>
                <div className="timeline">
                  <div className="timeline-item complete">
                    <span className="timeline-icon"><Icon name="check" size={14} /></span>
                    <div><small>Etapa 01</small><strong>Protocolo recebido</strong><p>Documentos enviados com segurança.</p></div>
                  </div>
                  <div className="timeline-item active">
                    <span className="timeline-icon"><Icon name="users" size={14} /></span>
                    <div><small>Etapa 02</small><strong>Análise do árbitro</strong><p>As partes acompanham tudo online.</p></div>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-icon"><Icon name="scale" size={14} /></span>
                    <div><small>Etapa 03</small><strong>Decisão arbitral</strong><p>Conclusão com validade jurídica.</p></div>
                  </div>
                </div>
              </div>
              <div className="float-card float-time">
                <span className="float-icon"><Icon name="clock" size={19} /></span>
                <div><small>Prazo médio divulgado</small><strong>Até 30 dias*</strong></div>
              </div>
              <div className="float-card float-security">
                <span className="float-icon"><Icon name="shield" size={19} /></span>
                <div><small>Ambiente</small><strong>Seguro e confidencial</strong></div>
              </div>
            </div>
          </div>
          <div className="container hero-disclaimer">*Prazo sujeito ao regulamento aplicável, à complexidade e à disponibilidade dos documentos.</div>
        </section>

        <section className="proof-strip" aria-label="Resultados e diferenciais">
          <div className="container proof-grid" data-reveal>
            <div className="proof-item"><strong>+10 mil</strong><span>processos resolvidos</span></div>
            <div className="proof-divider" />
            <div className="proof-item"><strong>100%</strong><span>digital, do início ao fim</span></div>
            <div className="proof-divider" />
            <div className="proof-item"><strong>Até 80%</strong><span>de economia divulgada</span></div>
            <div className="proof-divider" />
            <div className="proof-item"><strong>Lei 9.307</strong><span>segurança jurídica</span></div>
          </div>
        </section>

        <section className="section audience-section" id="solucoes">
          <div className="container" data-reveal>
            <div className="section-heading centered">
              <span className="eyebrow">Soluções para sua operação</span>
              <h2>Como a Arbitralis pode ajudar o seu negócio?</h2>
              <p>Escolha seu perfil para conhecer situações em que a arbitragem digital pode trazer mais clareza e previsibilidade.</p>
            </div>

            <div className="segment-tabs" role="tablist" aria-label="Escolha seu perfil">
              <button
                role="tab"
                aria-selected={segment === "imobiliarias"}
                className={segment === "imobiliarias" ? "active" : ""}
                onClick={() => setSegment("imobiliarias")}
              >
                <Icon name="building" size={20} /> Sou uma imobiliária
              </button>
              <button
                role="tab"
                aria-selected={segment === "escritorios"}
                className={segment === "escritorios" ? "active" : ""}
                onClick={() => setSegment("escritorios")}
              >
                <Icon name="briefcase" size={20} /> Sou um escritório
              </button>
            </div>

            <div className="segment-panel" role="tabpanel" aria-live="polite">
              <div className="segment-intro">
                <span className="segment-icon"><Icon name={activeSegment.icon} size={28} /></span>
                <span className="micro-label">{activeSegment.eyebrow}</span>
                <h3>{activeSegment.title}</h3>
                <p>{activeSegment.description}</p>
                <a className="text-link" href="#contato">Conversar sobre minha operação <Icon name="arrow" size={17} /></a>
              </div>
              <div className="case-list">
                {activeSegment.cases.map((item) => (
                  <article className="case-card" key={item.title}>
                    <span className="case-icon"><Icon name={item.icon} size={21} /></span>
                    <div><h4>{item.title}</h4><p>{item.text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section comparison-section">
          <div className="container comparison-grid" data-reveal>
            <div className="comparison-copy">
              <span className="eyebrow eyebrow-dark">Uma alternativa ao processo tradicional</span>
              <h2>Seu jurídico precisa de soluções no tempo do seu negócio.</h2>
              <p>A arbitragem estabelece um caminho privado para conflitos contratuais, com procedimento digital e regras conhecidas pelas partes.</p>
              <a className="button button-light" href="#como-funciona">Entender como funciona <Icon name="arrow" size={18} /></a>
            </div>
            <div className="comparison-table" role="table" aria-label="Comparação entre processo tradicional e Arbitralis">
              <div className="comparison-head" role="row">
                <span role="columnheader">Processo tradicional</span>
                <span role="columnheader"><i className="mini-mark" /> Arbitralis</span>
              </div>
              {[
                ["Prazos pouco previsíveis", "Procedimento com etapas definidas"],
                ["Custos acumulados no tempo", "Taxas apresentadas previamente"],
                ["Etapas presenciais e burocracia", "Acompanhamento 100% digital"],
                ["Relação mais desgastante", "Condução privada e imparcial"],
              ].map(([traditional, arbitralis]) => (
                <div className="comparison-row" role="row" key={traditional}>
                  <span role="cell"><b>×</b>{traditional}</span>
                  <span role="cell"><i><Icon name="check" size={14} /></i>{arbitralis}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="como-funciona">
          <div className="container" data-reveal>
            <div className="section-heading centered compact">
              <span className="eyebrow">Do contrato à resolução</span>
              <h2>Um caminho mais simples para conflitos complexos.</h2>
              <p>A cláusula arbitral define previamente como uma eventual disputa será conduzida.</p>
            </div>
            <div className="steps-grid">
              <article className="step-card">
                <span className="step-number">01</span>
                <span className="step-icon"><Icon name="file" size={24} /></span>
                <h3>Inclua a cláusula</h3>
                <p>Defina a Arbitralis nos novos contratos ou, quando aplicável, por meio de aditivo aceito pelas partes.</p>
              </article>
              <span className="step-arrow" aria-hidden="true"><Icon name="arrow" size={23} /></span>
              <article className="step-card featured">
                <span className="step-number">02</span>
                <span className="step-icon"><Icon name="laptop" size={24} /></span>
                <h3>Inicie pela plataforma</h3>
                <p>Quando houver conflito, envie os documentos e acompanhe as etapas em um ambiente digital.</p>
              </article>
              <span className="step-arrow" aria-hidden="true"><Icon name="arrow" size={23} /></span>
              <article className="step-card">
                <span className="step-number">03</span>
                <span className="step-icon"><Icon name="scale" size={24} /></span>
                <h3>Receba a decisão</h3>
                <p>Um árbitro independente analisa as provas e conduz o procedimento conforme o regulamento.</p>
              </article>
            </div>
            <div className="process-note"><Icon name="shield" size={18} /> A Arbitralis administra o procedimento. As decisões são tomadas por árbitros independentes.</div>
          </div>
        </section>

        <section className="section calculator-section" id="simulador">
          <div className="container calculator-grid" data-reveal>
            <div className="calculator-copy">
              <span className="eyebrow">Simulador de custos jurídicos</span>
              <h2>Visualize o impacto de escolher um caminho mais eficiente.</h2>
              <p>Faça uma simulação conceitual e compare cenários de custo. Os valores desta versão são ilustrativos e não representam proposta comercial.</p>
              <ul className="benefit-list">
                <li><span><Icon name="check" size={15} /></span> Comparação em poucos segundos</li>
                <li><span><Icon name="check" size={15} /></span> Cenário ajustado ao valor da causa</li>
                <li><span><Icon name="check" size={15} /></span> Próximo passo claro para sua equipe</li>
              </ul>
            </div>
            <div className="calculator-card">
              <div className="calculator-title"><span className="calc-icon"><Icon name="coins" size={21} /></span><div><strong>Calcule uma estimativa</strong><small>Simulação demonstrativa</small></div></div>
              <label htmlFor="claim-value">Valor estimado da causa</label>
              <div className="currency-input"><span>R$</span><input id="claim-value" type="number" min="1000" max="1000000" step="1000" value={claimValue} onChange={(e) => setClaimValue(Math.max(1000, Number(e.target.value) || 1000))} /></div>
              <input className="range" aria-label="Ajustar valor da causa" type="range" min="1000" max="500000" step="1000" value={Math.min(claimValue, 500000)} onChange={(e) => setClaimValue(Number(e.target.value))} />
              <div className="range-labels"><span>R$ 1 mil</span><span>R$ 500 mil</span></div>
              <label htmlFor="state-fee">Estado de referência</label>
              <select id="state-fee" value={stateFee} onChange={(e) => setStateFee(Number(e.target.value))}>
                <option value="1500">São Paulo</option>
                <option value="1509">Minas Gerais</option>
                <option value="3802">Rio de Janeiro</option>
                <option value="1606">Paraná</option>
                <option value="2500">Rio Grande do Sul</option>
              </select>
              <div className="results-grid">
                <div className="result muted"><small>Cenário tradicional*</small><strong>{formatCurrency(estimate.traditional)}</strong></div>
                <div className="result brand"><small>Cenário arbitral*</small><strong>{formatCurrency(estimate.arbitration)}</strong></div>
              </div>
              <div className="saving-result"><div><small>Economia ilustrativa</small><strong>{formatCurrency(estimate.saved)}</strong></div><span>{estimate.percentage}%</span></div>
              <a className="button calculator-button" href="#contato">Conversar sobre este cenário <Icon name="arrow" size={18} /></a>
              <p className="fine-print">*Estimativa criada apenas para demonstrar a experiência do protótipo. Custos reais dependem do regulamento e do caso.</p>
            </div>
          </div>
        </section>

        <section className="section authority-section">
          <div className="container" data-reveal>
            <div className="authority-card">
              <div className="authority-content">
                <span className="eyebrow eyebrow-dark">Confiança para decidir melhor</span>
                <h2>Experiência jurídica com uma operação pensada para o digital.</h2>
                <p>A Arbitralis combina regulamentos, secretaria especializada e tecnologia para tornar cada etapa mais compreensível.</p>
                <div className="authority-points">
                  <span><Icon name="shield" size={18} /> Imparcialidade</span>
                  <span><Icon name="users" size={18} /> Árbitros selecionados</span>
                  <span><Icon name="laptop" size={18} /> Acompanhamento online</span>
                </div>
              </div>
              <figure className="authority-media">
                <figcaption>
                  <span><Icon name="users" size={17} /> Suporte em cada etapa</span>
                  <strong>Tecnologia com acompanhamento humano.</strong>
                  <a href="https://unsplash.com/photos/business-professionals-collaborating-in-a-modern-office-meeting-7Nu4atuZN1U" target="_blank" rel="noreferrer">Foto: Vitaly Gariev / Unsplash</a>
                </figcaption>
              </figure>
            </div>
            <div className="logo-cloud">
              <span>Reconhecida e presente em</span>
              <div className="trust-logos" aria-label="Marcas e veículos relacionados à Arbitralis">
                <Image className="trust-logo trust-logo-secovi" src="/logo-secovi.svg" alt="SECOVI-SP" width={447} height={118} />
                <Image className="trust-logo trust-logo-valor" src="/logo-valor-economico.svg" alt="Valor Econômico" width={569} height={200} />
                <Image className="trust-logo trust-logo-lide" src="/logo-revista-lide.svg" alt="Revista LIDE" width={525} height={119} />
                <Image className="trust-logo trust-logo-apolice" src="/logo-apolice.svg" alt="Apólice" width={1920} height={496} />
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-grid" data-reveal>
            <div className="faq-copy">
              <span className="eyebrow">Perguntas frequentes</span>
              <h2>Segurança começa com informação clara.</h2>
              <p>Reunimos respostas para as dúvidas mais comuns antes de implementar a arbitragem.</p>
              <a className="text-link" href="#contato">Ainda tenho uma dúvida <Icon name="arrow" size={17} /></a>
            </div>
            <div className="accordion-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary><span>{faq.question}</span><i aria-hidden="true">+</i></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" id="contato">
          <div className="cta-decoration cta-decoration-one" />
          <div className="cta-decoration cta-decoration-two" />
          <div className="container final-cta-inner" data-reveal>
            <span className="eyebrow eyebrow-dark">Próximo passo</span>
            <h2>Seus contratos já estão preparados para resolver conflitos com mais previsibilidade?</h2>
            <p>Converse com um especialista e entenda como implementar a cláusula arbitral na sua operação.</p>
            <div className="hero-actions centered-actions">
              <a className="button button-white" href="https://www.arbitralis.com.br/contato" target="_blank" rel="noreferrer">Falar com um especialista <Icon name="arrow" size={18} /></a>
              <a className="button button-outline-light" href="https://www.arbitralis.com.br/como-implementar" target="_blank" rel="noreferrer">Ver como implementar</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid" data-reveal>
          <div className="footer-brand"><Logo inverse /><p>Tecnologia a serviço da justiça. Resolução de conflitos ágil e definitiva com arbitragem digital.</p></div>
          <div><strong>Arbitralis</strong><a href="#solucoes">Soluções</a><a href="#como-funciona">Como funciona</a><a href="#simulador">Simulador</a></div>
          <div><strong>Documentos</strong><a href="https://www.arbitralis.com.br/como-implementar">Como implementar</a><a href="https://www.arbitralis.com.br/regulamentos">Regulamentos</a><a href="https://plataforma.arbitralis.com.br/">Validar documento</a></div>
          <div><strong>Ajuda</strong><a href="#faq">Perguntas frequentes</a><a href="https://www.arbitralis.com.br/contato">Contato</a><a href="https://www.arbitralis.com.br/politica-de-privacidade">Privacidade</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Arbitralis. Protótipo conceitual para processo seletivo.</span><a href="#top">Voltar ao topo ↑</a></div>
      </footer>
    </>
  );
}
