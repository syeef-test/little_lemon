import React, { useEffect, useState } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:5555/reservation")
      .then((response) => {
        setReservations(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      Home
      <div>
        <h1>Reservation List</h1>
        <Link to="/reservation/create">Add</Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Number of seats</th>
              <th>Reservation Date</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation._id}>
                <td>{index + 1}</td>
                <td>{reservation.username}</td>
                <td>{reservation.numberofseats}</td>
                <td>{reservation.reservationdate}</td>
                <td>
                  <div>
                    <Link to={`/reservation/details/${reservation._id}`}>
                      Details
                    </Link>
                    <Link to={`/reservation/edit/${reservation._id}`}>
                      Edit
                    </Link>
                    <Link to={`/reservation/delete/${reservation._id}`}>
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
