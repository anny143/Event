import React, { useEffect, useState } from "react";

const RsvpOverView = () => {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const storedDetails = localStorage.getItem("travelDetails");
    if (storedDetails) {
      setArrivals(JSON.parse(storedDetails));
    }
  }, []);

  const totalArrivals = arrivals.length;
  const totalDepartures = arrivals.filter(
    (detail) => detail.departureDate && detail.departureTime
  ).length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Travel Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-medium text-indigo-600">
            Total Arrivals
          </h3>
          <p className="text-2xl font-bold text-gray-800">{totalArrivals}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-medium text-green-600">
            Total Departures
          </h3>
          <p className="text-2xl font-bold text-gray-800">{totalDepartures}</p>
        </div>
      </div>
    </div>
  );
};

export default RsvpOverView;
