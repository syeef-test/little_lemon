import React from "react";
import { Link } from "react-router-dom";

export default function BackButton({ destination = "/" }) {
  return (
    <div>
      <Link to={destination}>Back</Link>
    </div>
  );
}
