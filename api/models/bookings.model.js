import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "itemType",
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  }, // "Tractor" or "Manure"
  itemSnapshot: {
    type: Object, // Store a snapshot of item details
    required: false,
  },
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requested_quantity: {
    type: Number,
    required: function () {
      return this.itemType === "Manure";
    }, // Required for manure
  },
  acres: {
    type: Number,
    required: function () {
      return this.itemType === "Tractor" && this.purpose === "Ploughing";
    }, // Required for ploughing tractors
  },
  purpose: {
    type: String,
    enum: ["Ploughing", "Load Transport"],
  },
  attachment: {
    type: String,
    enum: ["Plough", "Harrow", "Rotavator", "Cultivator", null],
    default: null, // Attachments for tractors
  },
  date: {
    type: Date,
  },
  cost: {
    type: String,
  }, // Total cost for the booking
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, // Timestamp
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
