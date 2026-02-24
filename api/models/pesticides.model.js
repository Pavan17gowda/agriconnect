import { Schema, model } from "mongoose";

const pesticides = Schema({
  pesticide_name: {
    type: String,
    required: true,
  },
  application_rate: {
    type: String,
    required: true,
  },
  target_pest: {
    type: String,
    required: true,
  },
  safety_caution: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

export default model("Pesticides", pesticides);
