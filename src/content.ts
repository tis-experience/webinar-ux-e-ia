/* Conteúdo do webinar "UX e IA". Textos iguais aos do deck "Webinar UX e IA (Versão Final)"; a ordem dos ecrãs
   está em STEPS e cada passo diz a cena que o mostra. Passos seguidos com a mesma cena não trocam de ecrã: os
   objectos dessa cena evoluem de um passo para o seguinte. */

export type Step = {
  id: string;
  scene: string;
  label: string;
  build?: number;
  bg: string;
  dark?: boolean;
};

const LIGHT = "#f1f5f9";
/** Fundo das perguntas do moderador no bloco da Sara (Tema 2). */
const NAVY = "#143b8b";

export const STEPS: Step[] = [
  {
    id: "capa",
    scene: "capa",
    label: "Capa",
    bg: "#0b2aa8",
    dark: true,
  },
  {
    id: "introducao",
    scene: "intro",
    label: "A IA acelerou tudo",
    bg: "#f8fafc",
  },
  {
    id: "oradores",
    scene: "oradores",
    label: "Oradores",
    bg: "#f8fafc",
  },
  {
    id: "tema-1",
    scene: "pergunta",
    build: 0,
    label: "Tema 1",
    bg: "#0065ed",
    dark: true,
  },
  {
    id: "processo-tradicional",
    scene: "processo",
    build: 0,
    label: "O processo de UX tradicional",
    bg: LIGHT,
  },
  {
    id: "abordagem-1",
    scene: "processo",
    build: 1,
    label: "Abordagem 1",
    bg: LIGHT,
  },
  {
    id: "abordagem-2",
    scene: "processo",
    build: 2,
    label: "Abordagem 2",
    bg: LIGHT,
  },
  {
    id: "abordagem-3",
    scene: "processo",
    build: 3,
    label: "Abordagem 3",
    bg: LIGHT,
  },
  {
    id: "comparacao",
    scene: "comparacao",
    label: "As três abordagens lado a lado",
    bg: LIGHT,
  },
  {
    id: "na-pratica",
    scene: "pergunta",
    build: 1,
    label: "Como se constrói com IA na prática?",
    bg: "#334155",
    dark: true,
  },
  {
    id: "fonte-unica",
    scene: "fonte",
    label: "Contexto numa fonte única",
    bg: LIGHT,
  },
  {
    id: "harness",
    scene: "harness",
    build: 0,
    label: "Harness e Design System",
    bg: LIGHT,
  },
  {
    id: "composicao-do-harness",
    scene: "harness",
    build: 1,
    label: "A composição do harness",
    bg: LIGHT,
  },
  {
    id: "na-pratica-exemplo",
    scene: "exemplo",
    label: "Na prática",
    bg: LIGHT,
  },
  {
    id: "ganhos",
    scene: "pergunta",
    build: 2,
    label: "Que ganhos práticos se obtêm?",
    bg: "#334155",
    dark: true,
  },
  {
    id: "consistencia",
    scene: "consistencia",
    label: "Consistência de raiz",
    bg: LIGHT,
  },
  {
    id: "validacao",
    scene: "validacao",
    label: "Validação com protótipos funcionais",
    bg: LIGHT,
  },
  {
    id: "zero-handoff",
    scene: "handoff",
    label: "Zero handoff",
    bg: LIGHT,
  },
  {
    id: "tema-2",
    scene: "pergunta",
    build: 3,
    label: "Tema 2",
    bg: "#0065ed",
    dark: true,
  },
  {
    id: "criatividade",
    scene: "topico",
    build: 0,
    label: "Como continuar criativos com IA?",
    bg: NAVY,
    dark: true,
  },
  {
    id: "tres-regras",
    scene: "regras",
    label: "Três regras para não ficarmos todos iguais",
    bg: LIGHT,
  },
  {
    id: "processo-criativo",
    scene: "topico",
    build: 1,
    label: "Como funciona o processo criativo?",
    bg: NAVY,
    dark: true,
  },
  {
    id: "inspiracao-e-ferramentas",
    scene: "criativo",
    label: "Inspiração, tendências e ferramentas",
    bg: LIGHT,
  },
  {
    id: "diferencial",
    scene: "diferencial",
    label: "O diferencial de inovação",
    bg: LIGHT,
  },
  {
    id: "casos-na-pratica",
    scene: "topico",
    build: 2,
    label: "Como é que isto funciona na prática?",
    bg: NAVY,
    dark: true,
  },
  {
    id: "tres-casos",
    scene: "casos",
    label: "Três casos reais da TIS",
    bg: LIGHT,
  },
  {
    id: "somos-tis",
    scene: "video",
    build: 0,
    label: "Caso 1: Somos TIS",
    bg: LIGHT,
  },
  {
    id: "agente-de-rh",
    scene: "video",
    build: 1,
    label: "Caso 1: o agente de RH",
    bg: LIGHT,
  },
  {
    id: "somos-tis-inovacao",
    scene: "inovacao",
    label: "Caso 1: o que tem de inovador",
    bg: LIGHT,
  },
  {
    id: "jardim-da-luma",
    scene: "video",
    build: 2,
    label: "Caso 2: Jardim da Luma",
    bg: LIGHT,
  },
  {
    id: "luma-ia",
    scene: "luma",
    label: "Caso 2: a IA na Luma",
    bg: LIGHT,
  },
  {
    id: "cleo",
    scene: "video",
    build: 3,
    label: "Caso 3: Cleo",
    bg: LIGHT,
  },
  {
    id: "cleo-passos",
    scene: "passos",
    label: "Caso 3: como foi feita a Cleo",
    bg: LIGHT,
  },
  {
    id: "licoes",
    scene: "licoes",
    label: "Três casos, três lições",
    bg: LIGHT,
  },
  {
    id: "para-levar",
    scene: "levar",
    label: "Para levar daqui",
    bg: "#0065ed",
    dark: true,
  },
  {
    id: "perguntas",
    scene: "pergunta",
    build: 4,
    label: "Perguntas",
    bg: "#0065ed",
    dark: true,
  },
  {
    id: "obrigado",
    scene: "fecho",
    label: "Obrigado",
    bg: "#0f172a",
    dark: true,
  },
];

