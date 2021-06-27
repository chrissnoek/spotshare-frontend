import React, { useState, useEffect } from "react";
import UserProfilePicture from "../shared/UserProfilePicture";
import { IoIosCloseCircle } from "react-icons/io";
import graphQLFetch from "../../graphQLFetch";
import { useRouter } from "next/router";

const NotificationBoard = ({ user }) => {
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

  return (
    <>
      <div className="py-6" id="notifications">
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
};

export default NotificationBoard;

const Notification = ({ notification, onDeleteNotification }) => {
  const { giver, photo } = notification;
  const router = useRouter();

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
      router.push(`/foto/${photo.slug}`);
    }
    if (notification.action === "follow") {
      router.push(`/fotograaf/${giver.slug}`);
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
