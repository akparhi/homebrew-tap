import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider.tsx";

export function Header({
  tool,
  onMenuToggle,
}: {
  tool?: string;
  onMenuToggle?: () => void;
}) {
  const { toggle } = useTheme();

  return (
    <header className="border-b border-ink-200 dark:border-ink-800 bg-ink-50/80 dark:bg-ink-950/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-mono text-sm tracking-tight text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"
          >
            akparhi<span className="text-accent">/</span>tap
          </Link>
          {tool && (
            <>
              <span className="text-ink-300 dark:text-ink-700">/</span>
              <span className="font-mono text-sm font-medium text-ink-800 dark:text-ink-200">
                {tool}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <a
            href="https://github.com/akparhi/homebrew-tap"
            target="_blank"
            rel="noreferrer"
            className="text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={toggle}
            className="text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
            aria-label="Toggle theme"
          >
            <svg
              className="w-5 h-5 hidden dark:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <svg
              className="w-5 h-5 dark:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
