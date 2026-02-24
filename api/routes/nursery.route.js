import express from "express";
import {
  createNursery,
  getAllNurseries,
  getNurseryById,
  getNurseriesByUser,
  updateNursery,
  deleteNursery,
  addNurseryCrop,
  getCropsByNursery,
  updateCrop,
  deleteCrop,
} from "../controllers/nursery.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add-nursery", createNursery);

router.get("/get-nurseries", getAllNurseries);
router.get("/nurseriesbyuser/:userId", getNurseriesByUser);

router
  .get("/:id", getNurseryById)
  .put("/:id", updateNursery)
  .delete("/:nurseryId", deleteNursery);
router.post("/add-crop", verifyToken, addNurseryCrop);
router.put("/crop-update/:cropId", updateCrop);
router.delete("/crop-delete/:cropId", deleteCrop);
router.get("/cropbynursery/:nurseryId", getCropsByNursery);

export default router;
