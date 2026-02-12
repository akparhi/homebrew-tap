import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/header.tsx";
import { CodeBlock } from "../components/code-block.tsx";

const SIDEBAR_SECTIONS = [
  {
    title: "Getting Started",
    links: [
      { id: "installation", label: "Installation" },
      { id: "setup", label: "Setup Wizard" },
      { id: "requirements", label: "Requirements" },
    ],
  },
  {
    title: "CLI Reference",
    links: [{ id: "cli-commands", label: "Commands" }],
  },
  {
    title: "TUI Guide",
    links: [
      { id: "tui-views", label: "Views" },
      { id: "keyboard", label: "Keyboard Shortcuts" },
    ],
  },
  {
    title: "Configuration",
    links: [{ id: "config-settings", label: "Settings" }],
  },
  {
    title: "Architecture",
    links: [
      { id: "pipeline", label: "Pipeline" },
      { id: "ipc", label: "IPC Protocol" },
    ],
  },
  { title: "Files & Data", links: [{ id: "files", label: "File Locations" }] },
];

function Sidebar({
  activeId,
  className,
}: {
  activeId: string;
  className?: string;
}) {
  return (
    <nav className={`space-y-5 ${className ?? ""}`}>
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.title}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1.5 px-3">
            {section.title}
          </h4>
          <ul className="space-y-px">
            {section.links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`sidebar-link block text-[13px] py-1.5 px-3 rounded-md border-l-0 transition-colors ${
                    activeId === link.id
                      ? "text-accent bg-accent/5"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-xl font-bold tracking-tight mb-4 mt-14 first:mt-0 scroll-mt-20 text-text-primary"
    >
      {children}
    </h2>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden overflow-x-auto bg-surface-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`text-left px-4 py-2.5 text-text-tertiary whitespace-nowrap text-xs ${i === 0 ? "font-mono" : ""} font-medium`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text-secondary">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                i < rows.length - 1 ? "border-b border-border-subtle" : ""
              }
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-2 ${j === 0 ? "font-mono text-xs text-text-primary whitespace-nowrap" : "text-[13px]"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-xs bg-surface-2 px-1.5 py-0.5 rounded border border-border text-text-secondary">
      {children}
    </kbd>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[13px] bg-surface-2 px-1.5 py-0.5 rounded text-accent">
      {children}
    </code>
  );
}

function PipelineStep({
  label,
  highlight,
}: {
  label: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={`px-2 py-1 rounded font-mono text-xs border ${
        highlight
          ? "bg-accent/10 border-accent/20 text-accent"
          : "bg-surface-2 border-border text-text-secondary"
      }`}
    >
      {label}
    </span>
  );
}

export function FerrixDocs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useState("installation");

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  useEffect(() => {
    const allIds = SIDEBAR_SECTIONS.flatMap((s) => s.links.map((l) => l.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    for (const id of allIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header tool="Ferrix" onMenuToggle={toggleSidebar} />

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-52 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border py-6 pr-2">
          <Sidebar activeId={activeId} />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              onClick={toggleSidebar}
            />
            <aside className="fixed top-14 left-0 bottom-0 w-60 bg-surface-0 border-r border-border z-30 overflow-y-auto py-6 pr-2 lg:hidden">
              <Sidebar activeId={activeId} />
            </aside>
          </>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-10 py-10 max-w-3xl">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-medium text-xs">
                fx
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Ferrix</h1>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
              An automated bug-fixing daemon that polls Linear for assigned
              tickets, uses Claude to generate code fixes, and creates pull
              requests on GitHub.
            </p>
          </div>

          {/* Installation */}
          <SectionHeading id="installation">Installation</SectionHeading>
          <CodeBlock>brew install akparhi/tap/ferrix</CodeBlock>
          <p className="text-sm text-text-secondary mt-3 mb-2">To upgrade:</p>
          <CodeBlock>brew upgrade ferrix</CodeBlock>
          <p className="text-sm text-text-secondary mt-3">
            Ferrix includes auto-update — the TUI prompts you when a new version
            is available.
          </p>

          {/* Setup */}
          <SectionHeading id="setup">Setup Wizard</SectionHeading>
          <p className="text-sm text-text-secondary mb-4">
            On first run, an interactive wizard walks you through:
          </p>
          <ol className="space-y-2.5 mb-6 text-sm text-text-secondary list-decimal list-inside">
            <li>
              <strong className="text-text-primary">Linear API Key</strong> —
              from{" "}
              <a
                href="https://linear.app/settings/api"
                className="text-accent hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Linear Settings &rarr; API
              </a>
              , validated live
            </li>
            <li>
              <strong className="text-text-primary">
                Repository Discovery
              </strong>{" "}
              — auto-scans <Code>~</Code> and <Code>~/Projects</Code> for git
              repos
            </li>
            <li>
              <strong className="text-text-primary">
                Repository Selection
              </strong>{" "}
              — toggle which repos to monitor
            </li>
            <li>
              <strong className="text-text-primary">Polling Interval</strong> —
              30–600 seconds (default 30s)
            </li>
            <li>
              <strong className="text-text-primary">Ticket Age Filters</strong>{" "}
              — min age, max age, min description length
            </li>
            <li>
              <strong className="text-text-primary">GitHub Auth</strong> —
              checks <Code>gh</Code> CLI status
            </li>
          </ol>

          {/* Requirements */}
          <SectionHeading id="requirements">Requirements</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="border border-border rounded-lg p-4 bg-surface-1">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mb-2">
                System
              </h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>macOS (Apple Silicon or Intel)</li>
                <li>Homebrew</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-4 bg-surface-1">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mb-2">
                Accounts
              </h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  <a
                    href="https://console.anthropic.com/"
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Claude
                  </a>{" "}
                  (via <Code>claude</Code> CLI)
                </li>
                <li>
                  <a
                    href="https://linear.app/settings/api"
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Linear API key
                  </a>
                </li>
                <li>
                  <a
                    href="https://cli.github.com"
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub CLI
                  </a>{" "}
                  (<Code>gh auth login</Code>)
                </li>
              </ul>
            </div>
          </div>

          {/* CLI Commands */}
          <SectionHeading id="cli-commands">Commands</SectionHeading>
          <div className="mb-4">
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["ferrix", "Launch TUI (auto-starts daemon if not running)"],
                ["ferrix start", "Start daemon in background"],
                ["ferrix stop", "Stop the daemon"],
                ["ferrix status", "Show daemon status, uptime, last poll"],
                ["ferrix logs", "Tail daemon logs (last 20 + follow)"],
              ]}
            />
          </div>
          <CodeBlock>{`$ ferrix status\nDaemon is running (PID 12345)\n  Uptime: 2h 14m\n  Paused: no\n  Connected clients: 1\n  Last poll: 28s ago`}</CodeBlock>

          {/* TUI Views */}
          <SectionHeading id="tui-views">Views</SectionHeading>
          <p className="text-sm text-text-secondary mb-4">
            Terminal UI built with{" "}
            <a
              href="https://github.com/vadimdemedes/ink"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Ink
            </a>
            . 6 tabs via number keys or arrows:
          </p>
          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {[
              {
                n: "1",
                name: "Dashboard",
                desc: "Status, activity, statistics",
              },
              { n: "2", name: "Manual", desc: "Trigger fix from ticket URL" },
              { n: "3", name: "Tickets", desc: "Processed tickets + status" },
              { n: "4", name: "Logs", desc: "Live log stream with filters" },
              { n: "5", name: "Repos", desc: "Manage monitored repos" },
              { n: "6", name: "Settings", desc: "Edit config, reset wizard" },
            ].map((v) => (
              <div
                key={v.n}
                className="flex items-center gap-3 border border-border rounded-lg px-3.5 py-2.5 bg-surface-1"
              >
                <span className="font-mono text-[11px] text-accent bg-accent/10 w-5 h-5 rounded flex items-center justify-center shrink-0">
                  {v.n}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-text-primary">
                    {v.name}
                  </span>
                  <span className="text-xs text-text-tertiary ml-2">
                    {v.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Keyboard */}
          <SectionHeading id="keyboard">Keyboard Shortcuts</SectionHeading>
          <div className="mb-6">
            <Table
              headers={["Key", "Action"]}
              rows={[
                [
                  <>
                    <Kbd>1</Kbd>–<Kbd>6</Kbd>
                  </>,
                  "Switch tab by number",
                ],
                [
                  <>
                    <Kbd>&larr;</Kbd> <Kbd>&rarr;</Kbd>
                  </>,
                  "Navigate tabs",
                ],
                [
                  <>
                    <Kbd>&uarr;</Kbd> <Kbd>&darr;</Kbd>
                  </>,
                  "Scroll lists",
                ],
                [<Kbd>Space</Kbd>, "Toggle selection"],
                [<Kbd>Enter</Kbd>, "Confirm / submit"],
                [<Kbd>Esc</Kbd>, "Close / cancel"],
              ]}
            />
          </div>

          {/* Configuration */}
          <SectionHeading id="config-settings">Configuration</SectionHeading>
          <p className="text-sm text-text-secondary mb-4">
            All settings in SQLite, editable via TUI Settings. Changes apply
            immediately.
          </p>
          <div className="mb-6">
            <Table
              headers={["Setting", "Default", "Description"]}
              rows={[
                ["polling_interval", "30000", "Poll Linear interval (ms)"],
                ["min_ticket_age", "60000", "Min age before processing (ms)"],
                ["max_ticket_age", "31536000000", "Max age (~365 days)"],
                ["min_description_length", "1", "Min description chars"],
                ["linear_scan_mode", "me", "Scan mode"],
                [
                  "linear_states_filter",
                  "Triage,Todo (ready),Todo",
                  "Matching states",
                ],
                ["claude_command", "/spec-dev", "Claude skill to invoke"],
                ["claude_model", "opus", "Claude model"],
                ["claude_timeout_minutes", "10", "Max fix time (min)"],
                ["claude_effort_level", "low", "Reasoning effort"],
                ["notification_sound", "default", "macOS sound"],
              ]}
            />
          </div>

          {/* Pipeline */}
          <SectionHeading id="pipeline">Pipeline</SectionHeading>
          <p className="text-sm text-text-secondary mb-4">
            Multi-stage ticket processing:
          </p>
          <div className="flex flex-wrap items-center gap-1.5 mb-5">
            {[
              "Polling",
              "Linear",
              "Repo Match",
              "Processor",
              "Claude",
              "Git",
              "GitHub",
              "Notify",
              "Stats",
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-1.5">
                <PipelineStep label={step} highlight={step === "Claude"} />
                {i < arr.length - 1 && (
                  <span className="text-text-tertiary text-xs">&rarr;</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-6 font-mono text-xs">
            <span className="text-yellow-500">queued</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="text-blue-400">processing</span>
            <span className="text-text-tertiary">&rarr;</span>
            <span className="text-emerald-400">completed</span>
            <span className="text-text-tertiary">|</span>
            <span className="text-red-400">failed</span>
            <span className="text-text-tertiary">|</span>
            <span className="text-text-tertiary">skipped</span>
          </div>
          <h3 className="text-sm font-medium mb-2 text-text-primary">
            How it works
          </h3>
          <ol className="space-y-1.5 mb-6 text-sm text-text-secondary list-decimal list-inside">
            <li>
              <strong className="text-text-primary">Poll</strong> — query Linear
              at configured interval
            </li>
            <li>
              <strong className="text-text-primary">Match</strong> — map ticket
              to local repo
            </li>
            <li>
              <strong className="text-text-primary">Process</strong> — branch +
              invoke Claude Code
            </li>
            <li>
              <strong className="text-text-primary">Fix</strong> — Claude
              generates + commits changes
            </li>
            <li>
              <strong className="text-text-primary">PR</strong> — create pull
              request linked to ticket
            </li>
            <li>
              <strong className="text-text-primary">Notify</strong> — macOS
              notification + stats
            </li>
          </ol>

          {/* IPC */}
          <SectionHeading id="ipc">IPC Protocol</SectionHeading>
          <p className="text-sm text-text-secondary mb-4">
            Unix domain socket (<Code>~/.ferrix/daemon.sock</Code>), JSON Lines
            protocol.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mb-2">
                Commands
              </h4>
              <ul className="space-y-0.5 text-[13px] font-mono text-text-secondary">
                {[
                  "start",
                  "stop",
                  "pause",
                  "resume",
                  "reload-config",
                  "trigger-fix",
                  "retry-ticket",
                  "select-repo",
                  "clear-queue",
                ].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary mb-2">
                Events
              </h4>
              <ul className="space-y-0.5 text-[13px] font-mono text-text-secondary">
                {[
                  "status-changed",
                  "ticket-updated",
                  "repo-selection-required",
                  "log-entry",
                  "claude-output",
                  "config-reloaded",
                  "shutdown",
                ].map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Files */}
          <SectionHeading id="files">File Locations</SectionHeading>
          <p className="text-sm text-text-secondary mb-4">
            All data under <Code>~/.ferrix/</Code>:
          </p>
          <div className="mb-4">
            <Table
              headers={["Path", "Description"]}
              rows={[
                [
                  "~/.ferrix/data.db",
                  "SQLite database (config, repos, tickets, stats)",
                ],
                ["~/.ferrix/daemon.sock", "IPC socket"],
                ["~/.ferrix/daemon.pid", "Daemon PID file"],
                ["~/.ferrix/logs/daemon.log", "Rotating log (Pino JSON)"],
              ]}
            />
          </div>
          <p className="text-sm text-text-secondary">
            To reset, delete <Code>~/.ferrix/data.db</Code> and restart.
          </p>

          <div className="h-20" />
        </main>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[11px] text-text-tertiary">
            Ferrix docs
          </span>
          <a
            href="https://github.com/akparhi/homebrew-tap"
            className="font-mono text-[11px] text-text-tertiary hover:text-text-secondary transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
