import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react"; // Using Lucide icons for a modern look
import { Link } from "react-router-dom";

const NotificationBell = () => {
  const { bookingsList } = useContext(GlobalContext);
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchNotifications(currentUser._id);
    }
  }, [currentUser?._id, bookingsList]);
  // Get pending bookings where current user is the provider
  const pendingRequests = bookingsList.filter(
    (booking) =>
      booking.providerId._id === currentUser._id && booking.status === "pending"
  );

  // utils/notificationUtils.js
  const fetchNotifications = async (userId) => {
    try {
      const response = await fetch(`/api/notifications/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const notification = await response.json();
      setNotifications(notification);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Ensure no <a> is nested inside <Link> or vice versa
  return (
    <div className="relative">
      <Link
        to="/dashboard?tab=myactivities"
        className="relative"
        aria-label="Notifications"
      >
        <span className="inline-flex items-center">
          <Bell className="w-7 h-7 text-gray-700 hover:text-green-600 cursor-pointer" />
          {pendingRequests.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
              {pendingRequests.length}
            </span>
          )}
        </span>
      </Link>
    </div>
  );
};

export default NotificationBell;
