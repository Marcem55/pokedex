import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="body">
      <div className="landing1">
        <h1 className="bienvenidos"> </h1>
        <Link to="/home">
          <div id="testbutton">
            <button className="botonHome">HOME</button>
          </div>
        </Link>
      </div>
    </div>
  );
};