import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages serves project sites under /<repo-name>
  // basePath is enough for Next static export here.
  basePath: isGithubActions && repositoryName ? `/${repositoryName}` : "",
};

export default nextConfig;
