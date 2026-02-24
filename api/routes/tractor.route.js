import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addTractor,
  getTractors,
  tractorsByUser,
  toggleAvailabilty,
  deleteTractor,
  updateTractor,
} from "../controllers/tractor.controller.js";
const router = express.Router();

router.post("/addtractor", verifyToken, addTractor);
router.patch("/:userId", toggleAvailabilty);
router.put("/:tractorId", updateTractor);
router.delete("/:tractorId", deleteTractor);
router.get("/", getTractors);
router.get("/:userId", tractorsByUser);

export default router;
