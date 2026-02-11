class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.2.1"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.1/darkclouds-darwin-arm64.tar.gz"
      sha256 "82486839cf753c4d7b2e7daa684c3e934f1dde24dc6782767953f7893a19a60c"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.2.1/darkclouds-darwin-x64.tar.gz"
      sha256 "412e47f2cb8d22dde883ca39639c8d642d6c4bce8a028556e7884205f3e5d6c2"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
