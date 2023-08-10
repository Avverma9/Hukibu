import React from "react";
import { useLocation } from "react-router-dom";
import './Welcome.css';

const Welcome = () => {
    const location=useLocation()
    if (location.pathname !== "/") {
        return null
    }
  return (
    <div className="welcome-image">
      <img src="https://media.tenor.com/T4664VfiM0cAAAAC/asistente-robot.gif" alt="" />
      <p className="welcome-text-admin">Welcome Admin !</p>
      <button className="lets-go-button">
        <a href="/user">Let's GO</a>
        </button>
    </div>
  );
};

export default Welcome;
