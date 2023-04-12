import React from "react";
import "./AdminLogout.css";

function AdminLogout() {
  const logout = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/");
  };

  return (
    <div className="adminLogoutButton" onClick={logout}>
      <div className="adminLogoutText">LOGOUT</div>
    </div>
  );
}

export default AdminLogout;
