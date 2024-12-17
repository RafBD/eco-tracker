// components/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Auditoría Ambiental</h1>
      <p>Seleccione una opción para continuar:</p>
      <Link to="/audit">
        <button className="">Realizar Auditoría</button>
      </Link>
      <Link to="/dashboard">
        <button className="dashboard-button">Ver Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;
