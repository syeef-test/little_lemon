import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeleteReservation() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteReservation = () => {
    setLoading(true);
    axios
      .delete(`http://127.0.0.1:5555/reservation/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div>
        <h3>Are you sure you want to delete reservation?</h3>
        <button onClick={handleDeleteReservation}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteReservation;
