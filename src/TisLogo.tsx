import svgPaths from "./imports/tis-logo-paths";
import { imgGroup } from "./imports/tis-logo-mask";

/** Logótipo TIS do rodapé, o mesmo da apresentação do Núcleo de Experiência; em branco nos ecrãs de título do Tema 2. */
export function TisLogo({ white = false }: { white?: boolean }) {
  return (
    <div
      className="w-tis-logo"
      style={{ maskImage: `url('${imgGroup}')`, WebkitMaskImage: `url('${imgGroup}')` }}
      aria-label="TIS"
      role="img"
    >
      <svg fill="none" preserveAspectRatio="none" viewBox="0 0 119.929 53.6039">
        <path d={svgPaths.p1bc3fc80} fill={white ? "#FFFFFF" : "#0065ED"} />
        <path d={svgPaths.p8ed8880} fill={white ? "#FFFFFF" : "#0065ED"} />
        <path d={svgPaths.p79b1980} fill={white ? "#FFFFFF" : "#0065ED"} />
        <path d={svgPaths.p3380500} fill={white ? "#FFFFFF" : "#0F172A"} />
        <path d={svgPaths.p3777a600} fill={white ? "#FFFFFF" : "#0F172A"} />
        <path d={svgPaths.p30300b00} fill={white ? "#FFFFFF" : "#0F172A"} />
      </svg>
    </div>
  );
}
