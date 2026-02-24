import { json } from "express";
import CropFertilizer from "../models/cropFertilizers.model.js";
import Fertilizers from "../models/fertilizers.model.js";

export const getFertilizers = async (req, res) => {
  try {
    const fertilizers = await CropFertilizer.findOne({
      soil_id: req.query.sid,
      crop_id: req.query.cid,
    }).populate("fertilizer_id");

    if (!fertilizers) {
      return res.status(404).json({ message: "No matching fertilizers found" });
    }
    res.json(fertilizers.fertilizer_id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizers.find({});

    res.json(fertilizers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFertilizer = async (req, res) => {
  try {
    const response = await Fertilizers.findByIdAndDelete(
      req.params.fertilizerId
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const updateFertilizer = async (req, res) => {
  try {
    const updatedFertilizer = await Fertilizers.findByIdAndUpdate(
      req.params.fertilizerId,
      {
        $set: {
          fertilizer_name: req.body.fertilizer_name,
          application_rate: req.body.application_rate,
          physical_form: req.body.physical_form,
          storage_condition: req.body.storage_condition,
          safety_caution: req.body.safety_caution,
          img_url: req.body.img_url,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedFertilizer);
  } catch (error) {
    console.log(error);
  }
};

export const addFertilizer = async (req, res) => {
  const {
    fertilizer_name,
    application_rate,
    physical_form,
    storage_condition,
    safety_caution,
    img_url,
  } = req.body;

  try {
    // Check for mandatory fields
    if (
      !fertilizer_name ||
      !application_rate ||
      !physical_form ||
      !storage_condition ||
      !safety_caution ||
      !img_url
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if the crop already exists
    const check = await Fertilizers.findOne({ fertilizer_name });
    if (check) {
      return res.json({ message: "Fertilizer already exists" });
    }

    // Create the new crop
    const fertilizer = await Fertilizers.create({
      fertilizer_name,
      application_rate,
      physical_form,
      storage_condition,
      safety_caution,
      img_url,
    });
    console.log("fertilizer added", fertilizer);

    res.status(200).json(fertilizer);
  } catch (error) {
    console.error(`Error adding crop: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
