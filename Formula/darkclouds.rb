class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.5.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.5.0/darkclouds-darwin-arm64.tar.gz"
      sha256 "84ab28e540d9cbec2e503b116167840ebe8011fa56fbc9c0c73daec63e461dc6"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.5.0/darkclouds-darwin-x64.tar.gz"
      sha256 "b947f7ab228f5f7982eed6b39504100dbfe3244b7092a21fd34cf2d6b6e4ef5f"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
