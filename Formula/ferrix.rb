class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.9"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.9/ferrix-darwin-arm64.tar.gz"
      sha256 "36616f989082d4a120c6096da1dbc34254cf7ce24c7fb15e9a234906a6030739"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.9/ferrix-darwin-x64.tar.gz"
      sha256 "27421e00675bd0b28dc9e1495f81e759df5d797ba90a917937b08c17fb3a5724"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
