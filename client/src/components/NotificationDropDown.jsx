import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react"; // Using Lucide icons for a modern look
// import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// import fetchNotifications from "./utils/notificationUtils"; // Assuming the function to fetch notifications is available

const NotificationDropdown = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { currentUser, error, loading } = useSelector((state) => state.user);

  // Fetch notifications when the dropdown is opened
  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = async (userId) => {
        try {
          const response = await fetch(`/api/notifications/${currentUser._id}`);

          if (!response.ok) {
            throw new Error("Failed to fetch notifications");
          }

          const notification = await response.json();
          // return notifications; // Return the notifications array
          setNotifications(notification);
        } catch (error) {
          console.error("Error fetching notifications:", error);
          // return []; // Return an empty array in case of error
        }
      };
      fetchNotifications();
    }
  }, [isOpen, userId]);

  return (
    <div className="relative">
      <Link
        to="/dashboard?tab=myactivities"
        className="relative"
        onClick={() => setIsOpen((prevState) => !prevState)} // Toggle the dropdown
      >
        <Bell className="w-7 h-7 text-gray-700 hover:text-green-600 cursor-pointer" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            {notifications.length}
          </span>
        )}
      </Link>

      {/* Dropdown for Notifications */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
          <div className="p-2 max-h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold p-2">Notifications</h3>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-2 border-b border-gray-200"
                >
                  <p className="text-sm text-gray-700">
                    {notification.message}
                  </p>
                  <small className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
