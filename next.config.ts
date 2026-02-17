import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.replace(/.*\//, "") ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubActions && repositoryName ? `/${repositoryName}` : "",
  assetPrefix: isGithubActions && repositoryName ? `/${repositoryName}/` : undefined,
};

export default nextConfig;
