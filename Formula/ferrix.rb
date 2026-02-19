class Ferrix < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.4.8"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.8/ferrix-darwin-arm64.tar.gz"
      sha256 "c805ed3720cd86f1f53b890bcce40560b8a8ea332154a7a666f29db6257db308"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.4.8/ferrix-darwin-x64.tar.gz"
      sha256 "2e99e2103e22eb34cedfaf2eb5403dd5508f6357fd563afd621e5a282042ad11"
    end
  end

  def install
    bin.install "ferrix"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/ferrix --version")
  end
end
