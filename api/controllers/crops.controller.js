import Crops from "../models/crops.model.js";
import Soil from "../models/soil.model.js";

export const getCrops = async (req, res) => {
  try {
    const soil = await Soil.findOne({ soil_type: req.query.st }).populate(
      "crops_grown"
    );
    if (!soil) {
      return res.json("Soil not found");
    }
    res.json(soil.crops_grown);
    console.log(soil);
  } catch (error) {
    console.log("Error encountered", error);
    res
      .status(500)
      .json({ message: "Server error fetching crops by soil type" });
  }
};

export const getAllCrops = async (req, res) => {
  try {
    const allCrops = await Crops.find({});
    res.json(allCrops);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error fetching all crops" });
  }
};

export const getCropsBySoilId = async (req, res) => {
  try {
    const response = await Soil.findById({ _id: req.params.soilId }).populate(
      "crops_grown"
    );
    res.json(response.crops_grown);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error fetching crops by soil id" });
  }
};

export const cropUpdate = async (req, res) => {
  try {
    const updatedCrop = await Crops.findByIdAndUpdate(
      req.params.cropId,
      {
        $set: {
          crop_name: req.body.crop_name,
          sowing_period: req.body.sowing_period,
          duration_of_crop: req.body.duration_of_crop,
          harvesting_period: req.body.harvesting_period,
          img_url: req.body.img_url,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedCrop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error updating crop" });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crops.findByIdAndDelete(req.params.cropId);
    if (!crop) {
      res.status(400);
      return res.json("Manure doesn.t exist");
    }
    res.json(crop);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error deleting crop" });
  }
};

export const addCrop = async (req, res) => {
  const {
    crop_name,
    sowing_period,
    duration_of_crop,
    harvesting_period,
    grown_soils,
    img_url,
  } = req.body;

  try {
    // Check for mandatory fields
    if (
      !crop_name ||
      !sowing_period ||
      !duration_of_crop ||
      !grown_soils ||
      !harvesting_period ||
      !img_url
    ) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if the crop already exists
    const check = await Crops.findOne({ crop_name });
    if (check) {
      return res.json({ message: "Crop already exists" });
    }

    // Create the new crop
    const crop = await Crops.create({
      crop_name,
      sowing_period,
      duration_of_crop,
      harvesting_period,
      img_url,
    });

    // If crop is created, update soil data
    if (crop) {
      for (const soil of grown_soils) {
        console.log(soil);

        try {
          const soildetails = await Soil.findOne({ soil_type: soil }); // Use findOne instead of find
          console.log(soildetails);

          if (soildetails) {
            try {
              const soilupdate = await Soil.updateOne(
                { _id: soildetails._id },
                { $push: { crops_grown: crop._id } }
              );
              if (soilupdate) {
                return res.status(200).json(crop);
              }
            } catch (error) {
              console.log("Error while updating the soil", error);
              res
                .status(500)
                .json({ message: "Server error updating soil for crop" });
            }
          } else {
            console.log(`Soil not found for: ${soil}`);
          }
        } catch (error) {
          console.error(`Error updating soil: ${error.message}`);
          res
            .status(500)
            .json({ message: "Server error updating soil for crop" });
        }
      }
    }

    // Send the final response with the crop data
  } catch (error) {
    console.error(`Error adding crop: ${error.message}`);
    res.status(500).json({ message: "Server error adding crop" });
  }
};

export const getCrop = async (req, res) => {
  const { crop_name } = req.query;

  try {
    const crop = await Crops.find({ crop_name: crop_name });
    if (crop.length > 0) {
      return res.json(crop);
    } else {
      return res.json([]);
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching crop data" });
  }
};

// export default { getCrops };
