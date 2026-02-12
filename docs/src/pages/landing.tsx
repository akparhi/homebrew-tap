import { Link } from "react-router-dom";
import { Header } from "../components/header.tsx";

export function Landing() {
  return (
    <div className="bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100 font-body min-h-screen">
      <div className="grain dark:opacity-[0.04]" />
      <Header />

      <main className="max-w-5xl mx-auto px-6">
        <section className="pt-20 pb-16">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
            Homebrew
            <br />
            <span className="italic text-accent">tools</span>
          </h1>
          <p className="mt-6 text-lg text-ink-500 dark:text-ink-400 max-w-lg leading-relaxed">
            A collection of CLI tools distributed via Homebrew. Install any tool
            with a single command.
          </p>
          <div className="mt-8 font-mono text-sm bg-ink-900 dark:bg-ink-800 text-ink-100 rounded-lg px-5 py-3.5 inline-flex items-center gap-3 shadow-lg">
            <span className="text-ink-500 select-none">$</span>
            <span>
              brew install akparhi/tap/
              <span className="text-orange-400">&lt;tool&gt;</span>
            </span>
          </div>
        </section>

        <div className="border-t border-ink-200 dark:border-ink-800" />

        <section className="py-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-8">
            Available Tools
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              to="/ferrix"
              className="tool-card group block border border-ink-200 dark:border-ink-800 rounded-xl p-6 hover:border-accent/40 dark:hover:border-accent/40 hover:shadow-md transition-all bg-white dark:bg-ink-900 no-underline"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-mono font-medium text-sm shadow-sm">
                  Fx
                </div>
                <span className="font-mono text-xs text-ink-400 group-hover:text-accent transition-colors">
                  &rarr;
                </span>
              </div>
              <h3 className="font-display text-2xl mb-1.5 text-ink-900 dark:text-ink-100">
                Ferrix
              </h3>
              <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
                Automated bug-fixing daemon. Polls Linear for tickets, generates
                fixes with Claude, creates PRs on GitHub.
              </p>
              <div className="mt-4 font-mono text-xs text-ink-400">
                <code>brew install akparhi/tap/ferrix</code>
              </div>
            </Link>

            <div className="border border-dashed border-ink-200 dark:border-ink-800 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <span className="text-ink-300 dark:text-ink-600 text-2xl mb-2">
                +
              </span>
              <p className="text-sm text-ink-400 dark:text-ink-600">
                More tools coming soon
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-200 dark:border-ink-800 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-mono text-xs text-ink-400">
            akparhi/homebrew-tap
          </span>
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
