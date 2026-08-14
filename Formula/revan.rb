class Revan < Formula
  desc "Routes Codex and OpenRouter models to Claude Code"
  homepage "https://github.com/akparhi/revan"
  version "0.1.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/revan/releases/download/v0.1.0/revan-darwin-arm64.tar.gz"
      sha256 "06f399760ea9970c2575a3780f8cb9dd63355a68f6380dfa22d646ae70c21d9d"
    else
      url "https://github.com/akparhi/revan/releases/download/v0.1.0/revan-darwin-x64.tar.gz"
      sha256 "26978e7765a6a9d9d3e486bcc94c7e7dc2b029417a62d199eabcd704bf43765c"
    end
  end

  def install
    bin.install "revan"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/revan --version")
  end
end
