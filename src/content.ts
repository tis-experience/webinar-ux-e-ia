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
    id: "demonstracao",
    scene: "pergunta",
    build: 4,
    label: "Demonstração prática",
    bg: "#143b8b",
    dark: true,
  },
  {
    id: "perguntas",
    scene: "pergunta",
    build: 5,
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
  { kicker: "Tema 2", lines: ["Como inovar num", "mundo acelerado?"], accent: "#8ec6fd", mark: "#0050da" },
  { kicker: "Ao vivo", lines: ["Demonstração", "prática"], lead: "Inovação num mundo acelerado, ao vivo.", accent: "#bcdcfe", mark: "#1f4fb8", live: true },
  { kicker: "Webinar UX e IA", lines: ["Perguntas"], lead: "Envie a sua pergunta pelo chat. Os oradores respondem a seguir.", accent: "#eef6ff", mark: "#0050da", chat: true },
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
    bio: "Especialista em UX/UI que transforma tendências em produtos reais. Mais de 15 anos em Marketing, UX/UI e Direcção Criativa em Angola.",
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
