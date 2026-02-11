# Homebrew Tap for DarkClouds

Automated bug-fixing system powered by Claude. Polls Linear for assigned tickets, generates fixes using Claude, and creates PRs via GitHub.

## Install

```bash
brew install akparhi/tap/darkclouds
```

## Upgrade

```bash
brew upgrade darkclouds
```

## Usage

```bash
# Launch TUI
darkclouds

# Start daemon in background
darkclouds start

# Check status
darkclouds status

# View logs
darkclouds logs

# Stop daemon
darkclouds stop
```

## Requirements

- macOS (Apple Silicon or Intel)
- [Claude API key](https://console.anthropic.com/)
- [Linear API key](https://linear.app/settings/api)
- [GitHub token](https://github.com/settings/tokens)
