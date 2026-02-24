import mongoose from "mongoose";
import dotenv from "dotenv";
import Crops from "./models/crops.model.js";
import Soil from "./models/soil.model.js";
import Fertilizers from "./models/fertilizers.model.js";
import CropFertilizer from "./models/cropFertilizers.model.js";

dotenv.config();

async function linkCropsFertilizers() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing relationships
    await CropFertilizer.deleteMany({});
    console.log("Cleared existing crop-fertilizer relationships");

    // Get all data
    const allCrops = await Crops.find({});
    const allSoils = await Soil.find({}).populate("crops_grown");
    const allFertilizers = await Fertilizers.find({});

    console.log(`Found ${allCrops.length} crops, ${allSoils.length} soils, ${allFertilizers.length} fertilizers`);

    // For each soil, link its crops with fertilizers
    for (const soil of allSoils) {
      if (soil.crops_grown && soil.crops_grown.length > 0) {
        for (const crop of soil.crops_grown) {
          // Assign 2-4 random fertilizers to each crop-soil combination
          const numFertilizers = Math.floor(Math.random() * 3) + 2; // 2-4 fertilizers
          const selectedFertilizers = [];
          
          for (let i = 0; i < numFertilizers; i++) {
            const randomFertilizer = allFertilizers[Math.floor(Math.random() * allFertilizers.length)];
            if (!selectedFertilizers.includes(randomFertilizer._id)) {
              selectedFertilizers.push(randomFertilizer._id);
            }
          }

          await CropFertilizer.create({
            crop_id: crop._id,
            soil_id: soil._id,
            fertilizer_id: selectedFertilizers
          });
          
          console.log(`Linked ${crop.crop_name} in ${soil.soil_type} with ${selectedFertilizers.length} fertilizers`);
        }
      }
    }

    console.log("Successfully linked all crops, soils, and fertilizers!");
    process.exit(0);
  } catch (err) {
    console.error("Error linking data:", err);
    process.exit(1);
  }
}

linkCropsFertilizers();
