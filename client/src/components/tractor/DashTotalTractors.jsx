import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalState";
import AddTractor from "./AddTractor";

const DashTotalTractors = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTractor, setSelectedTractor] = useState(null);
  const [tab, setTab] = useState("dash");
  const [isEditing, setIsEditing] = useState(false);
  const { getTractors, tractors } = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || "dash";
    setTab(selectedTab);
  }, [location.search]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tractors/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      getTractors();
    } catch (error) {
      console.error("Error deleting tractor:", error);
    }
  };

  const handleTractorClick = (tractor) => {
    setSelectedTractor({ ...tractor });
  };

  return (
    <div className="min-h-full flex justify-center">
      <div className="bg-white p-6 w-full max-w-4xl rounded shadow-md">
        {console.log(selectedTractor)}

        {isEditing && <AddTractor tractor={selectedTractor} />}
        {selectedTractor && !isEditing ? (
          <div className="tractor-details">
            <h3 className="text-lg font-semibold text-green-600">
              Tractor Details
            </h3>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <div className="tractor-text">
                <p>
                  <strong>Tractor Brand:</strong> {selectedTractor.tractorBrand}
                </p>
                <p>
                  <strong>Engine Capacity:</strong>{" "}
                  {selectedTractor.engineCapacity}
                </p>
                <p>
                  <strong>Attachments Available:</strong>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTractor.attachments?.length > 0 ? (
                    selectedTractor.attachments.map((i, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"
                      >
                        {i}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No attachments</span>
                  )}
                </div>
                <p>
                  <strong>Owner:</strong>{" "}
                  {selectedTractor.userId?.username || "Unknown"}
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(selectedTractor._id)}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setSelectedTractor(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : tractors && !isEditing ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="p-3 text-green-500 font-bold rounded mb-6">
              Total Tractors Available
            </h1>
            <ul className="tractor-list space-y-4 w-full">
              {tractors.length > 0 ? (
                tractors.map((item) => (
                  <li
                    key={item._id}
                    className="p-4 flex flex-col md:flex-row justify-between items-center bg-green-100 rounded-lg shadow cursor-pointer hover:bg-green-200 transition"
                  >
                    <div
                      className="flex flex-col items-center md:items-start"
                      onClick={() => handleTractorClick(item)}
                    >
                      <h4 className="font-bold text-lg">{item.tractorBrand}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.attachments?.length > 0 ? (
                          item.attachments.map((i, index) => (
                            <span
                              key={index}
                              className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"
                            >
                              {i}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No attachments</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
                      <button
                        className="flex items-center justify-center p-3 gap-2 w-full md:w-20 bg-green-600 rounded-lg hover:bg-green-700 text-white transition-all duration-300 ease-in-out"
                        onClick={() => {
                          setSelectedTractor(item);
                          setIsEditing(true);
                        }}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        className="w-full md:w-20 bg-red-700 rounded-lg p-3 text-white hover:bg-red-800 transition-all duration-300 ease-in-out"
                        onClick={() => handleDelete(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <h1 className="text-center text-gray-500">
                  No tractors available in database
                </h1>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashTotalTractors;
