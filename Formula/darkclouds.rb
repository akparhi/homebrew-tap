class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.4"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.4/darkclouds-darwin-arm64.tar.gz"
      sha256 "893ab2daf11241f9a6afbb6629fed5b3192b5e60ffdd09cf9b32854c55f58b9a"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.1.4/darkclouds-darwin-x64.tar.gz"
      sha256 "a3fa10ec706f672a16fa1af4b09c4798e66f191335536bbecf0b9f1ee5e178d4"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
