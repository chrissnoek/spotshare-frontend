import React, { useState, useEffect } from "react";
import Heading from "../components/Dashboard/Heading.jsx";
import LocationsNearby from "../components/Dashboard/LocationsNearby.jsx";
import CategorieList from "../components/Dashboard/CategorieList.jsx";
import graphQLFetch from "../graphQLFetch";
import { userContext } from "../services/userContext";
import Link from "next/link";
import MostRecent from "../components/Dashboard/MostRecent";
import UserProfilePicture from "../components/shared/UserProfilePicture";
import { FaHome, FaBookmark, FaPlus } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import NotificationBoard from "../components/Dashboard/NotificationBoard.jsx";
import { useRouter } from "next/router";
import Head from "next/head";
import BlogPosts from "../components/Dashboard/BlogPosts.jsx";

const Dashboard = ({ categories: _categories }) => {
  const [categories, setCategories] = useState(_categories);
  const [showNotifications, setShowNotifications] = useState();
  const router = useRouter();

  useEffect(() => {
    setCategories(_categories);
  }, [_categories]);

  const redirect = (slug) => {
    typeof window !== "undefined" && router.push(slug);
  };

  return (
    <userContext.Consumer>
      {(value) => {
        return !value.user ? (
          redirect("/")
        ) : (
          <React.Fragment>
            <Head>
              {/* <!-- Primary Meta Tags --> */}
              <title>Dashboard | Spotshare</title>
              <meta name="title" content="Dashboard | Spotshare" />
              <meta
                name="description"
                content="Meest recente updates in de Spotshare community en locaties bij je in de buurt."
              />

              {/* <!-- Open Graph / Facebook --> */}
              <meta property="og:type" content="website" />
              <meta
                property="og:url"
                content="https://www.spotshare.nl/dashboard"
              />
              <meta property="og:title" content="Dashboard | Spotshare" />
              <meta
                property="og:description"
                content="Meest recente updates in de Spotshare community en locaties bij je in de buurt."
              />

              {/* <!-- Twitter --> */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://www.spotshare.nl/dashboard"
              />
              <meta property="twitter:title" content="Dashboard | Spotshare" />
              <meta
                property="twitter:description"
                content="Meest recente updates in de Spotshare community en locaties bij je in de buurt."
              />
            </Head>
            <div className="flex flex-col md:flex-row mt-4 md:mt-14">
              <div className="w-full md:w-1/4 px-6 lg:pl-14 order-1 ">
                <Link href={`/fotograaf/${value.user.username}`}>
                  <div className="flex items-center cursor-pointer mb-2 md:mb-0">

                    <div className="mr-4">
                      <UserProfilePicture profile={value.user} size={10} />
                    </div>
                    <div>
                      <h1 className="font-bold text-xl leading-tight text-left">
                        {value.user.firstname
                          ? value.user.firstname + " " + value.user.lastname
                          : value.user.username}
                      </h1>
                    </div>
                  </div>
                </Link>
                <ul className="hidden md:block mt-6 ">
                  <li
                    className={`block py-3 flex items-center ${!showNotifications
                      ? `text-blue-500 font-bold`
                      : `text-gray-900 hover:text-blue-500 hover:font-bold`
                      }`}
                    onClick={() => setShowNotifications(false)}
                  >
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                  </li>
                  <li>
                    <Link href={`/fotograaf/${value.user.slug}?tab=favoriete-locaties`}>
                      <a className="block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center">
                        <FaBookmark className="mr-2" />
                        <span>Opgeslagen locaties</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/foto/toevoegen">
                      <a className="block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center">
                        <FaPlus className="mr-2" />
                        <span>Foto uploaden</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <span
                      className={`cursor-pointer block py-3 flex items-center ${showNotifications
                        ? `text-blue-500 font-bold`
                        : `text-gray-900 hover:text-blue-500 hover:font-bold`
                        }`}
                      onClick={() => setShowNotifications(true)}
                    >
                      <IoNotifications className="mr-2" />
                      <span>Berichten</span>
                    </span>
                  </li>
                  <li>
                    <Link href="/uitloggen">
                      <a className="block py-3 text-gray-900 hover:text-blue-500 hover:font-bold border-t border-gray-200 pt-6 mt-6 flex items-center">
                        <FiLogOut className="mr-2" />
                        <span>Uitloggen</span>
                      </a>
                    </Link>
                  </li>
                </ul>
                <BlogPosts></BlogPosts>
              </div>

              <div className="w-full px-6 md:px-0 md:w-1/2 order-3 md:order-2">
                {showNotifications ? (
                  <NotificationBoard user={value.user} />
                ) : (
                  <>
                    <Heading redirect={redirect} />
                    <Link href={`/foto/toevoegen`}>
                      <div className="flex items-center bg-white  shadow-lg border border-gray-200 px-4 py-3 rounded-lg cursor-pointer mb-6">

                        <div className="mr-4">
                          <UserProfilePicture profile={value.user} size={10} />
                        </div>
                        <div className="flex w-full">
                          <p className="font-bold text-gray-600 text-lg text-left">
                            Nog mooie locaties bezocht, {value.user.firstname
                              ? value.user.firstname
                              : value.user.username}?
                          </p>
                          <Link href={`/foto/toevoegen`}><a className="block text-white font-semibold rounded bg-green-500 hover:bg-green-600 px-2 py-1  ml-auto">Voeg nu toe!</a></Link>
                        </div>
                      </div>
                    </Link>
                    <MostRecent />
                  </>
                )}
              </div>

              <div className="w-full md:w-1/4 px-6 xl:px-8 order-2 md:order-3">
                <LocationsNearby />
                <CategorieList categories={categories} />
              </div>
            </div>
          </React.Fragment>
        );
      }}
    </userContext.Consumer>
  );
};

export default Dashboard;

export async function getStaticProps() {
  // build the graphql query
  const query = `query {
		locationCategories{
		  label
      value
      locations {
        id
      }
		}
	  }`;

  const result = await graphQLFetch(query, {}, true);
  // console.log("result", result);

  return {
    props: {
      categories: result.locationCategories.filter(
        (cat) => cat.locations.length > 0
      ),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 10, // In seconds
  };
}
