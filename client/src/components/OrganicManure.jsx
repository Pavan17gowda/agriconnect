import React, { useContext, useState } from "react";
import AddManure from "./AddManure";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { GlobalContext } from "../context/GlobalState";
import EditIcon from "@mui/icons-material/Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function OrganicManure() {
  const {
    calculateDistance,
    userLatitude,
    userLongitude,
    manureAdminList,
    getAllManures,
    sendNotification,
  } = useContext(GlobalContext);
  const [viewType, setViewType] = useState(true);
  const [btn, setBtn] = useState("search");
  const [display, setDisplay] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [selectedManure, setSelectedManure] = useState(null); // Holds selected manure

  const [newQuantity, setNewQuantity] = useState(0);
  const [displaySort, setDisplaySort] = useState(false);
  const [filter, setFilter] = useState({
    type: "",
    minQuantity: 0,
    maxDistance: 0,
  });
  const [sorting, setSorting] = useState({
    field: null,
    order: "asc",
  });
  const [selectedManure, setSelectedManure] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Filtering logic remains the same
  const filteredManureList = manureAdminList.filter((manure) => {
    const matchesType = filter.type
      ? manure.manure_type.toLowerCase().includes(filter.type.toLowerCase())
      : true;

    const matchesQuantity = manure.quantity >= filter.minQuantity;

    const matchesDistance =
      filter.maxDistance > 0
        ? calculateDistance(
            userLatitude,
            userLongitude,
            manure.manure_lat,
            manure.manure_long
          ) <= filter.maxDistance
        : true;

    return matchesType && matchesQuantity && matchesDistance;
  });

  // Sorting function
  const sortManureList = (list) => {
    if (!sorting.field) return list;

    return [...list].sort((a, b) => {
      let valA, valB;
      switch (sorting.field) {
        case "type":
          valA = a.manure_type;
          valB = b.manure_type;
          return sorting.order === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);

        case "distance":
          valA = calculateDistance(
            userLatitude,
            userLongitude,
            a.manure_lat,
            a.manure_long
          );
          valB = calculateDistance(
            userLatitude,
            userLongitude,
            b.manure_lat,
            b.manure_long
          );
          return sorting.order === "asc" ? valA - valB : valB - valA;

        case "quantity":
          return sorting.order === "asc"
            ? a.quantity - b.quantity
            : b.quantity - a.quantity;

        case "cost":
          return sorting.order === "asc"
            ? a.cost_per_kg - b.cost_per_kg
            : b.cost_per_kg - a.cost_per_kg;

        default:
          return 0;
      }
    });
  };

  // Sort the filtered list
  const sortedManureList = sortManureList(filteredManureList);

  // Sorting handler
  const handleSort = (field) => {
    setSorting((prev) => ({
      field: field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  // Rest of the existing component logic remains the same...
  const handleRequest = (manure) => {
    setSelectedManure(manure);
    setIsEditing(true);
    setViewType(false);
    // setDisplay(true);
  };
  const handleSendRequest = (manure) => {
    setSelectedManure(manure);
    setDisplay(true);
    // setViewType(false);
    // setDisplay(true);
  };

  const handleCancel = () => {
    setDisplay(false);
  };

  const handleBooking = async () => {
    const bookingData = {
      itemId: selectedManure._id,
      itemType: "Manure",
      requesterId: currentUser?._id, // Using optional chaining
      providerId: selectedManure?.posted_by?._id, // Avoid crash if undefined
      quantity: newQuantity,
    };

    try {
      const res = await fetch("/api/bookings/new-booking", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const responseData = await res.json(); // Read server response
      console.log(responseData);

      if (res.ok) {
        // await sendNotification(booking.requesterId, "pending", responseData);
        toast.success(
          `Request sent to the provider of ${selectedManure.manure_type}. Check the status in the "My Activities" section in the dashboard.`
        );
        navigate("/dashboard?tab=myactivities");
        setDisplay(false);
      } else {
        throw new Error(responseData?.message || "Failed to send request"); // Use server error message
      }
    } catch (error) {
      console.error("Booking error:", error.message);
      toast.error(error.message || "Failed to request manure");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Organic Manure</h1>

      {/* {viewType === "add" && (
        <Link to="/services?tab=addmanure">
          <AddManure />
        </Link>
      )} */}
      {isEditing && <AddManure manure={selectedManure} />}

      {viewType && (
        <div className="bg-white p-2 min-w-full rounded shadow-md">
          {/* Sorting Headers */}
          <div className="flex content-between items-center">
            <Link to="/dashboard?tab=addmanure">
              <button
                className="bg-green-600 text-white p-2 rounded mb-6"
                // onClick={() => {
                //   console.log("yes i am");
                // }}
              >
                Add Manure
              </button>
            </Link>

            <div className="flex gap-4  ml-6 items-center mb-6">
              <span className="text-sm sm:text-base font-medium text-gray-700">
                Sort By:
              </span>
              {/* Dropdown for sorting options */}
              <div className="relative">
                <button
                  className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                  aria-haspopup="true"
                  aria-expanded={display ? "true" : "false"} // Toggles the dropdown visibility
                  onClick={() => setDisplaySort(!displaySort)} // Toggles display state on button click
                >
                  <span>
                    {sorting.field
                      ? sorting.field.charAt(0).toUpperCase() +
                        sorting.field.slice(1)
                      : "Select Option"}
                  </span>
                  <FontAwesomeIcon icon={faSort} size="sm" className="ml-2" />
                </button>

                {/* Dropdown Menu */}
                {displaySort && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg">
                    {[
                      { label: "Type", field: "type" },
                      { label: "Distance", field: "distance" },
                      { label: "Quantity", field: "quantity" },
                      { label: "Cost per kg", field: "cost" },
                    ].map(({ label, field }) => (
                      <button
                        key={field}
                        onClick={() => handleSort(field)} // Calls the sorting function
                        className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:bg-green-100 focus:outline-none transition-all"
                      >
                        <span>{label}</span>
                        {sorting.field === field ? (
                          sorting.order === "asc" ? (
                            <FontAwesomeIcon icon={faSortUp} size="sm" />
                          ) : (
                            <FontAwesomeIcon icon={faSortDown} size="sm" />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faSort} size="sm" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedManureList.map((manure) => (
              <li
                key={manure._id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <img
                  src={manure.manure_img}
                  alt={manure.type}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  {manure.manure_type}
                </h3>
                <p className="text-sm text-gray-500">
                  Quantity: {manure.quantity} kg
                </p>
                <p className="text-sm text-gray-500">
                  Distance:{" "}
                  {calculateDistance(
                    userLatitude,
                    userLongitude,
                    manure.manure_lat,
                    manure.manure_long
                  )}{" "}
                  km
                </p>
                <p className="text-sm text-gray-500">
                  Cost: ₹{manure.cost_per_kg} per kg
                </p>
                <p>
                  <strong>Description:</strong> {manure.description}
                </p>
                <div className="flex space-x-2 mt-4">
                  {/* Check if the current user is not the one who posted the manure */}
                  {currentUser._id !== manure.posted_by._id ? (
                    manure.quantity === 0 ? (
                      <p className="text-red-600 font-semibold">Out of stock</p>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSendRequest(manure)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          {/* <RequestPageIcon /> */}
                          <FontAwesomeIcon icon={faPaperPlane} /> Request
                        </button>
                        {display && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                              <h2 className="text-xl font-bold mb-4">
                                Enter Required Quantity
                              </h2>
                              <input
                                type="number"
                                placeholder="Enter the quantity of manure required"
                                value={newQuantity}
                                onChange={(e) =>
                                  setNewQuantity(Number(e.target.value))
                                }
                                className="w-full p-2 border rounded mb-4"
                              />
                              <p className="mb-4">
                                Total Cost: ₹{newQuantity * manure.cost_per_kg}
                              </p>
                              <div className="flex justify-end gap-4">
                                <button
                                  onClick={handleBooking}
                                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )
                  ) : (
                    <button
                      onClick={() => handleRequest(manure)}
                      className="flex items-center justify-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300"
                    >
                      <EditIcon className="w-4 h-4" />
                      <span className="font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrganicManure;
