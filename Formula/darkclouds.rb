class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.4"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.4/darkclouds-darwin-arm64.tar.gz"
      sha256 "2aacbba1f91e6bd9945362e57a4074a2365db0c93afa69e0c98ee9e7ca8b2564"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.4/darkclouds-darwin-x64.tar.gz"
      sha256 "9f3f5b347a2f005354c95e6da8a874537384a0118f758702578f7e6182c348ad"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
