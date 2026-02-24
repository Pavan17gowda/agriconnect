import mongoose from "mongoose";
import dotenv from "dotenv";
import Crops from "./models/crops.model.js";

dotenv.config();

async function updateCropImages() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Image URLs for crops (using Unsplash for high-quality images)
    const cropImages = {
      "Wheat": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      "Rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      "Sugarcane": "https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=400",
      "Cotton": "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400",
      "Maize": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400",
      "Barley": "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400",
      "Sorghum (Jowar)": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
      "Millets (Bajra)": "https://images.unsplash.com/photo-1599909533730-f9d7e2c1c9b5?w=400",
      "Groundnut": "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400",
      "Pulses (Lentil)": "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400",
      "Tobacco": "https://images.unsplash.com/photo-1605289355680-75fb41239154?w=400",
      "Tea": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
      "Coffee": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
      "Jute": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
      "Potato": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      "Tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
      "Onion": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
      "Chili": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
      "Tamarind": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400",
      "Mustard": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
      "Cucumber": "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400",
      "Paddy": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"
    };

    const allCrops = await Crops.find({});
    console.log(`Found ${allCrops.length} crops to update`);

    for (const crop of allCrops) {
      const imageUrl = cropImages[crop.crop_name] || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400";
      
      await Crops.updateOne(
        { _id: crop._id },
        { $set: { img_url: imageUrl } }
      );
      console.log(`Updated image for ${crop.crop_name}`);
    }

    console.log("Successfully updated all crop images!");
    process.exit(0);
  } catch (err) {
    console.error("Error updating crop images:", err);
    process.exit(1);
  }
}

updateCropImages();
