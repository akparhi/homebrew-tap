class Revan < Formula
  desc "Routes Codex and OpenRouter models to Claude Code"
  homepage "https://github.com/akparhi/revan"
  version "0.1.4"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/revan/releases/download/v0.1.4/revan-darwin-arm64.tar.gz"
      sha256 "5e016b8e46a7ce7100b836a16849445e52b1113b6580014b51024d0bbd58af62"
    else
      url "https://github.com/akparhi/revan/releases/download/v0.1.4/revan-darwin-x64.tar.gz"
      sha256 "63e96e29b8ed5884a9f8cdb0ab7f8a1e356af599494f7135460e1156d6e1b260"
    end
  end

  def install
    bin.install "revan"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/revan --version")
  end
end
