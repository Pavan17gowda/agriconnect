import mongoose from "mongoose";
import dotenv from "dotenv";
import Fertilizers from "./models/fertilizers.model.js";

dotenv.config();

async function updateFertilizerImages() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Generate simple SVG data URIs for fertilizers - these will always work
    const colors = [
      "#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", 
      "#00BCD4", "#8BC34A", "#673AB7", "#607D8B", "#795548",
      "#009688", "#8D6E63", "#6D4C41", "#5D4037", "#558B2F",
      "#BDBDBD", "#689F38", "#00695C", "#0277BD", "#757575",
      "#E0E0E0", "#FDD835", "#FF6F00"
    ];
    
    function createSVGDataURI(text, color) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
        <rect width="400" height="300" fill="${color}"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>`;
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    }
    
    const allFertilizers = await Fertilizers.find({});
    console.log(`Found ${allFertilizers.length} fertilizers to update`);

    for (let i = 0; i < allFertilizers.length; i++) {
      const fertilizer = allFertilizers[i];
      const color = colors[i % colors.length];
      const shortName = fertilizer.fertilizer_name.substring(0, 30);
      const imageUrl = createSVGDataURI(shortName, color);
      
      await Fertilizers.updateOne(
        { _id: fertilizer._id },
        { $set: { img_url: imageUrl } }
      );
      console.log(`Updated image for ${fertilizer.fertilizer_name}`);
    }

    console.log("Successfully updated all fertilizer images!");
    process.exit(0);
  } catch (err) {
    console.error("Error updating fertilizer images:", err);
    process.exit(1);
  }
}

updateFertilizerImages();
