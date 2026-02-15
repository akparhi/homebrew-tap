import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/header.tsx";
import { CodeBlock } from "../components/code-block.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Mermaid } from "@/components/mermaid.tsx";
import { cn } from "@/lib/utils.ts";
import { FERRIX_VERSION } from "@/version.ts";

const DAEMON_DIAGRAM = `flowchart TB
    subgraph DaemonCore["DaemonCore"]
        start["start()"] --> initDB["initDatabase()"]
        initDB --> cleanup["cleanupOrphanedWorktrees()"]
        cleanup --> registerHandlers["Register IPC handlers"]
        registerHandlers --> ipcStart["ipc.start()"]
        ipcStart --> startEngines["Start 3 engines"]
    end

    subgraph Engines["Polling Engines"]
        LE["LinearEngine"]
        PRE["PREngine"]
        EPE["ExternalPREngine"]
    end

    startEngines --> LE & PRE & EPE

    LE -->|"poll()"| QM
    PRE -->|"CHANGES_REQUESTED"| QM
    EPE -->|"github_pr ticket"| QM

    subgraph QM["Queue Manager — Serial"]
        dequeue["findNextQueued()"]
        process["processTicket()"]
        dequeue --> process
        process -->|"more queued?"| dequeue
    end

    subgraph TicketFlow["ticket-flow: processTicket()"]
        matchRepo["repo-matcher"] --> setupWT["worktree-manager"]
        setupWT --> autoPolicy{"automation-policy"}
        autoPolicy -->|Yes| isReview{Review iteration?}
        autoPolicy -->|No| skip["Skip"]
        isReview -->|No| implement["claude.implement()"]
        implement --> selfReview["selfReview()"]
        selfReview --> summarize["summarizeChange()"]
        isReview -->|Yes| addressReview["claude.addressReviews()"]
        addressReview --> commitPush["git.commitAndPush()"]
        summarize --> commitPush
        commitPush --> createPR["createPR / resolveComments"]
        createPR --> report["analytics + notification"]
    end

    process --> TicketFlow

    subgraph Executors["Executors"]
        claude["claude"]
        codex["codex"]
    end

    implement --> claude
    selfReview --> claude & codex

    subgraph IPC["IPC Server (Unix Socket)"]
        commands["Commands: start, stop, pause, resume, trigger-fix, retry-ticket"]
        events["Events: status-changed, ticket-updated, claude-output, shutdown"]
    end

    TUI["TUI Client"] <-->|"JSON Lines"| IPC`;

const TUI_DIAGRAM = `flowchart TB
    subgraph App["TUIApp"]
        AppFrame["AppFrame"]
        TabBar["Tabs (1-6)"]
        Content["Active View"]
        StatusBar["StatusBar"]
    end

    subgraph Views["Tab Views"]
        Dashboard & Manual & Tickets & Logs & Repos & Settings
    end

    Content --> Views

    subgraph Stores["Zustand Stores"]
        DaemonStore["daemon-store"]
        AgentStore["agent-output-store"]
        ToastStore["toast-store"]
    end

    subgraph Hooks["Hooks"]
        useIPC["useIPCEvent()"]
        useDB["useDB()"]
    end

    subgraph IPCClient["IPC Client"]
        Connect["connect via daemon.sock"]
        SendCmd["sendCommand via Promise"]
        Reconnect["Auto-reconnect 2s"]
    end

    subgraph Daemon["Daemon Process"]
        IPCSrv["IPC Server"]
    end

    StatusBar -->|"useInput()"| DaemonStore
    DaemonStore -->|"sendCommand()"| SendCmd
    SendCmd <-->|"JSON Lines"| IPCSrv
    IPCSrv -->|"broadcast"| useIPC
    useIPC --> DaemonStore & AgentStore
    Views -->|"useDB()"| useDB
    useDB -->|"query"| DB[(SQLite)]`;

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
    title: "Workflow",
    links: [
      { id: "workflow", label: "General Workflow" },
      { id: "review-agents", label: "Review Agents" },
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
      { id: "daemon-arch", label: "Daemon Architecture" },
      { id: "tui-arch", label: "TUI Architecture" },
      { id: "ipc", label: "IPC Protocol" },
    ],
  },
  { title: "Files & Data", links: [{ id: "files", label: "File Locations" }] },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

