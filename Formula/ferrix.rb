class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.1/ferrix-darwin-arm64.tar.gz"
      sha256 "0c700bb911f613854b0e6b72ef3b8b8e72c3457ec9c170337867d9b1076b38cb"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.1/ferrix-darwin-x64.tar.gz"
      sha256 "6f7224d0691a2b7250a1279e1e3205dc28e6401c902a491ac5259433902c0f1c"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