/** Os ecrãs de pergunta (chamadas aos temas e transições): o símbolo roda e a frase troca entre eles. */
export const QUESTIONS = [
  { kicker: "Tema 1", lines: ["Como entregar melhores", "experiências num", "mundo acelerado?"], accent: "#8ec6fd", mark: "#0050da" },
  { kicker: "Do processo à prática", lines: ["Como se constrói", "com IA na prática?"], accent: "#94a3b8", mark: "#475569" },
  { kicker: "Os resultados práticos", lines: ["Que ganhos práticos", "se obtêm com", "este processo?"], accent: "#94a3b8", mark: "#475569" },
  { kicker: "Tema 2", lines: ["Como inovar num", "mundo acelerado?"], lead: "Da prototipagem ao produto", accent: "#8ec6fd", mark: "#0050da" },
  { kicker: "Webinar UX e IA", lines: ["Perguntas"], lead: "Envie a sua pergunta pelo chat. Os oradores respondem a seguir.", accent: "#eef6ff", mark: "#0050da", chat: true },
];

/** Perguntas do moderador no Tema 2: ecrãs de título do assunto, com as aspas antes da pergunta e o logótipo branco
 *  no rodapé, sem o símbolo grande das capas. */
export const TOPICS = [
  ["Como continuar", "criativos com IA?"],
  ["Como funciona o", "processo criativo?"],
  ["Como é que isto", "funciona na prática?"],
];

export const SPEAKERS = [
  {
    name: "Marcell da Silva",
    role: "Núcleo de Experiência da TIS",
    bio: "Lidera o trabalho de UX nos projectos da TIS. Há 20 anos cria produtos digitais e hoje trabalha na integração da UX com a IA, aproximando design, negócio e tecnologia.",
    initials: "MS",
    photo: true,
  },
  {
    name: "Sara Guerreiro",
    role: "Laboratório de Inovação da TIS",
    bio: "Especialista em UX/UI, transforma tendências em produtos reais no Laboratório de Inovação da TIS. Há mais de 15 anos trabalha em Marketing, UX/UI e Direcção Criativa em Angola.",
    initials: "SG",
    photo: true,
  },
];

