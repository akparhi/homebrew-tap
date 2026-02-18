class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.6"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.6/ferrix-darwin-arm64.tar.gz"
      sha256 "51b1bc8f3eb5b066f4532d27d0a9bd59cff62b19b153385724ace027310c5787"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.6/ferrix-darwin-x64.tar.gz"
      sha256 "27662fd4826481b37dfd081d3fd830cd676b729587f76a1940306df1abe4f6c7"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
