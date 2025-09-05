// Sidebar.jsx
import React, { useState } from "react";
import { ChevronDown, Home, Users, Map, ClipboardList, List } from "lucide-react"; // Ensure List icon is imported

const Sidebar = ({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
  isRsvpSubMenuOpen,
  setIsRsvpSubMenuOpen,
}) => {
  const [isGuestListSubMenuOpen, setIsGuestListSubMenuOpen] = useState(false);

  const handleLinkClick = (sectionName) => {
    setActiveSection(sectionName);
    setIsSidebarOpen(false);
  };

  const handleGuestListClick = (e) => {
    e.preventDefault();
    setIsGuestListSubMenuOpen(!isGuestListSubMenuOpen);
    if (!isGuestListSubMenuOpen && activeSection.startsWith("guestlist")) {
      // If closing and a guestlist sub-item was active, keep the parent active
    } else if (!isGuestListSubMenuOpen) {
      handleLinkClick("guestlist-overview"); // Default to overview if no sub-item was active
    } else if (isGuestListSubMenuOpen && !activeSection.startsWith("guestlist")) {
      // If opening and no guestlist sub-item is active, default to overview
      setActiveSection("guestlist-overview");
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white p-6 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col rounded-r-lg shadow-xl`}
    >
      <div className="text-2xl font-bold mb-8 text-center text-indigo-300">Admin Dashboard</div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              onClick={() => {
                handleLinkClick("home");
                setIsRsvpSubMenuOpen(false);
                setIsGuestListSubMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                activeSection === "home"
                  ? "bg-indigo-700 text-white shadow-inner"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <Home className="w-5 h-5" /> Dashboard
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={handleGuestListClick}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                activeSection.startsWith("guestlist")
                  ? "bg-indigo-700 text-white shadow-inner"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <List className="w-5 h-5" /> Guest List
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isGuestListSubMenuOpen ? "rotate-180" : ""
                }`}
              />
            </a>
            {isGuestListSubMenuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                {[
                  ["guestlist-overview", "Overview"],
                  ["guestlist-bride", "Bride Side"],
                  ["guestlist-groom", "Groom Side"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a
                      href="#"
                      onClick={() => handleLinkClick(id)}
                      className={`block p-2 rounded-lg text-sm transition-colors duration-200 ${
                        activeSection === id
                          ? "bg-indigo-600 text-white shadow-inner"
                          : "hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRsvpSubMenuOpen(!isRsvpSubMenuOpen);
                if (!isRsvpSubMenuOpen && activeSection.startsWith("rsvp")) {
                  // If closing and an RSVP sub-item was active, keep the parent active
                } else if (!isRsvpSubMenuOpen) {
                  handleLinkClick("rsvp-overview"); // Default to overview if no sub-item was active
                } else if (isRsvpSubMenuOpen && !activeSection.startsWith("rsvp")) {
                  // If opening and no RSVP sub-item is active, default to overview
                  setActiveSection("rsvp-overview");
                }
                setIsGuestListSubMenuOpen(false);
              }}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                activeSection.startsWith("rsvp")
                  ? "bg-indigo-700 text-white shadow-inner"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" /> RSVP
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isRsvpSubMenuOpen ? "rotate-180" : ""
                }`}
              />
            </a>
            {isRsvpSubMenuOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                {[
                  ["rsvp-overview", "Overview"],
                  ["rsvp-travel", "Travel Details"],
                  ["rsvp-room", "Room Allotment"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a
                      href="#"
                      onClick={() => handleLinkClick(id)}
                      className={`block p-2 rounded-lg text-sm transition-colors duration-200 ${
                        activeSection === id
                          ? "bg-indigo-600 text-white shadow-inner"
                          : "hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <a
              href="#"
              onClick={() => {
                handleLinkClick("logistics");
                setIsRsvpSubMenuOpen(false);
                setIsGuestListSubMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                activeSection === "logistics"
                  ? "bg-indigo-700 text-white shadow-inner"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <Map className="w-5 h-5" /> Logistics
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={() => {
                handleLinkClick("teams");
                setIsRsvpSubMenuOpen(false);
                setIsGuestListSubMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                activeSection === "teams"
                  ? "bg-indigo-700 text-white shadow-inner"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <Users className="w-5 h-5" /> Teams
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;