export const PHASES = [
  { icon: "search", name: "Compreender", trad: "Entrevistas e pesquisa analisadas à mão", ai: "Encontra padrões nas entrevistas" },
  { icon: "book", name: "Definir", trad: "Requisitos escritos em documentos separados", ai: "Ajuda a detalhar os requisitos" },
  { icon: "code", name: "Prototipar", trad: "Ecrãs desenhados um a um, como imagem", ai: "Compõe ecrãs com o Design System" },
  { icon: "users", name: "Validar", trad: "Poucas alternativas testadas, por falta de tempo", ai: "Amplia as alternativas testadas" },
  { icon: "wrench", name: "Construir", trad: "O desenvolvimento reinterpreta o protótipo em código", ai: "Converte o protótipo validado em código de produção" },
];

export const PROCESS_HEADS = [
  { kicker: "Sem uso de IA", title: "O processo de UX tradicional", bar: "Cada etapa espera pela anterior, e a maior parte do tempo vai para produzir." },
  { kicker: "Abordagem 1", title: "O processo de UX acelerado por IA", bar: "Em cada etapa a IA contribui de forma diferente, e a equipa revê e decide." },
  { kicker: "Abordagem 2", title: "Um processo compacto, sobre uma base partilhada", bar: "" },
  { kicker: "Abordagem 3", title: "Hiperpersonalização: a solução aprende com cada pessoa", bar: "" },
];

export const FRONTS = [
  { name: "Entender", text: "Dados de uso e personas sintéticas antecipam necessidades" },
  { name: "Criar", text: "Ecrãs compostos em código com o Design System" },
  { name: "Validar", text: "Testes com pessoas reais e métricas, em ciclo contínuo" },
];

export const APPROACHES = [
  { n: "Abordagem 1", name: "Etapas aceleradas", from: 20, to: 30, cap: "mais rápido da ideia à entrega", dots: 1, gain: "Mais tempo para compreender e validar" },
  { n: "Abordagem 2", name: "Base partilhada", from: 40, to: 50, cap: "mais rápido da ideia à entrega", dots: 2, gain: "Validação contínua com pessoas reais*", note: "*Se a validação com pessoas reais se mantiver em todo o ciclo" },
  { n: "Abordagem 3", name: "Hiperpersonalização", plus: 50, cap: "mais rápido, com a base já montada", dots: 3, gain: "Uma experiência própria para cada pessoa" },
];

export const SOURCE_ITEMS = [
  { icon: "users", text: "Necessidades dos utilizadores" },
  { icon: "book", text: "Requisitos" },
  { icon: "key", text: "Decisões" },
  { icon: "check-circle", text: "Critérios de aceitação" },
  { icon: "code", text: "Protótipo" },
];

export const HARNESS_ITEMS = [
  { icon: "book", text: "Instruções" },
  { icon: "database", text: "Contexto do projecto" },
  { icon: "scale", text: "Regras de negócio" },
  { icon: "puzzle", text: "Features" },
  { icon: "sliders", text: "Ferramentas permitidas" },
  { icon: "check-circle", text: "Verificações automáticas" },
  { icon: "flask", text: "Casos de teste" },
];

export const AGENTS_LINES: { kind: string; group: "ref" | "sempre" | "nunca" | ""; text: string; path?: string }[] = [
  { kind: "h1", group: "ref", text: "# Referências" },
  { kind: "li", group: "ref", text: "Design System: ", path: "design-system/tokens.json" },
  { kind: "li", group: "ref", text: "Componentes: ", path: "design-system/components/" },
  { kind: "li", group: "ref", text: "Acessibilidade: ", path: "docs/acessibilidade.md" },
  { kind: "li", group: "ref", text: "Ecrãs aprovados: ", path: "figma/aprovados" },
  { kind: "li", group: "ref", text: "Tom de voz: ", path: "docs/tom-de-voz.md" },
  { kind: "sp", group: "", text: "" },
  { kind: "h2g", group: "sempre", text: "## Fazer" },
  { kind: "li", group: "sempre", text: "Usar só componentes e tokens do Design System" },
  { kind: "li", group: "sempre", text: "Prever estados de erro, vazio e carregamento" },
  { kind: "li", group: "sempre", text: "Ligar cada ecrã a um requisito da fonte única" },
  { kind: "sp", group: "", text: "" },
  { kind: "h2r", group: "nunca", text: "## Não fazer" },
  { kind: "li", group: "nunca", text: "Inventar componentes, cores ou tamanhos" },
  { kind: "li", group: "nunca", text: "Usar valores fora dos tokens" },
  { kind: "li", group: "nunca", text: "Alterar fluxos aprovados sem critério de aceitação" },
];

