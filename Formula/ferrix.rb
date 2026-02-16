class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.5"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.5/ferrix-darwin-arm64.tar.gz"
      sha256 "4b1c87fa701a2113d70dc15d71a1727d957a64e78b2507b4fb8fee0c1d9027c6"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.5/ferrix-darwin-x64.tar.gz"
      sha256 "aa2458a23c3cd0edb9dbec910e4700a49fa97137fd2da6dbc9f1e9fbd8b04138"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
