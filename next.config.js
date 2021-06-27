const withImages = require("next-images");
module.exports = withImages({
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "spotsharenl.s3.eu-central-1.amazonaws.com",
      "picsum.photos",
      "scontent-ams4-1.cdninstagram.com",
    ],
  },
});
