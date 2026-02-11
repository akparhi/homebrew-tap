class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.3"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.3/darkclouds-darwin-arm64.tar.gz"
      sha256 "30eb87e92c12ae872c2671a47ed13f6474b17eb0e7e62d2f2359a09ffb99d057"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.3/darkclouds-darwin-x64.tar.gz"
      sha256 "b3ed9bc411a8c4871a01c638cf5ce3462852c3eaff092e94261b96a515d0befb"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
