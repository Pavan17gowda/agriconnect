import { Schema, model } from "mongoose";

const diseases = Schema({
  disease_name: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  transmission_mode: {
    type: String,
    required: true,
  },
  prevalence_mode: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

export default model("Diseases", diseases);
