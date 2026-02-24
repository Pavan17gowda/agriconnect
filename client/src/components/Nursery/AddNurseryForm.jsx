import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalState";

const AddNurseryForm = ({ nursery }) => {
  console.log(nursery);

  const [name, setName] = useState(nursery ? nursery.name : "");
  const [place, setPlace] = useState(nursery ? nursery.place : "");
  const [ownerName, setOwnerName] = useState(nursery ? nursery.ownerName : "");
  const [mobile, setMobile] = useState(nursery ? nursery.mobile : "");
  const [plantTypes, setPlantTypes] = useState(
    nursery ? [...nursery.plantTypes] : []
  ); // State to track selected plant types
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { fetchNurseries } = useContext(GlobalContext);

  // Handler for checkbox changes
  const handlePlantTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlantTypes([...plantTypes, value]); // Add type if checked
    } else {
      setPlantTypes(plantTypes.filter((type) => type !== value)); // Remove type if unchecked
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the form data object
    const nurseryData = {
      user_id: currentUser._id,
      name,
      place,
      ownerName,
      mobile,
      plantTypes, // Include selected plant types
    };

    try {
      const response = await fetch(
        nursery ? `/api/nursery/${nursery._id}` : "/api/nursery/add-nursery",
        {
          method: nursery ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nurseryData),
        }
      );

      if (!response.ok) {
        toast.error("Failed to register nursery");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      fetchNurseries();
      nursery ? navigate(0) : navigate("/services?tab=nurseries");
      toast.success(` Nursery ${nursery ? "updated" : "added"} successfully`);
      // navigate("/services?tab=nurseries");

      // toast.success("Registered nursery successfully");
      console.log(
        ` Nursery ${nursery ? "updated" : "added"} successfully`,
        data
      );

      // Reset fields
      setName(nursery ? nursery.name : "");
      setPlace(nursery ? nursery.place : "");
      setOwnerName(nursery ? nursery.ownerName : "");
      setMobile(nursery ? nursery.mobile : "");
      setPlantTypes(nursery ? [...nursery.plantTypes] : []);
    } catch (error) {
      console.error("There was an error adding the nursery:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6  min-h-screen">
      <h1 className="text-2xl font-bold text-green-700">Nursery Management</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-md mx-auto lg:max-w-xl"
      >
        <h3 className="text-xl font-semibold text-green-700 text-center">
          Register Nursery
        </h3>
        <input
          type="text"
          placeholder="Nursery Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div>
          <p className="text-gray-700 font-medium mb-2">Type of Plants Sold:</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {["Indoor", "Outdoor", "Medicinal", "Flowering"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  checked={plantTypes.includes(type)}
                  onChange={handlePlantTypeChange}
                  className="mr-2 accent-green-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            {!nursery ? "Add Nursery" : "Update Nursery"}
          </button>
          <button
            type="button"
            onClick={() =>
              nursery ? navigate(0) : navigate("/services?tab=nurseries")
            }
            className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNurseryForm;
