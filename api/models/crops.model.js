import mongoose, { Schema, model } from "mongoose";

const crops = Schema({
  crop_name: {
    type: String,
    required: true,
  },
  sowing_period: {
    type: String,
    required: true,
  },
  duration_of_crop: {
    type: String,
    required: true,
  },
  harvesting_period: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
  },
});

const Crops = model("Crops", crops);

export default Crops;
