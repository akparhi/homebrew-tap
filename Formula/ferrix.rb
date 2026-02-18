class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.8"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.8/ferrix-darwin-arm64.tar.gz"
      sha256 "af9ec481ac54c4d94575bee264e338b100b31e63c750c2e5f796dc7a1a6d11e7"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.8/ferrix-darwin-x64.tar.gz"
      sha256 "41185b551d051e1e77ff125995108084c41e876169cc62e9069d1f0e84f90a14"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
