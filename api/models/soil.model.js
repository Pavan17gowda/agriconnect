import mongoose, { Schema, model } from "mongoose";
import cropsModel from "./crops.model.js";

const soils = Schema({
  soil_type: {
    type: String,
    required: true,
  },
  crops_grown: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: cropsModel,
    },
  ],
});

const Soil = model("Soil", soils);

export default Soil;
