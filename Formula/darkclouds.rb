class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.1/darkclouds-darwin-arm64.tar.gz"
      sha256 "1fae44785cee81e931faf2a1406fb832f6f336dd098c8cb4ed42c9aae07ae78d"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.1/darkclouds-darwin-x64.tar.gz"
      sha256 "49d5c7dacc59bcfe639f82456fb818099be11f88b0d0e5e02327b3f99bc5bbd8"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