export const RULES = [
  { group: "ref", kind: "Referências", text: "Onde a IA vai buscar o contexto antes de produzir qualquer ecrã", tone: "blue" },
  { group: "sempre", kind: "Fazer", text: "Regras que todo o resultado tem de cumprir", tone: "green" },
  { group: "nunca", kind: "Não fazer", text: "Limites que a IA não pode ultrapassar", tone: "red" },
] as const;

export const PANELS = ["1. Contexto e regras (harness)", "2. Design System", "3. Ecrã construído pela IA"];

export const BENEFITS = [
  { icon: "zap", title: "Actualizações mais rápidas", text: "Muda um componente ou token no Design System, muda em todos os ecrãs." },
  { icon: "users", title: "Acessibilidade incluída", text: "Contraste, foco e estados de erro, vazio e carregamento previstos desde o início." },
  { icon: "check-circle", title: "Verificação automática", text: "Os desvios ao Design System são detectados antes de o trabalho chegar à equipa." },
];

/** Temas do Design System: cada um muda a cor e também a forma e o estilo das peças (raios, contorno, campos, sombras): plano, estilo Apple, Material Design e minimalista. */
export const TOKENS = [
  { name: "Azul TIS, plano", main: "#0065ed", light: "#8ec6fd", soft: "#daeafe", card: 14, btn: 10, dot: 9, field: 8, tile: 8, outline: false, fieldStyle: "box", look: "flat" },
  { name: "Índigo, estilo Apple", main: "#5856d6", light: "#aeadf0", soft: "#e9e9f8", card: 18, btn: 12, dot: 9, field: 10, tile: 12, outline: false, fieldStyle: "box", look: "apple" },
  { name: "Verde, Material Design", main: "#00796b", light: "#80cbc4", soft: "#d7efec", card: 12, btn: 15, dot: 9, field: 4, tile: 12, outline: false, fieldStyle: "line", look: "material" },
  { name: "Grafite, minimalista", main: "#111827", light: "#9ca3af", soft: "#f3f4f6", card: 0, btn: 0, dot: 0, field: 0, tile: 0, outline: false, fieldStyle: "line", look: "minimal" },
];

export const VALIDATION_CARDS = [
  { icon: "users", title: "Testar com pessoas reais", text: "Observar como usam o produto em situações reais." },
  { icon: "star", title: "Comparar alternativas", text: "Várias versões testadas lado a lado, para escolher a melhor." },
  { icon: "chart", title: "Decidir pelos dados", text: "As métricas de uso orientam cada decisão." },
];

/* ── Tema 2: a parte da Sara (da prototipagem ao produto) ─────────────── */

export const CREATIVE_RULES = [
  { n: "01", title: "Pensa antes de pedir", text: "Esboça ou define a ideia antes do primeiro prompt, para que o ponto de partida seja teu." },
  { n: "02", title: "Usa a IA para abrir", text: "Pede vários caminhos de uma vez e explora primeiro os mais inesperados." },
  { n: "03", title: "Fecha com critério", text: "A IA dá opções, mas quem decide é o teu gosto, o contexto e as pessoas para quem crias." },
];

