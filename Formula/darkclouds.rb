class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.5"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.5/darkclouds-darwin-arm64.tar.gz"
      sha256 "4b6dad66fad957e11475bd3594d380e65c975a24d69b680a44c6200cd6653785"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.5/darkclouds-darwin-x64.tar.gz"
      sha256 "de5f2ba23264a0f763838bdec8caaf97ac5ed033a7e29f4687f5ca9db75e4ac1"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
