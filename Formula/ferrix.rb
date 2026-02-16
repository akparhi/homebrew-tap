class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.0/ferrix-darwin-arm64.tar.gz"
      sha256 "b1d6320ef3d18bbbe883b14aa5ffbff17dd89c44ea28d136d8d66a9eb02be55f"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.0/ferrix-darwin-x64.tar.gz"
      sha256 "1ad0ae67dc16236f040132871b4b88c696ab5c5bc661a6d63a9769703b8d2263"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
