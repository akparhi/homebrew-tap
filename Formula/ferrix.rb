class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.6"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.6/ferrix-darwin-arm64.tar.gz"
      sha256 "cb582a8b6a3f5e26e68d071b551ec661e6a8f5c4ce64baa25e51b382b7af0a05"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.6/ferrix-darwin-x64.tar.gz"
      sha256 "32ddb03fad785a041faaf11f455b6bd2373942ce6e04b6a837cf403e39905341"
    end
  end

  depends_on cask: "font-jetbrains-mono-nerd-font"

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
