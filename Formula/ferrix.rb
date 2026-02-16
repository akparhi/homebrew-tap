class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.1/ferrix-darwin-arm64.tar.gz"
      sha256 "ddda583fb62ab9811170c29ce1cc85bf60177cbed781024408b6e5d74eb949d0"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.1/ferrix-darwin-x64.tar.gz"
      sha256 "032a143188c241e05b4843e71a87aaa257f5fdda02596269d6aec0b1b40e608d"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
