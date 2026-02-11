class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.5"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.5/darkclouds-darwin-arm64.tar.gz"
      sha256 "6fdc8860dd1553f1e6f69e8df05696c49332ad6a172c819c87dff09173167951"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.5/darkclouds-darwin-x64.tar.gz"
      sha256 "c96e8a1f6114353acc034f0aa3f9e42c96383a8072d8ce35ed9a17c15ed69ee4"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
