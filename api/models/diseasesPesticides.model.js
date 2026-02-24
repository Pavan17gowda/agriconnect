import mongoose, { Schema, model } from "mongoose";
import Crops from "./crops.model.js";
import diseaseModel from "../models/diseases.model.js";
import pesticideModel from "../models/pesticides.model.js";

const DiseasesPesticides = Schema({
  crop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crops",
  },
  disease_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: diseaseModel,
  },
  pesticide_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: pesticideModel,
  },
});

export default model("DiseasesPesticides", DiseasesPesticides);
