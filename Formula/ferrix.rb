class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.7"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.7/ferrix-darwin-arm64.tar.gz"
      sha256 "b3bdc7b28498891e49ab41a841812f1eec5d43cbed0faca1325e67e7cf23748e"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.7/ferrix-darwin-x64.tar.gz"
      sha256 "413b72befd3748c791a49cbe33c2efc20993738e4ecd0c61d68100a75d172483"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
