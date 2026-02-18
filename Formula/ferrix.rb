class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.3"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.3/ferrix-darwin-arm64.tar.gz"
      sha256 "f2ede2f4bbdb2197b4438032d86b717c919601ad327260f42761dec196819a33"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.3/ferrix-darwin-x64.tar.gz"
      sha256 "c08c6ee99dccd0872cd14a568948ebb35b3691deb9215f363fd7e4bc2145030b"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
