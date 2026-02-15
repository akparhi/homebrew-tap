import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    darkMode: true,
    background: "#0a0a0a",
    primaryColor: "#1a1a2e",
    primaryTextColor: "#eee",
    primaryBorderColor: "#333",
    lineColor: "#555",
    secondaryColor: "#16213e",
    tertiaryColor: "#0f3460",
    fontFamily: "ui-monospace, monospace",
    fontSize: "12px",
  },
});

let idCounter = 0;

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [id] = useState(() => `mermaid-${idCounter++}`);

  useEffect(() => {
    let cancelled = false;
    mermaid.render(id, chart).then(({ svg }) => {
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="overflow-x-auto rounded-lg border border-border bg-card p-4 mb-6 [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
