import React from "react";

const Header = ({ title }) => (
  <header className="flex items-center justify-between p-6 bg-white shadow-md z-30">
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
  </header>
);

export default Header;
