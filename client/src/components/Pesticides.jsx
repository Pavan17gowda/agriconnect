import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function Pesticides() {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [diseaseData, setDiseaseData] = useState([]);
  const [pesticidesData, setPesticidesData] = useState([]);
  // const { pesticideList, getAllPesticides } = useContext;
  const { cropList, getAllCrops } = useContext(GlobalContext);

  useEffect(() => {
    getAllCrops();
  }, []);

  const handleDropdown1Change = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(event.target.value);
    try {
      // const encodedURI = encodeURIComponent(selectedOption1);
      console.log(selectedValue);

      const response = await fetch(
        `/api/diseases/cropdiseases/${selectedValue}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setDiseaseData(data);
      }
    } catch (error) {
      console.log("Error while fetching the crops");
    }

    // Set options for the second dropdown based on selected soil type
    // setdiseaseData(soilOptions[selectedValue] || []);
    setSelectedOption2(""); // Reset the selected crop name when soil type changes
    setPesticidesData([]);
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(selectedOption1, selectedOption2);
      const pesticides = await fetch(
        `/api/pesticides/getpesticide/${selectedOption2}/${selectedOption1}`,
        {
          method: "GET",
        }
      );
      console.log(pesticides);

      const res = await pesticides.json();
      setPesticidesData(res);
      if (pesticides.ok) {
        console.log(pesticidesData);
      }
    } catch (error) {
      // console.log(error);
    }
    // Add your fetch logic here
  };

  return (
    <div className="min-h-screen p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Pesticide Identification
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="cropName" className="font-medium text-gray-700">
              Crop Name
            </label>
            <select
              id="cropName"
              value={selectedOption1}
              onChange={handleDropdown1Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop Name</option>
              {cropList &&
                cropList.map((crop, index) => (
                  <option key={index} value={crop._id}>
                    {crop.crop_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Second dropdown for disease name */}
          <div className="flex flex-col">
            <label htmlFor="diseaseName" className="font-medium text-gray-700">
              Disease Name
            </label>
            <select
              id="diseaseName"
              value={selectedOption2}
              onChange={handleDropdown2Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Disease Name</option>
              {[
                ...new Map(
                  diseaseData.map((disease) => [
                    disease.disease_id.disease_name, // Use disease_name as the key to get unique values
                    disease,
                  ])
                ).values(),
              ].map((disease, index) => (
                <option key={index} value={disease.disease_id._id}>
                  {disease.disease_id.disease_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={selectedOption1 === ""}
            className={`px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition duration-300 ${
              selectedOption1 === "" && "opacity-50 cursor-not-allowed"
            }`}
          >
            Get List
          </button>
        </form>
      </div>

      {/* Conditional rendering for pesticidesData */}
      {pesticidesData.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-green-100">
          <h3 className="text-2xl font-bold mb-6 text-green-600 text-center">
            Pesticides List
          </h3>
          <ul className="space-y-6">
            {pesticidesData.map((pesticide, index) => (
              <li
                key={pesticide.pesticide_id._id}
                className="p-6 bg-green-50 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center space-x-6 sm:flex sm:flex-row">
                  <img
                    src={pesticide.pesticide_id.imageURL}
                    alt={pesticide.pesticide_id.pesticide_name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-green-300"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-green-700">
                      {pesticide.pesticide_id.pesticide_name}
                    </h4>
                    <ul className="mt-2 space-y-2 text-gray-700">
                      <li>
                        <strong>Application Rate:</strong>{" "}
                        {pesticide.pesticide_id.application_rate}
                      </li>
                      <li>
                        <strong>Safety Caution:</strong>{" "}
                        {pesticide.pesticide_id.safety_caution}
                      </li>
                      <li>
                        <strong>Target Pest:</strong>{" "}
                        {pesticide.pesticide_id.target_pest}
                      </li>
                    </ul>
                  </div>
                </div>
                <hr className="mt-4 border-t-2 border-green-100" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
