import React from "react";
import "./Navigation.css";

function AdminNavigation() {
  const goBack = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/adminpanel");
  };

  return (
    <div className="adminNavigation" onClick={goBack}>
      <div className="goBackToPanel">
        <div className="goBackToPanelTitle">ADMIN PANEL</div>
      </div>
    </div>
  );
}

export default AdminNavigation;
