class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.5.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.5.0/ferrix-darwin-arm64.tar.gz"
      sha256 "69e48580c5e216d54323104ec1238f180989aaa1f7e97ab29d9cfd940368e481"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.5.0/ferrix-darwin-x64.tar.gz"
      sha256 "48fb3d8ab922755d4b4cf5fca9ef8439ea9e90d1e5380fa4359eaf3ef0ab0011"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
