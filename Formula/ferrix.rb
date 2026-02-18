class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.4"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.4/ferrix-darwin-arm64.tar.gz"
      sha256 "2c551952218874094b9ff41bf1f08ede1294fdc13af4e36c5caacb775ae8bee0"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.4/ferrix-darwin-x64.tar.gz"
      sha256 "be62133af6918956a32a8741cf2bd63c52ac5dd702c5318de7aab460abc8d05a"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
