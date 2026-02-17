class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.2/ferrix-darwin-arm64.tar.gz"
      sha256 "d9a4f12d40382dbb9e2e2612b358041b3a8d6ac887da0176c8426f2bd2894400"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.2/ferrix-darwin-x64.tar.gz"
      sha256 "1999234122a5f12766928bfe09042546f3268f8edcae4300ed2d32896c07a8c3"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
