import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export default function Disease() {
  const [selectedCropName, setSelectedCropName] = useState("");
  const [diseasesData, setDiseasesData] = useState([]);
  const { cropList, getAllCrops } = useContext(GlobalContext);

  useEffect(() => {
    getAllCrops();
    console.log(cropList);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cropList);

    try {
      // console.log(selectedOption1, selectedOption2);
      const diseases = await fetch(
        `/api/diseases/cropdiseases/${selectedCropName}`,
        {
          method: "GET",
        }
      );
      const res = await diseases.json();
      setDiseasesData(res);
      if (diseases.ok) {
        console.log(diseasesData);
      }
    } catch (error) {
      console.log(error);
    }
    // Add your fetch logic here
  };

  const handleChange = (event) => {
    setSelectedCropName(event.target.value);
  };

  return (
    <div className="min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Disease Identification
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cropName" className="font-medium text-gray-700">
              Crop Name
            </label>
            <select
              id="cropName"
              value={selectedCropName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {/* <option value="">Select Crop</option>
              <option value="Apple">Apple</option>
              <option value="Barley">Barley</option>
              <option value="Cotton">Cotton</option>
              <option value="Chickpea">Chickpea</option>
              <option value="Chilli">Chilli</option>
              <option value="Cloves">Cloves</option>
              <option value="Coffee">Coffee</option>
              <option value="Ginger">Ginger</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Pearl Millet">Pearl Millet</option>
              <option value="Pepper">Pepper</option>
              <option value="Potato">Potato</option>
              <option value="Rice">Rice</option>
              <option value="Sesame">Sesame</option>
              <option value="Sorghum">Sorghum</option>
              <option value="Soyabean">Soyabean</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Tea">Tea</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Wheat">Wheat</option> */}
              <option value="">Select Crop Name</option>
              {cropList &&
                cropList.map((crop, index) => (
                  <option key={index} value={crop._id}>
                    {crop.crop_name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={selectedCropName === ""}
            className={`px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition duration-300 ${
              selectedCropName === "" && "opacity-50 cursor-not-allowed"
            }`}
          >
            Get List
          </button>
        </form>
      </div>

      {/* Conditional rendering for diseasesData */}
      {diseasesData.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-center text-green-600">
            Diseases List
          </h3>
          <ul className="space-y-6">
            {/* Filter unique diseases based on disease_name */}
            {[
              ...new Map(
                diseasesData.map((disease) => [
                  disease.disease_id.disease_name,
                  disease,
                ])
              ).values(),
            ].map((disease) => (
              <li
                key={disease.disease_id._id}
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-6">
                  {/* Disease Image */}
                  <img
                    src={disease.disease_id.imageURL}
                    alt={disease.disease_id.disease_name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-green-300"
                  />
                  <div>
                    {/* Disease Name */}
                    <h4 className="text-xl font-semibold text-green-700">
                      {disease.disease_id.disease_name}
                    </h4>
                    {/* Disease Description */}
                    <p className="text-gray-600 mt-2">
                      {disease.disease_id.description}
                    </p>
                    {/* Crop Name */}
                    <p className="mt-2 text-gray-700">
                      <span className="font-semibold">Crop:</span>{" "}
                      {disease.crop_id.crop_name}
                    </p>
                  </div>
                </div>
                {/* Disease Symptoms */}
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Symptoms:</span>{" "}
                    {disease.disease_id.symptoms}
                  </p>
                  {/* Transmission Mode */}
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-semibold">Transmission Mode:</span>{" "}
                    {disease.disease_id.transmission_mode}
                  </p>
                  {/* Prevalence Mode */}
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-semibold">Prevalence Mode:</span>{" "}
                    {disease.disease_id.prevalence_mode}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
