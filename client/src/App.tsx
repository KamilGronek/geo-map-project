// import { useState, useCallback } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/form/Login";
import { Register } from "./components/form/Register";
import { Map } from "./components/pages/Map";
import "./styles/App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}
