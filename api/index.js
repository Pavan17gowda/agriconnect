import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import emailRoutes from "./routes/email.route.js";
import cropRoutes from "./routes/crop.route.js";
import fertilizerRoutes from "./routes/fertilizer.route.js";
import manureRoutes from "./routes/organicManure.route.js";
import soilRoutes from "./routes/soil.route.js";
import diseaseRoutes from "./routes/disease.route.js";
import pesticideRoutes from "./routes/pesticide.route.js";
import bookingRoutes from "./routes/booking-route.js";
import tractorRoutes from "./routes/tractor.route.js";
import nurseryRoutes from "./routes/nursery.route.js";
import notificationRoutes from "./routes/notification-route.js";

import cookieParser from "cookie-parser";
import path from "path";

import cors from "cors";
import emailController from "./emailController.js";

dotenv.config({});
console.log("MONGO_URL from env:", process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cookieParser());

// const corsOptions = {
//   origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
//   methods: "GET , POST , PUT , DELETE , PATCH",
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors());
app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/send-email", emailRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/manures", manureRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/pesticides", pesticideRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/soils", soilRoutes);
app.use("/api/tractors", tractorRoutes);
app.use("/api/nursery", nurseryRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/email", emailController);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
