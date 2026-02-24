import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalState";
// import AddTractor from "./AddTractor";
import AddNurseryForm from "./AddNurseryForm";
import { toast } from "react-toastify";

const DashTotalNursery = () => {
  //   console.log("DashTotalNursery");

  const { currentUser } = useSelector((state) => state.user);
  const [selectedNursery, setselectedNursery] = useState(null);
  const [tab, setTab] = useState("dash");
  const [isEditing, setIsEditing] = useState(false);
  const { nurseries, fetchNurseries } = useContext(GlobalContext);
  const location = useLocation();

  console.log(nurseries);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || "dash";
    setTab(selectedTab);
  }, [location.search]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/nursery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchNurseries();
      toast.success("Nursery deleted successfully");
    } catch (error) {
      console.error("Error deleting tractor:", error);
    }
  };

  const handleNurseryClick = (nursery) => {
    setselectedNursery({ ...nursery });
  };

  return (
    <div className="min-h-full flex justify-center">
      <div className="bg-white p-6 w-full max-w-4xl rounded shadow-md">
        {console.log(selectedNursery)}

        {isEditing && <AddNurseryForm nursery={selectedNursery} />}
        {selectedNursery && !isEditing ? (
          <div className="tractor-details">
            <h3 className="text-lg font-semibold text-green-600">
              Nursery Details
            </h3>
            <div className="flex flex-col md:flex-row justify-between mt-4">
              <div className="tractor-text">
                <p>
                  <strong>Nursery Name:</strong> {selectedNursery.name}
                </p>
                <p>
                  <strong>Place:</strong> {selectedNursery.place}
                </p>
                <p className="flex flex-row gap-2 content-center items-center">
                  <strong>Plant types:</strong>
                  <div className="flex flex-row gap-2 mt-2">
                    {selectedNursery.plantTypes?.length > 0 ? (
                      selectedNursery.plantTypes.map((i, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
                        >
                          {i}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No attachments</span>
                    )}
                  </div>
                </p>

                <p>
                  <strong>Owner:</strong>{" "}
                  {selectedNursery.ownerName || "Unknown"}
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
                    onClick={() => handleDelete(selectedNursery._id)}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setselectedNursery(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : nurseries && !isEditing ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="p-3 text-green-500 font-bold rounded mb-6">
              Total Nurseries Available
            </h1>
            <ul className="tractor-list space-y-4 w-full">
              {nurseries.length > 0 ? (
                nurseries.map((item) => (
                  <li
                    key={item._id}
                    className="p-4 flex flex-col md:flex-row justify-between items-center bg-green-100 rounded-lg shadow cursor-pointer hover:bg-green-200 transition"
                  >
                    <div
                      className="flex flex-col items-center md:items-start"
                      onClick={() => handleNurseryClick(item)}
                    >
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.plantTypes?.length > 0 ? (
                          item.plantTypes.map((i, index) => (
                            <span
                              key={index}
                              className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm"
                            >
                              {i}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No attachments</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <button
                        className="flex items-center p-3 gap-2 w-20 bg-green-600 rounded hover:bg-green-700 text-white"
                        onClick={() => {
                          setselectedNursery(item);
                          setIsEditing(true);
                        }}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        className="bg-red-700 rounded p-3 text-white hover:bg-red-800 transition"
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

export default DashTotalNursery;
