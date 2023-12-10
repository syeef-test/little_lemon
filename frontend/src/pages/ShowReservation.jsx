import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Spinner } from "react-bootstrap";

function ShowReservation() {
  const [reservation, setReservation] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:5555/reservation/${id}`)
      .then((response) => {
        setReservation(response.data.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <BackButton />
      <h1>Show Reservation</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <div>
            <span>Id:</span>
            <span>{reservation._id}</span>
          </div>
          <div>
            <span>Username:</span>
            <span>{reservation.username}</span>
          </div>
          <div>
            <span>Number of seats:</span>
            <span>{reservation.numberofseats}</span>
          </div>
          <div>
            <span>Reservation Date:</span>
            <span>{reservation.reservationdate}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowReservation;
