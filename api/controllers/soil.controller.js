import Soil from "../models/soil.model.js";
import Crop from "../models/crops.model.js"; // Assuming you have a Crop model for validation

export const soils = async (req, res) => {
  try {
    const response = await Soil.find({}).populate("crops_grown");
    // console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateSoil = async (req, res) => {
  const id = req.params.soilId; // Soil ID from request params
  const { soil_type, crops_grown } = req.body; // Data from the frontend
  console.log(id);

  try {
    const soil = await Soil.findById({ _id: id });

    if (!soil) {
      console.log("Soil not found");
      return res.status(404).json({ message: "Soil not found" });
    }

    crops_grown.map((crop) => {
      if (crop._id === 0) {
        const crop_new = Crop.find({ crop_name: crop.crop_name });
        if (!crop_new) {
          console.log("Add the crop seperately");
          res.json("Add the crop seperately");
        }
        crop._id = crop_new._id;
      }
    });

    // if (crops_grown && crops_grown.length > 0) {
    //   const cropIds = crops_grown.map((crop) => crop._id);

    //   const validCrops = await Crop.find({
    //     _id: { $in: cropIds },
    //   });

    //   if (validCrops.length !== cropIds.length) {
    //     console.log(
    //       "Some crops are invalid or do not exist.",
    //       validCrops.length,
    //       cropIds.length
    //     );
    //     return res.status(400).json("Some crops are invalid or do not exist.");
    //   }
    // }

    const updatedSoil = await Soil.findByIdAndUpdate(
      soil._id,
      {
        $set: {
          soil_type: soil_type || soil.soil_type,
          crops_grown: crops_grown || soil.crops_grown,
        },
      },
      { new: true } // This option ensures the updated document is returned
    );
    console.log("Soil updated successfully");

    return res.status(200).json({
      message: "Soil updated successfully",
      data: updatedSoil,
    });
  } catch (error) {
    console.error("Error updating soil:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
