class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.7"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.7/ferrix-darwin-arm64.tar.gz"
      sha256 "a7d216d787e32c6748375b53020e48e28804de39aff3797b0da6597f429e77da"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.7/ferrix-darwin-x64.tar.gz"
      sha256 "3f9466e1cfcbbf4fde7e04d95dc46b15fd06c33bd51c005b29b96f6d786d0fca"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
