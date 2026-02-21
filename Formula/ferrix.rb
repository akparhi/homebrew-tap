class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.9"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.9/ferrix-darwin-arm64.tar.gz"
      sha256 "d2adee878b9a0bfe75dc2a4b885cc24a7260b635baaa78c1dc2cc31bd0af4418"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.9/ferrix-darwin-x64.tar.gz"
      sha256 "5daaf1dc6157ad7ecb37e0a0e44b1fb2dbc7e111ab9708afec458206cf173218"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
