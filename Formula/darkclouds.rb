class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.0"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.0/darkclouds-darwin-arm64.tar.gz"
      sha256 "c0bdc412eb71206e215a71881968702d400e078e6ed09e3b7e28211b70a321fa"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.0/darkclouds-darwin-x64.tar.gz"
      sha256 "df95ebae5f57303e326d7b18d91815acc27b5cd1622ce170c769c12f7874d5bd"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
