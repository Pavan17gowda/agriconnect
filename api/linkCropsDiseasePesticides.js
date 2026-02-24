import mongoose from "mongoose";
import dotenv from "dotenv";
import Crops from "./models/crops.model.js";
import Diseases from "./models/diseases.model.js";
import Pesticides from "./models/pesticides.model.js";
import DiseasesPesticides from "./models/diseasesPesticides.model.js";

dotenv.config();

async function linkCropsDiseasePesticides() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing relationships
    await DiseasesPesticides.deleteMany({});
    console.log("Cleared existing crop-disease-pesticide relationships");

    // Get all data
    const allCrops = await Crops.find({});
    const allDiseases = await Diseases.find({});
    const allPesticides = await Pesticides.find({});

    console.log(`Found ${allCrops.length} crops, ${allDiseases.length} diseases, ${allPesticides.length} pesticides`);

    // Create mappings based on crop and disease names
    const cropDiseaseMap = {
      "Wheat": ["Wheat Rust", "Rust", "Powdery Mildew"],
      "Rice": ["Rice Blast", "Bacterial Leaf Blight", "Leaf Spot"],
      "Sugarcane": ["Red Rot", "Smut", "Stem Rot"],
      "Cotton": ["Cotton Wilt", "Bacterial Blight", "Alternaria Blight"],
      "Maize": ["Maize Streak Virus", "Rust", "Leaf Spot"],
      "Sorghum (Jowar)": ["Grain Mold", "Sorghum Smut", "Anthracnose"],
      "Groundnut": ["Tikka Disease", "Rust", "Alternaria Blight"],
      "Tobacco": ["Tobacco Mosaic Virus", "Root Knot Nematode", "Bacterial Blight"],
      "Potato": ["Late Blight", "Potato Scab", "Root Rot"],
      "Tomato": ["Late Blight", "Tomato Yellow Leaf Curl Virus", "Powdery Mildew"],
      "Onion": ["Onion Smut", "Downy Mildew", "Anthracnose"],
      "Tea": ["Blister Blight", "Root Rot", "Leaf Spot"],
      "Coffee": ["Coffee Leaf Rust", "Coffee Berry Disease", "Root Rot"],
      "Barley": ["Barley Yellow Dwarf Virus", "Rust", "Powdery Mildew"],
      "Pulses (Lentil)": ["Ascochyta Blight", "Rust", "Root Rot"],
      "Mustard": ["White Rust", "Alternaria Blight", "Downy Mildew"],
      "Jute": ["Stem Rot", "Anthracnose", "Root Rot"],
      "Millets (Bajra)": ["Downy Mildew", "Ergot", "Rust"],
      "Chili": ["Anthracnose", "Powdery Mildew", "Leaf Spot"],
      "Tamarind": ["Tamarind Leaf Spot", "Powdery Mildew", "Anthracnose"],
      "Cucumber": ["Powdery Mildew", "Downy Mildew", "Anthracnose"],
      "Paddy": ["Rice Blast", "Bacterial Leaf Blight", "Leaf Spot"]
    };

    // Link crops to diseases and pesticides
    for (const crop of allCrops) {
      const diseaseNames = cropDiseaseMap[crop.crop_name] || [];
      
      for (const diseaseName of diseaseNames) {
        const disease = allDiseases.find(d => d.disease_name === diseaseName);
        
        if (disease) {
          // Find a suitable pesticide (just use the first one for now)
          const pesticide = allPesticides[Math.floor(Math.random() * allPesticides.length)];
          
          if (pesticide) {
            await DiseasesPesticides.create({
              crop_id: crop._id,
              disease_id: disease._id,
              pesticide_id: pesticide._id
            });
            console.log(`Linked ${crop.crop_name} -> ${disease.disease_name} -> ${pesticide.pesticide_name}`);
          }
        }
      }
    }

    console.log("Successfully linked all crops, diseases, and pesticides!");
    process.exit(0);
  } catch (err) {
    console.error("Error linking data:", err);
    process.exit(1);
  }
}

linkCropsDiseasePesticides();
