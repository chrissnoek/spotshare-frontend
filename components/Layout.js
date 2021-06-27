import React from "react";
import Head from "next/head";
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";

export default function Layout({ children }) {
  const title = "Welcome to Nextjs";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
