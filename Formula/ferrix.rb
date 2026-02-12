class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.1/ferrix-darwin-arm64.tar.gz"
      sha256 "c707d9c54e8e0161e7c6247e1b06325e44fea47ea9a502c7ab6ef00eb4d42b18"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.1/ferrix-darwin-x64.tar.gz"
      sha256 "6ab66efde82435a78cf4aa85d5126a544d6f81bc2625a35acac9c1e18285cac3"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
