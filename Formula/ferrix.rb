class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.2/ferrix-darwin-arm64.tar.gz"
      sha256 "8c6d489cb5de44d02acd96448535ef89ea01c531c2ef07ae14a598f9b73f5f0c"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.2/ferrix-darwin-x64.tar.gz"
      sha256 "83085a49404e2aa657240a1b7d422d9ad03c478a73133b85d223233e4ba686c4"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
