import express from "express";
import { Reservation } from "../models/reservationModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.numberofseats ||
      !req.body.reservationdate
    ) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    const newReservation = {
      username: req.body.username,
      numberofseats: req.body.numberofseats,
      reservationdate: req.body.reservationdate,
    };

    const reservation = await Reservation.create(newReservation);

    if (!reservation) {
      return res.status(500).send({ message: "Failed to create reservation" });
    }

    return res.status(200).send(reservation);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    return res.status(200).json({
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    return res.status(200).json({
      count: reservation.length,
      data: reservation,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.numberofseats ||
      !req.body.reservationdate
    ) {
      res.status(400).send({ message: "Send all required fields" });
    }

    const { id } = req.params;
    const result = await Reservation.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Reservation Details Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Reservation Details Updated Succesfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Reservation.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Reservation Details Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Reservation Details Deleted Succesfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
