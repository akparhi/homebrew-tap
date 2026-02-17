class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.1/ferrix-darwin-arm64.tar.gz"
      sha256 "a54980285b9f858627d445dd7d638ddc64237803998279003c5f3a4a92742945"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.1/ferrix-darwin-x64.tar.gz"
      sha256 "903a11c509ed989321ae3df5da54432503e8bca120ef0d321c958a92dcb13557"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
