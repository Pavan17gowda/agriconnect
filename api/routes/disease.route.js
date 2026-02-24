import express from "express";
import {
  getAllDiseases,
  cropDiseases,
  updateDiseases,
  addDisease,
  deletedisease,
} from "../controllers/disease.controller.js";
const router = express.Router();

router.get("/getalldiseases", getAllDiseases);
router.get("/cropdiseases/:cropId", cropDiseases);
router.put("/diseaseupdate/:diseaseId", updateDiseases);
router.post("/adddisease", addDisease);
router.delete("/deletedisease/:diseaseId", deletedisease);

export default router;
