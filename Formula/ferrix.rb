class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.6"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.6/ferrix-darwin-arm64.tar.gz"
      sha256 "131452ae14faf5e2571cde238b4aa9f45818d333e993abd06d7b9133f7ee90fc"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.6/ferrix-darwin-x64.tar.gz"
      sha256 "7b033957c0bf78bdab7ef2c098a495e66ddce84141e5f5d4adc89e2c16ecac72"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
