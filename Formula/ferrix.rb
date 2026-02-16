class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.3"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.3/ferrix-darwin-arm64.tar.gz"
      sha256 "0c210951f6b3ef2ee8dfb5efa4baf54780bc9a4aab69d63ce00cc5bade1ec465"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.3/ferrix-darwin-x64.tar.gz"
      sha256 "602662b53341a7de51d3263b78c31ed565883a1521eb9f2d65f3b2825f537205"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
