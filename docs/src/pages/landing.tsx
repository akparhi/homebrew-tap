import { Link } from "react-router-dom";
import { Header } from "../components/header.tsx";

export function Landing() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-6">
        <section className="pt-24 pb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-text-secondary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            homebrew tap
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Developer tools,
            <br />
            <span className="text-text-secondary">one brew away.</span>
          </h1>
          <p className="mt-5 text-base text-text-secondary max-w-md leading-relaxed">
            CLI tools distributed via Homebrew. Install, upgrade, and go.
          </p>
          <div className="mt-8 font-mono text-sm bg-surface-1 border border-border text-text-primary rounded-lg px-4 py-3 inline-flex items-center gap-3">
            <span className="text-text-tertiary select-none">$</span>
            <span>
              brew install akparhi/tap/
              <span className="text-accent">&lt;tool&gt;</span>
            </span>
          </div>
        </section>

        <div className="border-t border-border" />

        <section className="py-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary mb-6">
            Tools
          </p>
          <div className="grid gap-3">
            <Link
              to="/ferrix"
              className="tool-card group flex items-center gap-4 border border-border rounded-lg px-5 py-4 bg-surface-1 no-underline"
            >
              <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono font-medium text-xs shrink-0">
                fx
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm text-text-primary">
                    Ferrix
                  </h3>
                  <span className="font-mono text-[10px] text-text-tertiary px-1.5 py-0.5 rounded bg-surface-3">
                    CLI
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5 truncate">
                  Automated bug-fixing daemon — Linear + Claude + GitHub
                </p>
              </div>
              <svg
                className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[11px] text-text-tertiary">
            akparhi/homebrew-tap
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
