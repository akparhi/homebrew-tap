class Revan < Formula
  desc "Routes Codex and OpenRouter models to Claude Code"
  homepage "https://github.com/akparhi/revan"
  version "0.1.3"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/revan/releases/download/v0.1.3/revan-darwin-arm64.tar.gz"
      sha256 "de76b8d8a30f2653f69707a1efca8dfd3342aec4210dff41d5fd3f0d392f5d34"
    else
      url "https://github.com/akparhi/revan/releases/download/v0.1.3/revan-darwin-x64.tar.gz"
      sha256 "4f3765db4b087fd2a15f2d661fe569fb9e231fe13f57da49ee0b99679e88b811"
    end
  end

  def install
    bin.install "revan"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/revan --version")
  end
end
