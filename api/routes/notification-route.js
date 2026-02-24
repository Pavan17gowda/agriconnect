import express from "express";
import {
  addNotification,
  getNotification,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.post("/", addNotification);
router.get("/:userId", getNotification);
export default router;
