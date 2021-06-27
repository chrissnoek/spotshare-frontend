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
            <div className="block md:flex mt-8">
              <div className="w-full md:w-1/4 px-8">
                <div className="flex items-center">
                  <div className="mr-4">
                    <UserProfilePicture profile={value.user} size={10} />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl leading-tight text-center sm:text-left">
                      {value.user.firstname
                        ? value.user.firstname + " " + value.user.lastname
                        : value.user.username}
                    </h1>
                    <Link href={`/profiel/bewerken/${value.user.username}`}>
                      <a className="text-sm">Profiel aanpassen</a>
                    </Link>
                  </div>
                </div>
                <ul className="mt-6">
                  <li
                    className={`block py-3 flex items-center ${
                      !showNotifications
                        ? `text-blue-500 font-bold`
                        : `text-gray-900 hover:text-blue-500 hover:font-bold`
                    }`}
                    onClick={() => setShowNotifications(false)}
                  >
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                  </li>
                  <li>
                    <Link href={`/fotograaf/${value.user.slug}#fav`}>
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
                      className={`block py-3 flex items-center ${
                        showNotifications
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
              </div>

              <div className="w-full md:w-1/2">
                {showNotifications ? (
                  <NotificationBoard user={value.user} />
                ) : (
                  <>
                    <Heading redirect={redirect} />
                    <MostRecent />
                  </>
                )}
              </div>

              <div className="w-full md:w-1/4  px-8">
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
  console.log("result", result);

  return {
    props: {
      categories: result.locationCategories.filter(
        (cat) => cat.locations.length > 0
      ),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 86400, // In seconds
  };
}
