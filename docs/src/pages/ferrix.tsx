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
    <nav className={`space-y-6 ${className ?? ""}`}>
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.title}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-400 mb-2">
            {section.title}
          </h4>
          <ul className="space-y-0.5">
            {section.links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`sidebar-link block text-sm py-1 pl-3 border-l-2 border-transparent text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 ${activeId === link.id ? "active" : ""}`}
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
      className="font-display text-3xl tracking-tight border-b border-ink-200 dark:border-ink-800 pb-3 mb-6 mt-16 first:mt-0 scroll-mt-20"
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
    <div className="border border-ink-200 dark:border-ink-800 rounded-lg overflow-hidden overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200 dark:border-ink-800 bg-ink-100/50 dark:bg-ink-800/50">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`text-left px-4 py-2.5 text-ink-600 dark:text-ink-300 whitespace-nowrap ${i === 0 ? "font-mono font-medium" : "font-medium"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-ink-600 dark:text-ink-400">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                i < rows.length - 1
                  ? "border-b border-ink-100 dark:border-ink-800/50"
                  : ""
              }
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-2.5 ${j === 0 ? "font-mono text-xs text-ink-800 dark:text-ink-200 whitespace-nowrap" : ""}`}
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
    <kbd className="font-mono text-xs bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded border border-ink-200 dark:border-ink-700">
      {children}
    </kbd>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded">
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
      className={`px-2.5 py-1.5 rounded font-mono text-xs ${highlight ? "bg-orange-100 dark:bg-orange-900/30 text-accent font-medium" : "bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300"}`}
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
    <div className="bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100 font-body min-h-screen">
      <div className="grain dark:opacity-[0.04]" />
      <Header tool="Ferrix" onMenuToggle={toggleSidebar} />

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-ink-200 dark:border-ink-800 py-8 px-4">
          <Sidebar activeId={activeId} />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={toggleSidebar}
            />
            <aside className="fixed top-14 left-0 bottom-0 w-64 bg-ink-50 dark:bg-ink-950 border-r border-ink-200 dark:border-ink-800 z-30 overflow-y-auto py-8 px-4 lg:hidden">
              <Sidebar activeId={activeId} />
            </aside>
          </>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-12 max-w-none">
          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-mono font-medium text-base shadow-sm">
                Fx
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-none m-0">
                Ferrix
              </h1>
            </div>
            <p className="text-lg text-ink-500 dark:text-ink-400 leading-relaxed max-w-2xl mt-4">
              An automated bug-fixing daemon that polls Linear for assigned
              tickets, uses Claude to generate code fixes, and creates pull
              requests on GitHub.
            </p>
          </div>

          {/* Installation */}
          <SectionHeading id="installation">Installation</SectionHeading>
          <CodeBlock>brew install akparhi/tap/ferrix</CodeBlock>
          <p className="text-ink-600 dark:text-ink-400 mt-4 mb-2">
            To upgrade:
          </p>
          <CodeBlock>brew upgrade ferrix</CodeBlock>
          <p className="text-ink-600 dark:text-ink-400 mt-4">
            Ferrix includes auto-update: when a new version is available, the
            TUI will prompt you to update on launch.
          </p>

          {/* Setup */}
          <SectionHeading id="setup">Setup Wizard</SectionHeading>
          <p className="text-ink-600 dark:text-ink-400 mb-4">
            On first run, Ferrix launches an interactive setup wizard:
          </p>
          <ol className="space-y-3 mb-6 text-ink-600 dark:text-ink-400 list-decimal list-inside">
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Linear API Key
              </strong>{" "}
              — Personal API key from{" "}
              <a
                href="https://linear.app/settings/api"
                className="text-accent hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Linear Settings &rarr; API
              </a>
              . Validated live.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Repository Discovery
              </strong>{" "}
              — Auto-scans <Code>~</Code> and <Code>~/Projects</Code> for git
              repos. Custom paths supported.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Repository Selection
              </strong>{" "}
              — Toggle which repos Ferrix should monitor.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Polling Interval
              </strong>{" "}
              — 30–600 seconds (default: 30s).
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Ticket Age Filters
              </strong>{" "}
              — Min age, max age, minimum description length.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                GitHub Auth
              </strong>{" "}
              — Checks <Code>gh</Code> CLI auth status.
            </li>
          </ol>

          {/* Requirements */}
          <SectionHeading id="requirements">Requirements</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="border border-ink-200 dark:border-ink-800 rounded-lg p-4 bg-white dark:bg-ink-900">
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-3">
                System
              </h4>
              <ul className="space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
                <li>macOS (Apple Silicon or Intel)</li>
                <li>Homebrew</li>
              </ul>
            </div>
            <div className="border border-ink-200 dark:border-ink-800 rounded-lg p-4 bg-white dark:bg-ink-900">
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-3">
                Accounts & Keys
              </h4>
              <ul className="space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
                <li>
                  <a
                    href="https://console.anthropic.com/"
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Claude API key
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
          <SectionHeading id="cli-commands">CLI Commands</SectionHeading>
          <div className="mb-6">
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["ferrix", "Launch TUI (auto-starts daemon if not running)"],
                ["ferrix start", "Start daemon in background"],
                ["ferrix stop", "Stop the daemon"],
                ["ferrix status", "Show daemon status, uptime, last poll time"],
                ["ferrix logs", "Tail daemon logs (last 20 lines + follow)"],
              ]}
            />
          </div>
          <CodeBlock>{`$ ferrix status\nDaemon is running (PID 12345)\n  Uptime: 2h 14m\n  Paused: no\n  Connected clients: 1\n  Last poll: 28s ago`}</CodeBlock>

          {/* TUI Views */}
          <SectionHeading id="tui-views">TUI Views</SectionHeading>
          <p className="text-ink-600 dark:text-ink-400 mb-6">
            Terminal UI built with{" "}
            <a
              href="https://github.com/vadimdemedes/ink"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Ink
            </a>{" "}
            (React for terminal). 6 tab views navigable with number keys or
            arrows:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                n: "1",
                name: "Dashboard",
                desc: "Daemon status, recent activity, ticket statistics.",
              },
              {
                n: "2",
                name: "Manual",
                desc: "Manually trigger a fix by pasting a Linear ticket URL.",
              },
              {
                n: "3",
                name: "Tickets",
                desc: "All processed tickets with status tracking.",
              },
              {
                n: "4",
                name: "Logs",
                desc: "Live daemon log stream with level filters.",
              },
              { n: "5", name: "Repos", desc: "Manage monitored repositories." },
              {
                n: "6",
                name: "Settings",
                desc: "Edit configuration and reset wizard.",
              },
            ].map((v) => (
              <div
                key={v.n}
                className="border border-ink-200 dark:border-ink-800 rounded-lg p-4 bg-white dark:bg-ink-900"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-accent">
                    {v.n}
                  </span>
                  <h4 className="font-medium text-sm">{v.name}</h4>
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Keyboard */}
          <SectionHeading id="keyboard">Keyboard Shortcuts</SectionHeading>
          <div className="mb-8">
            <Table
              headers={["Key", "Action"]}
              rows={[
                [
                  <>
                    <Kbd>1</Kbd>–<Kbd>6</Kbd>
                  </>,
                  "Switch to tab by number",
                ],
                [
                  <>
                    <Kbd>&larr;</Kbd> <Kbd>&rarr;</Kbd>
                  </>,
                  "Navigate between tabs",
                ],
                [
                  <>
                    <Kbd>&uarr;</Kbd> <Kbd>&darr;</Kbd>
                  </>,
                  "Scroll within lists",
                ],
                [<Kbd>Space</Kbd>, "Toggle selection (in lists)"],
                [<Kbd>Enter</Kbd>, "Confirm / submit"],
                [<Kbd>Esc</Kbd>, "Close modal / cancel"],
              ]}
            />
          </div>

          {/* Configuration */}
          <SectionHeading id="config-settings">Configuration</SectionHeading>
          <p className="text-ink-600 dark:text-ink-400 mb-6">
            All settings stored in SQLite, editable via TUI Settings view.
            Changes take effect immediately.
          </p>
          <div className="mb-8">
            <Table
              headers={["Setting", "Default", "Description"]}
              rows={[
                ["polling_interval", "30000", "Poll Linear interval (ms)"],
                [
                  "min_ticket_age",
                  "60000",
                  "Min ticket age before processing (ms)",
                ],
                [
                  "max_ticket_age",
                  "31536000000",
                  "Max ticket age (ms) — ~365 days",
                ],
                [
                  "min_description_length",
                  "1",
                  "Min characters in ticket description",
                ],
                ["linear_scan_mode", "me", "Scan mode for Linear tickets"],
                [
                  "linear_states_filter",
                  "Triage,Todo (ready),Todo",
                  "Comma-separated Linear states",
                ],
                [
                  "claude_command",
                  "/spec-dev",
                  "Claude CLI command/skill to invoke",
                ],
                ["claude_model", "opus", "Claude model to use"],
                ["claude_timeout_minutes", "10", "Max time for Claude (min)"],
                ["claude_effort_level", "low", "Claude reasoning effort level"],
                ["notification_sound", "default", "macOS notification sound"],
              ]}
            />
          </div>

          {/* Pipeline */}
          <SectionHeading id="pipeline">Pipeline</SectionHeading>
          <p className="text-ink-600 dark:text-ink-400 mb-6">
            Multi-stage pipeline to process tickets:
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              "Polling Engine",
              "Linear Client",
              "Repo Matcher",
              "Ticket Processor",
              "Claude Executor",
              "Git Operations",
              "GitHub Operations",
              "Notifications",
              "Statistics",
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <PipelineStep
                  label={step}
                  highlight={step === "Claude Executor"}
                />
                {i < arr.length - 1 && (
                  <span className="text-ink-300 dark:text-ink-600">&rarr;</span>
                )}
              </span>
            ))}
          </div>
          <p className="text-ink-600 dark:text-ink-400 mb-4">
            Ticket lifecycle:
          </p>
          <div className="flex items-center gap-2 mb-8 font-mono text-sm">
            <span className="text-yellow-600 dark:text-yellow-400">queued</span>
            <span className="text-ink-300">&rarr;</span>
            <span className="text-blue-600 dark:text-blue-400">processing</span>
            <span className="text-ink-300">&rarr;</span>
            <span className="text-green-600 dark:text-green-400">
              completed
            </span>
            <span className="text-ink-300">|</span>
            <span className="text-red-600 dark:text-red-400">failed</span>
            <span className="text-ink-300">|</span>
            <span className="text-ink-400">skipped</span>
          </div>
          <h3 className="text-lg font-medium mb-3">How it works</h3>
          <ol className="space-y-2 mb-8 text-ink-600 dark:text-ink-400 text-sm list-decimal list-inside">
            <li>
              <strong className="text-ink-800 dark:text-ink-200">Poll:</strong>{" "}
              Query Linear at configured interval for matching tickets.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">Match:</strong>{" "}
              Determine which local repo corresponds to the ticket&apos;s
              project.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Process:
              </strong>{" "}
              Create branch, invoke Claude Code with ticket details.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">Fix:</strong>{" "}
              Claude generates and commits code changes.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">PR:</strong>{" "}
              Create pull request linking to Linear ticket.
            </li>
            <li>
              <strong className="text-ink-800 dark:text-ink-200">
                Notify:
              </strong>{" "}
              macOS notification + statistics update.
            </li>
          </ol>

          {/* IPC */}
          <SectionHeading id="ipc">IPC Protocol</SectionHeading>
          <p className="text-ink-600 dark:text-ink-400 mb-4">
            TUI and daemon communicate over Unix domain socket (
            <Code>~/.ferrix/daemon.sock</Code>) using JSON Lines.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-3">
                Commands (client &rarr; daemon)
              </h4>
              <ul className="space-y-1 text-sm font-mono text-ink-600 dark:text-ink-400">
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
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-400 mb-3">
                Events (daemon &rarr; client)
              </h4>
              <ul className="space-y-1 text-sm font-mono text-ink-600 dark:text-ink-400">
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
          <p className="text-ink-600 dark:text-ink-400 mb-4">
            All data lives under <Code>~/.ferrix/</Code>:
          </p>
          <div className="mb-8">
            <Table
              headers={["Path", "Description"]}
              rows={[
                [
                  "~/.ferrix/data.db",
                  "SQLite database (config, repos, tickets, stats)",
                ],
                ["~/.ferrix/daemon.sock", "Unix domain socket for IPC"],
                ["~/.ferrix/daemon.pid", "PID file for running daemon"],
                [
                  "~/.ferrix/logs/daemon.log",
                  "Rotating log file (Pino JSON format)",
                ],
              ]}
            />
          </div>

          <p className="text-ink-600 dark:text-ink-400">
            To completely reset, delete <Code>~/.ferrix/data.db</Code> and
            restart. The setup wizard will run again.
          </p>

          <div className="h-24" />
        </main>
      </div>

      <footer className="border-t border-ink-200 dark:border-ink-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-mono text-xs text-ink-400">Ferrix docs</span>
          <a
            href="https://github.com/akparhi/homebrew-tap"
            className="font-mono text-xs text-ink-400 hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
