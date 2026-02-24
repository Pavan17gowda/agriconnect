import React, { useEffect, useState } from "react";
import ManureData from "../data/ManureData";

const SearchManure = () => {
  const [sortType, setSortType] = useState("type");
  const [selectedManure, setSelectedManure] = useState(null); // Holds selected manure
  const [manureList, setManureList] = useState(null); // Manure list

  useEffect(() => {
    getManures();
  }, []);

  const getManures = async () => {
    try {
      const res = await fetch("/api/manures/getmanures", {
        method: "GET",
      });
      const manures = res.json();
      if (res.ok) {
        setManureList(manures);
        console.log(manures);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    setSortType(sortBy);

    const sortedList = [...manureList].sort((a, b) => {
      if (sortBy === "type") return a.type.localeCompare(b.type);
      if (sortBy === "quantity")
        return parseInt(a.quantity) - parseInt(b.quantity);
      if (sortBy === "distance") {
        const distA = calculateDistance(
          searchLocation.lat,
          searchLocation.long,
          a.lat,
          a.long
        );
        const distB = calculateDistance(
          searchLocation.lat,
          searchLocation.long,
          b.lat,
          b.long
        );
        return distA - distB;
      }
      return 0;
    });

    setManureList(sortedList);
  };

  const [searchLocation, setSearchLocation] = useState({
    lat: 28.7041,
    long: 77.1025,
  });

  const calculateDistance = (lat1, long1, lat2, long2) => {
    // Use a real API for distance calculation
    return (
      Math.sqrt((lat1 - lat2) ** 2 + (long1 - long2) ** 2).toFixed(2) + " km"
    );
  };

  const handleManureClick = (manure) => {
    const distance = calculateDistance(
      searchLocation.lat,
      searchLocation.long,
      manure.lat,
      manure.long
    );
    setSelectedManure({ ...manure, distance });
  };

  const handleRequest = (manure) => {
    alert(`Request sent to the provider of ${manure.type}`);
  };

  return (
    <>
      <div className="bg-white p-4 min-w-full rounded shadow-md">
        <div className="mb-4">
          <label className="block">
            Sort by:
            <select
              value={sortType}
              onChange={handleSort}
              className="block w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="type">Manure Type</option>
              <option value="quantity">Quantity</option>
              <option value="distance">Distance</option>
            </select>
          </label>
        </div>

        {/* List of available manure */}
        {selectedManure ? (
          <div className="manure-details">
            <h3 className="text-lg font-semibold">Manure Details</h3>
            <div className="flex space-x-4">
              <div className="manure-text">
                <p>
                  <strong>Type:</strong> {selectedManure.type}
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
                  <strong>Distance:</strong> {selectedManure.distance}
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleRequest(selectedManure)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Request Manure
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
                  src={selectedManure.image}
                  alt={selectedManure.type}
                  className="w-40 h-40 object-cover rounded border border-gray-300"
                />
              </div>
            </div>
          </div>
        ) : (
          <ul className="manure-list space-y-2">
            {manureList &&
              manureList.map((manure, index) => (
                <li
                  key={index}
                  onClick={() => handleManureClick(manure)}
                  className="p-4 bg-green-100 rounded shadow cursor-pointer hover:bg-green-200"
                >
                  <h4 className="font-bold">{manure.type}</h4>
                  <p>
                    {manure.quantity} - {manure.description}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchManure;
