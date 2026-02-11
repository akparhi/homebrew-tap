class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.7"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.7/darkclouds-darwin-arm64.tar.gz"
      sha256 "99949e9e7bd506f7596ce912693a5c3796e817cfd27ba1bb006da28a153ce896"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.7/darkclouds-darwin-x64.tar.gz"
      sha256 "9f518bcab93482ffb8e196b59ee7ecfae2475d9c679532ffe0e94b254b4d1a93"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
