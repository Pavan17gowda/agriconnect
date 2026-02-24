import express from "express";
import {
  addManure,
  getManures,
  getByUser,
  deleteManure,
  updateManure,
  getManure,
} from "../controllers/organicManure.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/addmanure/:userId", verifyToken, addManure);
router.get("/getmanures", getManures);
router.get("/getmanure/:manureId", getManure);
router.get("/getbyuser/:userId", verifyToken, getByUser);
router.delete("/deletemanure/:manureId", verifyToken, deleteManure);
router.put("/updatemanure/:manureId", verifyToken, updateManure);

export default router;
