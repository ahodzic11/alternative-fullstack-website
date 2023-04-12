import React from "react";
import "./AdminGoBack.css";

function AdminGoBack() {
  const logout = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/adminpanel");
  };

  return (
    <div className="adminGoBackButton" onClick={logout}>
      <div className="adminGoBackText">VRATI SE</div>
    </div>
  );
}

export default AdminGoBack;
