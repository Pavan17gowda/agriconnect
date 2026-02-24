import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { toast } from "react-toastify";

const ManageTractors = () => {
  const {
    calculateDistance,
    userLatitude,
    userLongitude,
    tractorsByUser,
    getTractorsByUser,
  } = useContext(GlobalContext);
  // Toggle availability and update in the backend
  const toggleAvailability = async (id) => {
    // const updatedTractor = tractorsByUser.find((tractor) => tractor._id === id);
    // const newAvailability = !updatedTractor.available;

    try {
      const response = await fetch(`/api/tractors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getTractorsByUser();
      toast.success("Tractor availability updated successfully");
    } catch (error) {
      console.error("Error updating tractor availability:", error);
      toast.error("Failed to update tractor availability. Please try again.");
      alert("Failed to update tractor availability. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 text-center">
        Manage Tractors
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tractorsByUser.map((tractor) => (
          <li
            key={tractor._id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {tractor.tractorBrand}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Engine Capacity: {tractor.engineCapacity} HP
              </p>
              <p
                className={`mt-2 px-2 py-1 rounded-md text-sm font-medium ${
                  tractor.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tractor.available ? "Available" : "Unavailable"}
              </p>
              <button
                onClick={() => toggleAvailability(tractor._id)}
                className={`mt-4 px-4 py-2 text-white text-sm font-medium rounded-md transition-all ${
                  tractor.available
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {tractor.available ? "Mark Unavailable" : "Mark Available"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTractors;
