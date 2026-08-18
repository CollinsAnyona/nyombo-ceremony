import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home directory (C:\Users\Admin) is itself a git repo with its own
  // package-lock.json, which makes Turbopack's root inference ambiguous.
  // Pin it explicitly to this project.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
