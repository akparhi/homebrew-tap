import { Link } from "react-router-dom";
import { Header } from "../components/header.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-3xl mx-auto px-6">
        <section className="pt-24 pb-20">
          <Badge variant="outline" className="mb-8 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground mr-2" />
            homebrew tap
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Developer tools,
            <br />
            <span className="text-muted-foreground">one brew away.</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-md leading-relaxed">
            CLI tools distributed via Homebrew. Install, upgrade, and go.
          </p>
          <div className="mt-8 font-mono text-sm bg-card border border-border rounded-[var(--radius)] px-4 py-3 inline-flex items-center gap-3">
            <span className="text-muted-foreground select-none">$</span>
            <span>
              brew install akparhi/tap/
              <span className="text-foreground font-medium">&lt;tool&gt;</span>
            </span>
          </div>
        </section>

        <Separator />

        <section className="py-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
            Tools
          </p>
          <div className="grid gap-3">
            <Link to="/ferrix" className="no-underline text-foreground">
              <Card className="tool-card group flex items-center gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-mono font-medium text-xs shrink-0">
                  fx
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">Ferrix</h3>
                    <Badge
                      variant="secondary"
                      className="font-mono text-[10px]"
                    >
                      CLI
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    Automated bug-fixing daemon — Linear + Claude + GitHub
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">
            akparhi/homebrew-tap
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
