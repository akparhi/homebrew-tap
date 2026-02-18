class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.9"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.9/ferrix-darwin-arm64.tar.gz"
      sha256 "a51234387cb7f5c96e18eacb911b7c17a8d8f0926565b9f1dd76074b967db623"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.9/ferrix-darwin-x64.tar.gz"
      sha256 "c76e0270d300e1a9dda5e721f8e04931580a49b4e9b58b2590c1a3d1bd9be31a"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
