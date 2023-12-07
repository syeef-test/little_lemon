import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Reservation } from "./models/reservationModel.js";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to little lemon");
});

app.post("/reservation", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.numberofseats ||
      !req.body.reservationdate
    ) {
      res.status(400).send({ message: "Send all required fields" });
    }
    const newReservation = {
      username: req.body.username,
      numberofseats: req.body.numberofseats,
      reservationdate: req.body.reservationdate,
      reservationdoneon: req.body.reservationdoneon,
    };

    const reservation = await Reservation.create(newReservation);
    return res.status(200).send(reservation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
