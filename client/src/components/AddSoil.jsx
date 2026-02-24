import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSoil = ({ soil }) => {
  const [formData, setFormData] = useState({
    soil_type: soil ? soil.soil_type : "",
    crops_grown: soil ? soil.crops_grown : [], // Initialize as an array
  });
  const [allCrops, setAllCrops] = useState(soil.crops_grown); // Dynamic crops array
  const [newCrop, setNewCrop] = useState(""); // Input for adding a new crop
  const navigate = useNavigate();

  const handleForm = async (e) => {
    console.log(formData);
    console.log(soil);

    e.preventDefault();
    try {
      const res = await fetch(
        soil ? `/api/soils/soilupdate/${soil._id}` : "/api/soils/add",
        {
          method: soil ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log("Form submitted successfully", res);
      if (res.ok) {
        e.target.reset();
        navigate("/dashboard?tab=totalsoils");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const addNewCrop = async () => {
    if (newCrop.trim() !== "") {
      try {
        // Fetch the crop data from the server
        const response = await fetch(
          `/api/crops/getcrop?crop_name=${newCrop.trim()}`,
          {
            method: "GET",
          }
        );

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          // Handle non-200 responses (e.g., 404, 500, etc.)
          console.error(`Error fetching crops: ${response.statusText}`);
          return;
        }

        const data = await response.json();

        if (data.length > 0) {
          // If the crop exists in the database, use the existing crop's _id
          const newCropObj = {
            _id: data[0]._id, // Get the _id of the existing crop
            crop_name: newCrop.trim(),
          };
          setAllCrops([...allCrops, newCropObj]);
          setNewCrop(""); // Clear the input field
        } else {
          toast.error(
            "Crop doesn't exist in the database, add it separately in Add crop section."
          );
        }
      } catch (error) {
        console.error("Error occurred while adding crop:", error);
      }
    }
  };

  const deleteCrop = (cropId) => {
    setAllCrops(allCrops.filter((crop) => crop._id !== cropId));
    setFormData({
      ...formData,
      crops_grown: formData.crops_grown.filter((crop) => crop._id !== cropId),
    });
  };

  return (
    <>
      {!soil && (
        <h1 className="font-bold text-3xl mb-4 text-[#3b5a26]">Add Soil</h1>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        {/* Soil Type Input */}
        <label className="block">
          Soil Name:
          <input
            type="text"
            id="soil_type"
            value={formData.soil_type}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                soil_type: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        {/* Crops Grown Multi-Select */}
        <label className="block">
          Crops Grown:
          <select
            id="crops_grown"
            multiple
            value={formData.crops_grown.map((crop) => crop._id)}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions);
              const selectedCrops = selectedOptions.map((option) => ({
                _id: option.value,
                crop_name: option.text,
              }));
              setFormData({
                ...formData,
                crops_grown: selectedCrops,
              });
            }}
            className="block w-full border border-gray-300 rounded p-2 mt-1"
            required
          >
            {/* Dynamically populate options */}
            {allCrops.map((crop) => (
              <option key={crop._id} value={crop._id}>
                {crop.crop_name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl (or Cmd on Mac) to select multiple crops.
          </p>
        </label>

        {/* Add New Crop Input */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Add new crop"
            value={newCrop}
            onChange={(e) => setNewCrop(e.target.value)}
            className="flex-grow border border-gray-300 rounded p-2"
          />
          <button
            type="button"
            onClick={addNewCrop}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Crop
          </button>
        </div>

        {/* Crop List with Delete Option */}
        <div className="mt-4">
          <h2 className="font-bold text-lg">Crops Available:</h2>
          <ul className="space-y-2">
            {allCrops.map((crop) => (
              <li
                key={crop._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded shadow-md"
              >
                <span>{crop.crop_name}</span>
                <button
                  type="button"
                  onClick={() => deleteCrop(crop._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            formData.soil_type === "" || formData.crops_grown.length === 0
          }
          className={`w-full px-4 py-2 text-white rounded ${
            formData.soil_type === "" || formData.crops_grown.length === 0
              ? "bg-green-300"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {soil ? <h1>Update Soil</h1> : <h1>Add Soil</h1>}
        </button>
      </form>
    </>
  );
};

export default AddSoil;
