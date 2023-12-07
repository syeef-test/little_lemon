import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    numberofseats: {
      type: Number,
      required: true,
    },
    reservationdate: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation = mongoose.model("reservation", reservationSchema);
