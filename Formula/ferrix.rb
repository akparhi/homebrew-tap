class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.5"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.5/ferrix-darwin-arm64.tar.gz"
      sha256 "35f520fe0899c7dc64aba1e8ec130162d701cb5364e4977545c154712a71f2fc"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.5/ferrix-darwin-x64.tar.gz"
      sha256 "c15f95f2662a928a4b5666a7b5b75db55dacb2678a54e39aae75fe56abc51bff"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