function Sidebar({ activeId }: { activeId: string }) {
  return (
    <nav className="space-y-5">
      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.title}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5 px-3">
            {section.title}
          </h4>
          <ul className="space-y-0.5">
            {section.links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={cn(
                    "block w-full text-left text-[13px] py-1.5 px-3 rounded-md transition-colors",
                    activeId === link.id
                      ? "bg-sidebar-active text-sidebar-active-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </button>
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
      className="text-xl font-bold tracking-tight mb-4 mt-14 first:mt-0 scroll-mt-20"
    >
      {children}
    </h2>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-border text-muted-foreground">
      {children}
    </kbd>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[13px] bg-muted px-1.5 py-0.5 rounded text-foreground">
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
    <Badge
      variant={highlight ? "default" : "secondary"}
      className={cn("font-mono text-xs", highlight && "shadow-sm")}
    >
      {label}
    </Badge>
  );
}

export function FerrixDocs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useState(
    () => window.location.hash.slice(1) || "installation",
  );

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView();
        setActiveId(hash);
      });
    }
  }, []);

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
    <div className="min-h-screen bg-background">
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
            <aside className="fixed top-14 left-0 bottom-0 w-60 bg-background border-r border-border z-30 overflow-y-auto py-6 pr-2 lg:hidden">
              <Sidebar activeId={activeId} />
            </aside>
          </>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-10 py-10 max-w-3xl">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-mono font-medium text-xs">
                fx
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Ferrix</h1>
              <Badge variant="secondary" className="font-mono text-[10px]">
                CLI
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                v{FERRIX_VERSION}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              An automated bug-fixing daemon that polls Linear for assigned
              tickets, uses Claude to generate code fixes, and creates pull
              requests on GitHub.
            </p>
          </div>

          {/* Installation */}
          <SectionHeading id="installation">Installation</SectionHeading>
          <CodeBlock>brew install akparhi/tap/ferrix</CodeBlock>
          <p className="text-sm text-muted-foreground mt-3 mb-2">To upgrade:</p>
          <CodeBlock>brew upgrade ferrix</CodeBlock>
          <p className="text-sm text-muted-foreground mt-3">
            Ferrix includes auto-update — the TUI prompts you when a new version
            is available.
          </p>

          {/* Setup */}
          <SectionHeading id="setup">Setup Wizard</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            On first run, an interactive wizard walks you through:
          </p>
          <ol className="space-y-2.5 mb-6 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              <strong className="text-foreground">Preflight Checks</strong> —
              verifies <InlineCode>claude</InlineCode>,{" "}
              <InlineCode>git</InlineCode>, <InlineCode>gh</InlineCode> CLIs are
              installed and authenticated. Optionally detects{" "}
              <InlineCode>codex</InlineCode> for review.
            </li>
            <li>
              <strong className="text-foreground">Linear API Key</strong> — from{" "}
              <a
                href="https://linear.app/settings/api"
                target="_blank"
                rel="noreferrer"
              >
                Linear Settings &rarr; API
              </a>
              , validated live
            </li>
            <li>
              <strong className="text-foreground">
                Repository Scan & Selection
              </strong>{" "}
              — auto-scans <InlineCode>~</InlineCode> and{" "}
              <InlineCode>~/Projects</InlineCode> for git repos, toggle which to
              monitor
            </li>
          </ol>

          {/* Requirements */}
          <SectionHeading id="requirements">Requirements</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>macOS (Apple Silicon or Intel)</li>
                  <li>Homebrew</li>
                  <li>
                    <InlineCode>git</InlineCode>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="https://docs.anthropic.com/en/docs/claude-code"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Claude Code CLI
                    </a>{" "}
                    <span className="text-muted-foreground no-underline">
                      (<InlineCode>claude</InlineCode>)
                    </span>
                  </li>
                  <li>
                    <a
                      href="https://linear.app/settings/api"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Linear API key
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cli.github.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub CLI
                    </a>{" "}
                    <span className="text-muted-foreground">
                      (<InlineCode>gh auth login</InlineCode>)
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Optional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://openai.com/index/introducing-codex/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenAI Codex CLI
                  </a>{" "}
                  <span className="text-muted-foreground">
                    (<InlineCode>codex</InlineCode>) — used as an alternative
                    review agent for independent second-opinion code reviews
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* General Workflow */}
          <SectionHeading id="workflow">General Workflow</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            A typical end-to-end flow from ticket to merged PR:
          </p>
          <ol className="space-y-3 mb-6 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              <strong className="text-foreground">
                Assign a ticket in Linear
              </strong>{" "}
              — set the state to <InlineCode>Triage</InlineCode>,{" "}
              <InlineCode>Todo</InlineCode>, or{" "}
              <InlineCode>Todo (ready)</InlineCode>. Add a label matching your
              repo name (e.g. <InlineCode>my-app</InlineCode>).
            </li>
            <li>
              <strong className="text-foreground">
                Ferrix polls and picks it up
              </strong>{" "}
              — the Linear engine fetches your assigned tickets at the
              configured interval and queues matching ones.
            </li>
            <li>
              <strong className="text-foreground">
                Worktree created, Claude implements
              </strong>{" "}
              — a fresh git worktree is created on a new branch. Claude Code
              reads the ticket description and generates the fix.
            </li>
            <li>
              <strong className="text-foreground">Self-review</strong> — either
              Claude or Codex reviews the changes for correctness, then Claude
              summarizes the diff for the PR body.
            </li>
            <li>
              <strong className="text-foreground">PR created on GitHub</strong>{" "}
              — changes are committed, pushed, and a PR is opened linked back to
              the Linear ticket.
            </li>
            <li>
              <strong className="text-foreground">Review feedback loop</strong>{" "}
              — if the PR receives <InlineCode>CHANGES_REQUESTED</InlineCode>,
              Ferrix automatically picks it up again, addresses the review
              comments, and pushes a new commit. This repeats up to a
              configurable max iterations.
            </li>
            <li>
              <strong className="text-foreground">
                Notification & cleanup
              </strong>{" "}
              — you get a macOS notification. Once merged, the worktree is
              cleaned up.
            </li>
          </ol>
          <CodeBlock>{`# Example: label-based routing\n# Add these labels to your Linear ticket:\nmy-app              → routes to "my-app" repo, default branch\nmy-app:staging      → routes to "my-app" repo, PR targets "staging"\nmy-app:develop      → routes to "my-app" repo, PR targets "develop"`}</CodeBlock>

          {/* Review Agents */}
          <SectionHeading id="review-agents">Review Agents</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            After Claude implements a fix, a self-review step catches issues
            before the PR is created. You can choose between two review agents:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Claude{" "}
                  <Badge variant="secondary" className="ml-1 text-[10px]">
                    default
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Same Claude session reviews its own work. Fast, uses the
                  existing context from the implementation step. Resumes the
                  session so it has full awareness of what it just did.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Codex{" "}
                  <Badge variant="outline" className="ml-1 text-[10px]">
                    optional
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  OpenAI Codex provides an independent second opinion — a
                  different model reviewing the diff with fresh eyes. If Codex
                  fails or is unavailable, automatically falls back to Claude.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Configure via <InlineCode>review_agent</InlineCode> in Settings. The
            reasoning: using a different model for review reduces blind spots
            from the implementing model's biases, similar to how human code
            review works — a fresh pair of eyes catches things the author
            misses.
          </p>

          {/* CLI Commands */}
          <SectionHeading id="cli-commands">Commands</SectionHeading>
          <Card className="mb-4 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-mono text-xs">Command</TableHead>
                  <TableHead className="text-xs">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["ferrix", "Launch TUI (auto-starts daemon if not running)"],
                  ["ferrix start", "Start daemon in background"],
                  ["ferrix stop", "Stop the daemon"],
                  ["ferrix status", "Show daemon status, uptime, last poll"],
                  ["ferrix logs", "Tail daemon logs (last 20 + follow)"],
                ].map(([cmd, desc]) => (
                  <TableRow key={cmd}>
                    <TableCell className="font-mono text-xs font-medium">
                      {cmd}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {desc}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <CodeBlock>{`$ ferrix status\nDaemon is running (PID 12345)\n  Uptime: 2h 14m\n  Paused: no\n  Connected clients: 1\n  Last poll: 28s ago`}</CodeBlock>

          {/* TUI Views */}
          <SectionHeading id="tui-views">Views</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            Terminal UI built with{" "}
            <a
              href="https://github.com/vadimdemedes/ink"
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
              <Card key={v.n} className="flex items-center gap-3 px-3.5 py-2.5">
                <Badge
                  variant="default"
                  className="font-mono text-[11px] w-5 h-5 p-0 justify-center shrink-0"
                >
                  {v.n}
                </Badge>
                <div className="min-w-0">
                  <span className="text-sm font-medium">{v.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {v.desc}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Keyboard */}
          <SectionHeading id="keyboard">Keyboard Shortcuts</SectionHeading>
          <Card className="mb-6 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Key</TableHead>
                  <TableHead className="text-xs">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
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
                ].map(([key, action], i) => (
                  <TableRow key={i}>
                    <TableCell>{key}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {action}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Configuration */}
          <SectionHeading id="config-settings">Configuration</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            All settings in SQLite, editable via TUI Settings. Changes apply
            immediately.
          </p>
          <Card className="mb-6 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-mono text-xs">Setting</TableHead>
                  <TableHead className="text-xs">Default</TableHead>
                  <TableHead className="text-xs">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
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
                  ["claude_command", "/ferrix", "Claude skill to invoke"],
                  ["claude_model", "opus", "Claude model"],
                  ["claude_timeout_minutes", "10", "Max fix time (min)"],
                  ["claude_effort_level", "low", "Reasoning effort"],
                  ["notification_sound", "default", "macOS sound"],
                ].map(([setting, def, desc]) => (
                  <TableRow key={setting}>
                    <TableCell className="font-mono text-xs font-medium whitespace-nowrap">
                      {setting}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {def}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {desc}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Separator className="my-10" />

          {/* Pipeline */}
          <SectionHeading id="pipeline">Pipeline</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
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
                  <span className="text-muted-foreground text-xs">&rarr;</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-6 font-mono text-xs">
            <span className="text-yellow-500">queued</span>
            <span className="text-muted-foreground">&rarr;</span>
            <span className="text-blue-400">processing</span>
            <span className="text-muted-foreground">&rarr;</span>
            <span className="text-emerald-400">completed</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-red-400">failed</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">skipped</span>
          </div>
          <h3 className="text-sm font-medium mb-2">How it works</h3>
          <ol className="space-y-1.5 mb-6 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              <strong className="text-foreground">Poll</strong> — query Linear
              at configured interval
            </li>
            <li>
              <strong className="text-foreground">Match</strong> — map ticket to
              local repo via Linear labels (e.g.{" "}
              <InlineCode>my-repo</InlineCode> or{" "}
              <InlineCode>my-repo:staging</InlineCode> to also set the base
              branch)
            </li>
            <li>
              <strong className="text-foreground">Process</strong> — branch +
              invoke Claude Code
            </li>
            <li>
              <strong className="text-foreground">Fix</strong> — Claude
              generates + commits changes
            </li>
            <li>
              <strong className="text-foreground">PR</strong> — create pull
              request linked to ticket
            </li>
            <li>
              <strong className="text-foreground">Notify</strong> — macOS
              notification + stats
            </li>
          </ol>

          <h3 className="text-sm font-medium mb-2">
            Label-based repo matching
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Ferrix matches Linear tickets to repos using labels. Add a label
            matching your repo name (e.g. <InlineCode>athena-web</InlineCode>)
            to route tickets. To also override the base branch, use the format{" "}
            <InlineCode>repo-name:branch</InlineCode> (e.g.{" "}
            <InlineCode>athena-web:staging</InlineCode> creates the PR against{" "}
            <InlineCode>staging</InlineCode> instead of the repo default).
          </p>
          <CodeBlock>{`# Label examples\nathena-web          → matches repo "athena-web", uses default base branch\nathena-web:staging  → matches repo "athena-web", PR targets "staging"\nathena-web:develop  → matches repo "athena-web", PR targets "develop"`}</CodeBlock>

          {/* Daemon Architecture */}
          <SectionHeading id="daemon-arch">Daemon Architecture</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            The daemon process manages polling engines, a serial queue, and the
            ticket processing pipeline:
          </p>
          <Mermaid chart={DAEMON_DIAGRAM} />

          {/* TUI Architecture */}
          <SectionHeading id="tui-arch">TUI Architecture</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            The terminal UI connects to the daemon via IPC and uses Zustand
            stores for state management:
          </p>
          <Mermaid chart={TUI_DIAGRAM} />

          {/* IPC */}
          <SectionHeading id="ipc">IPC Protocol</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            Unix domain socket (<InlineCode>~/.ferrix/daemon.sock</InlineCode>),
            JSON Lines protocol.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  Commands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-0.5 text-[13px] font-mono text-muted-foreground">
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-0.5 text-[13px] font-mono text-muted-foreground">
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
              </CardContent>
            </Card>
          </div>

          {/* Files */}
          <SectionHeading id="files">File Locations</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            All data under <InlineCode>~/.ferrix/</InlineCode>:
          </p>
          <Card className="mb-4 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-mono text-xs">Path</TableHead>
                  <TableHead className="text-xs">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  [
                    "~/.ferrix/data.db",
                    "SQLite database (config, repos, tickets, stats)",
                  ],
                  ["~/.ferrix/daemon.sock", "IPC socket"],
                  ["~/.ferrix/daemon.pid", "Daemon PID file"],
                  ["~/.ferrix/logs/daemon.log", "Rotating log (Pino JSON)"],
                ].map(([path, desc]) => (
                  <TableRow key={path}>
                    <TableCell className="font-mono text-xs font-medium whitespace-nowrap">
                      {path}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {desc}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <p className="text-sm text-muted-foreground">
            To reset, delete <InlineCode>~/.ferrix/data.db</InlineCode> and
            restart.
          </p>

          <div className="h-20" />
        </main>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">
            Ferrix docs
          </span>
          <a
            href="https://github.com/akparhi/homebrew-tap"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors no-underline"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
