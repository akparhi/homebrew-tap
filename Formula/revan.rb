class Revan < Formula
  desc "Routes Codex and OpenRouter models to Claude Code"
  homepage "https://github.com/akparhi/revan"
  version "0.1.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/revan/releases/download/v0.1.1/revan-darwin-arm64.tar.gz"
      sha256 "083692fd159b3e0617af947dcc09d27c899cfb2fb02f04bc033aaadec29d2d79"
    else
      url "https://github.com/akparhi/revan/releases/download/v0.1.1/revan-darwin-x64.tar.gz"
      sha256 "4401e532ae1decc485fd763dfe296cafed4a3af0e8fafc70aeefd620231e9c96"
    end
  end

  def install
    bin.install "revan"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/revan --version")
  end
end
