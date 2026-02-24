import mongoose, { Schema, model } from "mongoose";
// import cropsModel from "./crops.model.js";
// import soilModel from "./soil.model.js";
// import fertilizersModel from "./fertilizers.model.js";

const cropFertilizer = Schema({
  soil_id: {
    type: String,
    // ref: "Soil",
  },
  crop_id: {
    type: String,
    // ref: "Crops",
  },
  fertilizer_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fertilizers",
    },
  ],
});

const CropFertilizer = model("CropFertilizer", cropFertilizer);

export default CropFertilizer;
