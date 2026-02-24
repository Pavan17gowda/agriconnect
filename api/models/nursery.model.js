import mongoose, { Schema, model } from "mongoose";

// Define the Nursery schema
const nurserySchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // unique: true,  
  },
  name: {
    type: String,
    required: true, // Nursery name
  },
  place: {
    type: String,
    required: true, // Place of the nursery
  },
  ownerName: {
    type: String,
    required: true, // Owner name
  },
  mobile: {
    type: Number, // Changed to Number for mobile
    required: true, // Mobile number of the owner
  },
  plantTypes: {
    type: [String], // Array to store selected plant types (Indoor, Outdoor, Medicinal, Flowering)
    required: true,
    enum: ["Indoor", "Outdoor", "Medicinal", "Flowering"], // Only these values are allowed
  },
});

// Create the Nursery model
const Nursery = model("Nursery", nurserySchema);

export default Nursery;
