import React, { useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { GlobalContext } from "../context/GlobalState";
import { app } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddManure = ({ manure }) => {
  const { userLatitude, userLongitude, getAllManures, selectedManure } =
    useContext(GlobalContext);
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    manure_type: manure ? manure.manure_type : "",
    quantity: manure ? manure.quantity : "",
    address: manure ? manure.address : "",
    manure_lat: userLatitude,
    manure_long: userLongitude,
    description: manure ? manure.description : "",
    manure_img: manure ? manure.manure_img : "",
    cost: manure ? manure.cost : "", // Add cost field
  });

  const [imageFile, setImageFile] = useState(manure ? manure.manure_img : "");
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
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
          setImageFileUrl(downloadURL);
          setFormData((prev) => ({ ...prev, manure_img: downloadURL }));
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        manure
          ? `/api/manures/updatemanure/${manure._id}`
          : `/api/manures/addmanure/${currentUser._id}`,
        {
          method: manure ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        getAllManures();
        toast.success(` Manure ${manure ? "updated" : "added"} successfully`);

        setFormData({
          manure_type: "selectmanure",
          quantity: 0,
          address: "",
          manure_lat: userLatitude,
          manure_long: userLongitude,
          description: "",
          cost: "", // Reset cost
        });
        setImageFile(null);
        navigate("/services?tab=manures");
        e.target.reset();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetImageUploadState = () => {
    setImageFileUploadProgress(null);
    setImageFile(null);
    setImageFileUrl(null);
    setImageFileUploading(false);
  };

  return (
    <>
      <div className="p-4 flex flex-row content-center items-center gap-2">
        {manure ? (
          <h1 className="mt-4  text-green-700 font-bold py-2 px-4 rounded-full w-full max-w-xs mx-auto block shadow-md">
            Update Manure
          </h1>
        ) : (
          <>
            <h1 className="mt-4 text-2xl text-green-700 font-bold py-2 px-4 rounded-full w-full max-w-xs mx-auto block ">
              Add Manure
            </h1>
            <button
              onClick={() => navigate("/services?tab=manures")}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full max-w-xs mx-auto block shadow-md"
            >
              Go Back
            </button>
          </>
        )}
      </div>

      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Manure Type:
          <select
            id="manure_type"
            value={formData.manure_type || ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                manure_type: e.target.value.trim(),
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="selectmanure">
              {manure ? manure.manure_type : "Select the type of manure"}
            </option>
            <option value="compost">Compost</option>
            <option value="vermicompost">Vermicompost</option>
            <option value="greenManure">Green Manure</option>
            <option value="cowDungManure">Cow dung Manure</option>
            <option value="chickenManure">Chicken Manure</option>
          </select>
        </label>

        <label className="block">
          Quantity (in loads):
          <input
            type="number"
            min="1"
            id="quantity"
            value={formData.quantity || ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value.trim(),
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Cost (₹ per kg):
          <input
            type="number"
            min="1"
            id="cost"
            value={formData.cost || ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                cost: e.target.value.trim(),
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Address:
          <input
            type="text"
            id="address"
            value={formData.address || ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value.trim(),
              })
            }
            placeholder="Enter the address"
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Upload Manure Image:
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              id="manure_img"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full mt-1"
            />
            {imageFileUploading && (
              <span className="text-green-500 ml-2">Uploading...</span>
            )}
          </div>
        </label>

        <label className="block">
          Description:
          <textarea
            placeholder="Description of the manure"
            id="description"
            value={formData.description || ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          ></textarea>
        </label>

        <button
          type="submit"
          disabled={
            !formData.manure_type ||
            !formData.quantity ||
            !formData.cost ||
            !formData.address ||
            !formData.description ||
            imageFileUploading
          }
          className={`w-full px-4 py-2 text-white rounded ${
            !formData.manure_type ||
            !formData.quantity ||
            !formData.cost ||
            !formData.address ||
            !formData.description ||
            imageFileUploading
              ? "bg-green-300"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {manure ? "Update Manure" : "Add Manure"}
        </button>
        {/* {success && <Alert severity="success">Manure added Successfully</Alert>} */}
      </form>
    </>
  );
};

export default AddManure;
