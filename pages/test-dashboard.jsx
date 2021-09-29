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
            <div className="flex flex-col md:flex-row mt-4 md:mt-14">

              <div className="w-full px-6 md:px-0 md:w-1/2 order-3 md:order-2">
                  <>
                    <MostRecent />
                  </>
              </div>

            </div>
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
