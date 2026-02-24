import Pesticides from "../models/pesticides.model.js";
import DiseasesPesticides from "../models/diseasesPesticides.model.js";

export const getAllPesticides = async (req, res) => {
  try {
    const response = await Pesticides.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getPesticides = async (req, res) => {
  const cropId = req.params.cropId;
  const diseaseId = req.params.diseaseId;
  console.log(cropId, diseaseId);

  try {
    const response = await DiseasesPesticides.find({})
      .populate("crop_id")
      .populate("disease_id")
      .populate("pesticide_id");
    // console.log(response);

    const filteredData = response.filter(
      (item) =>
        item.crop_id._id.toString() === cropId &&
        item.disease_id._id.toString() === diseaseId
    );
    console.log(response[0].crop_id._id.toString(), "&&", cropId);

    console.log("filteredData", filteredData);

    res.status(200).json(filteredData);
    // res.json(response);/
  } catch (error) {
    console.log(error);
  }
};

export const updatePesticide = async (req, res) => {
  try {
    const updatedPesticide = await Pesticides.findByIdAndUpdate(
      req.params.pesticideId,
      {
        $set: {
          pesticide_name: req.body.pesticide_name,
          application_rate: req.body.application_rate,
          target_pest: req.body.target_pest,
          safety_caution: req.body.safety_caution,
          imageURL: req.body.imageURL,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedPesticide);
  } catch (error) {
    console.log(error);
  }
};

export const addPesticide = async (req, res) => {
  const {
    pesticide_name,
    application_rate,
    target_pest,
    safety_caution,
    imageURL,
  } = req.body;

  try {
    // Check for mandatory fields

    if (
      !pesticide_name ||
      !application_rate ||
      !target_pest ||
      !safety_caution ||
      !imageURL
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if the crop already exists
    const check = await Pesticides.findOne({ pesticide_name });
    if (check) {
      return res.json({ message: "Pesticide already exists" });
    }

    // Create the new crop
    console.log(req.body);
    const pesticide = await Pesticides.create({
      pesticide_name,
      application_rate,
      target_pest,
      safety_caution,
      imageURL,
    });
    console.log("Pesticide added", pesticide);

    res.status(200).json(pesticide);
  } catch (error) {
    console.error(`Error adding pesticide: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePesticide = async (req, res) => {
  try {
    const response = await Pesticides.findByIdAndDelete(req.params.pesticideId);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
