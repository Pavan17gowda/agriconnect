import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalContext } from "../context/GlobalState";
import { toast } from "react-toastify";

const MyActivities = () => {
  const {
    bookingsList,
    getBookingsByUser,
    calculateDistance,
    userLatitude,
    userLongitude,
    sendNotification,
  } = useContext(GlobalContext);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    getBookingsByUser();
  }, []);

  const acceptRequest = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCancel = async (bookingId) => {
    try {
      const res = await fetch(`/api/bookings/delete/${bookingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        getBookingsByUser();
        toast.success("Booking cancelled successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setPhoneNumber = async (mobile, userId) => {
    try {
      const res = await fetch(
        `/api/user/phoneupdate/${userId}?mobile=${mobile}`,
        { method: "PUT" }
      );
      if (res.ok) toast.success("Mobile number updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update mobile number.");
    }
  };

  const handleConfirm = async (booking) => {
    setIsModalOpen(false);

    if (!mobile && !booking.providerId.phone) {
      toast.error("Please provide a valid mobile number.");
      return;
    }

    if (!booking.providerId.phone) {
      await setPhoneNumber(mobile, booking.providerId._id);
    }

    try {
      const response = await fetch(`/api/bookings/accept/${booking._id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        // console.log(response);

        sendNotification(booking.requesterId._id, "accepted", booking);
        getBookingsByUser();
        toast.success("Booking accepted successfully!");
      }
    } catch (error) {
      toast.error("Failed to accept the booking.");
    }
  };

  const rejectRequest = async (booking) => {
    try {
      const response = await fetch(`/api/bookings/reject/${booking._id}`, {
        method: "PATCH",
      });
      if (response.ok) {
        // await sendNotification(booking.requesterId._id, "rejected", booking);
        getBookingsByUser();
        toast.success("Booking rejected successfully!");
      }
      // console.log(response.data);
    } catch (error) {
      console.error(
        "Error rejecting booking:",
        error.response?.data || error.message
      );
      toast.error("Failed to reject the booking.");
    }
  };

  return (
    <>
      <div className="flex flex-col content-center items-center ">
        <h1 className="font-bold text-green-500 text-2xl mb-10">
          Your Bookings
        </h1>
        {bookingsList.length === 0 && (
          <p className="text-center text-gray-500">
            You don't have any booking records
          </p>
        )}

        {bookingsList &&
          [...bookingsList]
            .sort((a, b) => (a.status === "pending" ? -1 : 1)) // Sort pending first
            .map((booking) => (
              <ul
                key={booking._id}
                className="w-full flex flex-col gap-6 p-6 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-xl shadow-xl hover:shadow-2xl transition-all sm:flex-row sm:items-center sm:justify-between"
              >
                {booking.requesterId._id === currentUser._id ||
                booking.providerId._id === currentUser._id ? (
                  <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full cursor-pointer border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
                    {/* Item Details */}
                    {booking.itemType === "Manure" && (
                      <div className="flex flex-col gap-4 sm:flex-1">
                        <h1 className="text-2xl font-semibold text-green-800">
                          {!booking.itemId
                            ? booking.itemSnapshot.manure_type
                            : booking.itemId.manure_type}
                        </h1>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Quantity:{" "}
                          </span>
                          {booking.requested_quantity}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-green-800">
                            Address:{" "}
                          </span>
                          {!booking.itemId
                            ? booking.itemSnapshot.address
                            : booking.itemId.address}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-green-800">
                            Distance:{" "}
                          </span>
                          {calculateDistance(
                            !booking.itemId
                              ? booking.itemSnapshot.manure_lat
                              : booking.itemId.manure_lat,
                            !booking.itemId
                              ? booking.itemSnapshot.manure_long
                              : booking.itemId.manure_long,
                            userLatitude,
                            userLongitude
                          )}
                          - km
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Status:{" "}
                          </span>
                          {booking.status}
                        </p>
                        {booking.status === "pending" &&
                          booking.requesterId._id === currentUser._id && (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
                              onClick={() => handleCancel(booking._id)}
                            >
                              Cancel Request
                            </button>
                          )}
                      </div>
                    )}

                    {booking.itemType === "NurseryCrop" && (
                      <div className="flex flex-col gap-4 sm:flex-1">
                        <h1 className="text-2xl font-semibold text-green-800">
                          {!booking.itemId
                            ? booking.itemSnapshot.name
                            : booking.itemId.name}
                        </h1>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Quantity:{" "}
                          </span>
                          {booking.requested_quantity}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Status:{" "}
                          </span>
                          {booking.status}
                        </p>
                        {booking.status === "pending" &&
                          booking.requesterId._id === currentUser._id && (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
                              onClick={() => handleCancel(booking._id)}
                            >
                              Cancel Request
                            </button>
                          )}
                      </div>
                    )}
                    {/* {console.log(booking)} */}

                    {booking.itemType === "Tractor" && (
                      <div className="flex flex-col gap-4 sm:flex-1">
                        <h1 className="text-2xl font-semibold text-green-800">
                          {/* {console.log(booking.itemId.tractorBrand)} */}

                          {booking.itemId.tractorBrand}
                        </h1>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Purpose:{" "}
                          </span>
                          {booking.purpose}
                        </p>
                        {booking.attachment && (
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-green-700">
                              Attachment:{" "}
                            </span>
                            {booking.attachment}
                          </p>
                        )}
                        {booking.acres !== 0 && (
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-green-700">
                              Land:{" "}
                            </span>
                            {booking.acres} acres
                          </p>
                        )}
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            On:
                          </span>{" "}
                          {(() => {
                            const date = new Date(booking.date);
                            const day = String(date.getDate()).padStart(2, "0");
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const year = date.getFullYear();
                            return `${day}-${month}-${year}`;
                          })()}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Cost Estimation:
                          </span>{" "}
                          {booking.cost}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-green-700">
                            Status:{" "}
                          </span>
                          {booking.status}
                        </p>
                        {booking.status === "pending" &&
                          booking.requesterId._id === currentUser._id && (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
                              onClick={() => handleCancel(booking._id)}
                            >
                              Cancel Request
                            </button>
                          )}
                      </div>
                    )}

                    {/* Provider Details */}
                    {booking.requesterId._id === currentUser._id &&
                    booking.status === "accepted" ? (
                      <p className="text-gray-700 border border-green-300 p-4 rounded-lg ">
                        Name: {booking.providerId.username} <br />
                        Email: {booking.providerId.email} <br />
                        Mobile Number: {booking.providerId.phone}
                      </p>
                    ) : (
                      ""
                    )}

                    {/* Action Buttons or Status */}
                    <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                      {booking.providerId._id === currentUser._id &&
                        booking.status === "pending" && (
                          <div className="flex gap-4">
                            <button
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105"
                              onClick={() => acceptRequest(booking)}
                            >
                              Accept
                            </button>

                            {/* Reject Button */}
                            <button
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105"
                              onClick={() => rejectRequest(booking)}
                            >
                              Reject
                            </button>
                            {isModalOpen && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                                  <h2 className="text-xl font-bold mb-4">
                                    Confirm Action
                                  </h2>
                                  <p className="mb-4 text-gray-700">
                                    <span>NOTE:</span>
                                    By accepting this request,
                                    <ul>
                                      <li>
                                        Your Mobile Number and email are shared
                                        with the requester for further
                                        comunication
                                      </li>
                                      <li>
                                        You cannot cancel this commitment , once
                                        confirmed
                                      </li>
                                    </ul>
                                    Do you want to continue?
                                  </p>
                                  {!booking.providerId.phone ? (
                                    <input
                                      type="number"
                                      placeholder="Enter the your mobile number"
                                      value={mobile}
                                      onChange={(e) =>
                                        setMobile(Number(e.target.value))
                                      }
                                      className="w-full p-2 border rounded mb-4"
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <div className="flex justify-end gap-4">
                                    <button
                                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
                                      onClick={handleCancel}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                                      onClick={() => handleConfirm(booking)}
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                </div>{" "}
                              </div>
                            )}
                          </div>
                        )}
                    </div>

                    {/* View Booking Button */}
                  </li>
                ) : (
                  <p className="text-center text-gray-500">
                    You don't have any booking records
                  </p>
                )}
              </ul>
            ))}
      </div>
    </>
  );
};

export default MyActivities;
