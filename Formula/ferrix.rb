class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.0/ferrix-darwin-arm64.tar.gz"
      sha256 "c211ecebc0ead269b063ef4fbba0fd4ec1e3b1cd6b6e5f9d410ea753c9c34b67"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.0/ferrix-darwin-x64.tar.gz"
      sha256 "c428779561fb3fbbf827728dcab44e9c34c8ddf02b80c1e3cf673582153a6f51"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
