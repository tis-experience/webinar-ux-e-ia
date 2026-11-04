import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useAnimate, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Book,
  BookOpen,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  Check,
  CircleCheck,
  Code,
  Compass,
  Database,
  Eye,
  FileText,
  FlaskConical,
  FolderClosed,
  Heart,
  KeyRound,
  Layers,
  Link2,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Puzzle,
  RefreshCw,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  TriangleAlert,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import logoPaths from "./imports/logo-mark";
import photoMarcell from "./assets/equipa-marcell.webp";
import photoSara from "./assets/equipa-sara.webp";
import dsButtonDocs from "./assets/ds-button-docs.webp";
import casoSomos from "./assets/sara/caso-somos.webp";
import casoLuma from "./assets/sara/caso-luma.webp";
import casoCleo from "./assets/sara/caso-cleo.webp";
import posterSomos from "./assets/sara/poster-somos.webp";
import posterAgente from "./assets/sara/poster-agente.webp";
import posterLuma from "./assets/sara/poster-luma.webp";
import posterCleo from "./assets/sara/poster-cleo.webp";
import quemSouEu from "./assets/sara/quem-sou-eu.webp";
import estudioTis from "./assets/sara/estudio-tis.webp";
import cleo1 from "./assets/sara/cleo-1.webp";
import cleo2 from "./assets/sara/cleo-2.webp";
import cleo3 from "./assets/sara/cleo-3.webp";
import cleo4 from "./assets/sara/cleo-4.webp";
import cleo5 from "./assets/sara/cleo-5.webp";
import {
  AGENTS_LINES,
  APPROACHES,
  BENEFITS,
  CASES,
  CLEO_STEPS,
  CREATIVE_COLUMNS,
  CREATIVE_RULES,
  DIFFERENTIALS,
  EXPERIMENTS,
  FRONTS,
  HARNESS_ITEMS,
  LESSONS,
  LUMA_COLUMNS,
  PANELS,
  PHASES,
  PROCESS_HEADS,
  QUESTIONS,
  RULES,
  SOURCE_ITEMS,
  SPEAKERS,
  TAKEAWAYS,
  TOKENS,
  TOPICS,
  VALIDATION_CARDS,
  VIDEO_CASES,
} from "./content";
import { CountUp, EASE, MaskLine, PACE, STILL, Swap, draw, fade, rise, spring, tween, useAfter } from "./fx";

const exit = { opacity: 0, transition: { duration: 0.25 } };

const ICONS: Record<string, typeof Search> = {
  search: Search,
  book: Book,
  code: Code,
  users: Users,
  wrench: Wrench,
  key: KeyRound,
  "check-circle": CircleCheck,
  database: Database,
  sliders: SlidersHorizontal,
  zap: Zap,
  star: Star,
  chart: ChartColumn,
  scale: Scale,
  puzzle: Puzzle,
  flask: FlaskConical,
  eye: Eye,
  trend: TrendingUp,
  sparkles: Sparkles,
  heart: Heart,
  refresh: RefreshCw,
  compass: Compass,
  "book-open": BookOpen,
  link: Link2,
  shield: ShieldCheck,
  layers: Layers,
};

function Icon({ name, size = 30, stroke = 2.2 }: { name: string; size?: number; stroke?: number }) {
  const Component = ICONS[name] ?? Search;
  return <Component size={size} strokeWidth={stroke} aria-hidden />;
}

/** O símbolo de IA usado no deck: duas estrelas de quatro pontas. */
function AiMark({ size = 32, color = "currentColor", style }: { size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} style={{ flex: "0 0 auto", ...style }} aria-hidden>
      <path d="M20 4 C21.5 14 26 18.5 36 20 C26 21.5 21.5 26 20 36 C18.5 26 14 21.5 4 20 C14 18.5 18.5 14 20 4 Z" fill={color} />
      <path d="M38 28 C38.8 33 41 35.2 46 36 C41 36.8 38.8 39 38 44 C37.2 39 35 36.8 30 36 C35 35.2 37.2 33 38 28 Z" fill={color} />
    </svg>
  );
}

function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 540 538.358" fill="none" aria-hidden>
      <path d={logoPaths.p26e5dc80} fill="currentColor" />
      <path d={logoPaths.p2da8a80} fill="currentColor" />
      <path d={logoPaths.p21370b80} fill="currentColor" />
    </svg>
  );
}

/** Selecção dentro de uma cena, por clique ou pelas setas cima e baixo; pode avançar sozinha até haver interacção. */
function useSelected(count: number, autoAdvanceMs = 0, initial = 0, enabled = true) {
  const [selected, setSelected] = useState(initial);
  const [auto, setAuto] = useState(autoAdvanceMs > 0 && !STILL);

  useEffect(() => {
    if (!enabled) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      setAuto(false);
      setSelected((current) => (current + (event.key === "ArrowDown" ? 1 : -1) + count) % count);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, enabled]);

  useEffect(() => {
    if (!auto || !enabled) return undefined;
    const timer = window.setInterval(() => setSelected((current) => (current + 1) % count), autoAdvanceMs);
    return () => window.clearInterval(timer);
  }, [auto, autoAdvanceMs, count, enabled]);

  const select = (index: number) => {
    setAuto(false);
    setSelected(index);
  };

  return [selected, select, auto] as const;
}

/** Cabeçalho comum: etiqueta e título, que trocam com máscara quando o passo muda dentro da mesma cena. */
function Head({ kicker, title, k = "0", width }: { kicker: string; title: string; k?: string; width?: number }) {
  return (
    <div className="w-head" style={width ? { width } : undefined}>
      <Swap>
        <motion.div key={k} exit={exit}>
          <motion.p className="w-kicker" {...fade(0.05)}>
            {kicker}
          </motion.p>
          <h1 className="w-title">
            <MaskLine delay={0.1}>{title}</MaskLine>
          </h1>
        </motion.div>
      </Swap>
    </div>
  );
}

/* ── Capa, perguntas e fecho ──────────────────────────────────────────── */

const MARK_IDLE_DELAY_MS = 560;
const MARK_SPRING = { damping: 20, stiffness: 200, mass: 0.5 };

