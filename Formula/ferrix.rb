class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.0/ferrix-darwin-arm64.tar.gz"
      sha256 "307960f993686a319c7ef194f8410a229d21299f2cfa44eabc2e6e11ed50512d"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.0/ferrix-darwin-x64.tar.gz"
      sha256 "8a6968dddc628c354614f92b5735f47d00982ef391dc74a715fab8fcf499c7e0"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
