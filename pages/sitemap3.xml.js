import graphQLFetch from "../graphQLFetch";

const Sitemap2 = () => {};

export const getServerSideProps = async ({
    res
}) => {


      const photoBySlugQuery = `
      query photoBySlug {
          photos {
              slug
              updatedAt
          }
      }`;

const photoBySlugResult = await graphQLFetch(photoBySlugQuery, {}, true);


    const siteUrl = 'https://app.spotshare.nl';
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${photoBySlugResult.photos
            .map(({ slug, updatedAt }) => {
            return `<url>
                    <loc>${siteUrl}/foto/${slug}</loc>
                    <lastmod>${updatedAt.toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url> `;
            })
        .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap2;