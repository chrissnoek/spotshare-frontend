import "../styles/globals.scss";
import "leaflet/dist/leaflet.css";
// Import Swiper styles
import 'swiper/swiper.scss';
import { userContext } from "../services/userContext.js";
import { useEffect, useState } from "react";
import auth from "../services/authService";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const router = useRouter();

  const getCurUser = async () => {
    const _user = await auth.getCurrentUser();
    setUser(_user);
    // console.log("user from app component", _user);
  };

  console.log(router.pathname);

  useEffect(() => {
    getCurUser();
  }, []);

  const renderGTMSnippet = () => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M27C98');
        `,
        }}
      />
    );
  }

  return (
    <userContext.Provider value={{ user }}>
      <Layout>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="ahrefs-site-verification"
            content="e36c5bff17d0ae554867c3c60fcbe8786838958570a063a46a75f8ce183949f3"
          />

          {renderGTMSnippet()}
          
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M27C98');`,
            }}
          ></script>

          <meta name="robots" content="index,follow,archive" key="robots" />
          <link rel="icon" href="/images/favicon.png" />

          {/* <!-- Primary Meta Tags --> */}
          <title key="title">De mooiste fotolocaties in Nederland | Spotshare</title>
          <meta
            name="title"
            content="De mooiste fotolocaties in Nederland | Spotshare"
            key="meta_title"
          />
          <meta
            name="description"
            key="meta_desc"
            content="De mooiste fotolocaties van Nederland, gewoon bij jouw in de buurt! Zowel de bekende als onbekende fotolocaties in Nederland ontdek je bij SpotShare."
          />
          <meta name="author" content="Spotshare" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url"
            key="og_url" content="https://www.spotshare.nl/" />
          <meta
            property="og:title"
            key="og_title"
            content="De mooiste fotolocaties in Nederland | Spotshare"
          />
          <meta property="og:site_name" content="SpotShare" />
          <meta
            property="og:description"
            key="og_desc"
            content="De mooiste fotolocaties van Nederland, gewoon bij jouw in de buurt! Zowel de bekende als onbekende fotolocaties in Nederland ontdek je bij SpotShare."
          />
          <meta property="og:image"
            key="og_img" content="/images/ogimage.jpg" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url"
            key="twitter_url" content="https://www.spotshare.nl/" />
          <meta
            property="twitter:title"
            key="twitter_title"
            content="De mooiste fotolocaties in Nederland | Spotshare"
          />
          <meta
            property="twitter:description"
            key="twitter_desc"
            content="De mooiste fotolocaties van Nederland, gewoon bij jouw in de buurt! Zowel de bekende als onbekende fotolocaties in Nederland ontdek je bij SpotShare."
          />
          <meta property="twitter:image" 
            key="twitter_img" content="/images/ogimage.jpg" />
        </Head>
        {router.pathname !== '/fotolocatie/[slug]' && router.pathname !== '/foto/[slug]' ? <div className="container">
          <Component {...pageProps} />
           </div> :
           <Component {...pageProps} />
           }
      </Layout>
    </userContext.Provider>
  );
}

export default MyApp;
