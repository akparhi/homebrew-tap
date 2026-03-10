class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/ferrix"
  version "0.5.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.5.1/ferrix-darwin-arm64.tar.gz"
      sha256 "e3714fd076eb183dbba606e3263dbf2c28a1b87d71d166db719815c965e74c05"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.5.1/ferrix-darwin-x64.tar.gz"
      sha256 "35a18d93ef78cc4b1fe23d68014d3016954a783e9535f32e09666dc20bb3e685"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
