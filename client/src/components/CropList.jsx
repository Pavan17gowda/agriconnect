import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const CropList = () => {
  const [selectedSoilType, setSelectedSoilType] = useState("");
  const [cropsData, setCrops] = useState([]);
  const { soilList, getAllSoils } = useContext(GlobalContext);

  useEffect(() => {
    getAllSoils();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const encodedURI = encodeURIComponent(selectedSoilType);
      const response = await fetch(`/api/crops/getcrops?st=${encodedURI}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCrops(data);
      }
    } catch (error) {
      console.log("Error while fetching the crops");
    }
  };

  const handleSoilTypeChange = (event) => {
    setSelectedSoilType(event.target.value);
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Select Your Crop
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="soilType" className="font-medium text-gray-700">
              Soil Type
            </label>
            <select
              id="soilType"
              value={selectedSoilType}
              onChange={handleSoilTypeChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Soil Type</option>
              {soilList &&
                soilList.map((soil, index) => (
                  <option key={index} value={soil.soil_type}>
                    {soil.soil_type}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={selectedSoilType === ""}
            className={`px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition duration-300 ${
              selectedSoilType === "" && "opacity-50 cursor-not-allowed"
            }`}
          >
            Get List
          </button>
        </form>
      </div>

      {/* Crop List Section */}
      {cropsData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {cropsData.map((crop, index) => (
            <a
              key={index}
              href="#"
              className="bg-white p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col items-center">
                <img
                  src={crop.img_url}
                  alt={crop.crop_name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h5 className="text-xl font-semibold text-green-600 mb-2">
                  {crop.crop_name}
                </h5>
                <ul className="text-gray-600 text-sm">
                  <li>
                    <strong>Sowing Period:</strong> {crop.sowing_period}
                  </li>
                  <li>
                    <strong>Duration of Crop:</strong> {crop.duration_of_crop}
                  </li>
                  <li>
                    <strong>Harvesting Period:</strong> {crop.harvesting_period}
                  </li>
                </ul>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropList;
