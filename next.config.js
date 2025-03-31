const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */

const nextConfig = withNextIntl({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_V1_URL: process.env.NEXT_PUBLIC_API_V1_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:locale/user/profile",
        destination: `/:locale/user/profile/home`,
      },
      {
        source: "/:locale/user/profile/projects/:id",
        destination: `/:locale/user/profile/projects/:id/safe-project`,
      },
      {
        source: "/:locale/data-custodian/profile",
        destination: `/:locale/data-custodian/profile/home`,
      },
      {
        source: "/:locale/data-custodian/profile/users/:id",
        destination: `/:locale/data-custodian/profile/users/:id/identity`,
      },
      {
        source: "/:locale/data-custodian/profile/configuration",
        destination: `/:locale/data-custodian/profile/configuration/webhooks`,
      },
      {
        source: "/:locale/data-custodian/profile/projects/:id",
        destination: `/:locale/data-custodian/profile/projects/:id/safe-project`,
      },
      {
        source: "/:locale/organisation/profile",
        destination: `/:locale/organisation/profile/home`,
      },
      {
        source: "/:locale/organisation/profile/details",
        destination: `/:locale/organisation/profile/details/name-and-address`,
      },
      {
        source: "/:locale/organisation/profile/user-administration",
        destination: `/:locale/organisation/profile/user-administration/delegates`,
      },
      {
        source: "/:locale/organisation/profile/projects/:id",
        destination: `/:locale/organisation/profile/projects/:id/safe-project`,
      },
      {
        source: "/:locale",
        destination: "/:locale/homepage",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }

    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/node": false,
      };
    }

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});

const withBundleAnalyzer =
  process.env.ANALYZE_BUNDLE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : config => config;

module.exports = withBundleAnalyzer(nextConfig);
