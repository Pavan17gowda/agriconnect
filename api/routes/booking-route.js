import express from "express";
import {
  getBookingsByUser,
  newBooking,
  acceptRequest,
  rejectRequest,
  getAllBookings,
  tractorBooking,
  deleteBooking,
  cropBooking,
} from "../controllers/bookings.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/new-booking", newBooking);
router.post("/tractorbooking", tractorBooking);
router.post("/cropbooking", cropBooking);

router.get("/", getAllBookings);
router.get("/bookingsbyuser/:userId", verifyToken, getBookingsByUser);
router.patch("/accept/:bookingId", acceptRequest);
router.patch("/reject/:bookingId", rejectRequest);
router.delete("/delete/:bookingId", deleteBooking);

export default router;