/** O quadro do processo criativo. `used` marca as ferramentas usadas nos casos que se mostram a seguir. */
export const CREATIVE_COLUMNS: { icon: string; title: string; sub: string; rows: { label: string; items: { name: string; used?: boolean }[] }[] }[] = [
  {
    icon: "eye",
    title: "Inspiração",
    sub: "Sugestões de referências",
    rows: [
      { label: "Apps e interfaces", items: [{ name: "Mobbin" }, { name: "Refero" }] },
      { label: "Visual e branding", items: [{ name: "Dribbble" }, { name: "Behance" }, { name: "Pinterest" }] },
      { label: "Sites e motion", items: [{ name: "Awwwards" }, { name: "Recent" }] },
      { label: "Cor e tipografia", items: [{ name: "Coolors" }, { name: "Typewolf" }] },
    ],
  },
  {
    icon: "trend",
    title: "Tendências",
    sub: "Sugestões de pesquisas",
    rows: [
      { label: "Diárias", items: [{ name: "Muzli" }, { name: "LinkedIn" }] },
      { label: "Semanais", items: [{ name: "Product Hunt" }, { name: "Newsletters" }] },
      { label: "Mensais", items: [{ name: "Nielsen Norman Group" }] },
      { label: "Todos os anos", items: [{ name: "Relatórios" }, { name: "Web Summit" }] },
    ],
  },
  {
    icon: "sparkles",
    title: "Ferramentas de IA",
    sub: "Sugestões por tipo",
    rows: [
      { label: "Ideias e escrita", items: [{ name: "ChatGPT", used: true }, { name: "Claude", used: true }, { name: "Gemini" }] },
      { label: "Imagem", items: [{ name: "Firefly", used: true }, { name: "Midjourney" }, { name: "Nano Banana", used: true }] },
      { label: "Interface e código", items: [{ name: "Figma Make", used: true }, { name: "Claude Code", used: true }, { name: "Lovable" }] },
      { label: "Vídeo e voz", items: [{ name: "Kling", used: true }, { name: "Higgsfield" }, { name: "ElevenLabs", used: true }] },
    ],
  },
];

export const DIFFERENTIALS = [
  { icon: "heart", title: "Conhecer as pessoas e os seus desafios", text: "A realidade de quem vai usar, aqui, em Angola" },
  { icon: "refresh", title: "Velocidade de aprendizagem", text: "Mais voltas ao ciclo de prototipar e testar" },
  { icon: "compass", title: "Critério humano", text: "Saber o que vale a pena construir, e como" },
];


export const CASES = [
  { n: 1, name: "Somos TIS", role: "A IA que responde", text: "Portal de Pessoas & Cultura com um agente de RH", step: "somos-tis" },
  { n: 2, name: "Jardim da Luma", role: "A IA que acompanha", text: "Jogo educativo do Outubro Rosa com uma assistente", step: "jardim-da-luma" },
  { n: 3, name: "Cleo", role: "A IA que dá rosto e voz", text: "Apresentadora virtual da Academia TIS", step: "cleo" },
];

/** Os ecrãs com vídeo. Os três primeiros não têm som e passam sozinhos; o da Cleo tem som e começa com um clique. */
export const VIDEO_CASES = [
  {
    kicker: "Caso 1 · Plataforma Somos TIS",
    title: "Pessoas & Cultura: tudo o que é RH, num só lugar",
    url: "somostis.com",
    video: "somos-tis",
    ratio: 1440 / 900,
    caption: "Gravação de ecrã do protótipo, com dados fictícios · 30 s",
    autoplay: true,
    facts: [
      { label: "Para quem", text: "Todos os colaboradores da TIS, com a conta Microsoft da empresa" },
      { label: "O que reúne", text: "Chat, perguntas frequentes, notícias, eventos e documentos" },
      { label: "Como foi feito", text: "Desenhado e construído com IA no Figma Make, do conceito à plataforma sem escrever o código à mão" },
    ],
  },
  {
    kicker: "Caso 1 · Integração com IA",
    title: "Um agente de RH que responde e ajuda a agir",
    url: "somostis.com",
    video: "agente-rh",
    ratio: 1440 / 900,
    caption: "Gravação de ecrã do protótipo · 29 s",
    autoplay: true,
    cards: [
      { icon: "book-open", title: "Responde com fontes", text: "Usa os regulamentos oficiais e indica o documento de onde vem a resposta" },
      { icon: "link", title: "Ligado ao Odoo", text: "Saldo de férias e pedidos, sem sair da conversa" },
      { icon: "shield", title: "Regras claras", text: "Nunca decide, nunca mostra dados de outra pessoa e passa os temas sensíveis ao RH" },
    ],
  },
  {
    kicker: "Caso 2 · Plataforma gaming Luma",
    title: "Jardim da Luma: aprender a cuidar, a brincar",
    url: "luma.somostis.com",
    video: "jardim-da-luma",
    ratio: 16 / 9,
    caption: "Animações do próprio jogo · 33 s",
    autoplay: true,
    facts: [
      { label: "O que é", text: "A iniciativa Outubro Rosa da TIS, em forma de jogo" },
      { label: "Como funciona", text: "12 descobertas, e cada uma dá uma pétala ao teu jardim" },
      { label: "Jogos simples", text: "Pares, puzzles e ordenar passos, sem pressa nem penalizações" },
      { label: "Uma canção nossa", text: "«O teu lugar é aqui», uma kizomba para as mulheres da TIS" },
    ],
  },
  {
    kicker: "Caso 3 · Vídeo Cleo",
    title: "Cleo, a apresentadora virtual da Academia TIS",
    url: "",
    video: "cleo",
    ratio: 1600 / 892,
    caption: "Vídeo com som · 1 min 27 s",
    autoplay: false,
    facts: [
      { label: "O que é", text: "Uma personagem criada com IA para apresentar a Academia TIS" },
      { label: "Onde aparece", text: "No lançamento da Academia, em ecrã e em vídeo" },
      { label: "Com transparência", text: "O vídeo indica sempre «Gerado por IA»: quem vê tem o direito de saber que a Cleo não é uma pessoa real" },
    ],
  },
];

