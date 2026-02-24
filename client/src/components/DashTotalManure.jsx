import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import AddManure from "./AddManure";

const DashTotalManure = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedManure, setSelectedManure] = useState(null); // Holds selected manure
  const [tab, setTab] = useState("dash"); // Default tab to 'dash'
  const [isEditing, setIsEditing] = useState(false);
  const { manureAdminList, getAllManures } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || null; // Default to 'dash' if no tab is found
    setTab(selectedTab);
  }, [location.search]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/manures/deletemanure/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      getAllManures();
    } catch (error) {
      console.log(error);
    }
  };

  const handleManureEdit = (item) => {
    setSelectedManure(item);
    setIsEditing(true);
  };
  const handleManureClick = (manure) => {
    setSelectedManure({ ...manure });
  };
  return (
    <div className="min-h-full">
      <div className="bg-white p-4 min-h-full min-w-full  rounded shadow-md">
        {isEditing && <AddManure manure={selectedManure} />}
        {selectedManure && !isEditing ? (
          <div className="manure-details">
            <h3 className="text-lg font-semibold">Manure Details</h3>
            <div className="flex space-x-4 justify-between">
              <div className="manure-text">
                <p>
                  <strong>Type:</strong> {selectedManure.manure_type}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedManure.quantity}
                </p>
                <p>
                  <strong>Description:</strong> {selectedManure.description}
                </p>
                <p>
                  <strong>Address:</strong> {selectedManure.address}
                </p>
                <p>
                  <strong>Owner:</strong> {selectedManure.posted_by.username}
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleManureEdit(selectedManure)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(selectedManure._id)}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setSelectedManure(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="manureimage">
                <img
                  src={selectedManure.manure_img}
                  alt={selectedManure.type}
                  className="w-60 h-40 mr-10 object-cover rounded border border-gray-300"
                />
              </div>
            </div>
          </div>
        ) : manureAdminList && !isEditing ? (
          <div className=" flex flex-col justify-center items-center ">
            <h1 className="\ p-3 text-green-500  font-bold rounded  mb-6">
              Total Manures available in database
            </h1>
            <ul className="manure-list space-y-2 min-w-full">
              {manureAdminList.length > 0 ? (
                manureAdminList.map((item) => (
                  <li className="p-4 flex justify-between min-w-full bg-green-100 rounded shadow cursor-pointer hover:bg-green-200">
                    <div
                      className="flex flex-col"
                      onClick={() => handleManureClick(item)}
                    >
                      <h4 className="font-bold">{item.manure_type}</h4>
                      <p>{item.quantity}-(tractor loads)</p>
                    </div>
                    <div className="flex justify-between gap-10">
                      {/* <Link
                  to="/dashboard?tab=addmanure"
                  state={{ manureId: item._id }}
                > */}
                      <button
                        className="flex items-center p-3 gap-2 w-20 bg-green-600 rounded hover:bg-green-700 text-white"
                        onClick={() => handleManureEdit(item)}
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
                <h1 className="flex content-center text-center items-center">
                  No manures available in database
                </h1>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashTotalManure;
