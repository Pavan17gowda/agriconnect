import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Crops from "./models/crops.model.js";
import Diseases from "./models/diseases.model.js";
import DiseasesPesticides from "./models/diseasesPesticides.model.js";

dotenv.config();

async function importDiseasesPesticides() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Build crop and disease name to ObjectId maps
    const crops = await Crops.find({});
    const cropNameToId = {};
    crops.forEach((crop) => {
      cropNameToId[crop.crop_name.trim().toLowerCase()] = crop._id;
    });
    const diseases = await Diseases.find({});
    const diseaseNameToId = {};
    diseases.forEach((disease) => {
      diseaseNameToId[disease.disease_name.trim().toLowerCase()] = disease._id;
    });

    // Read relationships
    const rels = JSON.parse(
      fs.readFileSync("jsondata/diseasesPesticidesTemplate.json", "utf-8")
    );
    let inserted = 0;
    let skipped = 0;
    for (const rel of rels) {
      const cropId = cropNameToId[rel.crop_name.trim().toLowerCase()];
      const diseaseId = diseaseNameToId[rel.disease_name.trim().toLowerCase()];
      if (cropId && diseaseId) {
        await DiseasesPesticides.create({
          crop_id: cropId,
          disease_id: diseaseId,
        });
        inserted++;
      } else {
        console.log(
          `Skipping: crop='${rel.crop_name}', disease='${rel.disease_name}'`
        );
        skipped++;
      }
    }
    console.log(`Inserted ${inserted} relationships. Skipped: ${skipped}`);
    process.exit();
  } catch (err) {
    console.error("Error importing DiseasesPesticides relationships:", err);
    process.exit(1);
  }
}

importDiseasesPesticides();
