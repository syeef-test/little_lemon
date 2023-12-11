import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditReservation() {
  const [username, setUsername] = useState("");
  const [numberofseats, setNumberofseats] = useState(0);
  const [reservationdate, setReservationDate] = useState(null); // Use null instead of an empty string for dates
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:5555/reservation/${id}`)
      .then((response) => {
        setLoading(false);
        setUsername(response.data.username);
        setNumberofseats(parseInt(response.data.numberofseats));

        // Convert reservationdate to a date object if it's in a string format
        const dateFromServer = response.data.reservationdate;
        const parsedDate = dateFromServer ? new Date(dateFromServer) : null;
        setReservationDate(parsedDate);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError("Failed to fetch reservation.");
      });
  }, [id]); // Add 'id' to the dependency array

  const handleEditReservation = () => {
    const data = {
      username,
      numberofseats,
      reservationdate: reservationdate
        ? reservationdate.toISOString().split("T")[0]
        : null, // Sending date as a string in 'YYYY-MM-DD' format
    };
    setLoading(true);
    setError("");
    axios
      .put(`http://127.0.0.1:5555/reservation/${id}`, data)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setUsername("");
        setNumberofseats(0);
        setReservationDate(null);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 3000); // Redirect after 3 seconds
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError("Failed to edit reservation.");
      });
  };

  return (
    <div>
      <BackButton />
      <h1>Edit Reservation</h1>
      {loading ? <Spinner animation="border" role="status" /> : ""}
      {success ? (
        <Alert variant="success">Reservation edited successfully!</Alert>
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
          <button onClick={handleEditReservation}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditReservation;
