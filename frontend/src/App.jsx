import { useState } from "react";
import "./App.css";
import { Button, Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateReservations from "./pages/CreateReservations";
import ShowReservation from "./pages/ShowReservation";
import EditReservation from "./pages/EditReservation";
import DeleteReservation from "./pages/DeleteReservation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation/create" element={<CreateReservations />} />
      <Route path="/reservation/details/:id" element={<ShowReservation />} />
      <Route path="/reservation/edit/:id" element={<EditReservation />} />
      <Route path="/reservation/delete/:id" element={<DeleteReservation />} />
    </Routes>
  );
}

export default App;
