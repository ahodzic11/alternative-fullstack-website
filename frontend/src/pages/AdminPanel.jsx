import React from "react";
import AdminLogout from "../components/AdminLogout";
import AdminNavigation from "../components/AdminNavigation";
import { useNavigate } from "react-router-dom";
import "./../css/AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();

  const addWorkshop = (e) => {
    e.preventDefault();
    navigate("/dodajradionicu");
  };

  const addProject = (e) => {
    e.preventDefault();
    navigate("/dodajprojekat");
  };

  const addActivity = (e) => {
    e.preventDefault();
    navigate("/dodajaktivnost");
  };

  const addNews = (e) => {
    e.preventDefault();
    navigate("/dodajvijest");
  };

  const chooseImage = (e) => {
    e.preventDefault();
    navigate("/odaberinaslovnu");
  };

  const pogledajRadionice = (e) => {
    e.preventDefault();
    navigate("/readworkshops");
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
