import mongoose from "mongoose";

const fertilizers = mongoose.Schema({
  fertilizer_name: {
    type: String,
  },
  application_rate: {
    type: String,
  },
  growing_season: {
    type: String,
  },
  physical_form: {
    type: String,
  },
  storage_condition: {
    type: String,
  },
  safety_caution: {
    type: String,
  },
  img_url: {
    type: String,
  },
});

const Fertilizers = mongoose.model("Fertilizers", fertilizers);

export default Fertilizers;
