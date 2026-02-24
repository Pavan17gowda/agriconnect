import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useLocation } from "react-router-dom";

import { app } from "../firebase";
import { toast } from "react-toastify";

const AddCrop = ({ crop }) => {
  const [formData, setFormData] = useState({
    crop_name: crop ? crop.crop_name : "",
    sowing_period: crop ? crop.sowing_period : "",
    duration_of_crop: crop ? crop.duration_of_crop : "",
    harvesting_period: crop ? crop.harvesting_period : "",
    grown_soils: "",
    img_url: crop ? crop.img_url : "",
  });
  const navigate = useNavigate();
  // console.log(crop);
  console.log(formData);

  const [imageFile, setImageFile] = useState(crop ? crop.img_url : "");
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [soils, setSoils] = useState([]);
  const location = useLocation();

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
          setFormData((prev) => ({ ...prev, img_url: downloadURL }));
          setImageFileUploading(false);
        });
      }
    );
  };

  const updateSoils = async () => {
    {
      soils && soils.map((soil) => {});
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        crop ? `/api/crops/cropupdate/${crop._id}` : "/api/crops/addcrop",
        {
          method: crop ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log("Form submitted successfully", res);
      if (res.ok) {
        setImageFile(null);
        e.target.reset();
        navigate("/dashboard?tab=totalcrops");
        toast.success(`Crop ${crop ? "updated" : "added"} successfully`);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
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
      {!crop && (
        <h1 className="font-bold text-3xl mb-4 text-[#3b5a26]">Add Crop</h1>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Crop Name :
          <input
            type="text"
            id="crop_name"
            value={formData.crop_name ? formData.crop_name : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                crop_name: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Sowing Season:
          <input
            type="text"
            id="sowing_period"
            value={formData.sowing_period ? formData.sowing_period : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                sowing_period: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Crop Duration:
          <input
            type="text"
            id="duration_of_crop"
            value={formData.duration_of_crop ? formData.duration_of_crop : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                duration_of_crop: e.target.value,
              })
            }
            placeholder="Crop duration"
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Harvesting Season:
          <input
            type="text"
            id="harvesting_period"
            value={formData.harvesting_period ? formData.harvesting_period : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                harvesting_period: e.target.value,
              })
            }
            placeholder="Harvesting Season"
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Suitable Soils:
          <input
            type="text"
            id="grown_soils"
            value={formData.grown_soils ? formData.grown_soils : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                grown_soils: e.target.value.split(","),
              })
            }
            placeholder="Soil1 , Soil2 ....."
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Upload Crop Image:
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              id="img_url"
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
        <button
          type="submit"
          disabled={
            formData.crop_name === "" ||
            formData.sowing_period === "" ||
            formData.duration_of_crop === "" ||
            formData.harvesting_period === ""
          }
          className={`w-full px-4 py-2 text-white rounded  ${
            formData.crop_name === "" ||
            formData.sowing_period === "" ||
            formData.duration_of_crop === "" ||
            formData.harvesting_period === "" ||
            imageFileUploading
              ? " bg-green-300"
              : " bg-green-600 hover:bg-green-700"
          }`}
        >
          {crop ? <h1>Update Crop</h1> : <h1>Add Crop</h1>}
        </button>
      </form>
    </>
  );
};

export default AddCrop;
