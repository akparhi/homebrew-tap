class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.5"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.5/ferrix-darwin-arm64.tar.gz"
      sha256 "a20713b2b9d5ce708231f773c0b483f7dc541c6b2be15e237c135dceaaa3e063"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.5/ferrix-darwin-x64.tar.gz"
      sha256 "e416200e26f81c3b7a018b602c23b1fbb1c734c1cf211d750f6e6d34a5027192"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
