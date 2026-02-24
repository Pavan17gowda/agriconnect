// models/Notification.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["success", "error"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Notification = model("Notification", NotificationSchema);
export default Notification;
