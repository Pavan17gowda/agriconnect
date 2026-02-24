import express from "express";
import {
  getAllPesticides,
  getPesticides,
  updatePesticide,
  addPesticide,
  deletePesticide,
} from "../controllers/pesticide.controller.js";

const router = express.Router();

router.get("/getallpesticides", getAllPesticides);
router.get("/getpesticide/:diseaseId/:cropId", getPesticides);
router.put("/pesticideupdate/:pesticideId", updatePesticide);
router.delete("/deletepesticide/:pesticideId", deletePesticide);
router.post("/addpesticide", addPesticide);

export default router;
