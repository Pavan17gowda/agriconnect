import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AddNurseryForm from "./AddNurseryForm";
import NurseryCropList from "./NurseryCropList";
import NurseryList from "./Nurserylist";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalState";
const NurseryManagement = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { nurseries, fetchNurseries } = useContext(GlobalContext);
  const [selectedNursery, setSelectedNursery] = useState(null);
  const [view, setView] = useState("list"); // 'list', 'register', 'manage'
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchNurseries();
  }, [selectedNursery]);

  const deleteNursery = async (id) => {
    try {
      const res = await fetch(`api/nursery/${id}`, { method: "DELETE" });
      if (res.ok) {
        navigate("/services?tab=nurseries");
        toast.success(
          `Nursery ${selectedNursery} has been deleted successfully`
        );
      }
      setSelectedNursery(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCrop = (nurseryId, crop) => {
    const updatedNurseries = nurseries.map((nursery) => {
      if (nursery.id === nurseryId) {
        return {
          ...nursery,
          crops: [...(nursery.crops || []), crop],
        };
      }
      return nursery;
    });
    // setNurseries(updatedNurseries);
  };

  // Filter nurseries for the current user
  const userNurseries = nurseries.filter(
    (nursery) => nursery.user_id === currentUser._id
  );

  return (
    <div className="flex flex-col gap-6 p-6  min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">
          Nursery Management
        </h1>
        <div className="flex gap-4">
          <Link to="/dashboard?tab=addnursery">
            <button
              // onClick={() => setView("register")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Nursery Register
            </button>
          </Link>
          <button
            onClick={() => setView("manage")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Manage Your Nurseries
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        {view === "list" && (
          <NurseryList
            nurseries={userNurseries}
            onSelect={setSelectedNursery}
            onDelete={deleteNursery}
          />
        )}
        {view === "register" && <AddNurseryForm onAdd={addNursery} />}
        {view === "manage" && (
          <div>
            {selectedNursery ? (
              <NurseryCropList nursery={selectedNursery} />
            ) : userNurseries.length > 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600 text-center mb-4 text-lg font-semibold">
                  Select a nursery to manage crops.
                </p>
                {userNurseries.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No nurseries available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userNurseries.map((nursery) => (
                      <div
                        key={nursery._id}
                        className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-200"
                      >
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          {nursery.name}
                        </h3>
                        <p className="text-gray-700 mb-2">
                          <strong>Location:</strong> {nursery.place}
                        </p>
                        <div className="flex gap-4 mt-4">
                          <button
                            onClick={() => {
                              setSelectedNursery(nursery);
                              // navigate("/services?tab=nurseries");
                              console.log(nursery);
                            }}
                            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
                          >
                            Manage Crops
                          </button>
                          <button
                            onClick={() => {
                              // Add delete functionality here
                              // setSelectedNursery(nursery);
                              deleteNursery(nursery._id);
                              navigate("/services?tab=nurseries");
                              console.log(`Deleting nursery: ${nursery.name}`);
                            }}
                            className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No nurseries available for the current user.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseryManagement;
