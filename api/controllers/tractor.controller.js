import Booking from "../models/bookings.model.js";
import Tractor from "../models/tractor.model.js"; // Adjust the path to the model

export const addTractor = async (req, res) => {
  console.log(req.body);

  const {
    tractorBrand,
    modelNumber,
    registrationNumber,
    engineCapacity,
    fuelType,
    attachments,
    tractor_lat,
    tractor_long,
  } = req.body;

  try {
    const userId = req.user.id;

    const existingTractor = await Tractor.findOne({ registrationNumber });
    if (existingTractor) {
      return res.status(400).json({
        message: "Tractor with this registration number already exists",
      });
    }

    // Create and save the new tractor
    const newTractor = await Tractor.create({
      userId, // Pass `userId` explicitly
      tractorBrand,
      modelNumber,
      registrationNumber,
      engineCapacity,
      fuelType,
      attachments,
      tractor_lat,
      tractor_long,
    });

    console.log("New Tractor Registered:", newTractor);

    res.status(201).json({
      message: "Tractor registered successfully",
      tractor: newTractor,
    });
  } catch (error) {
    console.error("Error adding tractor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTractors = async (req, res) => {
  try {
    const tractors = await Tractor.find({}).populate("userId");
    res.json(tractors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch manures" });
  }
};

export const tractorsByUser = async (req, res) => {
  const response = await Tractor.find({ userId: req.params.userId });
  res.json(response);
};

export const toggleAvailabilty = async (req, res) => {
  const tractor = await Tractor.findById(req.params.userId);

  if (!tractor) {
    console.log(`[${new Date().toISOString()}] The tractor doesn't exists`);
    return res.status(500).json({
      message: "The tractor doesn't exists",
    });
  }
  try {
    const availability = await Tractor.findByIdAndUpdate(
      req.params.userId,
      {
        available: !tractor.available,
      },
      { new: true }
    );
    console.log(
      `[${new Date().toISOString()}] Availability toggled successfully`
    );
    res.status(200).json({
      message: "Availability toggled successfully",
    });
  } catch (error) {
    console.log(
      `[${new Date().toISOString()}] Unable to toggle the availability`
    );
    res.status(500).json({
      message: "Unable to toggle the availability",
      error: error.message,
    });
  }
};

export const deleteTractor = async (req, res) => {
  try {
    await Booking.updateMany(
      { itemId: itemId },
      { $set: { itemSnapshot: item.toObject() } } // Store a snapshot
    );
    const tractor = await Tractor.findByIdAndDelete(req.params.tractorId);
    if (!tractor) {
      return res.status(404).json({ message: "Tractor not found" });
    }
    res.status(200).json({ message: "Tractor deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTractor = async (req, res) => {
  console.log(req.params.tractorId);
  const {
    tractorBrand,
    modelNumber,
    registrationNumber,
    engineCapacity,
    fuelType,
    attachments,
    tractor_lat,
    tractor_long,
  } = req.body;

  try {
    const tractor = await Tractor.findByIdAndUpdate(
      req.params.tractorId,
      {
        // userId, // Pass `userId` explicitly
        tractorBrand,
        modelNumber,
        registrationNumber,
        engineCapacity,
        fuelType,
        attachments,
        tractor_lat,
        tractor_long,
      },
      {
        new: true,
      }
    );
    console.log(tractor);

    if (!tractor) {
      return res.status(404).json({ message: "Tractor not found" });
    }
    res.status(200).json({ message: "Tractor updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
