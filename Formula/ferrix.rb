class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.4"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.4/ferrix-darwin-arm64.tar.gz"
      sha256 "3cf02eb7b9b2480bb5a06cf5b770eaca1905a6c65b1ca4e2394850dc9f44cdd8"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.4/ferrix-darwin-x64.tar.gz"
      sha256 "b5bbd751c5c576de8e1fddf8802c1b7d69cb3f7f5fdec515c37b2d4e1bf5324c"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
