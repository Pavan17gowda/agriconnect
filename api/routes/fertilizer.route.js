import express from "express";
import {
  getFertilizers,
  // createFertilizer,
  getAllFertilizers,
  deleteFertilizer,
  updateFertilizer,
  addFertilizer,
} from "../controllers/fertilizer.controller.js";
const router = express.Router();

router.get("/getfertilizer", getFertilizers);
router.get("/getallfertilizers", getAllFertilizers);
router.delete("/deletefertilizer/:fertilizerId", deleteFertilizer);
// router.get("/createfertilizer", createFertilizer);
router.put("/fertilizerupdate/:fertilizerId", updateFertilizer);
router.post("/addfertilizer/", addFertilizer);

export default router;
