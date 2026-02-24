import express from "express";
import {
  getAllCrops,
  getCrops,
  getCropsBySoilId,
  cropUpdate,
  deleteCrop,
  addCrop,
  getCrop,
} from "../controllers/crops.controller.js";

const router = express.Router();

router.get("/getcrops", getCrops);
router.get("/getcrop", getCrop);

router.get("/getallcrops", getAllCrops);
router.get("/getcropsbysoilid/:soilId", getCropsBySoilId);
router.put("/cropupdate/:cropId", cropUpdate);
router.delete("/deletecrop/:cropId", deleteCrop);
router.post("/addcrop", addCrop);

export default router;
