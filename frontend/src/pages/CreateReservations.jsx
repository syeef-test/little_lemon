import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateReservations() {
  const [username, setUsername] = useState("");
  const [numberofseats, setNumberofseats] = useState(0);
  const [reservationdate, setReservationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSaveReservation = () => {
    const data = {
      username,
      numberofseats,
      reservationdate,
    };
    setLoading(true);
    setError("");
    axios
      .post("http://127.0.0.1:5555/reservation", data)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setUsername("");
        setNumberofseats("");
        setReservationDate("");
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError("Failed to create reservation.");
      });
  };

  return (
    <div>
      <BackButton />
      <h1>Create Reservation</h1>
      {loading ? <Spinner animation="border" role="status" /> : ""}
      {success ? (
        <Alert variant="success">Reservation created successfully!</Alert>
      ) : (
        ""
      )}
      {error ? <Alert variant="danger">{error}</Alert> : ""}
      <div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Number of seats:</label>
          <input
            type="number"
            value={numberofseats}
            onChange={(e) => setNumberofseats(parseInt(e.target.value))}
          />
          <label>Date:</label>
          <input
            type="date"
            value={
              reservationdate ? reservationdate.toISOString().split("T")[0] : ""
            }
            onChange={(e) => setReservationDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <button onClick={handleSaveReservation}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default CreateReservations;
