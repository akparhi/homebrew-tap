class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.2/darkclouds-darwin-arm64.tar.gz"
      sha256 "ae942dcffeb72e847cddae6c05194ce624cb805f14fdab659c82cece5376b768"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.2/darkclouds-darwin-x64.tar.gz"
      sha256 "3f022e5d4d0bc1ce3992044cd9d1b381a960d83f0d53e10d47bcd0b374d90cb9"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
