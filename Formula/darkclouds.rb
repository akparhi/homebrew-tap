class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.2/darkclouds-darwin-arm64.tar.gz"
      sha256 "2b946e097f739c24111002e209cae6c7914975c79f2c5ca0c98a329ae80cca87"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.2/darkclouds-darwin-x64.tar.gz"
      sha256 "a73a4682dc57185065ae5b4646db3897fd92e71ea7fa5969bd8cd25124b8cff3"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
