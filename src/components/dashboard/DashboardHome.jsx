// DashboardHome.jsx
import React, { useState } from "react";

const DashboardHome = ({ dashboardTitle, setDashboardTitle }) => {
  const [editing, setEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(dashboardTitle);

  return (
    <div className="p-6">
      <p className="text-gray-600">
        Use the sidebar to navigate through different sections.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Total RSVPs
          </h3>
          <p className="text-3xl font-bold text-indigo-600">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Pending Tasks
          </h3>
          <p className="text-3xl font-bold text-red-500">7</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Active Teams
          </h3>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
