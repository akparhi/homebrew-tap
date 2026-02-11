class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.3.3"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.3/darkclouds-darwin-arm64.tar.gz"
      sha256 "328e4f560410567688cc2f93724d2c273dcf3f5569b9912b125dfd5f3569a8c5"
    else
      url "https://github.com/akparhi/homebrew-tap/releases/download/v0.3.3/darkclouds-darwin-x64.tar.gz"
      sha256 "94cdd4e1af90746377ad39407c977466fd9dd610c88b3a07dd96dbae9f73332a"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
