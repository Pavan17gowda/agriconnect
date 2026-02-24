import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { toast } from "react-toastify";
import AddNurseryForm from "./AddNurseryForm";

const DashNursery = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedNursery, setselectedNursery] = useState(null); // Holds selected manure
  const [tab, setTab] = useState("dash"); // Default tab to 'dash'
  const [isEditing, setIsEditing] = useState(false);
  const { nurseriesByUser, fetchNuseriesByUser } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || null; // Default to 'dash' if no tab is found
    setTab(selectedTab);
  }, [location.search]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/nursery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchNuseriesByUser();
      toast.success("Nursery deleted successfully");
    } catch (error) {
      console.error("Error deleting tractor:", error);
    }
  };

  const handleNurseryEdit = (item) => {
    setselectedNursery(item);
    setIsEditing(true);
  };
  const handleNurseryClick = (nursery) => {
    setselectedNursery({ ...nursery });
  };
  return (
    <div className="min-h-full">
      <div className="bg-white p-4 min-h-full min-w-full  rounded shadow-md">
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
        ) : nurseriesByUser && !isEditing ? (
          <div className="flex-col justify-center items-center">
            <h1 className="bg-yellow-500 p-3 text-white font-bold rounded w-60 mb-6">
              Nurseris registered by you
            </h1>
            <ul className="manure-list space-y-2">
              {nurseriesByUser.length > 0 ? (
                nurseriesByUser.map((item) => (
                  <li className="p-4 flex justify-between bg-green-100 rounded shadow cursor-pointer hover:bg-green-200">
                    <div
                      className="flex flex-col"
                      onClick={() => handleNurseryClick(item)}
                    >
                      <h4 className="font-bold">{item.name}</h4>
                      {/* <p>{item.quantity}-(tractor loads)</p> */}
                      <p className="flex flex-row gap-2 content-center items-center">
                        <strong>Plant types:</strong>
                        <div className="flex flex-row gap-2 mt-2">
                          {item.plantTypes?.length > 0 ? (
                            item.plantTypes.map((i, index) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
                              >
                                {i}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">
                              No information available
                            </span>
                          )}
                        </div>
                      </p>
                    </div>
                    <div className="flex justify-between gap-10">
                      <button
                        className="flex items-center p-3 gap-2 w-20 bg-green-600 rounded hover:bg-green-700 text-white"
                        onClick={() => handleNurseryEdit(item)}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      {/* </Link> */}
                      <button
                        className="bg-red-700 rounded p-3 text-white"
                        onClick={() => handleDelete(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <h1 className="flex content-center text-center">
                  You have not registered any nurseries
                </h1>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashNursery;
