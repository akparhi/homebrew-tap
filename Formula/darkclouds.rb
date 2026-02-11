class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.0/darkclouds-darwin-arm64.tar.gz"
      sha256 "7aae2afcca467985e15fa2e77b7d820d8ffaca0001d9125e0df1de1acffb1146"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.0/darkclouds-darwin-x64.tar.gz"
      sha256 "d4cc1c48f9106990aea373554cf5dca698eeba0b526fdc68d1c7da516a6475d7"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
