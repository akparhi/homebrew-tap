class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.3"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.3/ferrix-darwin-arm64.tar.gz"
      sha256 "c3dc40137db9b7fd86b538a8526aa25ca5add7424d99d09d43391505bb70cb40"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.3/ferrix-darwin-x64.tar.gz"
      sha256 "3dc08db95aad0d4b7a560bc09a6a4e525dfcad739d408b12a5d687bad7ca0e7a"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
