import React from 'react'

const VehicleCard = ({vehicle}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{vehicle.name}</h5>
        <p className="card-text">Model: {vehicle.model}</p>
        <p className="card-text">Year: {vehicle.year}</p>
      </div>
    </div>
  )
}

export default VehicleCard