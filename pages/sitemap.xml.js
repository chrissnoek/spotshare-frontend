import React from "react";
import fs from "fs";
import graphQLFetch from "../graphQLFetch";

const Sitemap = () => {};

export const getServerSideProps = async ({
    res
}) => {

    const baseUrl = {
        development: 'pages',
        production: './',
      }[process.env.NODE_ENV];

    const staticPages = fs
        .readdirSync(baseUrl)
        .filter((staticPage) => {
            return ![
                "_app.js",
                "_document.js",
                "_error.js",
                "sitemap.xml.js",
                "sitemap2.xml.js",
                "connect",
                "foto",
                "fotograaf",
                "fotolocaties",
                "fotolocatie",
                "profiel",
                "uitloggen.jsx",
                "wachtwoord-resetten.jsx",
                "index.js",
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath.replace('.jsx', '')}`;
        });

          const photoBySlugQuery = `
                query photoBySlug {
                    photos {
                        slug
                        updatedAt
                    }
                }`;

        const photoBySlugResult = await graphQLFetch(photoBySlugQuery, {}, true);

        const photographerBySlugQuery = `
              query photographerBySlug {
                  users {
                      slug
                      updatedAt
                  }
              }`;

      const photographerBySlugResult = await graphQLFetch(photographerBySlugQuery, {}, true);



    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
            return `
            <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>
            `;
        })
        .join("")}
        ${photoBySlugResult.photos
            .map(({ slug, updatedAt }) => {
            return `<url>
                    <loc>${baseUrl}/foto/${slug}</loc>
                    <lastmod>${updatedAt.toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url> `;
            })
        .join("")}
        ${photographerBySlugResult.users
            .map(({ slug, updatedAt }) => {
            return `<url>
                    <loc>${baseUrl}/fotograaf/${slug}</loc>
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

export default Sitemap;