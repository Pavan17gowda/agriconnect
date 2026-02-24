import { useEffect, useState, useContext } from "react";
import NurseryAddCropForm from "./NurseryAddCropForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const NurseryCropList = ({ nursery }) => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [crops, setCrops] = useState([]);
  const [adding, setAdding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);
  const [newQuantity, setNewQuantity] = useState();
  const { sendNotification } = useContext(GlobalContext);

  const [selectedCrop, setSelectedCrop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNurseryCrops();

    // Avoid logging crops here since state updates asynchronously.
  }, []);

  const getNurseryCrops = async () => {
    try {
      const res = await fetch(`/api/nursery/cropbynursery/${nursery._id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch crops.");
      }
      const cropData = await res.json();
      setCrops(cropData);
      setLoading(false);
      console.log(crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
      setLoading(false);
    }
  };
  console.log(crops);

  const handleBooking = async () => {
    const bookingData = {
      itemId: selectedCrop._id,
      itemType: "NurseryCrop",
      requesterId: currentUser?._id, // Using optional chaining
      providerId: selectedCrop?.createdBy, // Avoid crash if undefined
      quantity: newQuantity,
      cost: newQuantity * selectedCrop.costPerCrop,
    };

    try {
      const res = await fetch("/api/bookings/cropbooking", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const responseData = await res.json(); // Read server response

      if (res.ok) {
        // await sendNotification(booking.requesterId._id, "pending", res);
        toast.success(
          `Request sent to the provider of ${selectedCrop.name}. Check the status in the "My Activities" section in the dashboard.`
        );
        navigate("/dashboard?tab=myactivities");
        setDisplay(false);
      } else {
        throw new Error(responseData?.message || "Failed to send request"); // Use server error message
      }
    } catch (error) {
      console.error("Booking error:", error.message);
      toast.error(error.message || "Failed to request manure");
    }
  };

  const editCrop = (crop) => {
    console.log("Edit crop:", crop);
    setSelectedCrop(crop);
  };

  const handleCancel = () => {
    setSelectedCrop(false);
    setDisplay(false);
  };

  // buyCrop = (cropId) => {
  //   setDisplay(true);
  // };

  const deleteCrop = async (cropId) => {
    // const cropToDelete = crops[index];
    try {
      const res = await fetch(`/api/nursery/crop-delete/${cropId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        getNurseryCrops();
        toast.success("Crop deleted successfully.");
      } else {
        console.error("Failed to delete crop.");
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-green-700">
        {nursery.name}'s Crops
      </h3>
      {nursery.user_id === currentUser._id && (
        <button
          onClick={() => setAdding(!adding)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-blue-300 transition-all mb-3"
        >
          {!adding ? "Add Crop" : "Cancel"}
        </button>
      )}
      {adding && <NurseryAddCropForm nurseryProp={nursery} />}
      {selectedCrop && !display ? (
        <NurseryAddCropForm crop={selectedCrop} nurseryProp={nursery} />
      ) : (
        ""
      )}
      {crops.length === 0 ? (
        <p className="text-gray-600">No crops available.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4   gap-6 mt-8">
            {crops.map((crop) => (
              <li
                key={crop._id}
                className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl  border border-gray-300 overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                {/* Crop Image */}
                <img
                  src={crop.imageURL}
                  alt={crop.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-green-800">
                      {crop.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Qty:</span>{" "}
                      {crop.quantityAvailable}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Cost:</span> ₹
                      {crop.costPerCrop}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category: </span>
                      {crop.category}
                    </p>
                  </div>

                  {/* Buttons */}
                  {nursery.user_id === currentUser._id ? (
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={() => editCrop(crop)}
                        className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCrop(crop._id)}
                        className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setSelectedCrop(crop);
                          setDisplay(true);
                        }}
                        className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all hover:shadow-md"
                      >
                        Buy Now
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {display && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4">
                  Enter Required Quantity
                </h2>
                {newQuantity > selectedCrop.quantityAvailable && (
                  <p className="text-red-600 text-sm mb-2">
                    Quantity exceeds available stock!
                  </p>
                )}
                <input
                  type="number"
                  placeholder="Enter the quantity of manure required"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  className="w-full p-2 border rounded mb-4"
                />

                <p className="mb-4">
                  Total Cost: ₹{newQuantity * selectedCrop.costPerCrop}
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleBooking}
                    disabled={newQuantity > selectedCrop.quantityAvailable}
                    className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                      newQuantity > selectedCrop.quantityAvailable
                        ? " cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* <NurseryAddCropForm onAdd={addCrop} /> */}
    </div>
  );
};

export default NurseryCropList;
