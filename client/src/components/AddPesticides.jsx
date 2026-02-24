import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalState";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useLocation } from "react-router-dom";

import { app } from "../firebase";

const AddPesticides = ({ pesticide }) => {
  const [formData, setFormData] = useState({
    pesticide_name: pesticide ? pesticide.pesticide_name : "",
    application_rate: pesticide ? pesticide.application_rate : "",
    target_pest: pesticide ? pesticide.target_pest : "",
    safety_caution: pesticide ? pesticide.safety_caution : "",
    imageURL: pesticide ? pesticide.imageURL : "",
  });
  const navigate = useNavigate();
  // console.log(crop);
  console.log(formData);
  const { getAllPesticides } = useContext(GlobalContext);

  useEffect(() => {
    getAllPesticides();
  }, []);

  const [imageFile, setImageFile] = useState(
    pesticide ? pesticide.imageURL : ""
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
          setFormData((prev) => ({ ...prev, imageURL: downloadURL }));
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const res = await fetch(
        pesticide
          ? `/api/pesticides/pesticideupdate/${pesticide._id}`
          : "/api/pesticides/addpesticide",
        {
          method: pesticide ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log("Form submitted successfully", res);
      if (res.ok) {
        navigate("/dashboard?tab=totalpesticides");
        setImageFile(null);
        e.target.reset();
        toast.success(
          `Pesticide ${pesticide ? "updated" : "added"} successfully`
        );
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
      {!pesticide && (
        <h1 className="font-bold text-3xl mb-4 text-[#3b5a26]">
          Add Pesticide
        </h1>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Pesticide Name :
          <input
            type="text"
            id="pesticide_name"
            value={formData.pesticide_name ? formData.pesticide_name : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                pesticide_name: e.target.value,
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
          Target Pest:
          <input
            type="text"
            id="target_pest"
            value={formData.target_pest ? formData.target_pest : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                target_pest: e.target.value,
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
          Upload Pesticide Image:
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
        <button
          type="submit"
          disabled={
            formData.pesticide_name === "" ||
            formData.application_rate === "" ||
            formData.target_pest === "" ||
            formData.safety_caution === ""
          }
          className={`w-full px-4 py-2 text-white rounded  ${
            formData.pesticide_name === "" ||
            formData.application_rate === "" ||
            formData.target_pest === "" ||
            formData.safety_caution === "" ||
            imageFileUploading
              ? " bg-green-300"
              : " bg-green-600 hover:bg-green-700"
          }`}
        >
          {pesticide ? <h1>Update Pesticide</h1> : <h1>Add Pesticide</h1>}
        </button>
      </form>
    </>
  );
};

export default AddPesticides;
