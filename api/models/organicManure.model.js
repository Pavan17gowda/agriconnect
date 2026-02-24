import mongoose, { Schema, model } from "mongoose";
import User from "../models/user.model.js";

const organicManureSchema = Schema(
  {
    manure_type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost_per_kg: {
      type: Number,
      required: true, // Ensures cost per kg is mandatory
      min: [0, "Cost per kg must be a positive value"], // Adds validation for non-negative value
    },
    address: {
      type: String,
      required: true,
    },
    manure_img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    manure_lat: {
      type: Number,
      required: true,
    },
    manure_long: {
      type: Number,
      required: true,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Manure", organicManureSchema);
