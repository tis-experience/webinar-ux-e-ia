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
  notes: string;
};

const LIGHT = "#f1f5f9";

export const STEPS: Step[] = [
  {
    id: "capa",
    scene: "capa",
    label: "Capa",
    bg: "#0b2aa8",
    dark: true,
    notes: "Felizardo abre o webinar e dá as boas-vindas. Slide de abertura durante a saudação.",
  },
  {
    id: "introducao",
    scene: "intro",
    label: "A IA acelerou tudo",
    bg: "#f8fafc",
    notes:
      "Felizardo, introdução: a IA mudou a velocidade com que se faz quase tudo no desenvolvimento de produtos digitais. Esta velocidade traz duas perguntas: como continuar a entregar boas experiências quando tudo anda mais depressa, e como usar a IA para inovar, e não só para ir mais depressa. Para as duas, vamos ouvir quem enfrenta o problema na prática. A seguir, apresenta os oradores.",
  },
  {
    id: "oradores",
    scene: "oradores",
    label: "Oradores",
    bg: "#f8fafc",
    notes:
      "Felizardo apresenta o Marcell e a Sara e avisa que o público pode enviar perguntas pelo chat ao longo do webinar. A seguir, a chamada ao Tema 1.",
  },
  {
    id: "tema-1",
    scene: "pergunta",
    build: 0,
    label: "Tema 1",
    bg: "#0065ed",
    dark: true,
    notes:
      "Felizardo faz a chamada ao Tema 1: apresenta o tema da entrega e pergunta ao Marcell como se entregam melhores experiências num mundo tão acelerado. Bloco de 20 minutos.",
  },
  {
    id: "processo-tradicional",
    scene: "processo",
    build: 0,
    label: "O processo de UX tradicional",
    bg: LIGHT,
    notes:
      "Marcell: este é o processo de UX que todos conhecemos. Compreender, definir, prototipar, validar e construir, em sequência, e cada etapa espera pela anterior. A pesquisa é analisada à mão, os requisitos ficam em documentos separados, os ecrãs são desenhados um a um e o protótipo é uma imagem. Como produzir leva tempo, testam-se poucas alternativas, e no fim o desenvolvimento reinterpreta o protótipo em código. A maior parte do tempo vai para produzir, e sobra pouco para compreender o problema e validar com quem vai usar a solução. A seguir, como a IA muda esta equação.",
  },
  {
    id: "abordagem-1",
    scene: "processo",
    build: 1,
    label: "Abordagem 1",
    bg: LIGHT,
    notes:
      "Marcell: primeira abordagem. Em relação ao processo tradicional, as etapas permanecem as mesmas; muda a duração de cada uma e onde as pessoas põem o seu tempo. A IA contribui de forma diferente em cada etapa: encontra padrões nas entrevistas, ajuda a detalhar requisitos, compõe ecrãs, amplia as alternativas testadas e converte o protótipo validado em código de produção, com os mesmos componentes. A equipa revê, corrige e decide, e o tempo poupado na produção vai para compreender o problema e validar com quem vai usar a solução.",
  },
  {
    id: "abordagem-2",
    scene: "processo",
    build: 2,
    label: "Abordagem 2",
    bg: LIGHT,
    notes:
      "Marcell: segunda abordagem. Em vez de cinco etapas em sequência, o processo encolhe para três frentes que trabalham ao mesmo tempo sobre uma base partilhada: dados de uso, personas sintéticas, requisitos com critérios de aceitação e o Design System. A IA ajuda a entender o problema a partir dos dados e de personas sintéticas, compõe os ecrãs já em código com os componentes do produto e acelera a validação com utilizadores e métricas reais. Como design, produto, desenvolvimento e QA partem da mesma base, o protótipo não é uma peça isolada: o que se valida já é a entrega final.",
  },
  {
    id: "abordagem-3",
    scene: "processo",
    build: 3,
    label: "Abordagem 3",
    bg: LIGHT,
    notes:
      "Marcell: terceira abordagem. No limite, a IA não acelera só o processo de quem desenha; passa a fazer parte do próprio produto. A equipa já não desenha um ecrã final para uma persona média: define o sistema, ou seja, o Design System, as regras do que pode mudar e os objectivos a atingir. Dentro desses limites, a IA observa o comportamento de cada pessoa, aprende os seus padrões e adapta ecrã, conteúdo e fluxo em ciclo contínuo. O resultado é uma experiência própria para cada pessoa, e o papel do designer passa a ser desenhar o sistema que gera essas experiências e garantir que continuam coerentes, acessíveis e éticas no uso dos dados.",
  },
  {
    id: "comparacao",
    scene: "comparacao",
    label: "As três abordagens lado a lado",
    bg: LIGHT,
    notes:
      "Marcell: antes de passar à prática, as três abordagens lado a lado, medidas na mesma base: quanto encurta o ciclo da ideia à entrega e quanto ganha a experiência de quem usa. São estimativas indicativas, porque não existe estudo que meça estas abordagens de ponta a ponta; partem de medições por tarefa. Na primeira, cada etapa encurta, e há estudos que mostram tarefas de código até 55% mais rápidas com IA, mas a sequência, as esperas e a revisão continuam, por isso o ciclo completo encurta à volta de 20 a 30%. O ganho na experiência vem do tempo que sobra para compreender o problema e validar. Na segunda, desaparece o retrabalho entre design e código, e no estudo da Figma designers com Design System concluíram a tarefa 34% mais rápido; o ciclo pode encurtar 40 a 50%. A experiência melhora porque sobra tempo para validar mais, e isso só se confirma quando a validação com pessoas reais acompanha o ciclo inteiro. Se a compactação servir para saltar etapas, a velocidade mantém-se, mas o ganho na experiência desce ao nível da primeira abordagem. Exige um Design System e um harness maduros. A terceira assenta nessa mesma base: depois de montadas as regras, os dados e os limites, a solução adapta-se sem novos ciclos de design, e o ganho maior está na experiência, uma para cada pessoa; a McKinsey aponta 10 a 15% mais receita com personalização bem feita. O arranque é mais exigente, e os cuidados passam por coerência, acessibilidade e privacidade dos dados. Se alguém perguntar: o estudo da METR de 2025 mediu programadores experientes 19% mais lentos com IA em código maduro, e o DORA de 2024 associou mais adopção de IA sem processo maduro a menos estabilidade, o que reforça que o ganho depende da base e do processo.",
  },
  {
    id: "na-pratica",
    scene: "pergunta",
    build: 1,
    label: "Como se constrói com IA na prática?",
    bg: "#334155",
    dark: true,
    notes:
      "Felizardo faz a transição do processo para a prática: depois das três abordagens, pergunta ao Marcell como se constrói com IA no dia a dia. O Marcell responde nos slides seguintes, com a fonte única de contexto, o harness e o Design System.",
  },
  {
    id: "fonte-unica",
    scene: "fonte",
    label: "Contexto numa fonte única",
    bg: LIGHT,
    notes:
      "Marcell responde: na prática, tudo começa pelo contexto. Quando a documentação está incompleta, cada pessoa preenche as lacunas com a sua própria interpretação. O design lê o requisito de uma forma, o desenvolvimento de outra, e no fim as entregas não batem certo; com a IA a produzir depressa, essas leituras diferentes multiplicam-se ainda mais rápido. Por isso há um repositório único com as necessidades, os requisitos, as decisões, os critérios de aceitação e o protótipo. Pessoas e IA trabalham a partir da mesma fonte, e quando algo muda, muda na fonte e propaga-se para tudo o que depende dela.",
  },
  {
    id: "harness",
    scene: "harness",
    build: 0,
    label: "Harness e Design System",
    bg: LIGHT,
    notes:
      "Marcell: o Design System são as peças aprovadas do produto: cores, tipografia, componentes e padrões de acessibilidade. O harness é o conjunto de regras em volta da IA: instruções, contexto do projecto, regras de negócio, as features descritas, ferramentas permitidas, verificações automáticas e casos de teste. Com os dois, a IA compõe com as peças do produto, dentro de regras claras, em vez de inventar interface.",
  },
  {
    id: "composicao-do-harness",
    scene: "harness",
    build: 1,
    label: "A composição do harness",
    bg: LIGHT,
    notes:
      "Marcell, complemento do harness: na prática, o harness é um ficheiro de instruções que a IA lê antes de produzir qualquer ecrã, no estilo de um AGENTS.md. Começa pelas referências, com o caminho para o Design System, os componentes, as regras de acessibilidade, os ecrãs já aprovados e o tom de voz. Depois vem a secção Fazer, com as regras que todo o resultado cumpre: usar só componentes e tokens do Design System, prever estados de erro, vazio e carregamento, e ligar cada ecrã a um requisito da fonte única. E a secção Não fazer, com os limites: inventar componentes, cores ou tamanhos, usar valores fora dos tokens ou alterar fluxos aprovados sem critério de aceitação. É curto, fica guardado com o código e a equipa mantém-no; os resultados passam por verificações automáticas antes da revisão humana.",
  },
  {
    id: "na-pratica-exemplo",
    scene: "exemplo",
    label: "Na prática",
    bg: LIGHT,
    notes:
      "Marcell: na prática, é isto que acabámos de ver. À esquerda, o repositório com o harness: as instruções, o contexto e os limites que a IA lê antes de produzir. Ao centro, a documentação dos componentes do Design System, com a anatomia, os estilos e os tamanhos de cada peça. À direita, um ecrã construído pela IA com essas peças e dentro dessas regras. Os agentes de IA compõem apenas com o que a equipa já aprovou.",
  },
  {
    id: "ganhos",
    scene: "pergunta",
    build: 2,
    label: "Que ganhos práticos se obtêm?",
    bg: "#334155",
    dark: true,
    notes:
      "Felizardo faz a transição para o resultado do bloco: depois de ver como se constrói na prática, pergunta ao Marcell que ganhos práticos se obtêm com este processo. O Marcell responde nos três slides seguintes.",
  },
  {
    id: "consistencia",
    scene: "consistencia",
    label: "Consistência de raiz",
    bg: LIGHT,
    notes:
      "Marcell responde: o processo e a base técnica libertam tempo, e daí vêm três ganhos práticos. É aqui que o mais rápido se torna melhor. O primeiro ganho é a consistência. Sem regras partilhadas, cada ecrã resolve à sua maneira e o produto vai perdendo coerência a cada entrega. Com o Design System e o harness, a IA só usa os componentes e os tokens aprovados, já com os padrões de acessibilidade e os estados de erro, vazio e carregamento previstos, e as verificações automáticas apanham desvios antes da revisão. E quando um componente ou token muda no Design System, a actualização chega a todos os ecrãs de uma vez, sem refazer um a um. A equipa deixa de policiar pormenores e concentra-se no que importa para quem usa o produto.",
  },
  {
    id: "validacao",
    scene: "validacao",
    label: "Validação com protótipos funcionais",
    bg: LIGHT,
    notes:
      "Marcell: o segundo ganho é a validação. Com a IA, construir deixa de ser o gargalo. Antes, a maior parte do tempo ia para produzir ecrãs e especificar, e o protótipo era uma imagem clicável. Com a IA, o protótipo nasce como produto real, em código e com o Design System, e produzir passa a ocupar uma fração do tempo. O tempo libertado vai para validar: testar com pessoas reais e observar como usam o produto, comparar várias alternativas lado a lado para escolher a melhor, e deixar que as métricas de uso orientem as decisões. É aqui que o \"mais rápido\" se torna \"melhor\", e é por isso que o que se valida já pode seguir para produção: zero handoff.",
  },
  {
    id: "zero-handoff",
    scene: "handoff",
    label: "Zero handoff",
    bg: LIGHT,
    notes:
      "Marcell, terceiro ganho e fecho do bloco: no modelo tradicional, o design entrega uma especificação, com ecrãs estáticos e anotações, e o desenvolvimento reinterpreta, perdendo detalhe em cada passagem. Com o protótipo em código e os componentes do Design System, design e desenvolvimento trabalham sobre o mesmo artefacto, e o designer passa menos tempo a especificar e mais a garantir a qualidade do que é construído. Fecha com a síntese do bloco: tudo sai consistente com o Design System, porque a IA só usa as peças e as regras definidas pela equipa; valida-se mais e com pessoas reais; e constrói-se exactamente o que foi validado. É assim que o mais rápido se torna melhor. Felizardo faz a chamada ao Tema 2.",
  },
  {
    id: "tema-2",
    scene: "pergunta",
    build: 3,
    label: "Tema 2",
    bg: "#0065ed",
    dark: true,
    notes:
      "Felizardo faz a chamada ao Tema 2: apresenta a inovação como o trabalho que começa antes de alguém pedir, lembra que as mesmas ferramentas estão ao alcance de todos e pergunta à Sara onde uma organização encontra o seu diferencial para inovar. Depois convida o público a enviar perguntas pelo chat, para o Marcell e para a Sara.",
  },
  {
    id: "demonstracao",
    scene: "pergunta",
    build: 4,
    label: "Demonstração prática",
    bg: "#143b8b",
    dark: true,
    notes:
      "Slide de espera enquanto a Sara partilha o ecrã. As demonstrações não têm script definido no roteiro e não retomam o processo do Bloco 1. No fim, a Sara devolve a palavra ao Felizardo para as perguntas.",
  },
  {
    id: "perguntas",
    scene: "pergunta",
    build: 5,
    label: "Perguntas",
    bg: "#0065ed",
    dark: true,
    notes:
      "Felizardo abre as perguntas, de 10 a 15 minutos, e dirige cada uma ao Marcell ou à Sara. Se ainda não houver perguntas, começa com uma de reserva.",
  },
  {
    id: "obrigado",
    scene: "fecho",
    label: "Obrigado",
    bg: "#0f172a",
    dark: true,
    notes:
      "Desfecho: Felizardo retoma as duas respostas da tarde, agradece ao Marcell, à Sara e a todos os que participaram, e convida a acompanhar a TIS nas redes sociais.",
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
