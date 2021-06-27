import React, { useState, useEffect } from "react";
import UserProfilePicture from "../shared/UserProfilePicture.jsx";
import { IoIosCloseCircle } from "react-icons/io";
import graphQLFetch from "../../graphQLFetch.js";

const Notifications = ({ user, onClick, show }) => {
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    setNotifications(user.receivedNotifications);
  }, [user.receivedNotifications]);

  const deleteNotification = async (id) => {
    const oldNotifications = notifications;

    const _notifications = notifications.filter((notification) => {
      return notification.id != id;
    });

    setNotifications(_notifications);

    const query = `mutation deleteNotification($id:ID!){
        deleteNotification(input: { where: { id: $id } }) {
          notification {
            id
          }
        }
      }`;

    let vars = {};
    vars.id = id;

    const data = await graphQLFetch(query, vars, true);
    if (!data.deleteNotification.notification) {
      setNotifications(oldNotifications);
    }
  };

  if (!show) {
    return (
      <>
        {notifications && notifications.length > 0 && (
          <div className="rounded-full bg-red-500 text-white absolute top-0 -mt-1 right-0 -mr-1 text-xs w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {notifications && notifications.length > 0 && (
          <div className="rounded-full bg-red-500 text-white absolute top-0 -mt-1 right-0 -mr-1 text-xs w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </div>
        )}
        <div
          className="absolute bg-white rounded py-6 border z-20 right-0 shadow-lg"
          id="notifications"
        >
          <h1 className="text-black pl-6">Meldingen</h1>
          {notifications && !notifications.length > 0 ? (
            <div className="my-2 px-6 py-4">
              Er zijn geen notificaties voor je!
            </div>
          ) : (
            notifications &&
            notifications.map((notification) => {
              return (
                <Notification
                  onClick={onClick}
                  key={notification.id}
                  notification={notification}
                  onDeleteNotification={deleteNotification}
                />
              );
            })
          )}
        </div>
      </>
    );
  }
};

export default Notifications;

const Notification = ({ notification, onClick, onDeleteNotification }) => {
  const { giver, photo } = notification;

  const generateText = () => {
    if (notification.action === "like") {
      return `${
        !giver.firstame ? giver.username : giver.firstname
      } vind je foto ${photo.title} leuk`;
    }
    if (notification.action === "comment") {
      return `${
        !giver.firstame ? giver.username : giver.firstname
      } heeft gereageerd op je foto ${photo.title}`;
    }
    if (notification.action === "follow") {
      return `${
        !giver.firstame ? giver.username : giver.firstname
      } volgt je nu!`;
    }
  };

  const goToPage = () => {
    if (notification.action === "like" || notification.action === "comment") {
      onClick(`/foto/${photo.slug}`);
    }
    if (notification.action === "follow") {
      onClick(`/fotograaf/${giver.slug}`);
    }
  };

  const deleteNotification = (e) => {
    e.stopPropagation();
    onDeleteNotification(notification.id);
  };

  return (
    <>
      <div
        onClick={goToPage}
        className="flex items-center relative my-2 px-6 py-4 hover:bg-gray-100 cursor-pointer z-10"
      >
        <div className="mr-4">
          <UserProfilePicture profile={notification.giver} size={8} />
        </div>
        <div>{generateText()}</div>
        <div className="ml-auto" onClick={deleteNotification}>
          <IoIosCloseCircle className="text-gray-500 hover:text-gray-600 text-2xl" />{" "}
        </div>
      </div>
    </>
  );
};
