const withImages = require("next-images");
module.exports = withImages({
	webpack(config, { dev }) {
		config.module.rules.push(
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve("url-loader"),
			},
			{
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
			}
		);

		return config;
	},
	images: {
		domains: [
			"spotsharenl.s3.eu-central-1.amazonaws.com",
			"picsum.photos",
			"scontent-ams4-1.cdninstagram.com",
		],
	},
	async redirects() {
		return [
			{
				source: "/member/:path*",
				destination: "/fotograaf/:path*",
				permanent: true,
			},
			{
				source: "/login",
				destination: "/inloggen",
				permanent: true,
			},
			{
				source: "/foto/chainbridge-edam",
				destination: "/foto/chainbridge-edam",
				permanent: true,
			},
			{
				source: "/foto/harbour-entrance-volendam",
				destination: "/foto/harbour-entrance-volendam",
				permanent: true,
			},
			{
				source: "/foto/autumn-haze",
				destination: "/foto/autumn-haze",
				permanent: true,
			},
			{
				source: "/foto/marken",
				destination: "/foto/marken",
				permanent: true,
			},
		];
	},
});
