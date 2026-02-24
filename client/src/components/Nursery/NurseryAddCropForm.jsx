import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NurseryCropList from "./NurseryCropList";
import Nurserylist from "./Nurserylist";

const AddCropForm = ({ nurseryProp, crop }) => {
  const [nurseries, setNurseries] = useState([]);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [cropListView, setCropListView] = useState(false);
  const [nurseryListView, setNurseryListView] = useState(false);
  const [cropData, setCropData] = useState({
    name: crop ? crop.name : "",
    category: crop ? crop.category : "",
    growingSeason: crop ? crop.growingSeason : "",
    soilType: crop ? crop.soilType : "",
    // waterRequirement: crop ? crop.name : "",
    // temperatureRange: crop ? crop.name : "",
    description: crop ? crop.description : "",
    imageURL: crop ? crop.imageURL : "",
    nursery: nurseryProp._id,
    quantityAvailable: crop ? crop.quantityAvailable : "",
    costPerCrop: crop ? crop.costPerCrop : "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch nurseries for the dropdown

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("Calling");

    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        resetImageUploadState();
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Url genearted", downloadURL);

          setImageFileUrl(downloadURL);
          setCropData((prev) => ({ ...prev, imageURL: downloadURL }));
          setImageFileUploading(false);
        });
      }
    );
  };

  const resetImageUploadState = () => {
    setImageFileUploadProgress(null);
    setImageFile(null);
    setImageFileUrl(null);
    setImageFileUploading(false);
  };

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const response = await fetch("/api/nursery/get-nurseries");
        if (!response.ok) {
          throw new Error("Failed to fetch nurseries.");
        }
        const data = await response.json();
        setNurseries(data);
      } catch (error) {
        console.error("Error fetching nurseries:", error);
      }
    };

    fetchNurseries();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData({ ...cropData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        crop ? `/api/nursery/crop-update/${crop._id}` : "/api/nursery/add-crop",
        {
          method: crop ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cropData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add crop.");
      }
      // navigate(0);
      toast.success(`Crop ${crop ? "updated" : "added"} successfully!`);
      {
        crop ? setCropListView(true) : setNurseryListView(true);
      }
      // alert("Crop added successfully!");
      setCropData({
        name: "",
        category: "",
        growingSeason: "",
        soilType: "",
        waterRequirement: "",
        temperatureRange: "",
        description: "",
        imageURL: "",
        nursery: nurseryProp._id,
        quantityAvailable: "",
        costPerCrop: "",
      });
    } catch (error) {
      console.error("Error adding crop:", error);
      toast.error(`failed to ${crop ? "update" : "add"} crop`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* {cropListView && <NurseryCropList nurseryProp={nurseryProp} />} */}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-700">Add Crop</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Crop Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={cropData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={cropData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select Category</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
            <option value="Pulse">Pulse</option>
            <option value="Oilseed">Oilseed</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="growingSeason"
          >
            Growing Season
          </label>
          <select
            name="growingSeason"
            id="growingSeason"
            value={cropData.growingSeason}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select Season</option>
            <option value="Rabi">Rabi</option>
            <option value="Kharif">Kharif</option>
            <option value="Zaid">Zaid</option>
            <option value="All Seasons">All Seasons</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="quantityAvailable"
          >
            Quantity Available
          </label>
          <input
            type="number"
            name="quantityAvailable"
            id="quantityAvailable"
            value={cropData.quantityAvailable}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="costPerCrop"
          >
            Cost Per Crop
          </label>
          <input
            type="number"
            name="costPerCrop"
            id="costPerCrop"
            value={cropData.costPerCrop}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="nursery"
          >
            Nursery
          </label>
          <input
            type="text"
            name="nursery"
            id="nursery"
            value={nurseryProp.name}
            // onChange={handleChange}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            min="0"
            step="0.01"
            required
          />
        </div>
        {/* Add more fields here for soilType, waterRequirement, etc. */}
        <label className="block">
          Upload Crop Image:
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              id="imageURL"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full mt-1"
            />
            {imageFileUploading ? (
              <ClipLoader
                color="green"
                width
                size={30}
                aria-label="Loading Spinner"
                // data-testid="loader"
              />
            ) : (
              ""
            )}
          </div>
        </label>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={cropData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {crop ? "Update Crop" : "Add Crop"}
        </button>
      </form>
    </div>
  );
};

export default AddCropForm;
