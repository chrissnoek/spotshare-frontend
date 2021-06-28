import "../styles/globals.scss";
import "leaflet/dist/leaflet.css";
import { userContext } from "../services/userContext.js";
import { useEffect, useState } from "react";
import auth from "../services/authService";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  const getCurUser = async () => {
    const _user = await auth.getCurrentUser();
    setUser(_user);
    // console.log("user from app component", _user);
  };

  useEffect(() => {
    getCurUser();
  }, []);

  return (
    <userContext.Provider value={{ user }}>
      <Layout>
        <Head>
          <title>Spotshare.nl | De mooiste fotolocaties van Nederland</title>
          <meta charset="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="ahrefs-site-verification"
            content="e36c5bff17d0ae554867c3c60fcbe8786838958570a063a46a75f8ce183949f3"
          />

          <Script strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M27C98');`}
          </Script>
          <meta name="robots" content="index,follow,archive" />
          <link rel="icon" href="/favicon.png" />

          <meta name="keywords" content="" />
          <meta
            name="description"
            content="De mooiste fotolocaties van Nederland, gewoon bij jouw in de buurt! Zowel de bekende als onbekende fotolocaties in Nederland ontdek je bij SpotShare."
          />
          <meta
            name="image"
            content="https://www.spotshare.nl/site/templates/img/fb-cover2.jpg"
          />
          <meta name="author" content="Spotshare" />
          <meta property="og:site_name" content="SpotShare" />
          <meta
            property="og:title"
            content="De mooiste fotolocaties in Nederland | Spotshare"
          />
          <meta property="og:url" content="https://www.spotshare.nl/" />
          <meta
            property="og:description"
            content="De mooiste fotolocaties van Nederland, gewoon bij jouw in de buurt! Zowel de bekende als onbekende fotolocaties in Nederland ontdek je bij SpotShare."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://www.spotshare.nl/site/templates/img/fb-cover2.jpg"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </userContext.Provider>
  );
}

export default MyApp;
