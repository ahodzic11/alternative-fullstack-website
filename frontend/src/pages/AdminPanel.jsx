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

  const readWorkshops = (e) => {
    e.preventDefault();
    navigate("/readworkshops");
  };

  const readProjects = (e) => {
    e.preventDefault();
    navigate("/readprojects");
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
            <div className="viewWorkshopsContainer addingItem" onClick={readWorkshops}>
              POGLEDAJ RADIONICE
            </div>
          </div>
          <div className="addingContainerRow">
            <div className="addProjectContainer addingItem" onClick={addProject}>
              DODAJ PROJEKAT
            </div>
            <div className="viewProjectsContainer addingItem" onClick={readProjects}>
              POGLEDAJ PROJEKTE
            </div>
          </div>
          <div className="addingContainerRow">
            <div className="addActivityContainer addingItem" onClick={addActivity}>
              DODAJ AKTIVNOST
            </div>
            <div className="viewActivitiesContainer addingItem" onClick={addActivity}>
              POGLEDAJ AKTIVNOSTI
            </div>
          </div>
        </div>
      </div>
      <AdminLogout />
    </>
  );
}

export default AdminPanel;
