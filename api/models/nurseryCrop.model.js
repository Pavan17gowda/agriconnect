// const mongoose = require("mongoose");
import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Vegetable", "Fruit", "Grain", "Pulse", "Oilseed", "Other"], // Optional predefined categories
  },
  growingSeason: {
    type: String,
    required: true,
    enum: ["Rabi", "Kharif", "Zaid", "All Seasons"], // Adjust seasons as needed
  },
  //   soilType: {
  //     type: String,
  //     required: true,
  //   },
  //   waterRequirement: {
  //     type: String,
  //     required: true,
  //     enum: ["Low", "Medium", "High"], // Optional predefined water levels
  //   },
  //   temperatureRange: {
  //     type: String,
  //     required: true, // Example: "20°C - 30°C"
  //   },
  description: {
    type: String,
    trim: true,
  },
  imageURL: {
    type: String, // URL to crop image
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who added the crop
    required: true,
  },
  nursery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nursery", // Reference to the nursery where this crop is available
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
    min: 0,
  },
  costPerCrop: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NurseryCrop = mongoose.model("NurseryCrop", CropSchema);

export default NurseryCrop;
