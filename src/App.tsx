import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from "motion/react";
import markPaths from "./imports/logo-mark";
import backPaths from "./imports/back";
import { STEPS } from "./content";
import { STILL, Swap } from "./fx";
import { TisLogo } from "./TisLogo";
import {
  CasesScene,
  ComparisonScene,
  CreativeScene,
  DifferentialScene,
  InnovationScene,
  LessonsScene,
  LumaScene,
  RulesScene,
  StepsScene,
  TakeawayScene,
  VideoScene,
  CoverScene,
  ClosingScene,
  ExampleScene,
  HandoffScene,
  HarnessScene,
  IntroScene,
  ConsistencyScene,
  ProcessScene,
  QuestionScene,
  SourceScene,
  SpeakersScene,
  ValidationScene,
} from "./scenes";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const REPEAT_ICON_PATH =
  "M35.3 12.65C32.4 9.75 28.4 8 24 8C15.15 8 8 15.15 8 24C8 32.85 15.15 40 24 40C31.45 40 37.7 34.9 39.45 28H35.25C33.6 32.65 29.15 36 24 36C17.35 36 12 30.65 12 24C12 17.35 17.35 12 24 12C27.3 12 30.25 13.35 32.4 15.5L26 22H40V8L35.3 12.65Z";
const FULLSCREEN_ENTER_PATH = "M5 19v-6h2v4h4v2H5Zm12-8V7h-4V5h6v6h-2Z";
const FULLSCREEN_EXIT_PATH = "M11 13v6H9v-4H5v-2h6Zm4-8v4h4v2h-6V5h2Z";
const INTERACTIVE = "button, a, input, select, textarea, video, [role='button'], [role='dialog']";
const PROXIMITY_BUFFER = 32;
const CURSOR_SPRING = { damping: 28, stiffness: 350, mass: 0.5 };

/** `#<passo>` abre um ecrã directamente; `#<passo>-still` mostra-o no estado final, sem animações. */
function readHash() {
  const id = window.location.hash.slice(1).replace(/-still$/, "");
  const index = STEPS.findIndex((step) => step.id === id);
  return index === -1 ? 0 : index;
}

