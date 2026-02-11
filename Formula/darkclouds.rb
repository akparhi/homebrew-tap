class Darkclouds < Formula
  desc "Automated bug-fixing system powered by Claude"
  homepage "https://github.com/akparhi/darkclouds"
  version "0.1.2"
  license "MIT"

  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/akparhi/darkclouds/releases/download/v0.1.2/darkclouds-darwin-arm64.tar.gz"
      sha256 "9412d0e145acc851a0ed0cee15d1018e5c943fd4f5f5f874e11b08bc78f197f2"
    else
      url "https://github.com/akparhi/darkclouds/releases/download/v0.1.2/darkclouds-darwin-x64.tar.gz"
      sha256 "893088ebf43c8a2b9e55e8741e64296281d168e36cee688de03b6b3f6a479d62"
    end
  end

  def install
    bin.install "darkclouds"
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/darkclouds --version")
  end
end
