import Booking from "../models/bookings.model.js";
import Manure from "../models/organicManure.model.js";

export const addManure = async (req, res) => {
  const {
    manure_type,
    quantity,
    cost,
    address,
    manure_img,
    manure_lat,
    manure_long,
    description,
  } = req.body;
  console.log(req.body);

  try {
    if (
      !manure_type ||
      !quantity ||
      !cost ||
      !address ||
      !manure_img ||
      !manure_lat ||
      !manure_long ||
      !description
    ) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const manure = await Manure.create({
      manure_type,
      quantity: +quantity,
      cost_per_kg: +cost,
      address,
      manure_img,
      manure_lat,
      manure_long,
      description,
      posted_by: req.params.userId,
    });

    res.json(manure);
    console.log("Added the manure");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add manure" });
  }
};

export const getManures = async (req, res) => {
  try {
    const manures = await Manure.find({}).populate("posted_by");
    res.json(manures);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch manures" });
  }
};

export const getByUser = async (req, res) => {
  try {
    const manuresByUser = await Manure.find({ posted_by: req.params.userId });
    res.json(manuresByUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user-specific manures" });
  }
};

export const deleteManure = async (req, res) => {
  try {
    const manure = await Manure.findByIdAndDelete(req.params.manureId);
    if (!manure) {
      res.status(400).json({ error: "Manure doesn't exist" });
      return;
    }
    await Booking.updateMany(
      { itemId: req.params.manureId },
      { $set: { itemSnapshot: manure.toObject() } } // Store a snapshot
    );
    // console.log(manure);

    res.json(manure);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete manure" });
  }
};

export const updateManure = async (req, res) => {
  const { manure_type, quantity, cost, address, manure_img, description } =
    req.body;

  try {
    const updatedManure = await Manure.findByIdAndUpdate(
      req.params.manureId,
      {
        $set: {
          manure_type,
          quantity: +quantity,
          cost_per_kg: +cost,
          address,
          manure_img,
          description,
        },
      },
      { new: true }
    );

    if (!updatedManure) {
      res.status(404).json({ error: "Manure not found" });
      return;
    }

    res.json(updatedManure);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update manure" });
  }
};

export const getManure = async (req, res) => {
  try {
    const manure = await Manure.findById(req.params.manureId);
    if (!manure) {
      res.status(404).json({ error: "Manure not found" });
      return;
    }

    res.json(manure);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch manure details" });
  }
};
