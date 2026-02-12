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
    <div className="code-block relative bg-ink-900 dark:bg-ink-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-ink-700/50">
        <span className="font-mono text-[11px] text-ink-500">{label}</span>
        <button
          className="copy-btn font-mono text-[11px] text-ink-500 hover:text-ink-300 transition-colors"
          onClick={copy}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <pre className="px-4 py-3 m-0 overflow-x-auto">
        <code className="text-ink-100 font-mono text-[13px] leading-[1.7]">
          {children}
        </code>
      </pre>
    </div>
  );
}