export default function App() {
  const [scale, setScale] = useState(1);
  const [stepIndex, setStepIndex] = useState(readHash);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [isOnInteractive, setIsOnInteractive] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const cursorX = useSpring(mouseX, CURSOR_SPRING);
  const cursorY = useSpring(mouseY, CURSOR_SPRING);

  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;
  const goTo = (index: number) => setStepIndex(Math.max(0, Math.min(STEPS.length - 1, index)));

  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setStepIndex(readHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    try {
      window.history.replaceState(null, "", `#${step.id}${STILL ? "-still" : ""}`);
    } catch {
      /* o enquadramento pode recusar; a navegação continua */
    }
    document.title = `${step.label} · Webinar UX e IA`;
  }, [step]);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void document.documentElement.requestFullscreen().catch(() => undefined);
    } catch {
      /* ecrã inteiro indisponível neste enquadramento */
    }
  };

  // ── Teclado: setas e espaço navegam, F ecrã inteiro, R volta ao início ──
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const isSpace = event.key === " " && !(event.target instanceof HTMLButtonElement);
      if (event.key.startsWith("Arrow") || event.key.startsWith("Page")) {
        if (document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
      }
      if (event.key === "ArrowRight" || event.key === "PageDown" || isSpace) goTo(stepIndex + 1);
      else if (event.key === "ArrowLeft" || event.key === "PageUp") goTo(stepIndex - 1);
      else if (event.key === "Home" || event.key === "r" || event.key === "R") goTo(0);
      else if (event.key === "End") goTo(STEPS.length - 1);
      else if (event.key === "f" || event.key === "F") toggleFullscreen();
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepIndex]);

  // ── Cursor de navegação: metade direita avança, metade esquerda recua ──
  const handleMouseMove = (event: MouseEvent) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
    setIsLeftHalf(event.clientX < window.innerWidth / 2);
    let nearInteractive = false;
    for (const element of document.querySelectorAll(INTERACTIVE)) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0) continue;
      if (
        event.clientX >= rect.left - PROXIMITY_BUFFER &&
        event.clientX <= rect.right + PROXIMITY_BUFFER &&
        event.clientY >= rect.top - PROXIMITY_BUFFER &&
        event.clientY <= rect.bottom + PROXIMITY_BUFFER
      ) {
        nearInteractive = true;
        break;
      }
    }
    setIsOnInteractive(nearInteractive);
    if (!cursorVisible) setCursorVisible(true);
  };

  const handleClick = (event: MouseEvent) => {
    if ((event.target as Element).closest(INTERACTIVE)) return;
    const clickIsLeftHalf = event.clientX < window.innerWidth / 2;
    setIsTapping(true);
    window.setTimeout(() => setIsTapping(false), 180);
    if (isLast && !clickIsLeftHalf) goTo(0);
    else if (isFirst || !clickIsLeftHalf) goTo(stepIndex + 1);
    else goTo(stepIndex - 1);
  };

  // Toques no ecrã: deslizar para os lados navega.
  const [touchX, setTouchX] = useState<number | null>(null);

  const showBackCursor = !isFirst && isLeftHalf;
  const showRepeatCursor = isLast && !isLeftHalf;
  const cursorIcon = showBackCursor ? "back" : showRepeatCursor ? "repeat" : "forward";
  const cursorSize = (showBackCursor ? 56 : 80) * scale;
  const cursorShown = cursorVisible && !isOnInteractive && !STILL;
  const dark = Boolean(step.dark);
  const footer =
    step.scene === "capa"
      ? ["2026", "TIS"]
      : dark
        ? ["TIS", "Webinar UX e IA"]
        : [String(stepIndex + 1).padStart(2, "0"), "Webinar UX e IA"];

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={`w-root${STILL ? " w-still" : ""}`}
        data-dark={dark}
        data-gray={step.bg === "#334155"}
        data-scene={step.scene}
        animate={{ backgroundColor: step.bg }}
        initial={false}
        transition={{ duration: 0.6 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
        onClick={handleClick}
        onTouchStart={(event) => setTouchX(event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchX === null) return;
          const dx = event.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 50) goTo(stepIndex + (dx < 0 ? 1 : -1));
          setTouchX(null);
        }}
      >
        <p className="w-sr-only" aria-live="polite">
          Ecrã {stepIndex + 1} de {STEPS.length}: {step.label}
        </p>

        <div className="w-stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` } as CSSProperties}>
          <Swap>
            <motion.main
              key={step.scene}
              className="w-main"
              initial={STILL ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {step.scene === "capa" && <CoverScene />}
              {step.scene === "intro" && <IntroScene />}
              {step.scene === "oradores" && <SpeakersScene />}
              {step.scene === "pergunta" && <QuestionScene index={step.build ?? 0} />}
              {step.scene === "processo" && <ProcessScene build={step.build ?? 0} />}
              {step.scene === "comparacao" && <ComparisonScene />}
              {step.scene === "fonte" && <SourceScene />}
              {step.scene === "harness" && <HarnessScene build={step.build ?? 0} />}
              {step.scene === "exemplo" && <ExampleScene />}
              {step.scene === "consistencia" && <ConsistencyScene />}
              {step.scene === "validacao" && <ValidationScene />}
              {step.scene === "handoff" && <HandoffScene />}
              {step.scene === "regras" && <RulesScene />}
              {step.scene === "criativo" && <CreativeScene />}
              {step.scene === "diferencial" && <DifferentialScene />}
              {step.scene === "casos" && <CasesScene />}
              {step.scene === "video" && <VideoScene index={step.build ?? 0} />}
              {step.scene === "inovacao" && <InnovationScene />}
              {step.scene === "luma" && <LumaScene />}
              {step.scene === "passos" && <StepsScene />}
              {step.scene === "licoes" && <LessonsScene />}
              {step.scene === "levar" && <TakeawayScene />}
              {step.scene === "fecho" && <ClosingScene />}
            </motion.main>
          </Swap>

          <footer className="w-footer">
            <p className="w-foot-id">
              <b>{footer[0]}</b>
              <i aria-hidden />
              <span>{footer[1]}</span>
            </p>
            {!dark && <TisLogo />}
          </footer>
        </div>

        <button
          type="button"
          className="w-fullscreen"
          aria-label={isFullscreen ? "Sair do ecrã inteiro" : "Ver em ecrã inteiro"}
          title={isFullscreen ? "Sair do ecrã inteiro (F)" : "Ver em ecrã inteiro (F)"}
          aria-pressed={isFullscreen}
          onClick={toggleFullscreen}
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d={isFullscreen ? FULLSCREEN_EXIT_PATH : FULLSCREEN_ENTER_PATH} />
          </svg>
        </button>

        <motion.div
          className="w-cursor"
          aria-hidden
          style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
          animate={{
            opacity: cursorShown ? 1 : 0,
            scale: cursorShown ? (isTapping ? 0.82 : 1) : 0.4,
            width: cursorSize,
            height: cursorSize,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.svg
              key={cursorIcon}
              initial={{ opacity: 0, rotate: cursorIcon === "back" ? 45 : -45, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              viewBox={cursorIcon === "back" ? "0 0 32 32" : "0 0 48 48"}
              style={{ width: "58%", height: "58%" }}
              fill="white"
            >
              <path
                d={
                  cursorIcon === "back"
                    ? backPaths.p1cb876f0
                    : cursorIcon === "repeat"
                      ? REPEAT_ICON_PATH
                      : markPaths.pa0c5900
                }
              />
            </motion.svg>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
