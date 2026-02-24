import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Fertilizers from "./models/fertilizers.model.js";
import Pesticides from "./models/pesticides.model.js";
import Diseases from "./models/diseases.model.js";
import Soil from "./models/soil.model.js";
import CropFertilizer from "./models/cropFertilizers.model.js";

dotenv.config();

const dataDir = "jsondata";

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Fertilizers
    const fertilizerData = JSON.parse(
      fs.readFileSync(path.join(dataDir, "fertilizerdata.json"), "utf-8")
    );
    await Fertilizers.deleteMany({});
    await Fertilizers.insertMany(fertilizerData);
    console.log("Fertilizers data imported successfully!");

    // Pesticides
    let pesticideData = JSON.parse(
      fs.readFileSync(path.join(dataDir, "pesticidesData.json"), "utf-8")
    );
    // Flatten nested arrays and add default imageURL if missing
    function flattenAndFixPesticides(arr) {
      let out = [];
      for (const item of arr) {
        if (Array.isArray(item)) {
          out = out.concat(flattenAndFixPesticides(item));
        } else if (typeof item === "object" && item !== null) {
          // Normalize field names and add default imageURL
          let obj = { ...item };
          if (!obj.imageURL) obj.imageURL = "https://via.placeholder.com/150";
          // Some entries use 'app_rate' and 'safety_precaution' instead of 'application_rate' and 'safety_caution'
          if (obj.app_rate) {
            obj.application_rate = obj.app_rate;
            delete obj.app_rate;
          }
          if (obj.safety_precaution) {
            obj.safety_caution = obj.safety_precaution;
            delete obj.safety_precaution;
          }
          out.push(obj);
        }
      }
      return out;
    }
    pesticideData = flattenAndFixPesticides(pesticideData);
    await Pesticides.deleteMany({});
    await Pesticides.insertMany(pesticideData);
    console.log("Pesticides data imported successfully!");

    // Diseases
    let diseasesData = JSON.parse(
      fs.readFileSync(path.join(dataDir, "diseasesData.json"), "utf-8")
    );
    diseasesData = diseasesData.map((d) => ({
      ...d,
      imageURL: d.imageURL || "https://via.placeholder.com/150",
    }));
    await Diseases.deleteMany({});
    await Diseases.insertMany(diseasesData);
    console.log("Diseases data imported successfully!");

    // Soil
    const soilData = JSON.parse(
      fs.readFileSync(path.join(dataDir, "soilData.json"), "utf-8")
    );
    await Soil.deleteMany({});
    await Soil.insertMany(soilData);
    console.log("Soil data imported successfully!");

    // Crop-Fertilizer Relationships
    let cropFertilizerData = JSON.parse(
      fs.readFileSync(path.join(dataDir, "cropFertilizerData.json"), "utf-8")
    );
    // Fix field name typo if present
    cropFertilizerData = cropFertilizerData.map((item) => {
      if (item["soil _id"]) {
        item.soil_id = item["soil _id"];
        delete item["soil _id"];
      }
      return item;
    });
    await CropFertilizer.deleteMany({});
    await CropFertilizer.insertMany(cropFertilizerData);
    console.log("Crop-Fertilizer relationship data imported successfully!");

    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
}

importData();