export const EXPERIMENTS = [
  { image: "quem-sou-eu", title: "Reconhecimento facial experimental", text: "A assistente tenta adivinhar quem é a pessoa, e cada resposta ajuda a afinar o sistema antes de o levar a eventos e totens." },
  { image: "estudio-tis", title: "Estúdio TIS & Nano Banana", text: "Ajusta a iluminação, recorta o retrato com protecção, aplica a moldura TIS ou transforma-o com o modelo Nano Banana." },
];

export const LUMA_COLUMNS = [
  {
    title: "Integração com IA",
    items: [
      { title: "A Luma é uma assistente educativa", text: "Funciona com o Gemini, da Google, e explica cada tema «de outra forma» quando é preciso" },
      { title: "Só usa conteúdos aprovados", text: "Responde a partir do que foi publicado e revisto" },
      { title: "Conversa privada e temporária", text: "Não entra nos relatórios de RH e pede para evitar dados pessoais" },
    ],
  },
  {
    title: "O que tem de inovador",
    items: [
      { title: "Jogo com propósito", text: "Aprender a cuidar, sem competir nem ser avaliado" },
      { title: "Revisão clínica", text: "Cada conteúdo é revisto antes de publicar, e cada alteração fica registada" },
      { title: "Privacidade desde o início", text: "Os gestores só vêem métricas de grupo, e os grupos pequenos ficam ocultos" },
    ],
  },
];

export const CLEO_STEPS = [
  { title: "Criar a personagem", text: "Definir o aspecto, o estilo e a personalidade da Cleo", tool: "IA de imagem" },
  { title: "Ajustar", text: "Tirar o fundo, mudar a pose e corrigir os detalhes", tool: "Firefly · Gemini" },
  { title: "Criar o palco", text: "Testar a Cleo no cenário com a marca da Academia TIS", tool: "ChatGPT" },
  { title: "Dar vida", text: "Animar a personagem e sincronizar os lábios com a voz", tool: "Kling AI" },
  { title: "Voz e montagem", text: "Juntar a voz-off, a música e o ritmo final", tool: "Premiere Pro" },
];

export const LESSONS = [
  { icon: "users", title: "Começar pelas pessoas", text: "Um colaborador com uma dúvida de RH, uma colega no Outubro Rosa, uma Academia que precisava de um rosto.", tag: "Somos TIS · Luma · Cleo" },
  { icon: "layers", title: "Prototipar para aprender", text: "Plataformas e vídeos a funcionar desde cedo, testados e afinados com quem os vai usar.", tag: "Figma Make · Kling AI" },
  { icon: "shield", title: "Critério e cuidado", text: "Regras para o agente, revisão clínica na Luma e «Gerado por IA» na Cleo.", tag: "Confiança antes de velocidade" },
];

export const TAKEAWAYS = [
  "O protótipo é uma pergunta, e quanto mais cedo a fizermos, melhor.",
  "A IA abre caminhos, mas são as pessoas que os fecham com critério.",
  "O diferencial está em conhecer as pessoas e aprender depressa.",
];
