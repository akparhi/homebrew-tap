import { useCallback, useState } from "react";

export function CodeBlock({
  children,
  label = "terminal",
}: {
  children: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    void navigator.clipboard.writeText(children.replace(/^\$ /gm, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [children]);

  return (
    <div className="code-block relative bg-card border border-border rounded-[var(--radius)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="font-mono text-[11px] text-muted-foreground">
          {label}
        </span>
        <button
          className="copy-btn font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          onClick={copy}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <pre className="px-4 py-3 m-0 overflow-x-auto">
        <code className="text-foreground font-mono text-[13px] leading-[1.7]">
          {children}
        </code>
      </pre>
    </div>
  );
}
