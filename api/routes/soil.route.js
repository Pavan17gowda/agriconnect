import express from "express";
import { soils, updateSoil } from "../controllers/soil.controller.js";
const router = express.Router();

router.get("/getsoils", soils);

router.put("/soilupdate/:soilId", updateSoil);

export default router;
