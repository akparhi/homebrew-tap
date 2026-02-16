class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.7"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.7/ferrix-darwin-arm64.tar.gz"
      sha256 "904b51495d0a04522f97f3bf81bf695a77193c6297c6210dfeb498ba33047554"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.7/ferrix-darwin-x64.tar.gz"
      sha256 "828de48904f6fc43d7abd83013937af758017a32975126f91957d1337dd2ca46"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
