const withImages = require("next-images");
module.exports = withImages({
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
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
