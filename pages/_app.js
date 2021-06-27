import "../styles/globals.scss";
import "leaflet/dist/leaflet.css";
import { userContext } from "../services/userContext.js";
import { useEffect, useState } from "react";
import auth from "../services/authService";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  const getCurUser = async () => {
    const _user = await auth.getCurrentUser();
    setUser(_user);
    console.log("user from app component", _user);
  };

  useEffect(() => {
    getCurUser();
  }, []);

  return (
    <userContext.Provider value={{ user }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </userContext.Provider>
  );
}

export default MyApp;
