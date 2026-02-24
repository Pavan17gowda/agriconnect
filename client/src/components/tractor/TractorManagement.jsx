import { useState, useEffect, useContext } from "react";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../context/GlobalState";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TractorManagement = ({ userId }) => {
  const [availableTractors, setAvailableTractors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTractor, setSelectedTractor] = useState(null);
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [acres, setAcres] = useState(0);
  const [cost, setCost] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const { calculateDistance, userLatitude, userLongitude, sendNotification } =
    useContext(GlobalContext);

  const attachmentCostsPerAcre = {
    Plough: 500,
    Harrow: 400,
    Rotavator: 700,
    Cultivator: 600,
  };
  console.log(availableTractors);
  const navigate = useNavigate();

  useEffect(() => {
    getTractors();
  }, []);

  const getTractors = async () => {
    try {
      const res = await fetch("/api/tractors/", { method: "GET" });
      const tractors = await res.json();
      if (res.ok) {
        setAvailableTractors(tractors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingClick = (tractor) => {
    setSelectedTractor(tractor);
    setIsBookingModalOpen(true);
  };

  const handleBooking = async () => {
    console.log(selectedTractor);

    const bookingDetails = {
      itemId: selectedTractor._id,
      itemType: "Tractor",
      requesterId: currentUser._id,
      providerId: selectedTractor.userId._id,
      date,
      purpose,
      attachment,
      acres,
      cost: purpose === "Load Transport" ? "Spot Decision" : cost,
    };
    console.log("Booking Details:", bookingDetails);
    // Call API to save booking details
    try {
      const res = await fetch("/api/bookings/tractorbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });
      console.log(res);

      if (res.ok) {
        await sendNotification(booking.requesterId._id, "pending", booking);
        toast.success(
          `Check your bookings for status at "My Activities in Dashboard"`
        );
        navigate("/dashboard?tab=myactivities");
        console.log("Booking successful");
      }
    } catch (error) {
      console.log(error);
    }
    setIsBookingModalOpen(false);
  };

  const calculateCost = () => {
    if (purpose === "Load Transport") {
      setCost("Cost will be decided on spot");
    } else if (attachment && acres > 0) {
      setCost((attachmentCostsPerAcre[attachment] || 0) * acres);
    } else {
      setCost(0);
    }
  };

  useEffect(() => {
    calculateCost();
  }, [purpose, attachment, acres]);

  return (
    <div className=" min-h-full p-4">
      {/* <div className="flex items-center justify-center min-h-[50vh]"> */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
        Tractor Management
      </h2>
      {/* </div> */}

      <div>
        {/* Check if the user is adding a tractor */}
        {!isAdding ? (
          <div>
            {/* Add Tractor Button */}
            <div className="mb-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <Link to="/dashboard?tab=addtractor">
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-green-300 transition-all">
                  Add Tractor
                </button>
              </Link>
              <Link to="/dashboard?tab=managetractor">
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-green-300 transition-all">
                  Manage your Tractor
                </button>
              </Link>
            </div>

            {/* List of Available Tractors */}
            <div className="py-6">
              {availableTractors?.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTractors.map((tractor) =>
                    tractor.available ? (
                      <li
                        key={tractor._id}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <AgricultureIcon className="text-green-500 w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {tractor.tractorBrand}
                          </h3>
                          <p className="text-sm text-gray-600 mt-2">
                            Engine Capacity:{" "}
                            <span className="font-medium">
                              {tractor.engineCapacity} HP
                            </span>
                          </p>
                          <p>
                            {calculateDistance(
                              userLatitude,
                              userLongitude,
                              tractor.tractor_lat,
                              tractor.tractor_long
                            )}{" "}
                            km away
                          </p>
                          {/* Booking Button */}
                          {!(tractor.userId._id === currentUser._id) && (
                            <button
                              onClick={() => handleBookingClick(tractor)}
                              className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-green-300 transition-all"
                            >
                              Book Now
                            </button>
                          )}
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              ) : (
                <p className="text-gray-600">
                  No tractors available at the moment.
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Render AddTractor Form */
          <div>Add Tractor Form Here</div>
        )}

        {/* Booking Modal */}
        {isBookingModalOpen && selectedTractor && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Book Tractor</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When do you need the tractor?
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mb-4 p-2 border rounded-md"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full mb-4 p-2 border rounded-md"
              >
                <option value="">Select Purpose</option>
                <option value="Ploughing">Ploughing</option>
                <option value="Load Transport">Load Transport</option>
              </select>

              {purpose === "Ploughing" && (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What type of attachment do you need?
                  </label>
                  <select
                    value={attachment}
                    onChange={(e) => setAttachment(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-md"
                  >
                    <option value="">Select Attachment</option>
                    <option value="Plough">Plough</option>
                    <option value="Harrow">Harrow</option>
                    <option value="Rotavator">Rotavator</option>
                    <option value="Cultivator">Cultivator</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many acres of land to plow?
                  </label>
                  <input
                    type="number"
                    value={acres}
                    onChange={(e) => setAcres(parseInt(e.target.value) || 0)}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Enter acreage"
                  />
                </>
              )}

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">
                  Estimated Cost:{" "}
                  {purpose === "Load Transport"
                    ? "Cost will be decided on spot"
                    : `₹${cost}`}
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TractorManagement;
