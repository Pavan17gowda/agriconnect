import mongoose from "mongoose";
import dotenv from "dotenv";
import Crops from "./models/crops.model.js";
import fs from "fs";

dotenv.config();

async function importCrops() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    const data = JSON.parse(
      fs.readFileSync("jsondata/cropsData.json", "utf-8")
    );

    // Optional: Clear existing crops
    await Crops.deleteMany({});
    console.log("Cleared existing crops");

    // Insert new crops
    await Crops.insertMany(data);
    console.log("Crops data imported successfully!");

    process.exit();
  } catch (err) {
    console.error("Error importing crops:", err);
    process.exit(1);
  }
}

importCrops();
