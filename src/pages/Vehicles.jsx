import React from "react";
import VehicleCard from "../components/VehicleCard";

const Vehicles = () => {
  const VEHICLES = [
    { name: "Car A", model: "Sedan", year: 2020 },
    { name: "Car B", model: "SUV", year: 2022 },
  ];
  return (
    <div className="container mt-5">
      <h2>Vehicles</h2>
      {VEHICLES.map((v, idx) => (
        <VehicleCard key={idx} vehicle={v} />
      ))}
    </div>
  );
};

export default Vehicles;
