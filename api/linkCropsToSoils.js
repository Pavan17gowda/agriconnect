import mongoose from "mongoose";
import dotenv from "dotenv";
import Crops from "./models/crops.model.js";
import Soil from "./models/soil.model.js";

dotenv.config();

async function linkCropsToSoils() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing crops_grown arrays
    await Soil.updateMany({}, { $set: { crops_grown: [] } });
    console.log("Cleared existing crop-soil relationships");

    // Define crop-soil mappings based on typical agricultural knowledge
    const cropSoilMap = {
      "Wheat": ["Alluvial soil", "Black soil", "Red soil", "Loamy soil"],
      "Rice": ["Alluvial soil", "Black soil", "Clayey soil", "Loamy soil"],
      "Cotton": ["Black soil", "Red soil", "Alluvial soil", "Loamy soil"],
      "Sugarcane": ["Alluvial soil", "Black soil", "Red soil", "Loamy soil"],
      "Maize": ["Alluvial soil", "Red soil", "Black soil", "Loamy soil", "Sandy loam soil"],
      "Barley": ["Alluvial soil", "Black soil", "Loamy soil"],
      "Sorghum (Jowar)": ["Black soil", "Red soil", "Loamy soil"],
      "Millets (Bajra)": ["Sandy loam soil", "Red soil", "Loamy soil"],
      "Groundnut": ["Red soil", "Sandy loam soil", "Black soil", "Loamy soil"],
      "Pulses (Lentil)": ["Black soil", "Red soil", "Alluvial soil", "Loamy soil"],
      "Tobacco": ["Red soil", "Black soil", "Loamy soil"],
      "Tea": ["Red soil", "Loamy soil"],
      "Coffee": ["Red soil", "Loamy soil"],
      "Jute": ["Alluvial soil", "Clayey soil"],
      "Potato": ["Alluvial soil", "Red soil", "Loamy soil", "Sandy loam soil"],
      "Tomato": ["Red soil", "Alluvial soil", "Black soil", "Loamy soil"],
      "Onion": ["Alluvial soil", "Black soil", "Red soil", "Loamy soil", "Sandy loam soil"],
      "Chili": ["Red soil", "Black soil", "Loamy soil"],
      "Tamarind": ["Red soil", "Black soil", "Loamy soil"],
      "Mustard": ["Alluvial soil", "Loamy soil"],
      "Cucumber": ["Loamy soil", "Sandy loam soil"],
      "Paddy": ["Alluvial soil", "Clayey soil", "Loamy soil"]
    };

    // Get all crops and soils
    const allCrops = await Crops.find({});
    const allSoils = await Soil.find({});

    console.log(`Found ${allCrops.length} crops and ${allSoils.length} soils`);

    // Link crops to soils
    for (const crop of allCrops) {
      const suitableSoils = cropSoilMap[crop.crop_name] || ["Alluvial soil"];
      
      for (const soilType of suitableSoils) {
        const soil = allSoils.find(s => s.soil_type === soilType);
        if (soil) {
          await Soil.updateOne(
            { _id: soil._id },
            { $addToSet: { crops_grown: crop._id } }
          );
          console.log(`Linked ${crop.crop_name} to ${soilType}`);
        }
      }
    }

    console.log("Successfully linked all crops to soils!");
    process.exit(0);
  } catch (err) {
    console.error("Error linking crops to soils:", err);
    process.exit(1);
  }
}

linkCropsToSoils();
