import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! Page not found. Go back to where you came from!</p>
      <Link to="/" className="notfound-link">
        Go back to Home
      </Link>
    </div>
  );
}