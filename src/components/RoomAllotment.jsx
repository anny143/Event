import React, { useState, useEffect, useCallback } from "react";
import { Download, Edit, Trash2 } from "lucide-react";
import { utils, writeFile } from "xlsx";

const RoomAllotment = () => {
  const [assignments, setAssignments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ room: "", guests: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("roomAssignments");
    setAssignments(stored ? JSON.parse(stored) : []);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("roomAssignments", JSON.stringify(assignments));
  }, [assignments]);

  const filteredAssignments = useCallback(
    () =>
      assignments.filter(
        (a) =>
          a.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.guests.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [assignments, searchTerm]
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const openModal = (assignment = { room: "", guests: "" }) => {
    setNewAssignment(assignment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewAssignment({ room: "", guests: "" });
  };

  const saveAssignment = () => {
    if (!newAssignment.room || !newAssignment.guests) return;

    const exists = assignments.some((a) => a.room === newAssignment.room);
    const updated = exists
      ? assignments.map((a) =>
          a.room === newAssignment.room ? { ...a, guests: newAssignment.guests } : a
        )
      : [...assignments, newAssignment];

    setAssignments(updated);
    closeModal();
  };

  const deleteAssignment = (room) => {
    if (window.confirm(`Are you sure you want to delete room ${room}?`)) {
      setAssignments(assignments.filter((a) => a.room !== room));
    }
  };

  const handleDownloadExcel = () => {
    const data = filteredAssignments();
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Room Allotments");
    writeFile(workbook, "room_allotments.xlsx");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-gray-700">Room Allotment</h3>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadExcel}
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            disabled={assignments.length === 0}
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Assign Room
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by room or guest"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-3 py-2 mb-4 border rounded shadow focus:outline-none"
      />

      {assignments.length === 0 ? (
        <p className="text-center text-gray-500 py-10 border rounded bg-gray-50">
          No rooms are assigned yet. Please add a room.
        </p>
      ) : filteredAssignments().length === 0 ? (
        <p className="text-gray-500 mt-4">No results found.</p>
      ) : (
        <table className="min-w-full leading-normal shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Room</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Guests</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments().map((a) => (
              <tr key={a.room} className="bg-white border-t">
                <td className="px-4 py-2">{a.room}</td>
                <td className="px-4 py-2">
                  {a.guests || <span className="text-gray-400">Available</span>}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => openModal(a)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteAssignment(a.room)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">
              {assignments.some((a) => a.room === newAssignment.room)
                ? `Edit Room ${newAssignment.room}`
                : "Assign Room"}
            </h4>
            <div className="mb-4">
              <label className="block text-sm mb-1">Room Number:</label>
              <input
                type="text"
                name="room"
                value={newAssignment.room}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded shadow-sm"
                disabled={assignments.some((a) => a.room === newAssignment.room)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Guest(s):</label>
              <input
                type="text"
                name="guests"
                value={newAssignment.guests}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded shadow-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={saveAssignment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomAllotment;
