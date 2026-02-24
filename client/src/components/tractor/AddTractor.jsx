import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";

const AddTractor = ({ tractor }) => {
  console.log(tractor);

  const { calculateDistance, userLatitude, userLongitude } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tractorBrand: tractor ? tractor.tractorBrand : "",
    modelNumber: tractor ? tractor.modelNumber : "",
    registrationNumber: tractor ? tractor.registrationNumber : "",
    engineCapacity: tractor ? tractor.engineCapacity : "",
    fuelType: tractor ? tractor.fuelType : "",
    tractor_long: userLongitude,
    tractor_lat: userLatitude,
    attachments: tractor ? [...tractor.attachments] : [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        tractor ? `/api/tractors/${tractor._id}` : `api/tractors/addtractor`,
        {
          method: tractor ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success(` Tractor ${tractor ? "updated" : "added"} successfully`);

        // Optionally reset form data or navigate to another page
      } else {
        toast.error(data.message || "Failed to register tractor");
      }
    } catch (error) {
      console.error("Error registering tractor:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        className="w-full min-w-full bg-white rounded-xl shadow-xl p-8 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Form Header */}
        <div className="flex flex-row items-center content-between  gap-4">
          <h2 className="text-1xl md:text-3xl font-bold text-center text-green-700">
            🚜 Tractor Registration
          </h2>
          <button
            type="button"
            onClick={() =>
              tractor ? navigate(0) : navigate("/services?tab=tractors")
            }
            className="hidden sm:block bg-gradient-to-r from-gray-500 to-gray-600 
             hover:from-gray-600 hover:to-gray-700 text-white 
             font-semibold text-lg py-2 px-4 rounded-full 
             shadow-lg transition-all duration-300 w-auto"
          >
            Go Back
          </button>
        </div>

        {/* Input Fields */}
        {[
          {
            label: "Tractor Brand",
            name: "tractorBrand",
            type: "text",
          },
          { label: "Model Number", name: "modelNumber", type: "text" },
          {
            label: "Registration Number",
            name: "registrationNumber",
            type: "text",
          },
          {
            label: "Engine Capacity (HP)",
            name: "engineCapacity",
            type: "number",
          },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {console.log(formData)}

            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        ))}

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fuel Type
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="" disabled>
              Select fuel type
            </option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments Available
          </label>
          <div className="mt-2 space-y-2">
            {["Plough", "Harrow", "Rotavator", "Cultivator"].map(
              (attachment) => (
                <div key={attachment} className="flex items-center">
                  <input
                    type="checkbox"
                    id={attachment}
                    value={attachment}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        attachments: checked
                          ? [...prev.attachments, value]
                          : prev.attachments.filter((item) => item !== value),
                      }));
                    }}
                    checked={formData.attachments.includes(attachment)}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded"
                  />
                  <label htmlFor={attachment} className="ml-3 text-sm">
                    {attachment}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            {tractor ? "🚜 Update Tractor" : "🚜 Register Tractor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTractor;
