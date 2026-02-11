class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.6"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.6/darkclouds-darwin-arm64.tar.gz"
      sha256 "2b5dd7bcac0aa4f2f06c6d0513337b7add88b1786969d9a9439f3ea0d43cf089"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.6/darkclouds-darwin-x64.tar.gz"
      sha256 "95af50cade82747d14f22e295febcd14a61d077a73523f9bb570dbc8a2873bf0"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
