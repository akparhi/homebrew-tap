class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.8"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.8/darkclouds-darwin-arm64.tar.gz"
      sha256 "72fe2239d2e7d2820d8c5d7e3c16047f2011f0571e65d41947ea5dd19ab2a158"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.8/darkclouds-darwin-x64.tar.gz"
      sha256 "9bc215e585c30f3f9e62473143900a9aaabe12fb58351ec23a4680e980233832"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
