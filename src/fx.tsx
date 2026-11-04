import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

/** `#<passo>-still` mostra o estado final de cada ecrã sem animação (exportação e verificação). */
export const STILL = window.location.hash.includes("still");

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Ritmo das entradas: todos os atrasos são multiplicados por este valor, para os ecrãs ficarem completos mais depressa. */
export const PACE = 0.5;

export const rise = (delay = 0, y = 36) =>
  STILL
    ? {}
    : {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: delay * PACE, ease: EASE },
      };

export const fade = (delay = 0, duration = 0.6) =>
  STILL ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration, delay: delay * PACE } };

export const spring = (delay = 0, stiffness = 70, damping = 16) =>
  STILL ? { duration: 0 } : ({ type: "spring", stiffness, damping, delay: delay * PACE } as const);

export const tween = (duration: number, delay = 0) =>
  STILL ? { duration: 0 } : { duration, delay: delay * PACE, ease: EASE };

/** Troca de conteúdo com saída e entrada; em modo estático troca directamente. */
export function Swap({ children, mode = "wait" }: { children: ReactNode; mode?: "wait" | "popLayout" | "sync" }) {
  if (STILL) return <>{children}</>;
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
}

/** Linha de título que sobe de dentro de uma máscara. */
export function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="w-mask">
      <motion.span
        initial={STILL ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: delay * PACE, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function CountUp({ value, decimals = 0, delay = 0 }: { value: number; decimals?: number; delay?: number }) {
  const [current, setCurrent] = useState(STILL ? value : 0);

  useEffect(() => {
    if (STILL) return undefined;

    let frame = 0;
    const duration = 1400;
    const start = performance.now() + delay * PACE * 1000;
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      setCurrent(value * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, delay]);

  return <>{current.toFixed(decimals).replace(".", ",")}</>;
}

/** Devolve `true` depois de `ms`; serve para encadear dois momentos dentro do mesmo ecrã. */
export function useAfter(ms: number, key: unknown) {
  const [done, setDone] = useState(STILL);

  useEffect(() => {
    if (STILL) return undefined;
    setDone(false);
    const timer = window.setTimeout(() => setDone(true), ms * PACE);
    return () => window.clearTimeout(timer);
  }, [ms, key]);

  return done;
}
