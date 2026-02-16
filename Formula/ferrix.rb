class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.2/ferrix-darwin-arm64.tar.gz"
      sha256 "53c198b0f742e965a27f9e5be66e7a4a4edc4b08c5a699789f5675ca49fba421"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.2/ferrix-darwin-x64.tar.gz"
      sha256 "45cbab439ebaf7713292956176611eecc7f56e73822bfd5880bc175b40ef1e8a"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
