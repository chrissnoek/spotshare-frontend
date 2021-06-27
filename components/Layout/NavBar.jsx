import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { userContext } from "../../services/userContext.js";
import Notifications from "../notificationCenter/Notifications.jsx";
import { IoNotificationsOutline } from "react-icons/io5";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user } = useContext(userContext);
  console.log(user);
  const router = useRouter();

  const closeMenu = () => {
    setIsOpen(false);
    setOpenNotifications(false);
  };

  const notIconClick = (e) => {
    e.preventDefault();
    setOpenNotifications(!openNotifications);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onNotClick = (link) => {
    setOpenNotifications(false);
    router.push(link);
  };

  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900">
        <div>
          <Link href="/">
            <a onClick={closeMenu}>
              <img
                src="http://dkotwt30gflnm.cloudfront.net/assets/spotshare-logo.png"
                className="h-8"
                alt="Spotshare, de mooiste fotolocaties bij jou in de buurt"
              />
            </a>
          </Link>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleOpen}
            type="button"
            className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
          >
            {isOpen ? (
              <FiX className="fill-current text-white" />
            ) : (
              <FiMenu className="fill-current text-white" />
            )}
          </button>
        </div>
      </div>
      <nav
        className={`px-2 pt-2 pb-4 sm:p-0 items-center sm:flex ${
          isOpen ? " block" : " hidden"
        }`}
      >
        <Link href="/foto/toevoegen">
          <a
            onClick={closeMenu}
            className="block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
          >
            Uploaden
          </a>
        </Link>

        {!user ? (
          <React.Fragment>
            <Link href="/aanmelden">
              <a
                onClick={closeMenu}
                className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
              >
                Aanmelden
              </a>
            </Link>
            <Link href="/inloggen">
              <a
                onClick={closeMenu}
                className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
              >
                Inloggen
              </a>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="relative">
              <a
                onClick={notIconClick}
                className="relative block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
              >
                <IoNotificationsOutline className="text-2xl" />
              </a>
              <Notifications
                onClick={onNotClick}
                user={user}
                show={openNotifications}
              />
            </div>
            <Link href={`/fotograaf/${user.username}`}>
              <a
                onClick={closeMenu}
                className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
              >
                {user.username}
              </a>
            </Link>
            <Link href="/uitloggen">
              <a
                onClick={closeMenu}
                className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
              >
                Uitloggen
              </a>
            </Link>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
