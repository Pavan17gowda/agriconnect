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

const AddFertilizers = ({ fertilizer }) => {
  const [formData, setFormData] = useState({
    fertilizer_name: fertilizer ? fertilizer.fertilizer_name : "",
    application_rate: fertilizer ? fertilizer.application_rate : "",
    physical_form: fertilizer ? fertilizer.physical_form : "",
    storage_condition: fertilizer ? fertilizer.storage_condition : "",
    safety_caution: fertilizer ? fertilizer.safety_caution : "",
    img_url: fertilizer ? fertilizer.img_url : "",
  });
  const navigate = useNavigate();
  // console.log(crop);
  console.log(formData);

  const [imageFile, setImageFile] = useState(
    fertilizer ? fertilizer.img_url : ""
  );
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

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        fertilizer
          ? `/api/fertilizers/fertilizerupdate/${fertilizer._id}`
          : "/api/fertilizers/addfertilizer",
        {
          method: fertilizer ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log("Form submitted successfully", res);
      if (res.ok) {
        setImageFile(null);
        e.target.reset();
        toast.success(
          `Fertilizer ${fertilizer ? "updated" : "added"} successfully`
        );
        navigate("/dashboard?tab=totalfertilizers");
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
      {!fertilizer && (
        <h1 className="font-bold text-3xl mb-4 text-[#3b5a26]">
          Add Fertilizer
        </h1>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Fertilier Name :
          <input
            type="text"
            id="fertilizer_name"
            value={formData.fertilizer_name ? formData.fertilizer_name : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                fertilizer_name: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Application Rate:
          <input
            type="text"
            id="application_rate"
            value={formData.application_rate ? formData.application_rate : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                application_rate: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Physical form:
          <input
            type="text"
            id="physical_form"
            value={formData.physical_form ? formData.physical_form : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                physical_form: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Storage Condidtion:
          <input
            type="text"
            id="storage_condition"
            value={formData.storage_condition ? formData.storage_condition : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                storage_condition: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Safety Caution:
          <input
            type="text"
            id="safety_caution"
            value={formData.safety_caution ? formData.safety_caution : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                safety_caution: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Upload Fertilizer Image:
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
            formData.fertilizer_name === "" ||
            formData.application_rate === "" ||
            formData.physical_form === "" ||
            formData.storage_condition === "" ||
            formData.safety_caution === ""
          }
          className={`w-full px-4 py-2 text-white rounded  ${
            formData.fertilizer_name === "" ||
            formData.application_rate === "" ||
            formData.physical_form === "" ||
            formData.storage_condition === "" ||
            formData.safety_caution === "" ||
            imageFileUploading
              ? " bg-green-300"
              : " bg-green-600 hover:bg-green-700"
          }`}
        >
          {fertilizer ? <h1>Update Fertilizer</h1> : <h1>Add Fertilizer</h1>}
        </button>
      </form>
    </>
  );
};

export default AddFertilizers;
