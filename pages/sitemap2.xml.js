import graphQLFetch from "../graphQLFetch";

const Sitemap2 = () => {};

export const getServerSideProps = async ({
    res
}) => {

    const baseUrl = {
        development: 'pages',
        production: './',
      }[process.env.NODE_ENV];

      const locationBySlugQuery = `
            query locationBySlug {
                locations {
                    slug
                    updatedAt
                }
            }`;

    const locationsBySlugResult = await graphQLFetch(locationBySlugQuery, {}, true);


    const locationCategoriesQuery = `query {
		locationCategories{
		  label
      value
      locations {
        id
      }
		}
	  }`;

  const locationCategoriesResult = await graphQLFetch(locationCategoriesQuery, {}, true);
  const locationCategories = locationCategoriesResult.locationCategories.filter(
    (cat) => cat.locations.length > 0
  );
  
  const province = [
    "noord-holland",
    "zuid-holland",
    "zeeland",
    "flevoland",
    "noord-brabant",
    "limburg",
    "overijssel",
    "gelderland",
    "drenthe",
    "groningen",
    "friesland",
    "utrecht",
  ];


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${locationsBySlugResult.locations
            .map(({ slug, updatedAt }) => {
            return `<url>
                    <loc>${baseUrl}/fotolocatie/${slug}</loc>
                    <lastmod>${updatedAt.toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url> `;
            })
        .join("")}
        ${locationCategories
            .map(({ value }) => {
            return `<url>
                    <loc>${baseUrl}/fotolocaties/categorie/${value}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url> `;
            })
        .join("")}
        ${province
            .map((prov) => {
            return `<url>
                    <loc>${baseUrl}/fotolocaties/${prov}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
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