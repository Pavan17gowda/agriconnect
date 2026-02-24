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

const AddDiseases = ({ disease }) => {
  const [formData, setFormData] = useState({
    disease_name: disease ? disease.disease_name : "",
    symptoms: disease ? disease.symptoms : "",
    transmission_mode: disease ? disease.transmission_mode : "",
    prevalence_mode: disease ? disease.prevalence_mode : "",
    imageURL: disease ? disease.imageURL : "",
  });
  const { getAllDiseases } = useContext(GlobalContext);
  const navigate = useNavigate();
  // console.log(crop);
  // console.log(formData);

  useEffect(() => {
    getAllDiseases();
  }, []);

  const [imageFile, setImageFile] = useState(disease ? disease.imageURL : "");
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
      const res = await fetch(
        disease
          ? `/api/diseases/diseaseupdate/${disease._id}`
          : "/api/diseases/adddisease",
        {
          method: disease ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log("Form submitted successfully", res);
      if (res.ok) {
        setImageFile(null);
        e.target.reset();
        navigate("/dashboard?tab=totaldiseases");
        toast.success(`Disease ${disease ? "updated" : "added"} successfully`);
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
      {!disease && (
        <h1 className="font-bold text-3xl mb-4 text-[#3b5a26]">Add Disease</h1>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 min-w-full mb-4 bg-white p-4 rounded shadow-md"
      >
        <label className="block">
          Disease Name :
          <input
            type="text"
            id="disease_name"
            value={formData.disease_name ? formData.disease_name : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                disease_name: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Symptoms:
          <input
            type="text"
            id="symptoms"
            value={formData.symptoms ? formData.symptoms : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                symptoms: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Transimission Mode:
          <input
            type="text"
            id="transmission_mode"
            value={formData.transmission_mode ? formData.transmission_mode : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                transmission_mode: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>
        <label className="block">
          Prevalence Mode:
          <input
            type="text"
            id="prevalence_mode"
            value={formData.prevalence_mode ? formData.prevalence_mode : ""}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                prevalence_mode: e.target.value,
              })
            }
            className="block w-full border border-gray-300 rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          Upload Disease Image:
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
            formData.disease_name === "" ||
            formData.symptoms === "" ||
            formData.transmission_mode === "" ||
            formData.prevalence_mode === ""
          }
          className={`w-full px-4 py-2 text-white rounded  ${
            formData.disease_name === "" ||
            formData.symptoms === "" ||
            formData.transmission_mode === "" ||
            formData.prevalence_mode === "" ||
            imageFileUploading
              ? " bg-green-300"
              : " bg-green-600 hover:bg-green-700"
          }`}
        >
          {disease ? <h1>Update Disease</h1> : <h1>Add Disease</h1>}
        </button>
      </form>
    </>
  );
};

export default AddDiseases;
