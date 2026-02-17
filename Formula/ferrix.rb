class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.4"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.4/ferrix-darwin-arm64.tar.gz"
      sha256 "f51b62c17d6d23cc21f4befb22a41d7db437e910824ae869d220763ecde0f0db"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.4/ferrix-darwin-x64.tar.gz"
      sha256 "b95ce8b1034270207610c53f0c46a864e0aa35334ec2cf4f497e9272b560c95a"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
