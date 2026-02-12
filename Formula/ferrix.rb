class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.0/ferrix-darwin-arm64.tar.gz"
      sha256 "20c01dc362bdd26825d1f191e472c578ba42b1176f93acf3e3a3ba7507d96c3d"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.0/ferrix-darwin-x64.tar.gz"
      sha256 "143b56d3347ac157fa9496cf899afa70f84f922af1db6a51d82ad82d2056f8e2"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
