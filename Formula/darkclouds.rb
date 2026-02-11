class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.0/darkclouds-darwin-arm64.tar.gz"
      sha256 "655dc881aef95e2d7aac228fc709e2e822518e670c67d4c6f04aacd850aeb226"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.0/darkclouds-darwin-x64.tar.gz"
      sha256 "8bdf90c5acd4de598e1bd479efc253326a64957513bf72bc3c7a742e13906628"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
