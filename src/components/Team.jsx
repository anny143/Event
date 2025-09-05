import React, { useState } from "react";

const Team = () => {
  const [teams, setTeams] = useState([
    { name: "Registration Team", members: 5 },
    { name: "Operations Team", members: 8 },
    { name: "Marketing Team", members: 3 },
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-medium text-gray-700 mb-4">Team Management</h3>
      <ul className="list-disc list-inside text-gray-700" role="list">
        {teams.map((team, index) => (
          <li key={index}>
            {team.name} - {team.members} Members
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
