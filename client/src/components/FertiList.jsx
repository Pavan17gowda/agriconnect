import React, { useState, useEffect } from "react";

const FertiList = () => {
  const [selectedOption1, setSelectedOption1] = useState("null");
  const [soilData, setSoilData] = useState("");
  // const [soilId , setSoilId] = useState("");

  const [selectedOption2, setSelectedOption2] = useState("null");
  const [cropsData, setCropsData] = useState([]);
  const [fertilizersData, setFertilizersData] = useState([]);

  useEffect(() => {
    soils();
  }, []);

  const soils = async () => {
    try {
      const res = await fetch("/api/soils/getsoils", {
        method: "GET",
      });
      const soilList = await res.json();
      if (res.ok) {
        setSoilData(soilList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdown1Change = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(event.target.value);
    try {
      // const encodedURI = encodeURIComponent(selectedOption1);
      console.log(selectedValue);

      const response = await fetch(
        `/api/crops/getcropsbysoilid/${selectedValue}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCropsData(data);
      }
    } catch (error) {
      console.log("Error while fetching the crops");
    }

    // Set options for the second dropdown based on selected soil type
    // setOptions2(soilOptions[selectedValue] || []);
    setSelectedOption2(""); // Reset the selected crop name when soil type changes
    setFertilizersData([]);
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(event.target.value);
    console.log(selectedOption2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(selectedOption1, selectedOption2);
      const fertilizers = await fetch(
        `/api/fertilizers/getfertilizer/?cid=${selectedOption2}&sid=${selectedOption1}`,
        {
          method: "get",
        }
      );
      const res = await fertilizers.json();
      setFertilizersData(res);
      if (fertilizers.ok) {
        console.log(fertilizersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-6  text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Fertilizer Recommendation
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="soilType" className="font-medium text-gray-700">
              Soil Type
            </label>
            <select
              id="soilType"
              value={selectedOption1}
              onChange={handleDropdown1Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {/* <option value="">Select Soil Type</option>
              <option value="Alluvial soil">Alluvial Soil</option>
              <option value="Black Soil">Black Soil</option>
              <option value="Red Soil">Red Soil</option>
              <option value="Loamy soil">Loamy soil</option>
              <option value="Sandy loam soil">Sandy loam soil</option>
              <option value="Clayey soil">Clayey soil</option> */}
              <option value="">Select Soil Type</option>
              {soilData &&
                soilData.map((soil, index) => (
                  <option key={index} value={soil._id}>
                    {soil.soil_type}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="cropName" className="font-medium text-gray-700">
              Crop Name
            </label>
            <select
              id="cropName"
              value={selectedOption2}
              onChange={handleDropdown2Change}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop Name</option>
              {cropsData.map((crop, index) => (
                <option key={index} value={crop._id}>
                  {crop.crop_name}
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

      {fertilizersData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {fertilizersData.map((fertilizer, index) => (
            <a
              key={index}
              href="#"
              className="bg-white p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col items-center">
                <img
                  src={fertilizer.img_url}
                  alt={fertilizer.fertilizer_name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h5 className="text-xl font-semibold text-green-600 mb-2">
                  {fertilizer.fertilizer_name}
                </h5>
                <ul className="text-gray-600 text-sm">
                  <li>
                    <strong>Application Rate:</strong>{" "}
                    {fertilizer.application_rate}
                  </li>
                  <li>
                    <strong>Physical Form:</strong> {fertilizer.physical_form}
                  </li>
                  <li>
                    <strong>Safety Condition:</strong>{" "}
                    {fertilizer.safety_caution}
                  </li>
                  <li>
                    <strong>Storage Condition:</strong>{" "}
                    {fertilizer.storage_condition}
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

export default FertiList;
