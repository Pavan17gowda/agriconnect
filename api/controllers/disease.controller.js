import { populate } from "dotenv";
import Crops from "../models/crops.model.js";
import Diseases from "../models/diseases.model.js";
import DiseasesPesticides from "../models/diseasesPesticides.model.js";

export const getAllDiseases = async (req, res) => {
  try {
    const response = await Diseases.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const cropDiseases = async (req, res) => {
  const cropname = req.params.cropId; // crop_id is passed as 'cn' in query parameters
  console.log("crop_name (crop_id):", cropname);

  try {
    // Query the database for all records
    const response = await DiseasesPesticides.find({})
      .populate("crop_id")
      .populate("disease_id")
      .populate("pesticide_id");
    // console.log("All Records:", response);

    // Filter the records where crop_id matches cropname
    const filteredData = response.filter(
      (item) => item.crop_id._id.toString() === cropname
    );
    console.log(response[0].crop_id._id.toString(), "&&&&&&&", cropname);

    // Log and send the filtered response
    console.log("Filtered Response:", filteredData);
    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

export const updateDiseases = async (req, res) => {
  try {
    console.log(req.params.diseaseId);

    const updatedDisease = await Diseases.findByIdAndUpdate(
      req.params.diseaseId,
      {
        $set: {
          disease_name: req.body.disease_name,
          symptoms: req.body.symptoms,
          physical_form: req.body.physical_form,
          transmission_mode: req.body.transmission_mode,
          prevalence_mode: req.body.prevalence_mode,
          imageURL: req.body.imageURL,
        },
      },
      { new: true }
    );
    console.log(updatedDisease);

    res.status(200).json(updatedDisease);
  } catch (error) {
    console.log(error);
  }
};

export const addDisease = async (req, res) => {
  const {
    disease_name,
    symptoms,
    transmission_mode,
    prevalence_mode,
    imageURL,
  } = req.body;

  try {
    // Check for mandatory fields
    if (
      !disease_name ||
      !symptoms ||
      !transmission_mode ||
      !prevalence_mode ||
      !imageURL
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if the crop already exists
    const check = await Diseases.findOne({ disease_name });
    if (check) {
      return res.json({ message: "Disease already exists" });
    }

    // Create the new crop
    const disease = await Diseases.create({
      disease_name,
      symptoms,
      transmission_mode,
      prevalence_mode,
      imageURL,
    });
    console.log("disease added", disease);

    res.status(200).json(disease);
  } catch (error) {
    console.error(`Error adding crop: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletedisease = async (req, res) => {
  try {
    const response = await Diseases.findByIdAndDelete(req.params.diseaseId);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