/** Símbolo TIS: inclina-se em 3D conforme o rato e oscila sozinho quando o rato pára. */
function CoverMark({ rotate, turn = 0, color, size = 540, style, opacity = 1 }: { rotate: number; turn?: number; color: string; size?: number; style?: CSSProperties; opacity?: number }) {
  const tiltX = useSpring(useMotionValue(0), MARK_SPRING);
  const tiltY = useSpring(useMotionValue(0), MARK_SPRING);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    if (STILL || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame = 0;
    let lastMove = -Infinity;
    const handleMove = (event: MouseEvent) => {
      lastMove = performance.now();
      tiltX.set((event.clientX / window.innerWidth - 0.5) * 1.32);
      tiltY.set((event.clientY / window.innerHeight - 0.5) * 1.32);
    };
    const tick = (time: number) => {
      if (time - lastMove > MARK_IDLE_DELAY_MS) {
        const t = time / 1000;
        tiltX.set(Math.sin(t * 0.82) * 0.34 + Math.sin(t * 0.35 + 1.7) * 0.08);
        tiltY.set(Math.cos(t * 0.71 + 0.8) * 0.29 + Math.sin(t * 0.38 + 2.4) * 0.07);
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [tiltX, tiltY]);

  return (
    <motion.div
      className="w-cover-mark"
      style={{ width: size, height: size * 0.997, ...style }}
      initial={STILL ? false : { opacity: 0, scale: 0.7, rotate }}
      animate={{ opacity, scale: 1, rotate: turn, color }}
      transition={spring(0.2, 40, 14)}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Mark className="w-cover-symbol" />
      </motion.div>
    </motion.div>
  );
}

export function CoverScene() {
  return (
    <section className="w-scene">
      <CoverMark rotate={-20} color="#4f9cf9" />
      <div className="w-cover">
        <motion.p className="w-kicker" style={{ color: "#bcdcfe", fontSize: 22, letterSpacing: 3 }} {...fade(0.1)}>
          Webinar
        </motion.p>
        <h1 className="w-cover-title">
          <MaskLine delay={0.15}>UX e IA: da análise</MaskLine>
          <MaskLine delay={0.3}>de necessidades à</MaskLine>
          <MaskLine delay={0.45}>criação de soluções</MaskLine>
        </h1>
        <motion.p className="w-cover-lead" {...rise(1)}>
          Como entregar melhores experiências e inovar num mundo acelerado
        </motion.p>
      </div>
    </section>
  );
}

export function ClosingScene() {
  return (
    <section className="w-scene">
      <CoverMark rotate={20} color="#0065ed" />
      <div className="w-cover" style={{ top: 380 }}>
        <h1 className="w-cover-title">
          <MaskLine delay={0.15}>Obrigado</MaskLine>
        </h1>
        <motion.p className="w-cover-lead" style={{ whiteSpace: "normal", width: 900, color: "#cbd5e1" }} {...rise(0.7)}>
          Acompanhe a TIS nas redes sociais para se manter a par de temas como este.
        </motion.p>
      </div>
    </section>
  );
}

/** Balões de conversa à volta do símbolo da TIS (o símbolo ocupa cerca de x 1280 a 1880 e y 420 a 1020).
 *  Ficam à volta dele, nos cantos livres, quase sem lhe tocar. Os próximos são maiores e nítidos; os distantes
 *  são menores, semitransparentes, desfocados, flutuam mais devagar e ficam por trás quando se cruzam. */
type Bubble = { x: number; y: number; text: string; s: number; o: number; blur: number };
const BUBBLES_FRONT: Bubble[] = [
  { x: 1300, y: 450, text: "?", s: 1.1, o: 1, blur: 0 },
  { x: 1705, y: 425, text: "", s: 0.9, o: 0.95, blur: 0 },
];
const BUBBLES_BACK: Bubble[] = [
  { x: 1760, y: 830, text: "?", s: 0.62, o: 0.5, blur: 3 },
  { x: 1170, y: 880, text: "", s: 0.7, o: 0.55, blur: 2 },
];

function ChatBubbles({ items, offset = 0 }: { items: Bubble[]; offset?: number }) {
  return (
    <motion.div className="w-bubbles" exit={exit} aria-hidden>
      {items.map((b, i) => {
        const n = i + offset;
        return (
          <motion.div
            key={n}
            className="w-bubble"
            data-dots={!b.text}
            data-far={b.blur > 0 || undefined}
            style={{ left: b.x, top: b.y, filter: b.blur ? `blur(${b.blur}px)` : undefined }}
            initial={STILL ? false : { opacity: 0, scale: b.s * 0.4, y: 30 }}
            animate={{ opacity: b.o, scale: b.s, y: 0 }}
            transition={spring(0.6 + n * 0.2, 160, 14)}
          >
            <span className="w-bob" style={{ animationDelay: `${-n * 0.7}s`, animationDuration: `${(2.4 + n * 0.3) / Math.max(b.s, 0.5)}s` }}>
              {b.text || (
                <span className="w-typing">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/** As chamadas aos temas e as transições. Os ecrãs seguidos partilham o símbolo, que fica sempre direito e só muda de cor entre eles. */
export function QuestionScene({ index }: { index: number }) {
  const q = QUESTIONS[index];

  return (
    <section className="w-scene">
      {/* Os balões distantes ficam por trás do símbolo; os próximos, por cima. */}
      <Swap>{q.chat && <ChatBubbles key="back" items={BUBBLES_BACK} offset={2} />}</Swap>
      <CoverMark rotate={-20} color={q.mark} size={600} style={{ right: 40, bottom: 60 }} />
      <div className="w-question">
        <Swap>
          <motion.div key={index} exit={exit}>
            <motion.p className="w-kicker" style={{ color: q.accent, fontSize: 22, letterSpacing: 3 }} {...fade(0.1)}>
              {q.kicker}
            </motion.p>
            <h1 className="w-question-title">
              {q.lines.map((line, n) => (
                <MaskLine key={line} delay={0.2 + n * 0.12}>
                  {line}
                </MaskLine>
              ))}
            </h1>
            {q.lead && (
              <motion.p className="w-question-lead" {...rise(0.7, 20)}>
                {q.lead}
              </motion.p>
            )}
          </motion.div>
        </Swap>
      </div>
      <Swap>{q.chat && <ChatBubbles key="front" items={BUBBLES_FRONT} />}</Swap>
    </section>
  );
}

/* ── Introdução e oradores ────────────────────────────────────────────── */

export function IntroScene() {
  return (
    <section className="w-scene">
      <h1 className="w-intro-line" style={{ top: 176, color: "#0065ed" }}>
        <MaskLine delay={0.15}>A IA acelerou tudo.</MaskLine>
      </h1>
      <h1 className="w-intro-line" style={{ top: 272 }}>
        <MaskLine delay={0.75}>
          Mas{" "}
          <span className="w-underlined">
            <motion.i
              initial={STILL ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={tween(0.8, 5.2)}
            />
            <span>mais rápido</span>
          </span>{" "}
          não quer dizer{" "}
          <motion.span
            className="w-struck"
            initial={STILL ? false : { color: "#0f172a" }}
            animate={{ color: "#94a3b8" }}
            transition={tween(0.7, 8)}
          >
            melhor
            <motion.i initial={STILL ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={tween(0.6, 7.2)} />
          </motion.span>
        </MaskLine>
      </h1>
      <motion.p className="w-intro-lead" {...rise(1.7, 20)}>
        Esta velocidade traz duas perguntas a quem cria produtos digitais:
      </motion.p>
      {[
        { icon: <Users size={30} strokeWidth={2.4} aria-hidden />, text: "Como continuar a entregar boas experiências?" },
        { icon: <AiMark size={30} color="#f8fafc" />, text: "Como usar a IA para inovar, e não só para ir mais depressa?" },
      ].map((card, n) => (
        <motion.div
          key={card.text}
          className="w-qcard"
          style={{ top: 560 + n * 130 }}
          initial={STILL ? false : { opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring(2.2 + n * 0.35, 80, 16)}
        >
          <span className="w-bub">{card.icon}</span>
          <p>{card.text}</p>
        </motion.div>
      ))}
    </section>
  );
}

export function SpeakersScene() {
  return (
    <section className="w-scene">
      <h1 className="w-title" style={{ position: "absolute", left: 128, top: 128, color: "#0050da" }}>
        <MaskLine delay={0.1}>Oradores</MaskLine>
      </h1>
      {SPEAKERS.map((person, n) => (
        <motion.article key={person.name} className="w-speaker" style={{ left: 128 + n * 856 }} {...rise(0.35 + n * 0.2, 40)}>
          <div className="w-speaker-id">
            <motion.span
              className="w-avatar"
              initial={STILL ? false : { scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={spring(0.6 + n * 0.2, 140, 12)}
            >
              {person.photo ? <img src={n === 0 ? photoMarcell : photoSara} alt="" /> : person.initials}
            </motion.span>
            <div>
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </div>
          <p className="w-speaker-bio">{person.bio}</p>
        </motion.article>
      ))}
    </section>
  );
}

/* ── O processo: um só desenho que evolui do tradicional à hiperpersonalização ── */

const ROW_Y = 430;
const CX = [294.4, 627.2, 960, 1292.8, 1625.6];
/** Onde cada etapa vai parar no ciclo da Abordagem 2: Definir e Construir fundem-se na base e na entrega. */
const CYCLE = [
  { x: 490, y: 620, s: 1, o: 1 },
  { x: 720, y: 620, s: 0.4, o: 0 },
  { x: 835, y: 421, s: 1, o: 1 },
  { x: 835, y: 819, s: 1, o: 1 },
  { x: 1600, y: 620, s: 0.4, o: 0 },
];
const CYCLE_NODE = [0, 2, 3];
const ARCS = [
  "M378.9 266.6 A230 230 0 0 1 655.6 106.8",
  "M765.4 170.2 A230 230 0 0 1 765.4 489.8",
  "M655.6 553.2 A230 230 0 0 1 378.9 393.4",
];

/** Órbita completa à volta da base (centro 600,330, raio 230), no sentido dos arcos. */
const ORBIT = "M370 330 A230 230 0 1 1 830 330 A230 230 0 1 1 370 330";

const nodePos = (build: number, i: number) =>
  build < 2 ? { x: CX[i], y: ROW_Y, s: 1, o: 1 } : build === 2 ? CYCLE[i] : { ...CYCLE[i], s: 0.7, o: 0 };

/** Ecrãs gerados para cada pessoa: seis blocos que se rearranjam. */
const C = { blue: "#0065ed", ink: "#0f172a", s4: "#94a3b8", sky: "#8ec6fd", navy: "#143b8b" };
type Block = [number, number, keyof typeof C, number?];
const LAYOUTS: Block[][] = [
  [[76, 22, "blue", 11], [96, 10, "ink"], [80, 10, "s4"], [96, 10, "s4"], [96, 52, "sky", 8], [60, 10, "s4"]],
  [[60, 12, "ink"], [45, 45, "blue", 8], [45, 45, "blue", 8], [45, 45, "blue", 8], [45, 45, "sky", 8], [96, 10, "s4"]],
  [[96, 18, "ink"], [80, 18, "ink"], [96, 12, "s4"], [96, 56, "navy", 8], [45, 20, "blue", 6], [45, 20, "sky", 6]],
  [[96, 70, "sky", 8], [70, 12, "ink"], [96, 10, "s4"], [96, 10, "s4"], [96, 28, "blue", 8], [50, 10, "s4"]],
  [[28, 28, "blue", 14], [60, 12, "ink"], [96, 10, "s4"], [96, 10, "s4"], [45, 60, "sky", 8], [45, 60, "navy", 8]],
];

/** Posição de cada bloco dentro do ecrã (96 px de largura útil, 6 px entre blocos), calculada uma vez por layout,
    para os blocos deslizarem de um arranjo para o outro sem saltos de linha. */
const PLACED = LAYOUTS.map((layout) => {
  let x = 0;
  let y = 0;
  let rowH = 0;
  return layout.map(([w, h, color, r]) => {
    if (x > 0 && x + w > 96) {
      x = 0;
      y += rowH + 6;
      rowH = 0;
    }
    const block = { x, y, w, h, color: C[color], r: r ?? 4 };
    x += w + 6;
    rowH = Math.max(rowH, h);
    return block;
  });
});

const MORPH = { duration: 0.8, ease: EASE };

function PersonalScreens() {
  const [layouts, setLayouts] = useState([0, 1, 2, 3, 4]);
  const [flash, setFlash] = useState(-1);
  const morph = (n: number) => {
    setLayouts((current) => {
      const next = [...current];
      let p = current[n];
      while (p === current[n]) p = Math.floor(Math.random() * LAYOUTS.length);
      next[n] = p;
      return next;
    });
    setFlash(n);
    window.setTimeout(() => setFlash((f) => (f === n ? -1 : f)), 900);
  };

  useEffect(() => {
    if (STILL) return undefined;
    let timer = 0;
    let last = -1;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        let n = last;
        while (n === last) n = Math.floor(Math.random() * 5);
        last = n;
        morph(n);
      }, 1800);
    }, 3200 * PACE);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      {[229.5, 562.5, 895.5, 1228.5, 1561.5].map((x, n) => (
        <motion.button
          type="button"
          key={n}
          className="w-pscreen"
          data-flash={flash === n}
          aria-label={`Adaptar o ecrã ${n + 1}`}
          style={{ left: x }}
          initial={STILL ? false : { opacity: 0, scale: 0.5, y: -40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={spring(2 + n * 0.12, 160, 16)}
          onClick={() => morph(n)}
        >
          {PLACED[layouts[n]].map((block, b) => (
            <motion.i
              key={b}
              initial={false}
              animate={{ x: block.x, y: block.y, width: block.w, height: block.h, backgroundColor: block.color, borderRadius: block.r }}
              transition={MORPH}
            />
          ))}
        </motion.button>
      ))}
    </>
  );
}

/** Bolinhas que percorrem um caminho a velocidade constante, igualmente espaçadas. Movidas por JavaScript
 *  (e não por SMIL) para começarem a andar logo que o slide aparece. */
function OrbitDots({ d, dur, count }: { d: string; dur: number; count: number }) {
  const path = useRef<SVGPathElement>(null);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  useLayoutEffect(() => {
    const track = path.current;
    if (!track) return undefined;
    const length = track.getTotalLength();
    const start = performance.now();
    let frame = 0;
    const place = (now: number) => {
      const turn = (now - start) / 1000 / dur;
      dots.current.forEach((dot, n) => {
        if (!dot) return;
        const point = track.getPointAtLength((((turn + n / count) % 1) + 1) % 1 * length);
        dot.setAttribute("cx", String(point.x));
        dot.setAttribute("cy", String(point.y));
      });
      frame = requestAnimationFrame(place);
    };
    place(start);
    return () => cancelAnimationFrame(frame);
  }, [d, dur, count]);
  return (
    <>
      <path ref={path} d={d} fill="none" stroke="none" />
      {Array.from({ length: count }, (_, n) => (
        <circle key={n} ref={(el) => { dots.current[n] = el; }} r="8" fill="#0065ED" />
      ))}
    </>
  );
}

export function ProcessScene({ build }: { build: number }) {
  const head = PROCESS_HEADS[build];
  const ai = build >= 1;
  const row = build < 2;

  // O marcador percorre as etapas: devagar no processo tradicional, depressa com IA.
  // `k` é a etapa para onde o marcador vai; `lit` é a etapa em destaque, que só acende quando ele lá chega.
  // O marcador não pára entre etapas: no processo tradicional leva 7,5 s de uma etapa à seguinte, com IA 3,5 s.
  const move = build === 0 ? 7.5 : 3.5;
  const [k, setK] = useState(-1);
  const [lit, setLit] = useState(-1);
  // Cada volta (e cada troca de slide) usa um marcador novo, que nasce parado na primeira etapa:
  // assim nunca se vê o marcador anterior a continuar ou a voltar para trás.
  const [loop, setLoop] = useState(0);
  useEffect(() => {
    setK(-1);
    setLit(-1);
    setLoop((l) => l + 1);
    if (!row || STILL) return undefined;
    let i = 0;
    let timer = 0;
    let arrive = 0;
    const dwell = build === 0 ? 7500 : 3500;
    const tick = () => {
      const target = i;
      if (target === 0) setLoop((l) => l + 1);
      setK(target);
      window.clearTimeout(arrive);
      arrive = window.setTimeout(() => setLit(target), target === 0 ? 0 : move * 960);
      i = (i + 1) % 6;
      // Na primeira etapa só fica o tempo de aparecer: logo a seguir começa a andar.
      timer = window.setTimeout(tick, i === 0 ? 900 + (build === 0 ? 600 : 0) : target === 0 ? 500 : dwell);
    };
    timer = window.setTimeout(tick, (build === 0 ? 2000 : 1000) * PACE);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(arrive);
    };
  }, [build, row]);

  // No ciclo, as três frentes acendem à vez até alguém escolher uma.
  const [front, selectFront] = useSelected(3, 2400, 0, build === 2);

  return (
    <section className="w-scene">
      <Head kicker={head.kicker} title={head.title} k={String(build)} />

      {/* Linha do processo: ligações, marcador, nomes e cartões (tradicional e Abordagem 1). */}
      <Swap>
        {row && (
          <motion.div key="row" className="w-layer" exit={exit}>
            <svg className="w-layer" viewBox="0 0 1920 1080" aria-hidden>
              {[0, 1, 2, 3].map((i) => {
                const x1 = CX[i] + 52;
                const x2 = CX[i + 1] - 56;
                return (
                  <g key={i}>
                    <motion.path
                      d={`M${x1} ${ROW_Y} L${x2} ${ROW_Y}`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={STILL ? false : { pathLength: 0, opacity: 0, stroke: "#94a3b8" }}
                      animate={{ pathLength: 1, opacity: 1, stroke: ai ? "#4f9cf9" : "#94a3b8" }}
                      transition={{ pathLength: tween(0.5, 0.6 + i * 0.3), opacity: { duration: 0.15, delay: STILL ? 0 : (0.6 + i * 0.3) * PACE }, stroke: { duration: 0.6 } }}
                    />
                    <motion.path
                      d={`M${x2 - 11} ${ROW_Y - 9} L${x2} ${ROW_Y} L${x2 - 11} ${ROW_Y + 9}`}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={STILL ? false : { opacity: 0, stroke: "#94a3b8" }}
                      animate={{ opacity: 1, stroke: ai ? "#4f9cf9" : "#94a3b8" }}
                      transition={{ opacity: tween(0.2, 1 + i * 0.3), stroke: { duration: 0.6 } }}
                    />
                  </g>
                );
              })}
            </svg>
            <motion.i
              key={loop}
              className="w-token"
              data-ai={ai}
              initial={{ x: CX[0] - 9, opacity: 0 }}
              animate={{ x: CX[Math.min(Math.max(k, 0), 4)] - 9, opacity: k >= 0 && k < 5 ? 1 : 0 }}
              // Ao voltar ao início (troca de slide ou novo ciclo) o marcador salta e some no lugar, sem percorrer a linha para trás.
              transition={{ x: k <= 0 ? { duration: 0 } : { duration: move, ease: "linear" }, opacity: { duration: k < 0 ? 0 : 0.3 } }}
              style={{ top: ROW_Y - 9 }}
            />
            {PHASES.map((phase, i) => (
              <motion.div key={phase.name} className="w-phase" style={{ left: CX[i] - 166 }} {...rise(0.35 + i * 0.3, 24)}>
                <p className="w-phase-name">{phase.name}</p>
                <motion.div className="w-phase-card" data-on={lit === i} animate={{ backgroundColor: ai ? (lit === i ? "#bcdcfe" : "#daeafe") : lit === i ? "#cbd5e1" : "#e2e8f0" }} transition={{ duration: ai ? 0.4 : 1.2 }}>
                  <Swap>
                    <motion.div key={build} className="w-phase-card-in" data-ai={ai} exit={exit} {...rise(build === 1 ? 0.1 + i * 0.12 : 0, 14)}>
                      {ai && (
                        <motion.span initial={STILL ? false : { scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={spring(0.3 + i * 0.12, 220, 12)}>
                          <AiMark size={32} color="#0065ed" />
                        </motion.span>
                      )}
                      <p>{ai ? phase.ai : phase.trad}</p>
                    </motion.div>
                  </Swap>
                </motion.div>
              </motion.div>
            ))}
            <motion.div
              className="w-pbar"
              initial={STILL ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, backgroundColor: ai ? "#143b8b" : "#334155" }}
              transition={{ default: tween(0.6, 2.1), backgroundColor: { duration: 0.6 } }}
            >
              <Swap>
                <motion.div key={build} className="w-pbar-in" exit={exit} {...fade(0.15)}>
                  {ai ? (
                    <AiMark size={44} color="#8ec6fd" style={{ animation: "w-spin 9s linear infinite" }} />
                  ) : (
                    <svg viewBox="0 0 48 48" width="38" height="38" aria-hidden>
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#94A3B8" strokeWidth="4" />
                      <path className="w-hand-h" d="M24 24 L24 15" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                      <path className="w-hand-m" d="M24 24 L24 9" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="24" cy="24" r="2.6" fill="#94A3B8" />
                    </svg>
                  )}
                  <p>{head.bar}</p>
                </motion.div>
              </Swap>
            </motion.div>
          </motion.div>
        )}
      </Swap>

      {/* Ciclo da Abordagem 2: arcos, frentes e entrega final. */}
      <Swap>
        {build === 2 && (
          <motion.div key="cycle" className="w-layer" exit={exit}>
            <svg className="w-layer" viewBox="0 0 1920 1080" aria-hidden>
              <defs>
                <marker id="w-ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M1 1 L8 5 L1 9" fill="none" stroke="#8EC6FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <g transform="translate(120 290)">
                {ARCS.map((d, n) => (
                  <g key={d}>
                    <motion.path id={`w-arc${n}`} d={d} fill="none" stroke="#8EC6FD" strokeWidth="4" strokeLinecap="round" {...draw(0.9 + n * 0.25, 0.6)} />
                    {/* A ponta da seta só aparece quando o arco acaba de se desenhar. */}
                    <motion.path d={d} fill="none" stroke="none" strokeWidth="4" markerEnd="url(#w-ah)" {...fade(0.9 + n * 0.25 + 1.2, 0.2)} />
                  </g>
                ))}
                {!STILL && (
                  <motion.g {...fade(0.6)}>
                    {/* Três bolinhas na mesma órbita, a 120° umas das outras e à mesma velocidade; entram junto com os arcos. */}
                    <OrbitDots d={ORBIT} dur={26} count={3} />
                  </motion.g>
                )}
              </g>
            </svg>
            <motion.p className="w-cycle-note" {...rise(0.5, 16)}>
              Design, produto, desenvolvimento e QA trabalham sobre a mesma base, ao mesmo tempo.
            </motion.p>
            {FRONTS.map((item, n) => (
              <motion.div
                key={item.name}
                className="w-front"
                data-side={n === 0 ? "left" : "right"}
                style={n === 0 ? { left: 128, top: 588, width: 300 } : { left: 900, top: n === 1 ? 388 : 786, width: 360 }}
                initial={STILL ? false : { opacity: 0, x: n === 0 ? -30 : 30 }}
                animate={{ opacity: front === n ? 1 : 0.5, x: 0 }}
                transition={{ opacity: { duration: 0.4 }, x: spring(0.8 + n * 0.2, 90, 16) }}
              >
                <button type="button" onClick={() => selectFront(n)}>
                  <h3>{item.name}</h3>
                  <span>
                    <AiMark size={24} color="#0065ed" />
                    {item.text}
                  </span>
                </button>
              </motion.div>
            ))}
            <motion.svg className="w-final-arrow" viewBox="0 0 40 40" width="40" height="40" {...fade(1.9)} aria-hidden>
              <path d="M5 20 L33 20 M23 10 L33 20 L23 30" fill="none" stroke="#0065ED" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <motion.div className="w-final" initial={STILL ? false : { opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={spring(2, 70, 15)}>
              <CircleCheck size={56} strokeWidth={2} color="#8ec6fd" aria-hidden />
              <h3>Entrega final</h3>
              <p>O que foi validado já é o produto, sem passagem de protótipo para código</p>
            </motion.div>
          </motion.div>
        )}
      </Swap>

      {/* A base nasce no centro do ciclo da Abordagem 2. */}
      <Swap>
        {build === 2 && (
          <motion.div
            key="base"
            className="w-base"
            initial={STILL ? false : { opacity: 0, left: 720, top: 620, width: 0, height: 0 }}
            animate={{ opacity: 1, left: 560, top: 460, width: 320, height: 320 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            transition={spring(0.25, 60, 15)}
            style={{ borderRadius: 160, backgroundColor: "#0065ed" }}
          >
            <i className="w-base-ping" aria-hidden />
            <motion.div className="w-base-in" {...fade(0.6)}>
              <p className="w-base-k">Base partilhada</p>
              <p className="w-base-v">
                Dados de uso
                <br />
                Personas sintéticas
                <br />
                Requisitos e critérios
                <br />
                Design System
              </p>
            </motion.div>
          </motion.div>
        )}
      </Swap>

      {/* Hiperpersonalização: a IA em ciclo e um ecrã para cada pessoa. */}
      <Swap>
        {build === 3 && (
          <motion.div key="hyper" className="w-layer" exit={exit}>
            <motion.div className="w-base w-sysbar" {...rise(0.3, 30)}>
              <div className="w-sys-in">
                <p className="w-base-k">A equipa define o sistema</p>
                {["Design System", "Regras do que pode mudar", "Objectivos"].map((pill, n) => (
                  <motion.span key={pill} className="w-pill" initial={STILL ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={spring(0.7 + n * 0.12, 200, 14)}>
                    {pill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.i className="w-link" initial={STILL ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={tween(0.35, 0.9)} />
            <motion.div className="w-aibar" initial={STILL ? false : { opacity: 0, y: 30, scaleX: 0.6 }} animate={{ opacity: 1, y: 0, scaleX: 1 }} transition={spring(1.1, 80, 16)}>
              <span>
                <AiMark size={40} color="#f8fafc" style={{ animation: "w-spin 9s linear infinite" }} />
                <b>A IA, em ciclo contínuo</b>
              </span>
              <i />
              <p>Observa o comportamento, aprende os padrões e adapta a experiência</p>
            </motion.div>
            <svg className="w-layer" viewBox="0 0 1920 1080" aria-hidden>
              <g transform="translate(128 530)">
                {[166.4, 499.2, 832, 1164.8, 1497.6].map((x, n) => {
                  const d = `M832 0 C832 45 ${x} 35 ${x} 80`;
                  return (
                    <g key={n}>
                      <motion.path d={d} fill="none" stroke="#0065ED" strokeWidth="3.5" strokeLinecap="round" {...draw(1.5 + Math.abs(n - 2) * 0.06, 0.6)} />
                      {!STILL && (
                        <motion.circle r="6" fill="#8EC6FD" {...fade(2.4)}>
                          <animateMotion dur="4.2s" begin={`${-n * 0.85}s`} repeatCount="indefinite" path={d} />
                        </motion.circle>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
            <PersonalScreens />
            <motion.p className="w-hyper-cap" {...rise(2.8, 16)}>
              Uma experiência própria para cada pessoa, coerente com a identidade do produto
            </motion.p>
          </motion.div>
        )}
      </Swap>

      {/* As cinco etapas: o mesmo objecto em todos os passos. Ganham cor com a IA, juntam-se no ciclo e entram no sistema. */}
      {PHASES.map((phase, i) => {
        const p = nodePos(build, i);
        const cycleIndex = CYCLE_NODE.indexOf(i);
        const on = row ? lit === i : build === 2 && cycleIndex === front;
        const clickable = build === 2 && cycleIndex >= 0;
        return (
          <motion.button
            type="button"
            key={phase.name}
            className="w-node"
            data-on={on}
            data-tone={ai ? "ai" : "plain"}
            tabIndex={clickable ? 0 : -1}
            aria-label={phase.name}
            style={{ pointerEvents: clickable ? "auto" : "none" }}
            initial={STILL ? false : { opacity: 0, x: p.x - 44, y: p.y - 14, scale: 0.6 }}
            animate={{ opacity: p.o, x: p.x - 44, y: p.y - 44, scale: p.s, backgroundColor: ai ? "#0065ed" : "#475569" }}
            transition={{ default: spring(build === 0 ? 0.3 + i * 0.3 : i * 0.05, 70, 16), backgroundColor: { duration: 0.6, delay: i * 0.08 } }}
            onClick={() => clickable && selectFront(cycleIndex)}
          >
            <span>
              <Icon name={phase.icon} size={40} />
            </span>
          </motion.button>
        );
      })}
    </section>
  );
}

/* ── As três abordagens lado a lado ───────────────────────────────────── */

/** Com um cartão em destaque, um clique fora dele tira o destaque e não muda de ecrã. */
function useClearFocus(focus: number | null, clear: () => void, card: string) {
  return (event: { target: EventTarget; stopPropagation: () => void }) => {
    if (focus === null) return;
    if ((event.target as Element).closest(card)) return;
    event.stopPropagation();
    clear();
  };
}

export function ComparisonScene() {
  const [focus, setFocus] = useState<number | null>(null);
  const clearFocus = useClearFocus(focus, () => setFocus(null), "button.w-cmp-col");
  const fills = ["#daeafe", "#0065ed", "#143b8b"];
  const inks = ["#143b8b", "#f8fafc", "#f8fafc"];

  return (
    <section className="w-scene" onClick={clearFocus}>
      <Head kicker="As três abordagens lado a lado" title="Velocidade e ganho na experiência" />
      <div className="w-cmp">
        {APPROACHES.map((item, n) => (
          <motion.button
            type="button"
            key={item.n}
            className="w-cmp-col"
            aria-pressed={focus === n}
            onClick={() => setFocus(focus === n ? null : n)}
            animate={{ opacity: focus === null || focus === n ? 1 : 0.35, scale: focus === n ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.div {...rise(0.3 + n * 0.6, 20)}>
              <p className="w-cmp-n">{item.n}</p>
              <h3>{item.name}</h3>
            </motion.div>
            <motion.div
              className="w-ring"
              style={{ background: fills[n], color: inks[n], border: n === 0 ? "3px solid #8ec6fd" : undefined }}
              initial={STILL ? false : { scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, boxShadow: "0 24px 50px rgba(0, 80, 218, 0.25)", transition: { type: "spring", stiffness: 260, damping: 18 } }}
              transition={spring(0.5 + n * 0.6, 120, 13)}
            >
              <b>
                {item.plus ? (
                  <>
                    +<CountUp value={item.plus} delay={0.7 + n * 0.6} />%
                  </>
                ) : (
                  <>
                    <CountUp value={item.from!} delay={0.7 + n * 0.6} />-<CountUp value={item.to!} delay={0.7 + n * 0.6} />%
                  </>
                )}
              </b>
              <span style={{ color: n === 2 ? "#daeafe" : inks[n] }}>{item.cap}</span>
            </motion.div>
            <motion.div className="w-gain" {...rise(0.9 + n * 0.6, 16)}>
              <div>
                Ganho na experiência
                <span className="w-dots">
                  {[0, 1, 2].map((d) => (
                    <motion.i
                      key={d}
                      initial={STILL ? false : { backgroundColor: "#cbd5e1", scale: 0.6 }}
                      animate={{ backgroundColor: d < item.dots ? "#0065ed" : "#cbd5e1", scale: 1 }}
                      transition={{ delay: STILL ? 0 : (1.2 + n * 0.6 + d * 0.2) * PACE, duration: 0.3 }}
                    />
                  ))}
                </span>
              </div>
              <p>{item.gain}</p>
              {item.note && <small>{item.note}</small>}
            </motion.div>
          </motion.button>
        ))}
      </div>
      <motion.p className="w-source" {...fade(2.4)}>
        Estimativas indicativas, a partir de estudos por tarefa (GitHub, Figma, McKinsey)
      </motion.p>
    </section>
  );
}

/* ── Contexto numa fonte única ────────────────────────────────────────── */

const PAPERS = [
  { title: "Requisito", note: "incompleto", x: 0, y: -60, r: -6 },
  { title: "Ecrã", note: "uma leitura", x: 0, y: 50, r: 4 },
  { title: "Código", note: "outra leitura", x: 0, y: -30, r: -3 },
];

/** Pares de documentos que entram em atrito: cada leitura diferente choca com outra. */
const FRICTION: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 2],
];

export function SourceScene() {
  const [scope, animate] = useAnimate();

  // De tempos a tempos, dois documentos tremem e piscam ao mesmo tempo, como se houvesse atrito entre eles.
  useEffect(() => {
    if (STILL || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    const bump = () => {
      const [a, b] = FRICTION[k % FRICTION.length];
      k += 1;
      for (const n of [a, b]) {
        const shake = scope.current?.querySelector(`[data-shake="${n}"]`);
        const card = scope.current?.querySelector(`[data-card="${n}"]`);
        if (shake) animate(shake, { x: [0, -9, 9, -7, 7, -3, 0], rotate: [0, -1.5, 1.5, -1, 1, 0, 0] }, { duration: 0.55, ease: "easeInOut" });
        if (card)
          animate(
            card,
            {
              borderColor: ["#cbd5e1", "#bb7500", "#cbd5e1"],
              boxShadow: [
                "0 12px 26px rgba(131, 84, 0, 0.16)",
                "0 0 0 6px rgba(187, 117, 0, 0.35), 0 12px 26px rgba(131, 84, 0, 0.16)",
                "0 12px 26px rgba(131, 84, 0, 0.16)",
              ],
            },
            { duration: 0.7, ease: "easeInOut" },
          );
      }
      const alert = scope.current?.querySelector("[data-alert]");
      if (alert) animate(alert, { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] }, { duration: 0.55 });
    };
    const start = window.setTimeout(bump, 2200 * PACE);
    const timer = window.setInterval(bump, 2600);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [animate, scope]);

  return (
    <section className="w-scene" ref={scope}>
      <Head kicker="Como se constrói com IA" title="Contexto numa fonte única" />
      <div className="w-duo">
        <motion.div className="w-card w-warn" initial={STILL ? false : { opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={spring(0.3, 70, 16)}>
          <p className="w-tag" style={{ color: "#835400" }}>
            Sem IA
          </p>
          <div className="w-papers">
            {PAPERS.map((paper, n) => (
              <motion.div
                key={paper.title}
                className="w-paper"
                initial={STILL ? false : { opacity: 0, y: 0, rotate: 0, scale: 0.6 }}
                animate={{ opacity: 1, y: paper.y, rotate: paper.r, scale: 1 }}
                transition={spring(0.7 + n * 0.18, 90, 11)}
              >
                <div data-shake={n}>
                <div className="w-bob" data-card={n} style={{ animationDelay: `${-n * 0.9}s`, animationDuration: `${2.6 + n * 0.4}s` }}>
                  <h4>{paper.title}</h4>
                  {n === 0 && (
                    <>
                      <i style={{ width: 140 }} />
                      <i data-dashed style={{ width: 110 }} />
                    </>
                  )}
                  {n === 1 && (
                    <>
                      <span className="w-row">
                        <i style={{ width: 70 }} />
                        <i style={{ width: 70 }} />
                      </span>
                      <i style={{ width: 72, height: 20, background: "#0065ed", borderRadius: 6 }} />
                    </>
                  )}
                  {n === 2 && (
                    <>
                      <i style={{ width: 150 }} />
                      <i style={{ width: 48, height: 20, background: "#b45309", borderRadius: 6, marginLeft: 112 }} />
                    </>
                  )}
                  <p>{paper.note}</p>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="w-foot">
            <span data-alert style={{ display: "flex" }}>
              <TriangleAlert size={44} strokeWidth={2} color="#835400" aria-hidden />
            </span>
            <p style={{ color: "#2e1c01" }}>Documentação incompleta abre espaço a interpretações, e os entregáveis não encaixam</p>
          </div>
        </motion.div>

        <motion.div className="w-card" style={{ background: "#0065ed" }} initial={STILL ? false : { opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={spring(0.5, 70, 16)}>
          <p className="w-tag" style={{ color: "#daeafe" }}>
            Com IA
          </p>
          <ul className="w-source-list">
            {SOURCE_ITEMS.map((item, n) => (
              <motion.li key={item.text} initial={STILL ? false : { opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={spring(1.1 + n * 0.14, 110, 16)}>
                <span className="w-source-icon">
                  <Icon name={item.icon} size={30} />
                </span>
                {item.text}
                <motion.span className="w-ok" initial={STILL ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring(2.2 + n * 0.14, 260, 14)}>
                  <Check size={26} strokeWidth={3} aria-hidden />
                </motion.span>
              </motion.li>
            ))}
          </ul>
          <motion.div className="w-foot" {...fade(3)}>
            <CircleCheck size={44} strokeWidth={2} color="#f8fafc" aria-hidden />
            <p style={{ color: "#f8fafc" }}>Tudo definido no mesmo sítio, sem margem para interpretações, e os entregáveis completam-se</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Harness e Design System: o cartão do harness abre-se no ficheiro AGENTS.md ── */

export function HarnessScene({ build }: { build: number }) {
  const code = build === 1;
  // O ficheiro escreve-se, fica uns 3 segundos inteiro à vista e só depois os destaques começam a alternar.
  // Um clique num cartão mostra logo o destaque escolhido.
  const typed = useAfter(9400, build);
  const [touched, setTouched] = useState(false);
  const [rule, selectRule] = useSelected(RULES.length, 3200, 0, code && (typed || touched));
  const group = code && (typed || touched) ? RULES[rule].group : null;

  return (
    <section className="w-scene">
      <Head kicker="Como se constrói com IA" title={code ? "A composição do harness" : "Harness e Design System"} k={String(build)} />

      <Swap>
        {!code && (
          <motion.div key="parts" className="w-layer" style={{ y: 40 }} exit={exit}>
            <motion.div className="w-ds" {...rise(0.3, 30)}>
              <p className="w-lbl">Design System</p>
              <div className="w-row" style={{ gap: 24 }}>
                <b style={{ fontFamily: "var(--bold)", fontSize: 64, lineHeight: 1 }}>Aa</b>
                <div className="w-row" style={{ gap: 10 }}>
                  {["#0065ed", "#143b8b", "#8ec6fd", "#cbd5e1"].map((color, n) => (
                    <motion.i key={color} style={{ width: 48, height: 48, borderRadius: 10, background: color }} initial={STILL ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring(0.6 + n * 0.08, 240, 14)} />
                  ))}
                </div>
              </div>
              <div className="w-row" style={{ gap: 16 }}>
                <span className="w-ds-btn">Botão</span>
                <span className="w-ds-field">Campo</span>
              </div>
              <div className="w-ds-card">
                <i style={{ width: 180, height: 18, background: "#0f172a" }} />
                <i style={{ width: 300, height: 12, background: "#aab7c8" }} />
                <i style={{ width: 240, height: 12, background: "#aab7c8" }} />
              </div>
            </motion.div>
            <motion.svg className="w-harrow" style={{ left: 656 }} viewBox="0 0 40 40" width="40" height="40" {...fade(1)} aria-hidden>
              <path d="M5 20 L33 20 M23 10 L33 20 L23 30" fill="none" stroke="#0065ED" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <motion.svg className="w-harrow" style={{ left: 1304 }} viewBox="0 0 40 40" width="40" height="40" {...fade(2)} aria-hidden>
              <path d="M5 20 L33 20 M23 10 L33 20 L23 30" fill="none" stroke="#0065ED" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            {/* O ecrã montado com as mesmas peças do cartão do Design System: tipografia, cores, cartão, campo e botão. */}
            <motion.div className="w-built" {...fade(2)}>
              <motion.p className="w-built-title" {...rise(2.3, 12)}>
                Novo pedido
              </motion.p>
              <motion.div className="w-ds-card w-built-card" {...rise(2.5, 12)}>
                <span className="w-built-row">
                  <b>Pedido 1024</b>
                  <em>Em análise</em>
                </span>
                <span>Enviado a 3 de Novembro</span>
              </motion.div>
              <motion.span className="w-ds-field" style={{ flex: "0 0 auto" }} {...rise(2.7, 12)}>
                Nome completo
              </motion.span>
              <motion.div className="w-row" style={{ gap: 12 }} {...rise(2.9, 12)}>
                <span className="w-ds-btn">Enviar</span>
                <span className="w-ds-btn" data-variant="outline">
                  Cancelar
                </span>
              </motion.div>
            </motion.div>
            <motion.p className="w-built-cap" {...rise(3.4, 16)}>
              Ecrã feito com as peças do produto, já em código
            </motion.p>
          </motion.div>
        )}
      </Swap>

      {/* O cartão do harness (passo 12) e o ficheiro AGENTS.md (passo 13) são peças separadas: o ficheiro entra
          da esquerda para a direita, já no seu tamanho. */}
      <Swap>
          {code ? (
            <motion.div
              key="code"
              className="w-harness w-code"
              style={{ left: 128, top: 289, width: 1020, height: 591, backgroundColor: "#0f172a", borderColor: "#0f172a" }}
              initial={STILL ? false : { opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={exit}
              transition={tween(0.8, 0.1)}
            >
              <div className="w-code-bar">
                <i />
                <i />
                <i />
                <span>AGENTS.md</span>
              </div>
              <div className="w-code-body">
                {AGENTS_LINES.map((line, n) =>
                  line.kind === "sp" ? (
                    <p key={n} className="w-ln-sp" />
                  ) : (
                    <motion.p
                      key={n}
                      className="w-ln"
                      data-kind={line.kind}
                      initial={STILL ? false : { clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)", opacity: group && line.group !== group ? 0.22 : 1 }}
                      transition={{ clipPath: { duration: 0.35, delay: STILL ? 0 : (0.5 + n * 0.14) * PACE, ease: "linear" }, opacity: { duration: 0.35 } }}
                    >
                      {line.kind === "li" && <span className="w-ln-m">- </span>}
                      {line.text}
                      {line.path && <span className="w-ln-p">{line.path}</span>}
                      {n === AGENTS_LINES.length - 1 && <span className="w-caret" />}
                    </motion.p>
                  ),
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              className="w-harness"
              style={{ left: 724, top: 340, width: 552, height: 524, backgroundColor: "#eef6ff", borderColor: "#0065ed" }}
              initial={STILL ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={exit}
              transition={spring(1.1, 70, 16)}
            >
              <div className="w-harness-in">
              <p className="w-lbl">Harness</p>
              <p className="w-harness-lead">A IA compõe com os elementos do Design System, dentro de regras claras</p>
              {HARNESS_ITEMS.map((item, n) => (
                <motion.p key={item.text} className="w-hli" initial={STILL ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={spring(1.5 + n * 0.1, 110, 16)}>
                  <Icon name={item.icon} size={26} />
                  {item.text}
                </motion.p>
              ))}
              </div>
            </motion.div>
          )}
      </Swap>

      <Swap>
        {code && (
          <motion.div key="rules" className="w-rules" exit={exit}>
            {RULES.map((item, n) => (
              <motion.button
                type="button"
                key={item.group}
                className="w-rule"
                data-tone={item.tone}
                aria-pressed={group === item.group}
                onClick={() => {
                  setTouched(true);
                  selectRule(n);
                }}
                initial={STILL ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, x: group === item.group ? -12 : 0 }}
                transition={{ default: tween(0.6, 1 + n * 0.3), x: spring(0, 120, 16) }}
              >
                <span className="w-rule-bub">{item.tone === "blue" ? <Book size={30} strokeWidth={2.2} /> : item.tone === "green" ? <Check size={30} strokeWidth={3} /> : <X size={30} strokeWidth={3} />}</span>
                <span>
                  <b>{item.kind}</b>
                  {item.text}
                </span>
              </motion.button>
            ))}
            <motion.div className="w-rule-note" initial={STILL ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={tween(0.6, 1 + RULES.length * 0.3)}>
              <span className="w-rule-bub" style={{ background: "#475569" }}>
                <Code size={30} strokeWidth={2.2} aria-hidden />
              </span>
              <p>Um ficheiro curto, guardado com o código e mantido pela equipa. Os resultados passam por verificações automáticas antes da revisão.</p>
            </motion.div>
          </motion.div>
        )}
      </Swap>
    </section>
  );
}

/* ── Na prática: três painéis; o escolhido amplia-se no lugar ────────── */

/** Raiz do repositório ds-tis, pela ordem do GitHub (pastas primeiro). A lista rola, e começa por descer até ao AGENTS.md. */
const REPO_ROWS: [boolean, string, string][] = [
  [true, ".github", "ci: verificações automáticas"],
  [true, "apps", "portal de documentação"],
  [true, "css", "estilos gerados a partir dos tokens"],
  [true, "docs", "acessibilidade e tom de voz"],
  [true, "figma-plugin", "sincronização das variáveis"],
  [true, "packages", "componentes React e Angular"],
  [true, "registry", "registo de componentes"],
  [true, "scripts", "build dos tokens"],
  [true, "stories", "exemplos de cada componente"],
  [true, "tests", "testes visuais"],
  [true, "tokens", "tokens e componentes v2.3"],
  [false, "AGENTS.md", "regras do harness"],
  [false, "CHANGELOG.md", "notas da versão"],
  [false, "CLAUDE.md", "instruções para o agente"],
  [false, "CONTRIBUTING.md", "guia de contribuição"],
  [false, "README.md", "visão geral do Design System"],
  [false, "package.json", "dependências"],
];

function RepoPanel() {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (STILL) return undefined;
    const id = window.setTimeout(() => {
      const list = listRef.current;
      const row = list?.querySelector<HTMLElement>("[data-hl='true']");
      if (list && row) list.scrollTo({ top: row.offsetTop - list.clientHeight / 2 + row.clientHeight / 2, behavior: "smooth" });
    }, 2200 * PACE);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="w-pn w-repo">
      <div className="w-rp-top">
        <Book size={22} color="#7d8590" aria-hidden />
        <span>
          <b>tis</b> / <b>ds-tis</b>
        </span>
        <em>Privado</em>
      </div>
      <div className="w-rp-bar">
        <em>main</em>regras do harness actualizadas
      </div>
      <div className="w-rp-list" ref={listRef}>
        {REPO_ROWS.map(([folder, name, msg], n) => (
          <motion.div key={name} className="w-rp-row" data-hl={name === "AGENTS.md"} {...rise(0.6 + Math.min(n, 8) * 0.08, 10)}>
            {folder ? <FolderClosed size={20} color="#8ec6fd" aria-hidden /> : <FileText size={20} color="#7d8590" aria-hidden />}
            <b>{name}</b>
            <span>{msg}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** A página do Button no portal do Design System TIS, tal como está publicada (captura do repositório ds-tis). */
function DocPanel() {
  return (
    <div className="w-pn w-doc">
      <img className="w-doc-shot" src={dsButtonDocs} alt="Documentação do componente Button no portal do Design System TIS" />
    </div>
  );
}

function LoginPanel() {
  const [email, setEmail] = useState(STILL ? "ana.silva@tis.ao" : "");
  const [pass, setPass] = useState(STILL ? "••••••••••" : "");
  const [focus, setFocus] = useState(-1);
  const [press, setPress] = useState(false);

  useEffect(() => {
    if (STILL) return undefined;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const cycle = (t0: number) => {
      at(t0, () => {
        setEmail("");
        setPass("");
        setFocus(0);
      });
      const e = "ana.silva@tis.ao";
      for (let i = 1; i <= e.length; i++) at(t0 + 300 + i * 70, () => setEmail(e.slice(0, i)));
      const t1 = t0 + 300 + e.length * 70 + 300;
      at(t1, () => setFocus(1));
      for (let i = 1; i <= 10; i++) at(t1 + i * 70, () => setPass("•".repeat(i)));
      const t2 = t1 + 10 * 70 + 400;
      at(t2, () => {
        setFocus(-1);
        setPress(true);
      });
      at(t2 + 220, () => setPress(false));
      at(t2 + 3000, () => cycle(0));
    };
    cycle(1400 * PACE);
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <div className="w-pn w-login">
      <div className="w-lg-card">
        <Mark className="w-lg-mark" />
        <h5>Iniciar sessão</h5>
        <p>Aceda à sua área de cliente</p>
        <label>Email</label>
        <div className="w-fld" data-f={focus === 0}>
          {email}
          <i />
        </div>
        <label>Palavra-passe</label>
        <div className="w-fld" data-f={focus === 1}>
          {pass}
          <i />
        </div>
        <motion.div className="w-lbtn" animate={{ scale: press ? 0.95 : 1, filter: press ? "brightness(1.15)" : "brightness(1)" }} transition={{ duration: 0.15 }}>
          Entrar
        </motion.div>
        <a>Esqueci-me da palavra-passe</a>
      </div>
    </div>
  );
}

/** Painel sem zoom (-1: todos ampliam). O do Design System amplia, mas o conteúdo é só a imagem da documentação. */
const STATIC_PANEL: number = -1;
const PANEL_W = 544;
const PANEL_H = 462;

/** Com um painel ampliado, os três mantêm a ordem: o escolhido cresce e os outros encolhem ao lado dele. */
const panelRect = (selected: number | null, n: number) => {
  if (selected === null) return { x: 128 + n * 560, y: 240, w: PANEL_W };
  const widths = [0, 1, 2].map((i) => (i === selected ? 747 : 400));
  const x = 128 + widths.slice(0, n).reduce((sum, w) => sum + w + 58, 0);
  return { x, y: 230, w: widths[n] };
};

export function ExampleScene() {
  const [selected, setSelected] = useState<number | null>(null);
  const panels: ReactNode[] = [<RepoPanel key="r" />, <DocPanel key="d" />, <LoginPanel key="l" />];

  // Com um painel ampliado, um clique fora dos painéis clicáveis (no painel fixo do Design System ou no fundo)
  // volta aos três painéis e não muda de slide.
  const closeZoom = (event: { target: EventTarget; stopPropagation: () => void }) => {
    if (selected === null) return;
    if ((event.target as Element).closest("button.w-pane-box")) return;
    event.stopPropagation();
    setSelected(null);
  };

  return (
    <section className="w-scene" onClick={closeZoom}>
      <h1 className="w-title" style={{ position: "absolute", left: 128, top: 128 }}>
        <MaskLine delay={0.05}>Na prática...</MaskLine>
      </h1>
      {PANELS.map((title, n) => {
        const r = panelRect(selected, n);
        const s = r.w / PANEL_W;
        return (
          <motion.div
            key={title}
            className="w-pane"
            initial={STILL ? false : { opacity: 0, x: r.x, y: r.y + 40, width: r.w }}
            animate={{ opacity: 1, x: r.x, y: r.y, width: r.w }}
            transition={spring(selected === null && !STILL ? 0.3 + n * 0.2 : 0, 80, 17)}
          >
            <p className="w-pane-title">{title}</p>
            {STATIC_PANEL === n ? (
              <motion.div className="w-pane-box" data-static animate={{ height: PANEL_H * s }} transition={spring(0, 80, 17)}>
                <motion.div className="w-pane-scale" animate={{ scale: s }} transition={spring(0, 80, 17)}>
                  {panels[n]}
                </motion.div>
              </motion.div>
            ) : (
              <motion.button
                type="button"
                className="w-pane-box"
                aria-label={selected === n ? `Reduzir: ${title}` : `Ampliar: ${title}`}
                aria-pressed={selected === n}
                animate={{ height: PANEL_H * s }}
                transition={spring(0, 80, 17)}
                onClick={() => setSelected(selected === n ? null : n)}
              >
                <motion.div className="w-pane-scale" animate={{ scale: s }} transition={spring(0, 80, 17)}>
                  {panels[n]}
                </motion.div>
                <span className="w-zoom">{selected === n ? <Minimize2 size={22} aria-hidden /> : <Maximize2 size={22} aria-hidden />}</span>
              </motion.button>
            )}
          </motion.div>
        );
      })}
      <Swap>
        {selected === null ? (
          <motion.div key="bar" className="w-dark-bar" exit={exit} {...rise(1.2, 20)}>
            <AiMark size={46} color="#94a3b8" />
            <p>Os agentes de IA constroem o produto com as peças do Design System, dentro das regras do harness.</p>
          </motion.div>
        ) : (
          <motion.p key="hint" className="w-pane-hint" exit={exit} {...rise(0.3, 12)}>
            Clique noutro painel para o ampliar, ou no mesmo para voltar aos três.
          </motion.p>
        )}
      </Swap>
    </section>
  );
}

/* ── Consistência de raiz: o token muda e todos os ecrãs acompanham ──── */

/** Amostra de cada tema no selector, já com o estilo do tema. */
const SWATCH: Record<string, CSSProperties> = {
  flat: { background: "#0065ed", borderRadius: 7 },
  apple: { background: "#5856d6", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,.18)" },
  material: { background: "#00796b", borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)" },
  minimal: { background: "#111827", borderRadius: 0 },
};

export function ConsistencyScene() {
  // Os ecrãs sem regras partilhadas abanam de vez em quando, ao acaso, como um campo que recusa a entrada.
  const [chaosRef, animateChaos] = useAnimate();
  useEffect(() => {
    if (STILL || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let timer = 0;
    let last = -1;
    const shake = () => {
      const minis = chaosRef.current?.querySelectorAll("[data-chaos]");
      if (minis && minis.length) {
        let n = last;
        while (n === last) n = Math.floor(Math.random() * minis.length);
        last = n;
        animateChaos(minis[n], { x: [0, -8, 8, -6, 6, -3, 0] }, { duration: 0.45, ease: "easeInOut" });
        // O alerta do rodapé treme junto com o ecrã.
        const alert = chaosRef.current?.querySelector("[data-alert]");
        if (alert) animateChaos(alert, { rotate: [0, -14, 12, -8, 6, -2, 0], scale: [1, 1.12, 1.12, 1.06, 1.06, 1, 1] }, { duration: 0.5, ease: "easeInOut" });
      }
      timer = window.setTimeout(shake, 900 + Math.random() * 1900);
    };
    timer = window.setTimeout(shake, 1400 * PACE);
    return () => window.clearTimeout(timer);
  }, [animateChaos, chaosRef]);

  // O tema só muda por clique (ou pelas setas cima e baixo); muda a cor e também a forma e o estilo das peças.
  const [token, selectToken] = useSelected(TOKENS.length);
  const t = TOKENS[token];
  const style = {
    "--t1": t.main,
    "--t2": t.light,
    "--t3": t.soft,
    "--r-card": `${t.card}px`,
    "--r-btn": `${t.btn}px`,
    "--r-dot": `${t.dot}px`,
    "--r-field": `${t.field}px`,
    "--r-tile": `${t.tile}px`,
    "--btn-bg": t.outline ? "#ffffff" : t.main,
    "--btn-line": t.outline ? `inset 0 0 0 3px ${t.main}` : "none",
    "--field-line": t.fieldStyle === "line" ? "0" : "2px",
    "--field-bottom": t.fieldStyle === "line" ? `3px solid ${t.main}` : "2px solid #cbd5e1",
  } as CSSProperties;

  return (
    <section className="w-scene">
      <Head kicker="Os resultados práticos" title="Consistência de raiz" />
      <div className="w-cons">
        <motion.div ref={chaosRef} className="w-cbox w-warn" initial={STILL ? false : { opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={spring(0.3, 70, 16)}>
          <div className="w-cbox-head">
            <p className="w-tag" style={{ color: "#694400", fontSize: 28 }}>
              Sem regras partilhadas
            </p>
          </div>
          <div className="w-minis">
            {[0, 1, 2].map((n) => (
              <div key={n} className="w-bob" style={{ animationDuration: `${2.6 + n * 0.5}s`, animationDelay: `${-n * 0.9}s` }}>
              <div className="w-mini" data-chaos>
                {n === 0 && (
                  <>
                    <i style={{ width: 88, height: 12, background: "#2e1c01", borderRadius: 5 }} />
                    {[["#0065ed", 9], ["#16a34a", 2], ["#b45309", 0]].map(([color, r], m) => (
                      <span key={m} className="w-row" style={{ gap: 8 }}>
                        <i style={{ width: 18, height: 18, background: color as string, borderRadius: r as number }} />
                        <i style={{ width: [90, 75, 90][m], height: 10, background: "#ffca78", borderRadius: 5 }} />
                      </span>
                    ))}
                    <span style={{ flex: 1 }} />
                    <i style={{ width: 112, height: 30, background: "#0065ed", borderRadius: 5 }} />
                  </>
                )}
                {n === 1 && (
                  <>
                    <i style={{ width: 105, height: 17, background: "#2e1c01", borderRadius: 2 }} />
                    <i style={{ width: 128, height: 28, background: "#fff", border: "2px solid #694400" }} />
                    <i style={{ width: 128, height: 20, borderBottom: "2px solid #bb7500" }} />
                    <span style={{ flex: 1 }} />
                    <i style={{ width: 80, height: 38, background: "#16a34a", borderRadius: 19 }} />
                  </>
                )}
                {n === 2 && (
                  <>
                    <i style={{ width: 62, height: 12, background: "#2e1c01", borderRadius: 5 }} />
                    <span className="w-row" style={{ gap: 8 }}>
                      <i style={{ width: 58, height: 50, background: "#ffca78", borderRadius: 16 }} />
                      <i style={{ width: 50, height: 38, background: "#0065ed" }} />
                    </span>
                    <i style={{ width: 120, height: 10, background: "#ffca78", borderRadius: 5 }} />
                    <span style={{ flex: 1 }} />
                    <i style={{ width: 125, height: 25, background: "#b45309" }} />
                  </>
                )}
              </div>
              </div>
            ))}
          </div>
          <div className="w-foot" style={{ gap: 12 }}>
            <TriangleAlert data-alert="" size={36} strokeWidth={2} color="#835400" aria-hidden />
            <p style={{ color: "#2e1c01", fontFamily: "var(--strong)" }}>Cada ecrã resolve à sua maneira</p>
          </div>
        </motion.div>

        <motion.div className="w-cbox w-dsbox" data-look={t.look} style={style} initial={STILL ? false : { opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={spring(0.5, 70, 16)}>
          <div className="w-cbox-head">
            <p className="w-tag" style={{ color: "#0050da", fontSize: 28 }}>
              Com Design System e harness
            </p>
            <div className="w-swatches" role="group" aria-label="Tema do Design System">
              <span>Tema</span>
              {TOKENS.map((item, n) => (
                <button type="button" key={item.name} aria-label={item.name} title={item.name} aria-pressed={n === token} style={SWATCH[item.look]} onClick={() => selectToken(n)} />
              ))}
            </div>
          </div>
          <div className="w-minis">
            <div className="w-mini" data-ds>
              <i style={{ width: 88, height: 12, background: "#0f172a", borderRadius: 5 }} />
              {[90, 75, 90].map((w, m) => (
                <span key={m} className="w-row" style={{ gap: 8 }}>
                  <i className="w-mini-dot" style={{ width: 18, height: 18, background: "var(--t2)", borderRadius: "var(--r-dot)" }} />
                  <i style={{ width: w, height: 10, background: "#cbd5e1", borderRadius: 5 }} />
                </span>
              ))}
              <span style={{ flex: 1 }} />
              <i className="w-mini-btn" />
            </div>
            <div className="w-mini" data-ds>
              <i style={{ width: 75, height: 12, background: "#0f172a", borderRadius: 5 }} />
              <i className="w-mini-field" />
              <i className="w-mini-field" />
              <span style={{ flex: 1 }} />
              <i className="w-mini-btn" />
            </div>
            <div className="w-mini" data-ds>
              <i style={{ width: 62, height: 12, background: "#0f172a", borderRadius: 5 }} />
              <span className="w-row" style={{ gap: 8 }}>
                <i className="w-mini-tile" style={{ width: 58, height: 50, background: "var(--t3)", borderRadius: "var(--r-tile)" }} />
                <i className="w-mini-tile" style={{ width: 58, height: 50, background: "var(--t3)", borderRadius: "var(--r-tile)" }} />
              </span>
              <i style={{ width: 128, height: 10, background: "#cbd5e1", borderRadius: 5 }} />
              <span style={{ flex: 1 }} />
              <i className="w-mini-btn" />
            </div>
          </div>
          <div className="w-foot" style={{ gap: 12 }}>
            <CircleCheck size={36} strokeWidth={2} color="#0065ed" aria-hidden />
            <p style={{ fontFamily: "var(--strong)" }}>As mesmas peças em todos os ecrãs</p>
          </div>
        </motion.div>
      </div>
      <div className="w-bens">
        {BENEFITS.map((item, n) => (
          <motion.div key={item.title} className="w-ben" {...rise(0.9 + n * 0.15, 24)}>
            <span className="w-ben-bub">
              <Icon name={item.icon} size={30} />
            </span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Validação com protótipos funcionais ──────────────────────────────── */

/** Um segmento da barra: cresce a partir da esquerda e só depois mostra o texto, para nada aparecer cortado. */
function Seg({ width, delay, dur, bg, color, children }: { width: number; delay: number; dur: number; bg: string; color: string; children: ReactNode }) {
  return (
    <motion.div
      className="w-seg"
      style={{ background: bg, color }}
      initial={STILL ? false : { width: 0 }}
      animate={{ width }}
      transition={{ width: { duration: dur, delay: delay * PACE, ease: [0.45, 0, 0.2, 1] } }}
    >
      {children}
    </motion.div>
  );
}

/** Texto de um segmento, que aparece quando o segmento acaba de crescer (ou quando troca). */
function SegLabel({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.span className="w-seg-l" initial={STILL ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, delay: delay * PACE }}>
      {children}
    </motion.span>
  );
}

/** Revela uma barra inteira da esquerda para a direita, num só movimento, sem mudar o tamanho das peças. */
const wipe = (delay: number, dur = 1.4) =>
  STILL
    ? {}
    : {
        initial: { clipPath: "inset(0% 100% 0% 0% round 14px)" },
        animate: { clipPath: "inset(0% 0% 0% 0% round 14px)" },
        transition: { duration: dur, delay: delay * PACE, ease: [0.45, 0, 0.2, 1] as const },
      };

export function ValidationScene() {
  const [run, setRun] = useState(0);
  // As duas barras entram exactamente da mesma forma: cada uma é revelada inteira, da esquerda para a direita,
  // já com as proporções finais; o texto de cada segmento aparece à medida que a revelação passa por ele. Um clique na de baixo repete a entrada dela.
  const top = 0.6;
  const bottom = run ? 0 : 1.6;

  return (
    <section className="w-scene">
      <Head kicker="Os resultados práticos" title="Validação com protótipos funcionais" />
      <div className="w-time">
        <motion.p className="w-time-k" {...fade(0.3)}>
          Onde a equipa põe o seu tempo
        </motion.p>
        <div className="w-tl">
          <motion.div className="w-tl-lab" {...fade(0.4)}>
            <b style={{ color: "#334155" }}>Antes</b>
            <span>Protótipo como imagem</span>
          </motion.div>
          <div className="w-bars">
            <motion.div className="w-bars-in" {...wipe(top)}>
              <div className="w-seg" style={{ width: 943, background: "#334155", color: "#f8fafc" }}>
                <SegLabel delay={top + 1.2}>Produzir ecrãs e especificar</SegLabel>
              </div>
              <div className="w-seg" style={{ width: 405, background: "#cbd5e1", color: "#334155" }}>
                <SegLabel delay={top + 2.8}>Validar</SegLabel>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-tl">
          <motion.div className="w-tl-lab" {...fade(1.2)}>
            <b style={{ color: "#0050da" }}>Com IA</b>
            <span>Protótipo como produto</span>
          </motion.div>
          <div role="button" tabIndex={0} className="w-bars" aria-label="Repetir a entrada" onClick={() => setRun((r) => r + 1)}>
            <motion.div key={run} className="w-bars-in" {...wipe(bottom)}>
              <div className="w-seg" style={{ width: 404, background: "#cbd5e1", color: "#334155" }}>
                <SegLabel delay={bottom + 1.2}>Produzir</SegLabel>
              </div>
              <div className="w-seg" style={{ width: 944, background: "#0050da", color: "#f8fafc" }}>
                <SegLabel delay={bottom + 2.8}>Validar com pessoas reais, várias alternativas</SegLabel>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.p className="w-val-k" {...fade(2.3)}>
        Quando construir se torna rápido, o foco passa para a validação.
      </motion.p>
      <div className="w-bens" style={{ top: 690 }}>
        {VALIDATION_CARDS.map((item, n) => (
          <motion.div key={item.title} className="w-ben" {...rise(2.5 + n * 0.15, 24)}>
            <span className="w-ben-bub">
              <Icon name={item.icon} size={30} />
            </span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Zero handoff ─────────────────────────────────────────────────────── */

/** Passagem com perdas: pacotes seguem pela seta tracejada e alguns caem a meio, como numa ligação instável. */
const PACKETS = [
  { lost: false, delay: 0 },
  { lost: true, delay: 0.35 },
  { lost: false, delay: 0.7 },
  { lost: false, delay: 1.05 },
  { lost: true, delay: 1.4 },
  { lost: false, delay: 1.75 },
];

function LossArrow({ offset = 0 }: { offset?: number }) {
  return (
    <span className="w-loss">
      <svg viewBox="0 0 96 24" width="96" height="24" aria-hidden>
        <path d="M4 12 L84 12" fill="none" stroke="#A06400" strokeWidth="3" strokeDasharray="6 5" strokeLinecap="round" />
        <path d="M80 5 L89 12 L80 19" fill="none" stroke="#A06400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!STILL &&
        PACKETS.map((packet, n) => (
          <i key={n} data-lost={packet.lost} style={{ animationDelay: `${packet.delay + offset}s` }} />
        ))}
    </span>
  );
}

/** Passagem sem perdas: ficheiros de front-end seguem pela seta em fila contínua. Saem de trás do bloco anterior
 *  e somem por trás do bloco seguinte, como num fluxo que não pára. Movidos por JavaScript, a velocidade constante. */
const CODE_BITS = [".tsx", ".css", ".html", ".json"];
const BIT_FROM = -110;
const BIT_TO = 170;
const BIT_DUR = 14;

function SolidArrow({ delay, phase = 0 }: { delay: number; phase?: number }) {
  const chips = useRef<(SVGGElement | null)[]>([]);
  useLayoutEffect(() => {
    if (STILL) return undefined;
    const start = performance.now() - phase * 1000;
    let frame = 0;
    const place = (now: number) => {
      const t = (now - start) / 1000 / BIT_DUR;
      chips.current.forEach((chip, n) => {
        if (!chip) return;
        const f = (((t + n / CODE_BITS.length) % 1) + 1) % 1;
        chip.setAttribute("transform", `translate(${BIT_FROM + f * (BIT_TO - BIT_FROM)} 0)`);
      });
      frame = requestAnimationFrame(place);
    };
    place(performance.now());
    return () => cancelAnimationFrame(frame);
  }, [phase]);
  return (
    <motion.svg className="w-flow" viewBox="0 0 96 24" width="96" height="24" style={{ flex: "0 0 auto", overflow: "visible" }} {...fade(delay)} aria-hidden>
      <path d="M2 12 L86 12" fill="none" stroke="#0065ED" strokeWidth="4" strokeLinecap="round" />
      <path d="M82 4.5 L91 12 L82 19.5" fill="none" stroke="#0065ED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {!STILL &&
        CODE_BITS.map((bit, n) => (
          <g key={bit} ref={(el) => { chips.current[n] = el; }} transform={`translate(${BIT_FROM} 0)`}>
            <rect x="2" y="2" width="52" height="20" rx="5" fill="#0f172a" />
            {/* Ícone de ficheiro com o canto dobrado. */}
            <path d="M7 6.5 h5 l3 3 v8 h-8 z" fill="none" stroke="#8ec6fd" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M12 6.5 v3 h3" fill="none" stroke="#8ec6fd" strokeWidth="1.4" strokeLinejoin="round" />
            <text x="18" y="15.8" fill="#e2e8f0" style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700 }}>
              {bit}
            </text>
          </g>
        ))}
    </motion.svg>
  );
}

export function HandoffScene() {
  return (
    <section className="w-scene">
      <Head kicker="Os resultados práticos" title="Zero handoff" />
      <div className="w-handoff">
        <motion.div className="w-hblock w-warn" initial={STILL ? false : { opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={spring(0.3, 70, 16)}>
          <div className="w-hblock-top">
            <p className="w-tag" style={{ color: "#694400", fontSize: 28 }}>
              Com handoff tradicional
            </p>
            <p className="w-hblock-r" style={{ color: "#2e1c01" }}>
              <TriangleAlert size={40} strokeWidth={2} color="#835400" aria-hidden />
              Perde-se detalhe a cada passagem
            </p>
          </div>
          <div className="w-hrow">
            {/* Ao meio fica a especificação: os ecrãs estáticos e as anotações que o desenvolvimento reinterpreta. */}
            {["Design", "Especificação", "Desenvolvimento"].map((name, n) => (
              <motion.span key={name} style={{ display: "contents" }}>
                <motion.p className="w-node-box" data-dashed={n === 1} {...rise(0.6 + n * 0.2, 16)}>
                  <span className="w-node-in">{name}</span>
                </motion.p>
                {n < 2 && <LossArrow offset={n * 0.5} />}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <motion.p className="w-handoff-mid" {...fade(1.2)}>
          Design e desenvolvimento trabalham sobre o mesmo artefacto.
        </motion.p>
        <motion.div className="w-hblock" style={{ background: "#daeafe", border: "2px solid #8ec6fd" }} initial={STILL ? false : { opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={spring(1.4, 70, 16)}>
          <div className="w-hblock-top">
            <p className="w-tag" style={{ color: "#0050da", fontSize: 28 }}>
              Zero handoff
            </p>
            <p className="w-hblock-r">
              <CircleCheck size={40} strokeWidth={2} color="#0065ed" aria-hidden />O que o cliente validou é o que se constrói
            </p>
          </div>
          <div className="w-hrow">
            <motion.p className="w-node-box" data-blue style={{ width: 300, flex: "0 0 auto" }} initial={STILL ? false : { opacity: 0, x: 160 }} animate={{ opacity: 1, x: 0 }} transition={spring(1.9, 80, 15)}>
              Design
            </motion.p>
            <SolidArrow delay={2.3} />
            <motion.div className="w-core" initial={STILL ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={spring(1.7, 120, 15)}>
              <Code size={40} strokeWidth={2.2} color="#f8fafc" aria-hidden />
              Protótipo validado, já em código
            </motion.div>
            <SolidArrow delay={2.3} phase={1.75} />
            <motion.p className="w-node-box" data-blue style={{ width: 340, flex: "0 0 auto" }} initial={STILL ? false : { opacity: 0, x: -160 }} animate={{ opacity: 1, x: 0 }} transition={spring(1.9, 80, 15)}>
              Desenvolvimento
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Tema 2: da prototipagem ao produto (a parte da Sara) ─────────────── */

/** Pergunta do moderador como título do assunto: as aspas entram primeiro e a pergunta sobe por baixo delas. */
export function TopicScene({ index }: { index: number }) {
  return (
    <section className="w-scene">
      <div className="w-topic">
        <motion.span
          className="w-topic-quote"
          aria-hidden
          initial={STILL ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring(0.1, 90, 16)}
        >
          “
        </motion.span>
        <h1 className="w-question-title">
          {TOPICS[index].map((line, n) => (
            <MaskLine key={line} delay={0.35 + n * 0.12}>
              {line}
            </MaskLine>
          ))}
        </h1>
      </div>
    </section>
  );
}

/** Revela um bloco inteiro da esquerda para a direita (mesmo movimento das barras da validação). */
const reveal = (delay: number, dur = 1, radius = 20) =>
  STILL
    ? {}
    : {
        initial: { clipPath: `inset(0% 100% 0% 0% round ${radius}px)` },
        animate: { clipPath: `inset(0% 0% 0% 0% round ${radius}px)` },
        transition: { duration: dur, delay: delay * PACE, ease: [0.45, 0, 0.2, 1] as const },
      };

/** Traço que se desenha da esquerda para a direita. */
function Stroke({ d, delay, dur = 0.9, ...rest }: { d: string; delay: number; dur?: number } & Record<string, unknown>) {
  return (
    <motion.path
      d={d}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...draw(delay, dur, "easeInOut")}
      {...rest}
    />
  );
}

/** Pensar antes de pedir: um esboço à mão que só depois passa para o pedido à IA. */
function SketchArt({ delay }: { delay: number }) {
  const ink = { stroke: "#334155", strokeWidth: 3 };
  return (
    <svg viewBox="0 0 432 150" className="w-crule-art" aria-hidden>
      <Stroke d="M30 22 Q120 16 212 21 Q216 78 210 130 Q120 135 27 128 Q23 76 30 22 Z" delay={delay} dur={1.2} {...ink} />
      <Stroke d="M48 44 Q98 40 150 44" delay={delay + 1.1} {...ink} />
      <Stroke d="M48 66 Q84 64 120 67 Q122 88 119 110 Q84 112 47 109 Q46 88 48 66" delay={delay + 1.6} {...ink} />
      <Stroke d="M138 74 Q164 72 192 75" delay={delay + 2.2} {...ink} />
      <Stroke d="M138 94 Q160 93 184 95" delay={delay + 2.5} {...ink} />
      <Stroke d="M236 76 L292 76" delay={delay + 3} dur={0.5} stroke="#0065ed" strokeWidth={3} />
      <motion.path d="M280 66 L292 76 L280 86" fill="none" stroke="#0065ed" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...fade(delay + 4, 0.2)} />
      <motion.rect x={306} y={52} width={110} height={48} rx={24} fill="#ffffff" stroke="#cbd5e1" strokeWidth={2} {...fade(delay + 3.4)} />
      <motion.g {...fade(delay + 3.6)}>
        <rect x={326} y={66} width={3} height={20} rx={1.5} fill="#0065ed" className="w-caret" />
      </motion.g>
    </svg>
  );
}

const FAN_Y = [16, 46, 76, 106, 136];

/** Abrir com a IA: de um ponto saem vários caminhos, e o mais inesperado fica em destaque. */
function OpenArt({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 432 150" className="w-crule-art" aria-hidden>
      {FAN_Y.map((y, n) => (
        <Stroke key={y} d={`M40 76 C150 76 250 ${y} 392 ${y}`} delay={delay + 0.4 + n * 0.25} dur={1.3} stroke={n === 0 ? "#0065ed" : "#94a3b8"} strokeWidth={n === 0 ? 4 : 3} />
      ))}
      {FAN_Y.map((y, n) => (
        <motion.circle key={y} cx={400} cy={y} r={n === 0 ? 9 : 7} fill={n === 0 ? "#0065ed" : "#cbd5e1"} {...fade(delay + 3 + n * 0.25, 0.3)} />
      ))}
      <motion.g {...fade(delay + 3.2, 0.4)}>
        <circle cx={400} cy={FAN_Y[0]} r={9} fill="none" stroke="#0065ed" strokeWidth={2} className="w-ping-dot" />
      </motion.g>
      <motion.circle cx={40} cy={76} r={10} fill="#0f172a" {...fade(delay, 0.4)} />
    </svg>
  );
}

/** Fechar com critério: os caminhos convergem num só. */
function CloseArt({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 432 150" className="w-crule-art" aria-hidden>
      {FAN_Y.map((y, n) => (
        <motion.circle key={y} cx={32} cy={y} r={7} fill="#8ec6fd" {...fade(delay + n * 0.15, 0.4)} />
      ))}
      {FAN_Y.map((y, n) => (
        <Stroke key={y} d={`M32 ${y} C150 ${y} 250 76 384 76`} delay={delay + 0.8 + n * 0.15} dur={1.3} stroke="#8ec6fd" strokeWidth={3} strokeOpacity={0.75} />
      ))}
      <motion.circle cx={396} cy={76} r={13} fill="#ffffff" {...fade(delay + 4, 0.3)} />
      <motion.g {...fade(delay + 4.2, 0.4)}>
        <circle cx={396} cy={76} r={13} fill="none" stroke="#ffffff" strokeWidth={2} className="w-ping-dot" />
      </motion.g>
    </svg>
  );
}

export function RulesScene() {
  const [runs, setRuns] = useState([0, 0, 0]);
  const replay = (n: number) => setRuns((r) => r.map((v, i) => (i === n ? v + 1 : v)));
  const arts = [SketchArt, OpenArt, CloseArt];

  return (
    <section className="w-scene">
      <Head kicker="Criatividade com IA" title="Três regras para não ficarmos todos iguais" />
      <div className="w-crules">
        {CREATIVE_RULES.map((rule, n) => {
          const Art = arts[n];
          const first = runs[n] === 0;
          return (
            <motion.button
              type="button"
              key={rule.n}
              className="w-crule"
              data-strong={n === 2}
              aria-label={`${rule.title}: repetir a animação`}
              onClick={() => replay(n)}
              initial={STILL ? false : { opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -6 }}
              transition={spring(0.4 + n * 0.5, 80, 16)}
            >
              <span className="w-crule-n">{rule.n}</span>
              <span className="w-crule-stage" key={runs[n]}>
                <Art delay={first ? 1 + n * 0.5 : 0} />
              </span>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export function CreativeScene() {
  const [focus, setFocus] = useState<number | null>(null);
  const clearFocus = useClearFocus(focus, () => setFocus(null), "button.w-col");

  return (
    <section className="w-scene" onClick={clearFocus}>
      <Head kicker="Processo criativo" title="Inspiração, tendências e ferramentas" />
      <motion.p className="w-legend" {...fade(3.2)}>
        <i aria-hidden />A azul, as ferramentas usadas nos casos que vamos ver
      </motion.p>
      <div className="w-cols">
        {CREATIVE_COLUMNS.map((col, n) => (
          <motion.button
            type="button"
            key={col.title}
            className="w-col"
            aria-pressed={focus === n}
            onClick={() => setFocus(focus === n ? null : n)}
            initial={STILL ? false : { opacity: 0, x: -60 }}
            animate={{ opacity: focus === null || focus === n ? 1 : 0.35, x: 0, scale: focus === n ? 1.03 : 1 }}
            transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4, ease: EASE }, x: spring(0.3 + n * 0.45, 80, 16) }}
          >
            <span className="w-col-head">
              <span className="w-ben-bub">
                <Icon name={col.icon} size={28} />
              </span>
              <span>
                <b>{col.title}</b>
                <small>{col.sub}</small>
              </span>
            </span>
            <span className="w-col-body">
              {col.rows.map((row, r) => (
                <motion.span key={row.label} className="w-col-row" {...rise(0.9 + n * 0.45 + r * 0.18, 14)}>
                  <small>{row.label}</small>
                  <span>
                    {row.items.map((item, k) => (
                      <span key={item.name}>
                        {k > 0 && <i className="w-sep"> · </i>}
                        <span data-used={item.used || undefined}>{item.name}</span>
                      </span>
                    ))}
                  </span>
                </motion.span>
              ))}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function DifferentialScene() {
  return (
    <section className="w-scene">
      <Head kicker="Processo criativo" title="O diferencial de inovação" />
      <motion.p className="w-dif-lead" {...fade(0.4)}>
        Lembram-se da pergunta do início? Se as ferramentas são as mesmas, a diferença está em três coisas que se somam.
      </motion.p>
      <div className="w-difs">
        {DIFFERENTIALS.map((item, n) => (
          <div key={item.title} className="w-dif-slot">
            {n > 0 && (
              <motion.span className="w-op" initial={STILL ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring(1.1 + n * 0.5, 200, 12)}>
                +
              </motion.span>
            )}
            <motion.div
              className="w-dif"
              initial={STILL ? false : { opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring(0.8 + n * 0.5, 80, 16)}
            >
              <span className="w-ben-bub" data-anim={item.icon}>
                <Icon name={item.icon} size={30} />
              </span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </motion.div>
          </div>
        ))}
      </div>
      <motion.span className="w-eq" initial={STILL ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring(2.6, 200, 12)}>
        =
      </motion.span>
      <motion.div className="w-impact" {...reveal(3)}>
        <div>
          <h3>Inovação com impacto</h3>
          <p>A ferramenta muda todos os meses, mas estas três coisas ficam.</p>
        </div>
      </motion.div>
    </section>
  );
}

const CASE_IMAGES = [casoSomos, casoLuma, casoCleo];

export function CasesScene() {
  return (
    <section className="w-scene">
      <Head kicker="Casos reais da TIS" title="Três casos, três formas de pôr a IA a trabalhar" />
      <div className="w-cases">
        {CASES.map((item, n) => (
          <motion.a
            key={item.name}
            href={`#${item.step}`}
            className="w-case"
            aria-label={`Abrir o caso ${item.n}: ${item.name}`}
            initial={STILL ? false : { opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={spring(0.4 + n * 0.45, 80, 16)}
          >
            <span className="w-case-img">
              <img src={CASE_IMAGES[n]} alt="" />
            </span>
            <span className="w-case-txt">
              <span className="w-case-n">{item.n}</span>
              <span>
                <b>{item.name}</b>
                <em>{item.role}</em>
                <small>{item.text}</small>
              </span>
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

const POSTERS: Record<string, string> = { "somos-tis": posterSomos, "agente-rh": posterAgente, "jardim-da-luma": posterLuma, cleo: posterCleo };
const VIDEO_W = 880;
const BAR_H = 48;

/** Vídeo de um caso: os que não têm som passam sozinhos; um clique pausa ou retoma. */
function CaseVideo({ item }: { item: (typeof VIDEO_CASES)[number] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    video.muted = item.autoplay;
    if (item.autoplay && !STILL) void video.play().catch(() => undefined);
    let frame = 0;
    const tick = () => {
      if (video.duration) progress.set(video.currentTime / video.duration);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [item, progress]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <motion.div key={item.video} className="w-vid" role="button" tabIndex={0} aria-label={playing ? "Pausar o vídeo" : "Reproduzir o vídeo"} onClick={toggle} initial={STILL ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.5 }}>
      <video
        ref={ref}
        src={`./videos/${item.video}.mp4`}
        poster={POSTERS[item.video]}
        playsInline
        loop={item.autoplay}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <AnimatePresence>
        {!playing && (
          <motion.span className="w-vid-play" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
            <Play size={44} fill="currentColor" strokeWidth={0} aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="w-vid-state" data-on={playing}>
        {playing ? <Pause size={18} fill="currentColor" strokeWidth={0} aria-hidden /> : <Play size={18} fill="currentColor" strokeWidth={0} aria-hidden />}
      </span>
      <motion.i className="w-vid-progress" style={{ scaleX: progress }} />
    </motion.div>
  );
}

export function VideoScene({ index }: { index: number }) {
  const item = VIDEO_CASES[index];
  const height = Math.round(VIDEO_W / item.ratio) + (item.url ? BAR_H : 0);

  return (
    <section className="w-scene">
      <Head kicker={item.kicker} title={item.title} k={String(index)} />
      <motion.div
        className="w-vframe"
        initial={STILL ? false : { opacity: 0, x: -60, height }}
        animate={{ opacity: 1, x: 0, height }}
        transition={{ opacity: tween(0.6, 0.3), x: spring(0.3, 80, 16), height: tween(0.6) }}
      >
        {item.url && (
          <span className="w-vbar">
            <i />
            <i />
            <i />
            <Swap>
              <motion.a key={item.url} className="w-url" href={`https://${item.url}`} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} {...fade(0.6)} exit={exit}>
                {item.url}
              </motion.a>
            </Swap>
          </span>
        )}
        <span className="w-vbody">
          <AnimatePresence initial={false}>
            <CaseVideo key={item.video} item={item} />
          </AnimatePresence>
        </span>
      </motion.div>
      <Swap>
        <motion.p key={item.caption} className="w-vcap" style={{ top: 290 + height + 16 }} {...fade(1.2)} exit={exit}>
          {item.caption}
        </motion.p>
      </Swap>
      <div className="w-vside">
        <Swap>
          <motion.div key={index} exit={exit}>
            {"facts" in item && item.facts && (
              <div className="w-facts">
                {item.facts.map((fact, n) => (
                  <motion.div key={fact.label} className="w-fact" {...rise(0.7 + n * 0.25, 20)}>
                    <p className="w-lbl">{fact.label}</p>
                    <p>{fact.text}</p>
                  </motion.div>
                ))}
              </div>
            )}
            {"cards" in item && item.cards && (
              <div className="w-vcards">
                {item.cards.map((card, n) => (
                  <motion.div key={card.title} className="w-ben" {...rise(0.6 + n * 0.25, 20)}>
                    <span className="w-ben-bub">
                      <Icon name={card.icon} size={28} />
                    </span>
                    <div>
                      <h4>{card.title}</h4>
                      <p>{card.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </Swap>
      </div>
    </section>
  );
}

const EXPERIMENT_IMAGES: Record<string, string> = { "quem-sou-eu": quemSouEu, "estudio-tis": estudioTis };

export function InnovationScene() {
  const [zoom, setZoom] = useState<number | null>(null);

  const step = (delta: number) => setZoom((z) => (z === null ? z : (z + delta + EXPERIMENTS.length) % EXPERIMENTS.length));

  // Com uma imagem ampliada, as setas do teclado passam de uma imagem à outra em vez de mudar de ecrã.
  useEffect(() => {
    if (zoom === null) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoom(null);
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight") step(event.key === "ArrowRight" ? 1 : -1);
      else return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [zoom]);

  return (
    <section className="w-scene">
      <Head kicker="Caso 1 · O que tem de inovador" title="Do portal que informa ao portal que conversa" />
      <div className="w-exps">
        {EXPERIMENTS.map((exp, n) => (
          <motion.button
            type="button"
            key={exp.title}
            className="w-exp"
            aria-label={`Ampliar: ${exp.title}`}
            onClick={() => setZoom(n)}
            initial={STILL ? false : { opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={spring(0.4 + n * 0.45, 80, 16)}
          >
            <span className="w-exp-img">
              <img src={EXPERIMENT_IMAGES[exp.image]} alt="" />
              <span className="w-zoom" aria-hidden>
                <Maximize2 size={20} />
              </span>
            </span>
            <span className="w-exp-txt">
              <b>{exp.title}</b>
              <small>{exp.text}</small>
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            key="zoom"
            className="w-zoomview"
            role="dialog"
            aria-label={EXPERIMENTS[zoom].title}
            onClick={() => setZoom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.figure initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ duration: 0.4, ease: EASE }}>
              <Swap>
                <motion.div key={zoom} className="w-zoomview-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.3 }}>
                  <img src={EXPERIMENT_IMAGES[EXPERIMENTS[zoom].image]} alt="" />
                  <figcaption>{EXPERIMENTS[zoom].title}</figcaption>
                </motion.div>
              </Swap>
            </motion.figure>
            {[-1, 1].map((delta) => (
              <button
                type="button"
                key={delta}
                className="w-zoomview-nav"
                data-side={delta < 0 ? "left" : "right"}
                aria-label={delta < 0 ? "Imagem anterior" : "Imagem seguinte"}
                onClick={(event) => {
                  event.stopPropagation();
                  step(delta);
                }}
              >
                {delta < 0 ? <ChevronLeft size={64} strokeWidth={2} aria-hidden /> : <ChevronRight size={64} strokeWidth={2} aria-hidden />}
              </button>
            ))}
            <span className="w-zoomview-x" aria-hidden>
              <X size={28} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function LumaScene() {
  return (
    <section className="w-scene">
      <Head kicker="Caso 2 · IA e inovação" title="A Luma conversa, ensina e respeita" />
      <div className="w-lumas">
        {LUMA_COLUMNS.map((col, n) => (
          <motion.div key={col.title} className="w-luma" data-strong={n === 0} {...reveal(0.4 + n * 0.6)}>
            <p className="w-luma-head">
              <span className="w-ben-bub">{n === 0 ? <AiMark size={28} color="#0065ed" /> : <Star size={28} strokeWidth={2.2} aria-hidden />}</span>
              {col.title}
            </p>
            {col.items.map((item, k) => (
              <motion.div key={item.title} className="w-luma-item" {...rise(1.2 + n * 0.6 + k * 0.2, 16)}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const CLEO_IMAGES = [cleo1, cleo2, cleo3, cleo4, cleo5];
const STEP_X = 341;

export function StepsScene() {
  const [active, select] = useSelected(CLEO_STEPS.length, 3600, STILL ? 4 : 0, true);

  return (
    <section className="w-scene">
      <Head kicker="Caso 3 · Como foi feita a Cleo" title="Da imagem ao vídeo, em cinco passos" />
      <div className="w-steps">
        <motion.i className="w-steps-line" initial={STILL ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={tween(1.6, 0.6)} />
        <motion.i className="w-steps-fill" initial={false} animate={{ scaleX: active / (CLEO_STEPS.length - 1) }} transition={{ duration: 1.2, ease: EASE }} />
        {CLEO_STEPS.map((item, n) => (
          <motion.button
            type="button"
            key={item.title}
            className="w-step"
            style={{ left: n * STEP_X }}
            data-on={n === active}
            data-done={n < active}
            aria-pressed={n === active}
            onClick={() => select(n)}
            {...rise(0.4 + n * 0.3, 24)}
          >
            <span className="w-step-img">
              <img src={CLEO_IMAGES[n]} alt="" />
            </span>
            <span className="w-step-n">{n + 1}</span>
            <b>{item.title}</b>
            <small>{item.text}</small>
            <em>{item.tool}</em>
          </motion.button>
        ))}
      </div>
      <motion.p className="w-steps-note" {...fade(2.6)}>
        A IA fez o trabalho pesado de produção, e a história, o guião, a pose, o tom e a edição final foram escolhas humanas.
      </motion.p>
    </section>
  );
}

export function LessonsScene() {
  return (
    <section className="w-scene">
      <Head kicker="O que aprendemos" title="Três casos, três lições" />
      <div className="w-lessons">
        {LESSONS.map((item, n) => (
          <motion.div key={item.title} className="w-lesson" data-strong={n === 2} {...reveal(0.4 + n * 0.5, 1, 20)}>
            <span className="w-ben-bub">
              <Icon name={item.icon} size={30} />
            </span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
            <em>{item.tag}</em>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TakeawayScene() {
  return (
    <section className="w-scene">
      <CoverMark rotate={-20} color="#0050da" size={600} style={{ right: 40, bottom: 60 }} />
      <div className="w-takeaway">
        <motion.p className="w-kicker" style={{ color: "#8ec6fd", fontSize: 22, letterSpacing: 3 }} {...fade(0.1)}>
          Para levar daqui
        </motion.p>
        <ol>
          {TAKEAWAYS.map((text, n) => (
            <motion.li key={text} {...rise(0.4 + n * 0.3, 24)}>
              <b>{String(n + 1).padStart(2, "0")}</b>
              <span>{text}</span>
            </motion.li>
          ))}
        </ol>
        <h1 className="w-takeaway-title">
          <MaskLine delay={1.8}>A IA acelera,</MaskLine>
          <MaskLine delay={2}>as pessoas dão a direcção.</MaskLine>
        </h1>
        <motion.p className="w-takeaway-links" {...fade(2.8)}>
          <a href="https://somostis.com" target="_blank" rel="noreferrer">
            somostis.com
          </a>
          <i aria-hidden />
          <a href="https://luma.somostis.com" target="_blank" rel="noreferrer">
            luma.somostis.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
