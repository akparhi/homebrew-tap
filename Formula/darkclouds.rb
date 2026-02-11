class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.6"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.6/darkclouds-darwin-arm64.tar.gz"
      sha256 "6a3d1c860ea9ec917b3ef924a97aeb4c910d249163ec092b4ada6b5e5dee73f1"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.6/darkclouds-darwin-x64.tar.gz"
      sha256 "3354a83e89013dc06e161ee081aa77ceb8f84433cf7c12ec83c7fd852b02a091"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
