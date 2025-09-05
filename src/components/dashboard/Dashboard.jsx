// Dashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RsvpOverview from "../RsvpOverview";
import TravelDetails from "../TravelDetails";
import RoomAllotment from "../RoomAllotment";
import Logistics from "../Logistics";
import Team from "../Team";
import DashboardHome from "./DashboardHome";
import GuestListOverview from "../GuestListOverview"; // Import new Guest List components
import BrideSide from "../BrideSide";
import GroomSide from "../GroomSide";

const Layout = ({
  children,
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
  isRsvpSubMenuOpen,
  setIsRsvpSubMenuOpen,
  headerTitle,
  editingTitle,
  setEditingTitle,
  tempTitle,
  setTempTitle,
  handleSaveTitle,
}) => (
  <div className="flex h-screen bg-gray-100 font-sans">
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      aria-label="Toggle sidebar"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <Sidebar
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isRsvpSubMenuOpen={isRsvpSubMenuOpen}
      setIsRsvpSubMenuOpen={setIsRsvpSubMenuOpen}
    />
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-6 bg-white shadow-md z-30">
        {!editingTitle ? (
          <h1 className="text-3xl font-bold text-gray-900">
            {headerTitle}
            {activeSection === "home" && (
              <button
                className="ml-3 text-indigo-600 hover:text-indigo-800"
                onClick={() => setEditingTitle(true)}
                title="Edit title"
              >
                ✏️
              </button>
            )}
          </h1>
        ) : (
          <input
            className="text-3xl font-bold text-gray-900 border-b border-indigo-600 outline-none px-2 py-1"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
            onBlur={handleSaveTitle}
            autoFocus
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </main>
  </div>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRsvpSubMenuOpen, setIsRsvpSubMenuOpen] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState(() => {
    return localStorage.getItem("dashboardTitle") || "Dashboard Home";
  });
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(dashboardTitle);

  useEffect(() => {
    localStorage.setItem("dashboardTitle", dashboardTitle);
  }, [dashboardTitle]);

  const renderSection = () => {
    switch (activeSection) {
      case "rsvp-overview":
        return <RsvpOverview />;
      case "rsvp-travel":
        return <TravelDetails />;
      case "rsvp-room":
        return <RoomAllotment />;
      case "logistics":
        return <Logistics />;
      case "teams":
        return <Team />;
      case "guestlist-overview":
        return <GuestListOverview />;
      case "guestlist-bride":
        return <BrideSide />;
      case "guestlist-groom":
        return <GroomSide />;
      default:
        return <DashboardHome />;
    }
  };

  const getHeaderTitle = () => {
    if (activeSection.startsWith("rsvp")) {
      return `RSVP: ${
        activeSection.split("-")[1].charAt(0).toUpperCase() +
        activeSection.split("-")[1].slice(1)
      }`;
    }
    if (activeSection.startsWith("guestlist")) {
      const subSection = activeSection.split("-")[1];
      return `Guest List: ${
        subSection.charAt(0).toUpperCase() + subSection.slice(1)
      }`;
    }
    return activeSection === "home"
      ? dashboardTitle
      : `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section`;
  };

  const handleSaveTitle = () => {
    setDashboardTitle(tempTitle);
    setEditingTitle(false);
  };

  return (
    <Layout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isRsvpSubMenuOpen={isRsvpSubMenuOpen}
      setIsRsvpSubMenuOpen={setIsRsvpSubMenuOpen}
      headerTitle={getHeaderTitle()}
      editingTitle={editingTitle}
      setEditingTitle={setEditingTitle}
      tempTitle={tempTitle}
      setTempTitle={setTempTitle}
      handleSaveTitle={handleSaveTitle}
    >
      {renderSection()}
    </Layout>
  );
};

export default Dashboard;