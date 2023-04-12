import React from "react";
import Admin from "../components/Admin";
import "./../components/AdminPanel.css";
import AdminLogout from "../components/AdminLogout";
import AdminNavigation from "../components/AdminNavigation";

function AdminPanel() {
  const addWorkshop = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/dodajradionicu");
  };

  const addProject = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/dodajprojekat");
  };

  const addActivity = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/dodajaktivnost");
  };

  const addNews = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/dodajvijest");
  };

  const chooseImage = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/odaberinaslovnu");
  };

  const pogledajRadionice = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/readworkshops");
  };

  return (
    <>
      <AdminNavigation />
      <div className="adminPanelContainer">
        <div className="addingContainer">
          <div className="addingContainerRow">
            <div className="addWorkshopsContainer addingItem" onClick={addWorkshop}>
              DODAJ RADIONICU
            </div>
            <div className="addActivitiesContainer addingItem" onClick={addActivity}>
              DODAJ AKTIVNOST
            </div>
          </div>
          <div className="addingContainerRow">
            <div className="addNewsContainer addingItem" onClick={addNews}>
              DODAJ VIJEST
            </div>
            <div className="addProjectContainer addingItem" onClick={addProject}>
              DODAJ PROJEKAT
            </div>
          </div>
          <div className="addingContainerRow">
            <div className="chooseImageContainer addingItem" onClick={chooseImage}>
              ODABERI NASLOVNU
            </div>
            <div className="addProjectContainer addingItem" onClick={pogledajRadionice}>
              POGLEDAJ RADIONICE
            </div>
          </div>
        </div>
      </div>
      <AdminLogout />
    </>
  );
}

export default AdminPanel;
