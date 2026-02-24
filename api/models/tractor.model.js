import mongoose from "mongoose";

const TractorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for registered users
      required: true,
    },
    tractorBrand: {
      type: String,
      required: true,
    },
    modelNumber: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    engineCapacity: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Electric"],
      required: true,
    },
    attachments: [
      {
        type: String,
        enum: ["Plough", "Harrow", "Rotavator", "Cultivator"],
      },
    ],
    available: {
      type: Boolean,
      default: false, // Tractors are available by default
    },
    tractor_lat: {
      type: Number,
      required: true,
    },
    tractor_long: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Tractor = mongoose.model("Tractor", TractorSchema);

export default Tractor;
